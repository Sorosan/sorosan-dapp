export const SOROSAN_DOC_URL = "https://sorosan.github.io/sorosan-doc/"
export const SOROSAN_SDK_URL = "https://www.npmjs.com/package/@sorosan-sdk/core"
export const SOROSAN_SDK_REACT_URL = "https://www.npmjs.com/package/@sorosan-sdk/react"
export const SOROSAN_SAMPLE_URL = "https://github.com/Sorosan/create-sorosan-app"

export const SOROSAN_GITHUB_URL = "https://github.com/Sorosan"

export const TOKEN_WASM_ID = (network: string): string => {
    switch (network.toLocaleLowerCase()) {
        case "testnet":
        case "futurenet":
        case "mainnet":
        default:
            return "a04a42a9dddb6259c256837063aeed66eb78145a579e128306d524b40adb4fe6";
    }
}

export const TIMELOCK_WASM_ID = (network: string): string => {
    switch (network.toLocaleLowerCase()) {
        case "testnet":
        case "futurenet":
        case "mainnet":
        default:
            return "7028b1fde2d666922453c77848ed7e15180e3660f5cfd38c729df619aceef235";
    }
}

export const NFT_WASM_ID = (network: string): string => {
    switch (network.toLocaleLowerCase()) {
        case "testnet":
        case "futurenet":
        case "mainnet":
        default:
            return "1f40bc6d202e8da19234f6cba1643017115771090aff7b280bffeb4ed38d2b83";
    }
}

export const DEPLOYER_WASM_ID = (network: string): string => {
    switch (network.toLocaleLowerCase()) {
        case "testnet":
        case "futurenet":
        case "mainnet":
        default:
            return "e9a67538ca0767f25bf033d8380ed6b56616168e861ede4d8258d473ce8231a1";
    }
}

export const DICE_WASM_ID = (network: string): string => {
    switch (network.toLocaleLowerCase()) {
        case "testnet":
        case "futurenet":
        case "mainnet":
        default:
            return "035caefd9da8009f8dfa1bef82ee3bca7c39b790cbf484614eaed3073ca60225";
    }
}

export const BALLOT_WASM_ID = (network: string): string => {
    switch (network.toLocaleLowerCase()) {
        case "testnet":
        case "futurenet":
        case "mainnet":
        default:
            return "57ccc583ce31319df9055cddf25406d81834fc423f4feea41b97d126b1d2c4fd";
    }
}

export const DISABLE_WASM_DEPLOYMENT = (network: string): boolean => {
    switch (network.toLocaleLowerCase()) {
        case "testnet":
        case "futurenet":
        case "mainnet":
        default:
            return false;
    }
}