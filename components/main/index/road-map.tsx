"use client"

import { useRouter } from 'next/navigation';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { cn } from '@/lib/utils';
import { Title } from '@/components/main/shared/title';
import {
    SOROSAN_DOC_URL,
    SOROSAN_SAMPLE_URL,
    SOROSAN_SDK_REACT_URL,
    SOROSAN_SDK_URL
} from '@/lib/constants';

interface RoadMapItem {
    date: string;
    items: {
        icon: string;
        title: string;
        info?: string;
        link?: string;
    }[];
}

const roadMapItems: RoadMapItem[] = [
    {
        date: "2024 Q2 +",
        items: [{
            icon: "circle-dollar-sign",
            title: "Mainnet Support",
            info: "Integrated support for the Soroban mainnet."
        }, {
            icon: "circle-dollar-sign",
            title: "Audit Smart Contracts",
            info: "Additional Audit and smart contracts for Sorosan Dapp"
        }, {
            icon: "circle-dollar-sign",
            title: "Developer Tool",
            info: "Publish the Sorosan Software Development Kit (SDK) to facilitate web3 development on Soroban."
            // link: SOROSAN_DOC_URL
        }, {
            icon: "circle-dollar-sign",
            title: "NFT gallery",
            info: "NFT gallery for Soroban NFT smart contract. View and manage NFT"
        }, {
            icon: "circle-dollar-sign",
            title: "Many more",
            info: "Additional developments and features to come in the future!"
        }]
    },
    {
        date: "2024 Q1",
        items: [{
            icon: "circle-dollar-sign",
            title: "SDK",
            // info: "Publish the Sorosan Software Development Kit (SDK) to facilitate web3 development on Soroban."
            link: SOROSAN_SDK_URL
        }, {
            icon: "circle-dollar-sign",
            title: "Testnet Support",
            info: "Integrated support for the Soroban testnet."
        },
        {
            icon: "circle-dollar-sign",
            title: "create-sorosan-app",
            // info: "Publish a example sorosan app template to help developers get started with Soroban."
            link: SOROSAN_SAMPLE_URL
        },
        {
            icon: "circle-dollar-sign",
            title: "Wallet Intergration",
            info: "Addition connect Wallet intergration for wider adoption."
        }],
    },
    {
        date: "2023 Q4",
        items: [{
            icon: "Sorosan Dapp",
            title: "Sorosan Web",
            link: "/"
        }, {
            icon: "Sorosan Dapp",
            title: "Sorosan Dapp Beta",
            link: "/deploy"
        }, {
            icon: "circle-dollar-sign",
            title: "SDK React",
            link: SOROSAN_SDK_REACT_URL
        }, {
            icon: "circle-dollar-sign",
            title: "Funding and Support",
            link: "https://communityfund.stellar.org/projects"
        }],
    }
]
interface RoadMapProp
    extends React.InputHTMLAttributes<HTMLElement> {
}

const RoadMap = ({ className }: RoadMapProp) => {
    const { push } = useRouter();

    return (
        <div>
            <Title>Roadmap</Title>
            <ol className={cn("relative border-l border-gray-200 dark:border-gray-700", className)}>
                {roadMapItems.map((road, roadIndex) => {
                    return (
                        <li key={roadIndex} className="mb-10 ml-4">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 lg:col-span-2">
                                    <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
                                    <h2 className="mb-1 text-xl font-bold leading-none pt-0.5">{road.date}</h2>
                                </div>
                                <div className="col-span-12 lg:col-span-10">
                                    <div className="grid grid-cols-12 gap-2">
                                        {road.items.map((item, itemIndex) => {
                                            return (
                                                <div key={itemIndex} className="col-span-12 lg:col-span-4 rounded-2xl px-4 py-3 border flex items-center justify-center space-x-1">
                                                    <div>
                                                        {item.title}
                                                    </div>
                                                    {item.info && <HoverCard>
                                                        <HoverCardTrigger>
                                                            <InlineIcon className="cursor-pointer" style={{ fontSize: "20px" }}
                                                                icon="material-symbols:info-outline" />
                                                        </HoverCardTrigger>
                                                        <HoverCardContent>
                                                            {item.info}
                                                        </HoverCardContent>
                                                    </HoverCard>}
                                                    {item.link &&
                                                        <InlineIcon className="cursor-pointer" style={{ fontSize: "20px" }}
                                                            icon="gridicons:external" onClick={() => push(item.link || "")} />}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
};

export default RoadMap;