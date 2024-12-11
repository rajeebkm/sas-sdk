const ACCOUNT_ADDRESS =
  "0x025b9Fb323cdd502DA6B0aeAd7fb4AA58392E79737963E1B4d65FD677aa7E469";
const SR_CONTRACT_ADDRESS =
  "0x044c3161d3f2f03d171646142a3f26c81ba483351e617a1c2ef34e4dfdf937bf";
const SR_ABI = [
  {
    type: "impl",
    name: "SchemaRegistryImpl",
    interface_name: "attestme::schema_registry::ISchemaRegistry",
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "attestme::schema_registry::SchemaRecord",
    members: [
      {
        name: "uid",
        type: "core::integer::u256",
      },
      {
        name: "resolver",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "revocable",
        type: "core::bool",
      },
    ],
  },
  {
    type: "interface",
    name: "attestme::schema_registry::ISchemaRegistry",
    items: [
      {
        type: "function",
        name: "register",
        inputs: [
          {
            name: "schema",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "resolver",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "revocable",
            type: "core::bool",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_schema",
        inputs: [
          {
            name: "uid",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "(attestme::schema_registry::SchemaRecord, core::byte_array::ByteArray)",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_all_uids",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<core::integer::u256>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_all_schemas_records",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<attestme::schema_registry::SchemaRecord>",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [],
  },
  {
    type: "event",
    name: "attestme::schema_registry::SchemaRegistry::Registered",
    kind: "struct",
    members: [
      {
        name: "timestamp",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "uid",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "registerer",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "schemaRecord",
        type: "attestme::schema_registry::SchemaRecord",
        kind: "data",
      },
      {
        name: "schema",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "attestme::schema_registry::SchemaRegistry::Event",
    kind: "enum",
    variants: [
      {
        name: "Registered",
        type: "attestme::schema_registry::SchemaRegistry::Registered",
        kind: "nested",
      },
    ],
  },
];
const SA_CONTRACT_ADDRESS =
  "0x4dc69fbd4e3e5d22f0c8146add6f1804f7c16cf85aa3473117ee587c9e7853e";
const SA_ABI = [
  {
    type: "impl",
    name: "SASImpl",
    interface_name: "attestme::SAS::ISAS",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "struct",
    name: "attestme::SAS::AttestationRequestData",
    members: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "expirationTime",
        type: "core::integer::u64",
      },
      {
        name: "revocable",
        type: "core::bool",
      },
      {
        name: "refUID",
        type: "core::integer::u256",
      },
      {
        name: "data",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "value",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "attestme::SAS::AttestationRequest",
    members: [
      {
        name: "schema",
        type: "core::integer::u256",
      },
      {
        name: "data",
        type: "attestme::SAS::AttestationRequestData",
      },
    ],
  },
  {
    type: "struct",
    name: "attestme::SAS::RevocationRequestData",
    members: [
      {
        name: "uid",
        type: "core::integer::u256",
      },
      {
        name: "value",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "attestme::SAS::RevocationRequest",
    members: [
      {
        name: "schema",
        type: "core::integer::u256",
      },
      {
        name: "data",
        type: "attestme::SAS::RevocationRequestData",
      },
    ],
  },
  {
    type: "struct",
    name: "attestme::SAS::Attestation",
    members: [
      {
        name: "uid",
        type: "core::integer::u256",
      },
      {
        name: "schema",
        type: "core::integer::u256",
      },
      {
        name: "time",
        type: "core::integer::u64",
      },
      {
        name: "expirationTime",
        type: "core::integer::u64",
      },
      {
        name: "revocationTime",
        type: "core::integer::u64",
      },
      {
        name: "refUID",
        type: "core::integer::u256",
      },
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "attester",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "data",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "revocable",
        type: "core::bool",
      },
      {
        name: "isRevoked",
        type: "core::bool",
      },
    ],
  },
  {
    type: "interface",
    name: "attestme::SAS::ISAS",
    items: [
      {
        type: "function",
        name: "attest",
        inputs: [
          {
            name: "request",
            type: "attestme::SAS::AttestationRequest",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "revoke",
        inputs: [
          {
            name: "request",
            type: "attestme::SAS::RevocationRequest",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "getSchemaRegistry",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "timestamp",
        inputs: [
          {
            name: "data",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "getAttestation",
        inputs: [
          {
            name: "uid",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "attestme::SAS::Attestation",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "getAllAttestations",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<attestme::SAS::Attestation>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "isAttestationValid",
        inputs: [
          {
            name: "uid",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "getTimestamp",
        inputs: [
          {
            name: "data",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "getNoOfAttestation",
        inputs: [
          {
            name: "schemaUID",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "registry",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "attestme::SAS::SAS::Attested",
    kind: "struct",
    members: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "attester",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "uid",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "schemaUID",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "attestme::SAS::SAS::Revoked",
    kind: "struct",
    members: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "revoker",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "uid",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "schemaUID",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "attestme::SAS::SAS::Timestamped",
    kind: "struct",
    members: [
      {
        name: "timestamp",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "data",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "attestme::SAS::SAS::RevokedOffchain",
    kind: "struct",
    members: [
      {
        name: "revoker",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "data",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "attestme::SAS::SAS::Event",
    kind: "enum",
    variants: [
      {
        name: "Attested",
        type: "attestme::SAS::SAS::Attested",
        kind: "nested",
      },
      {
        name: "Revoked",
        type: "attestme::SAS::SAS::Revoked",
        kind: "nested",
      },
      {
        name: "Timestamped",
        type: "attestme::SAS::SAS::Timestamped",
        kind: "nested",
      },
      {
        name: "RevokedOffchain",
        type: "attestme::SAS::SAS::RevokedOffchain",
        kind: "nested",
      },
    ],
  },
];

module.exports = {
  ACCOUNT_ADDRESS,
  SR_CONTRACT_ADDRESS,
  SR_ABI,
  SA_CONTRACT_ADDRESS,
  SA_ABI,
};
