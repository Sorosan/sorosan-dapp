
import { cn } from "@/lib/utils"
import { Feature, Features } from "../shared/features"
import { Title } from "@/components/main/shared/title"

export interface FeaturesProps
    extends React.HTMLAttributes<HTMLDivElement> {
}

export const MainFeatures = ({ className }: FeaturesProps) => {
    return (
        <div className={cn("mx-auto py-16", className)}>
            <Title>Explore</Title>
            <div className="grid grid-cols-12 gap-8">
                {features.map((feature, index) => {
                    return (
                        <div key={index} className="col-span-12 md:col-span-6">
                            <Features key={index} feature={feature} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const features: Feature[] = [
    {
        icon: "rocket",
        title: `Deploy on Soroban in one click`,
        description: `UI simplifies Soroban smart contract to official open-source 
        smart contracts, enhancing developers' agility and accuracy in getting into
        the Soroban ecosystem.`,
        link: "/deploy"
    },
    {
        icon: "code",
        title: `Web3 Sorosan SDK for Soroban`,
        description: ` Utilize Sorosan to effortlessly connect to the Soroban 
        blockchain and construct your web3 projects, similar to ether.js. 
        Start building today!`,
        link: '/sdk'
    }
]