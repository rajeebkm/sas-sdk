const { SAS } = require("../src");
const {
  ACCOUNT_ADDRESS,
  SR_CONTRACT_ADDRESS,
  SA_CONTRACT_ADDRESS,
  SR_ABI,
  SA_ABI,
} = require("../utils/constants");
require("dotenv").config();

(async () => {
  try {
    const sas = new SAS(
      process.env.NODE_URL,
      process.env.PRIVATE_KEY,
      ACCOUNT_ADDRESS,
      SR_CONTRACT_ADDRESS,
      SA_CONTRACT_ADDRESS,
      SR_ABI,
      SA_ABI
    );

    // Register a new schema
    const schema =
      "felt252 emp_Name, u256 emp_ID, felt252 emp_Teams, u256 emp_BG";
    const resolver = "0x0000000000000000000000000000000000000000";
    const revocable = true;
    const registrationResult = await sas.createSchema(
      schema,
      resolver,
      revocable
    );
    console.log("Schema registered:", registrationResult);

    // Fetch a schema by UID
    const schemaDataDetails = await sas.getSchema(
      "0x1956053be88994deebeed5da9405e422a94451e6bc5fb9ff8612b4fa49aece7c"
    );
    console.log("Fetched Schema:", schemaDataDetails);

    // Fetch all UIDs
    const allUIDs = await sas.getAllUIDs();
    console.log("All UIDs:", allUIDs);

    // // Fetch all schema records
    const allSchemas = await sas.getAllSchemas();
    console.log("All Schema Records:", allSchemas);

    // //Attestation
    const recipient =
      "0x0124f678b5b285a9c88b7283dcd19bf9e2a5f7d89afe0a7cd7ed5da3f3257212";
    const expirationTime = 1764996235;
    const refUID = 0;
    const schemaData =
      "felt252 name Jk, u256 stu_ID 92890, felt252 stu_Branch cse";
    const value = 0;
    const schemaUID =
      "11459806186010237500709665973256292445001913853242301599963133753892321283708";

    const attestationResult = await sas.registerAttestation(
      recipient,
      expirationTime,
      revocable,
      refUID,
      schemaData,
      value,
      schemaUID
    );
    console.log("Attestation Transaction Hash: ", attestationResult);

    // Revocation
    const attestationUID =
      "0xaec37c669883d8a6d8db9f9403b707680c1f89fd5167331f0c2651ad14ce82bd";
    // const schemaUIDs =
    //   "0x1956053be88994deebeed5da9405e422a94451e6bc5fb9ff8612b4fa49aece7c";
    // const revocationResult = await sas.revokeAttestation(
    //   attestationUID,
    //   schemaUIDs,
    //   value
    // );
    // console.log(
    //   "Attestation revoked successfully! Transaction Hash:",
    //   revocationResult
    // );

    // get all attestations
    const getAllAttestations = await sas.getAllAttestations();
    console.log("All Attestations:", getAllAttestations);

    // get attestation
    const getAttestation = await sas.getAttestation(attestationUID);
    console.log("Attestation Details :", getAttestation);

    // is Attestation Valid
    const isAttestationValid = await sas.isAttestationValid(attestationUID);
    console.log("Is Attestation Valid :", isAttestationValid);

    const getSchemaRegistry = await sas.getSchemaRegistry();
    console.log("Schema Registry:", getSchemaRegistry);

    const getNoOfAttestation = await sas.getNoOfAttestation(schemaUID);
    console.log("No Of Attestation:", getNoOfAttestation);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
