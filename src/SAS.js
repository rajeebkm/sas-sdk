const { RpcProvider, Contract, Account } = require("starknet");
require("dotenv").config();

class SAS {
  constructor(
    nodeUrl,
    privateKey,
    accountAddress,
    schemaRegistryAddress,
    schemaAttestationAddress,
    schemaRegistryABI,
    schemaAttestationABI
  ) {
    if (!nodeUrl) {
      throw new Error("Node URL must be provided for the provider.");
    }
    if (!privateKey) {
      throw new Error("Private key must be provided.");
    }
    if (!accountAddress) {
      throw new Error("Account address must be provided.");
    }
    if (!schemaRegistryAddress) {
      throw new Error("Schema Registry address must be provided.");
    }
    if (!schemaAttestationAddress) {
      throw new Error("Schema Attestation address must be provided.");
    }
    if (!schemaRegistryABI) {
      throw new Error("Schema Registry ABI must be provided.");
    }
    if (!schemaAttestationABI) {
      throw new Error("Schema Attestation ABI must be provided.");
    }

    try {
      const provider = new RpcProvider({ nodeUrl });
      this.account = new Account(provider, accountAddress, privateKey);
      this.schemaRegistryContract = new Contract(
        schemaRegistryABI,
        schemaRegistryAddress,
        provider
      );
      this.schemaRegistryContract.connect(this.account);
      this.schemaAttestationContract = new Contract(
        schemaAttestationABI,
        schemaAttestationAddress,
        provider
      );
      this.schemaAttestationContract.connect(this.account);
    } catch (error) {
      throw new Error(`Failed to initialize SAS-SDK: ${error.message}`);
    }
  }

  /*********************************************** Create Schema *****************************************************/

  /**
   * Registers a schema with the contract.
   * @param {string} schema - The schema data as a byte array.
   * @param {string} resolver - The resolver contract address.
   * @param {boolean} revocable - Whether the schema is revocable.
   * @returns {Promise<string>} The transaction hash.
   */
  async createSchema(schema, resolver, revocable) {
    if (!schema) throw new Error("Schema data is required.");
    if (!resolver) throw new Error("Resolver address is required.");
    if (typeof revocable !== "boolean")
      throw new Error("Revocable flag must be a boolean.");

    try {
      const nonce = await this.account.getNonce();
      const tx = await this.schemaRegistryContract.register(
        schema,
        resolver,
        revocable,
        {
          nonce,
        }
      );
      return tx.transaction_hash;
    } catch (error) {
      if (error.response) {
        throw new Error(`Contract call failed: ${error.response.data.message}`);
      }
      throw new Error(`Failed to register schema: ${error.message}`);
    }
  }

  /**
   * Fetches a schema by its UID.
   * @param {string} uid - The UID of the schema.
   * @returns {Promise<{ schemaRecord: object, schema: string }>} The schema record and schema data.
   */
  async getSchema(uid) {
    if (!uid) throw new Error("UID is required to fetch a schema.");

    try {
      const result = await this.schemaRegistryContract.get_schema(uid);
      if (!result || result.length === 0) {
        throw new Error("Schema not found.");
      }
      return { schemaRecord: result[0], schema: result[1] };
    } catch (error) {
      if (error.response) {
        throw new Error(`Contract call failed: ${error.response.data.message}`);
      }
      throw new Error(`Failed to fetch schema: ${error.message}`);
    }
  }

  /**
   * Fetches all UIDs from the contract.
   * @returns {Promise<string[]>} Array of all UIDs.
   */
  async getAllUIDs() {
    try {
      const result = await this.schemaRegistryContract.get_all_uids();
      if (!result || result.length === 0) {
        throw new Error("No UIDs found.");
      }
      return result;
    } catch (error) {
      if (error.response) {
        throw new Error(`Contract call failed: ${error.response.data.message}`);
      }
      throw new Error(`Failed to fetch all UIDs: ${error.message}`);
    }
  }

