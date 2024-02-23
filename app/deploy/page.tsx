"use client";

import { ActionCard, ActionCardItem } from "@/components/main/shared/action-card";

const items: ActionCardItem[] = [
    {
        icon: "ri:token-swap-line",
        title: "Soroban Token",
        href: "/deploy/token",
        description: "Deploy a Soroban token, featuring functionalities such as minting tokens, setting administrators, approving allowances, transferring tokens, burning tokens, and providing metadata like name, symbol, and decimals, ensuring non-negative token amounts and proper authorization for token operations."
    },
    {
        icon: "ph:sparkle-bold",
        title: "Timelock Contract",
        href: "/deploy/timelock",
        description: "Timelock implementation allowing depositing a specified amount of tokens into a claimable balance, permitting designated accounts to claim it either before or after a provided time point, featuring functionalities for depositing tokens, checking and enforcing time bounds, authorizing claimants, and facilitating token transfers upon successful claims."
    },
    {
        icon: "ri:nft-line",
        title: "NFT Contract (BETA)",
        href: "/deploy/nft",
        description: "This smart contract implements a Non-Fungible Token (NFT) standard, allowing for the creation, management, and transfer of unique tokens. It includes functions for initializing the contract with an admin address, setting metadata such as name and symbol, minting new tokens, querying token information, and transferring tokens between addresses."
    },
    {
        icon: "lucide:vote",
        title: "DAO Ballot",
        href: "/deploy/ballot",
        description: "This smart contract implements a decentralized voting system with options for direct voting or vote delegation, ensuring voters can't vote multiple times, tracking votes for each candidate, and providing functionality for configuring the ballot."
    },
    {
        icon: "ion:rocket-outline",
        title: "Deployer",
        href: "/deploy/deployer",
        description: "This smart contract enables the secure deployment and initialization of other contracts on the Soroban network, requiring authorization from the deployer and returning the contract ID and initialization result."
    },
    {
        icon: "ion:dice-outline",
        title: "Dice",
        href: "/deploy/dice",
        description: "This smart contract implements a simple dice rolling game usingn Soroban's PRNG where users can roll a six-sided die, returning a random number between 1 and 6."
    },
    {
        icon: "fluent:database-24-regular",
        title: "Liquidity Pool (Coming Soon)",
        href: "#",
        description: "This smart contract implements a liquidity pool for an Automated Market Maker (AMM) with a constant product formula, featuring swap functionality between two tokens with a 0.3% fee and the ability to deposit and withdraw liquidity, minting and burning pool share tokens accordingly."
    },
    {
        icon: "codicon:account",
        title: "Simple Account (Coming Soon)",
        href: "#",
        description: "This minimal account contract allows ownership by a single ed25519 public key, handling authentication via a signature check on transactions, ensuring secure access to the contract's functionalities."
    },
    {
        icon: "ph:scroll-bold",
        title: "Custom",
        href: "/deploy/custom",
        description: "Built a Soroban smart, deploy and initialise it here"
    },
    {
        icon: "tabler:send",
        title: "Got a contract?",
        href: "/",
        description: "Many more contract in the future. If you want to share and audit a contract, create a Github issue"
    },

];
export default function DeployPage() {
    return (
        <main className="container mx-auto md:px-32 min-h-screen">
            <div className="grid grid-cols-12 gap-4">
                {items.map((item, index) => {
                    return (
                        <div key={index} className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 flex flex-col">
                            <ActionCard key={index} item={item} />
                        </div>
                    )
                })}
            </div>
        </main>
    )
}
