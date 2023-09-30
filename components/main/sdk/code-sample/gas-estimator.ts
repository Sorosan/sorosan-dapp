export const code = `
// For Javascript
import { SorosanSDK } from '@sorosan-sdk/core';
const sdk = new SorosanSDK();

// For React (hook)
import { useSorosanSDK } from '@sorosan-sdk/react';
const { sdk } = useSorosanSDK();

// Main script
let estimatedGas: number = 0;

// Use sdk to convert contract type, i.e CQJ......
const contractHash = "32d6700......c71b5b5";
const contractAddress = await sdk
    .util
    .toContractAddress(contractHash);

// Use sdk to convert native TS/JS type to ScVal
const args = [
    sdk.nativeToScVal("GCZIJ6I......E274SZFILR76", "address"),
    sdk.nativeToScVal(100, "i128"),
];

// Use sdk to estimate gas
const estimatedGas = await sdk
    .estimateGas(
        contractAddress,
        "mint",
        args
    )

// Use sdk to convert unit
const gasBigNumber = sdk.toXLM(parseInt(estimatedGas));
console.log(gasBigNumber.toNumber());
`.trim();