  /**
   * Fetches all schema records from the contract.
   * @returns {Promise<object[]>} Array of all schema records.
   */
  async getAllSchemas() {
    try {
      const result =
        await this.schemaRegistryContract.get_all_schemas_records();
      if (!result || result.length === 0) {
        throw new Error("No schema records found.");
      }
      return result;
    } catch (error) {
      if (error.response) {
        throw new Error(`Contract call failed: ${error.response.data.message}`);
      }
      throw new Error(`Failed to fetch all schema records: ${error.message}`);
    }
  }

  /*********************************************** Make Attestation *****************************************************/
  /**
   * Registers an attestation with the contract.
   * @param {string} recipientWalletAddress - The address of the recipient.
   * @param {Object} attestationData - The attestation data.
   * @param {Array} schemaAttributes - The schema attributes for the attestation.
   * @param {string} schemaUID - The unique ID of the schema.
   * @param {boolean} revocable - Whether the attestation is revocable.
   * @returns {Promise<string>} The transaction hash.
   */
  async registerAttestation(
    recipient,
    expirationTime,
    revocable,
    refUID,
    schemaData,
    value,
    schemaUID
  ) {
    try {
      const attestationRequestData = {
        recipient: recipient,
        expirationTime: expirationTime,
        revocable: revocable,
        refUID: refUID,
        schemaData: schemaData,
        value: value,
      };

      const attestationRequest = {
        schemaUID: schemaUID,
        data: attestationRequestData,
      };

      const attestationRequestFormatted = {
        schema: attestationRequest.schemaUID.toString(),
        data: {
          recipient: attestationRequest.data.recipient,
          expirationTime: attestationRequest.data.expirationTime,
          revocable: attestationRequest.data.revocable ? 1 : 0,
          refUID: attestationRequest.data.refUID.toString(),
          data: attestationRequest.data.schemaData,
          value: attestationRequest.data.value.toString(),
        },
      };
      const nonce = await this.account.getNonce();
      const tx = await this.schemaAttestationContract.attest(
        attestationRequestFormatted,
        {
          nonce,
        }
      );
      return tx.transaction_hash;
    } catch (error) {
      if (error.response) {
        throw new Error(`Contract call failed: ${error.response.data.message}`);
      }
      throw new Error(`Failed to register attestation: ${error.message}`);
    }
  }

  /**
   * Revokes an attestation with the contract.
   * @param {string} attestationUID - The unique identifier of the attestation to be revoked.
   * @param {string} schemaUID - The unique identifier of the schema.
   * @returns {Promise<string>} The transaction hash.
   */
  async revokeAttestation(attestationUID, schemaUIDs, value) {
    if (!attestationUID) throw new Error("Attestation UID is required.");
    if (!schemaUIDs) throw new Error("Schema UID is required.");

    try {
      const revocationRequestFormatted = {
        schema: schemaUIDs,
        data: {
          uid: attestationUID,
          value: value,
        },
      };
      const nonce = await this.account.getNonce();
      const tx = await this.schemaAttestationContract.revoke(
        revocationRequestFormatted,
        { nonce }
      );
      return tx.transaction_hash;
    } catch (error) {
      if (error.response) {
        throw new Error(`Contract call failed: ${error.response.data.message}`);
      }
      throw new Error(`Failed to revoke attestation: ${error.message}`);
    }
  }

  /**
   * Fetches all attestations from the contract.
   * @returns {Promise<object[]>} Array of all attestation records.
   */
  async getAllAttestations() {
    try {
      const result = await this.schemaAttestationContract.getAllAttestations();
      if (!result || !Array.isArray(result) || result.length === 0) {
        throw new Error("No attestations found.");
      }
      return result;
    } catch (error) {
      if (error.code === "CALL_EXCEPTION") {
        throw new Error(
          "Contract call failed: Possible ABI mismatch or invalid contract address."
        );
      }
      if (error.response) {
        throw new Error(`Contract call failed: ${error.response.data.message}`);
      }
      if (error.message.includes("timeout")) {
        throw new Error(
          "Request timed out: Ensure the provider URL is correct and the network is responsive."
        );
      }
      if (error.message.includes("network")) {
        throw new Error(
          "Network error: Check your RPC provider and internet connection."
        );
      }
      throw new Error(`Failed to fetch all attestations: ${error.message}`);
    }
  }

