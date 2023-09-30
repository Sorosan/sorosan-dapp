
import { SOROSAN_DOC_URL, SOROSAN_SAMPLE_URL, SOROSAN_SDK_REACT_URL } from "@/lib/constants"
import { Feature, Features } from "../shared/features"
import { Title } from "@/components/main/shared/title"
import { cn } from "@/lib/utils"


export interface SDKFeaturesProps
    extends React.HTMLAttributes<HTMLDivElement> {
}

export const SDKFeatures = ({ className }: SDKFeaturesProps) => {
    return (
        <div className={cn("mx-auto py-16", className)}>
            <Title>Web3 made easy</Title>
            <div className="grid grid-cols-12 gap-8">
                {features.map((feature, index) => {
                    return (
                        <div key={index} className="col-span-12 md:col-span-4">
                            <Features key={index} feature={feature} className="p-4 bg-transparent dark:bg-transparent b-0 shadow-none" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const features: Feature[] = [
    {
        title: `Documentation`,
        icon: "majesticons:book-line",
        description: `Your go-to resource for integrating our Soroban and Stellar
         into your applications. Access all available methods and instructions 
         for a seamless development experience.`,
        link: SOROSAN_DOC_URL
    },
    {
        title: `React`,
        icon: "mdi:react",
        description: `Available as a React Component for easy integration into your
         React application. Simply import the SorosanProvider and useSorosanSDK()`,
        link: SOROSAN_SDK_REACT_URL
    },
    {
        title: `Tutorial`,
        icon: "mdi:cube-outline",
        description: `View the sample create-sorosan-app to see how to integrate
         Sorosan into your application.`,
        link: SOROSAN_SAMPLE_URL
    }
]