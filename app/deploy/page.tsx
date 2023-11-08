"use client";

import { ActionCard, ActionCardItem } from "@/components/main/shared/action-card";

const items: ActionCardItem[] = [
    {
        icon: "ri:token-swap-line",
        title: "Soroban Token",
        href: "/deploy/token",
        description: "Deploy a Soroban smart Token in one click"
    },
    {
        icon: "ph:sparkle-bold",
        title: "Timelock Contract",
        href: "/deploy/timelock",
        description: "Create a timelock contract"
    },
    {
        icon: "ri:nft-line",
        title: "NFT Contract (BETA)",
        href: "/deploy/nft",
        description: "Create a collection of Unique NFTs"
    },
    {
        icon: "lucide:vote",
        title: "DAO Ballot (UPCOMING)",
        href: "/deploy/ballot",
        description: "Cast, Delegating and count votes on chain"
    },
    {
        icon: "ion:rocket-outline",
        title: "Deployer (UPCOMING)",
        href: "/deploy/deployer",
        description: "Deploy a contract factory for your project"
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