  /**
   * Fetches an attestation by its UID from the contract.
   * @param {string} attestationUID - The UID of the attestation.
   * @returns {Promise<object>} The attestation record.
   */
  async getAttestation(attestationUID) {
    try {
      const result = await this.schemaAttestationContract.getAttestation(
        attestationUID
      );
      if (!result) {
        throw new Error("Attestation not found.");
      }

      return result;
    } catch (error) {
      if (error.code === "CALL_EXCEPTION") {
        throw new Error(
          "Contract call failed: Possible ABI mismatch or invalid contract address."
        );
      }
      if (error.response) {
        throw new Error(`Contract call failed: ${error.response.data.message}`);
      }
      if (error.message.includes("timeout")) {
        throw new Error(
          "Request timed out: Ensure the provider URL is correct and the network is responsive."
        );
      }
      if (error.message.includes("network")) {
        throw new Error(
          "Network error: Check your RPC provider and internet connection."
        );
      }
      throw new Error(`Failed to fetch attestation: ${error.message}`);
    }
  }

  /**
   * Checks if an attestation is valid.
   * @param {string} uid - The UID of the attestation to check.
   * @returns {Promise<boolean>} True if the attestation is valid, false otherwise.
   */
  async isAttestationValid(uid) {
    try {
      const result = await this.schemaAttestationContract.isAttestationValid(
        uid
      );
      if (typeof result !== "boolean") {
        throw new Error("Invalid result type: Expected boolean.");
      }
      return result;
    } catch (error) {
      if (error.code === "CALL_EXCEPTION") {
        throw new Error(
          "Contract call failed: Possible ABI mismatch or invalid contract address."
        );
      }
      if (error.message.includes("timeout")) {
        throw new Error(
          "Request timed out: Ensure the provider URL is correct and the network is responsive."
        );
      }
      if (error.message.includes("network")) {
        throw new Error(
          "Network error: Check your RPC provider and internet connection."
        );
      }
      throw new Error(`Failed to check attestation validity: ${error.message}`);
    }
  }

  /**
   * Fetches the SchemaRegistry contract address.
   * @returns {Promise<string>} The address of the SchemaRegistry contract.
   */
  async getSchemaRegistry() {
    try {
      const result = await this.schemaAttestationContract.getSchemaRegistry();
      if (!result || typeof result !== "bigint") {
        throw new Error(
          "Invalid result type: Expected contract address as string."
        );
      }
      return result;
    } catch (error) {
      if (error.code === "CALL_EXCEPTION") {
        throw new Error(
          "Contract call failed: Possible ABI mismatch or invalid contract address."
        );
      }
      if (error.message.includes("timeout")) {
        throw new Error(
          "Request timed out: Ensure the provider URL is correct and the network is responsive."
        );
      }
      if (error.message.includes("network")) {
        throw new Error(
          "Network error: Check your RPC provider and internet connection."
        );
      }
      throw new Error(
        `Failed to fetch SchemaRegistry contract address: ${error.message}`
      );
    }
  }

  /**
   * Fetches the number of attestations for a given schema UID.
   * @param {string} schemaUID - The schema UID to get the number of attestations for.
   * @returns {Promise<string>} The number of attestations as a string (u256).
   */
  async getNoOfAttestation(schemaUID) {
    try {
      if (!schemaUID) {
        throw new Error("schemaUID must be provided.");
      }
      const result = await this.schemaAttestationContract.getNoOfAttestation(
        schemaUID
      );

      if (!result || typeof result !== "bigint") {
        throw new Error("Invalid result type: Expected u256 (string).");
      }

      return result;
    } catch (error) {
      if (error.code === "CALL_EXCEPTION") {
        throw new Error(
          "Contract call failed: Possible ABI mismatch or invalid contract address."
        );
      }
      if (error.message.includes("timeout")) {
        throw new Error(
          "Request timed out: Ensure the provider URL is correct and the network is responsive."
        );
      }
      if (error.message.includes("network")) {
        throw new Error(
          "Network error: Check your RPC provider and internet connection."
        );
      }
      throw new Error(
        `Failed to fetch the number of attestations: ${error.message}`
      );
    }
  }
}

module.exports = SAS;
