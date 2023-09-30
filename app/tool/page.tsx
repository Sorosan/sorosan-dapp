"use client";

import { ActionCardItem, ActionCard } from "@/components/main/shared/action-card";

const items: ActionCardItem[] = [
    {
        icon: "tabler:send",
        title: "Contract ABI",
        href: "/tool/invoke",
        description: "GUI for calling methods in a contract"
    },
    {
        icon: "game-icons:token",
        title: "Token Explorer",
        href: "/tool/token-explorer",
        description: "Get info and interact with a token contract"
    },
    {
        icon: "ph:scroll-bold",
        title: "Contract Converter",
        href: "/tool/contract-id",
        description: "Convert a contract id to hash and vice versa"
    },
    {
        icon: "jam:coin",
        title: "Soroban Token",
        href: "/tool/asset-to-contract",
        description: "Convert a Stellar asset to its Soroban contract"
    },
    {
        icon: "ph:wrench-bold",
        title: "Contract to Asset",
        href: "/tool/contract-to-asset",
        description: "Check if a contract is a valid Stellar Asset"
    },
    {
        icon: "lucide:bot",
        title: "Stellar Friend Bot",
        href: "/tool/friend-bot",
        description: "UI version of friend bot"
    },
    {
        icon: "eva:swap-outline",
        title: "Unit converter",
        href: "/tool/convert",
        description: "Simply unit conversion tool"
    },
];
export default function ToolPage() {
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
