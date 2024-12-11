# SAS-SDK

SAS-SDK (Starknet Attestation System SDK) is a JavaScript/TypeScript library for interacting with Starknet-based smart contracts. This SDK provides functions to manage schemas, create attestations, and validate attestations efficiently.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Schema Management**: Create and fetch schemas.
- **Attestation**: Register and validate attestations on Starknet.
- **Simplified Integration**: Easily connect and interact with Starknet smart contracts.

---

## Installation

Install the SDK using npm or yarn:

```bash
npm install sas-sdk
```

or

```bash
yarn add sas-sdk
```

---

## Setup

1. Clone the repository for the example or start a new project.

```bash
git clone https://github.com/rajeebkm/sas-sdk
cd sas-sdk
```

2. Install dependencies:

```bash
npm install
```

<!-- 3. Set up your `.env` file with the required environment variables (see [Environment Variables](#environment-variables)). -->

---

## Usage

Here’s an example of how to use the SAS-SDK in your project:

### Example: `example/usage.js`

```javascript
require("dotenv").config();
const { SAS } = require("sas-sdk");

(async () => {
  try {
    const sas = new SAS({
      network: "testnet",
      srContractAddress: process.env.SR_CONTRACT_ADDRESS,
      saContractAddress: process.env.SA_CONTRACT_ADDRESS,
      privateKey: process.env.PRIVATE_KEY,
      accountAddress: process.env.ACCOUNT_ADDRESS,
    });

    // Create a schema
    const schema = await sas.createSchema("schema_hash_example");
    console.log("Schema created:", schema);

    // Fetch all schemas
    const schemas = await sas.getSchemas();
    console.log("Schemas:", schemas);

    // Register an attestation
    const attestation = await sas.attest("schema_id_example", "claim_hash_example");
    console.log("Attestation registered:", attestation);

    // Validate an attestation
    const validation = await sas.validate("schema_id_example", "claim_hash_example");
    console.log("Validation result:", validation);
  } catch (error) {
    console.error("Error:", error);
  }
})();
```

Run the example script:

```bash
node example/usage.js
```

<!-- --- -->
<!-- 
## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PRIVATE_KEY=<Your Starknet private key>
ACCOUNT_ADDRESS=<Your Starknet account address>
SR_CONTRACT_ADDRESS=<Schema Registry contract address>
SA_CONTRACT_ADDRESS=<Schema Attestation contract address>
``` -->

---

## API Documentation

### `SAS` Class

#### Constructor

```javascript
new SAS({ network, srContractAddress, saContractAddress, privateKey, accountAddress });
```

- `network` (string): Network to use (e.g., `mainnet`, `testnet`).
- `srContractAddress` (string): Schema Registry contract address.
- `saContractAddress` (string): Schema Attestation contract address.
- `privateKey` (string): Private key for the account.
- `accountAddress` (string): Starknet account address.

#### Methods

1. **`createSchema(schemaHash)`**
   - Creates a schema.
   - **Parameters**:
     - `schemaHash` (string): The hash of the schema to be created.
   - **Returns**: Schema details.

2. **`getSchemas()`**
   - Fetches all schemas.
   - **Returns**: Array of schema details.

3. **`attest(schemaId, claimHash)`**
   - Registers an attestation.
   - **Parameters**:
     - `schemaId` (string): ID of the schema.
     - `claimHash` (string): Hash of the claim to be attested.
   - **Returns**: Attestation details.

4. **`validate(schemaId, claimHash)`**
   - Validates an attestation.
   - **Parameters**:
     - `schemaId` (string): ID of the schema.
     - `claimHash` (string): Hash of the claim to validate.
   - **Returns**: Validation result (boolean).

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. Ensure you adhere to the coding standards and add tests for any new functionality.

---

## License

<!-- This project is licensed under the MIT License. See the `LICENSE` file for details. -->

