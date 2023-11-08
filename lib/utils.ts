import { type ClassValue, clsx } from "clsx"
import { Contract, xdr } from "soroban-client";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a hexadecimal string to a byte array.
 *
 * @param {string} hexString - The hexadecimal string to convert.
 * @returns {Buffer} A byte array representing the input hexadecimal string.
 * @throws {string} Throws an error if the input does not have an even number of hex digits.
 */
export function hexToByte(hexString: string) {
  if (hexString.length % 2 !== 0) {
    throw "Must have an even number of hex digits to convert to bytes";
  }
  var numBytes = hexString.length / 2;
  var byteArray = Buffer.alloc(numBytes);
  for (var i = 0; i < numBytes; i++) {
    byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return byteArray;
}

export interface ExplorerContractResponse {
  id: number;
  asset_code: string | null;
  asset_issuer: string | null;
  asset_address: string | null;
  contract_id: string;
  contract_code: string;
  created_at: string;
  transactions_count: number;
  wasmParsed: string,
  create_transaction: {
    id: number;
    contract_id: number;
    source_account: string;
    host_functions: string;
    hash: string;
  }
  transactions: any[];
}

export const getContract = async (
  contractId: string,
) => {
  const response = await fetch(`${"https://api.stellarchain.io/v1"}/contracts/${contractId}`);

  let data: ExplorerContractResponse = {} as ExplorerContractResponse;
  if (!response.ok) return {} as ExplorerContractResponse;

  data = await response.json();
  return data;
}

export const scValtypes: any[] = [
  xdr.ScValType.scvBool(),
  xdr.ScValType.scvVoid(),
  xdr.ScValType.scvError(),
  xdr.ScValType.scvU32(),
  xdr.ScValType.scvI32(),
  xdr.ScValType.scvU64(),
  xdr.ScValType.scvI64(),
  xdr.ScValType.scvTimepoint(),
  xdr.ScValType.scvDuration(),
  xdr.ScValType.scvU128(),
  xdr.ScValType.scvI128(),
  xdr.ScValType.scvU256(),
  xdr.ScValType.scvI256(),
  xdr.ScValType.scvBytes(),
  xdr.ScValType.scvString(),
  xdr.ScValType.scvSymbol(),
  xdr.ScValType.scvVec(),
  xdr.ScValType.scvMap(),
  xdr.ScValType.scvAddress(),
  xdr.ScValType.scvContractInstance(),
  xdr.ScValType.scvLedgerKeyContractInstance(),
  xdr.ScValType.scvLedgerKeyNonce(),
  { value: 1006, name: "scvBytes" }
];

export const getContractHashExpirationKey = (contractAddress: string) => {
  let contract = new Contract(contractAddress);
  let footprint = contract.getFootprint();
  let keyHash = footprint[0].toXDR();
  console.log(keyHash);
  const expirationKey = xdr.LedgerKey.expiration(
      new xdr.LedgerKeyExpiration({ keyHash }),
  ).toXDR("base64");

  console.log("expirationKey", expirationKey);
  return expirationKey;
}

