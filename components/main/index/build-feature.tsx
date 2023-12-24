"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Image from "next/image"
import { StellarLogo } from "@/components/main/shared/stellar-logo"
import { SorobanLogo } from "../shared/soroban-logo"

export interface BuildFeatureProps
    extends React.HTMLAttributes<HTMLDivElement> {
}

const builtFor = [
    <StellarLogo key="stellar" width={256} />,
    <SorobanLogo key="soroban" width={256} />,
]

const partOf = [
    <div key="scf" className="flex items-center justify-center space-x-4">
        <Image
            priority={true}
            width={52}
            height={128}
            src="/stellar-fund.svg"
            alt="Follow us on Twitter"
        />
        <div className="text-4xl font-bold">#20</div>
    </div>,
    // <Image
    //     className="hidden"
    //     priority={true}
    //     width={128}
    //     height={64}
    //     src="/stellar-fund.svg"
    //     alt="Follow us on Twitter"
    // />,
]
export const BuildFeature = ({ className }: BuildFeatureProps) => {
    return (
        <div className={cn("grid grid-cols-12", className)}>
            <div className="col-span-12 lg:col-span-12">
                <h2 className="text-center gradient-text font-bold text-xl my-4">Built for</h2>
                <div className="grid grid-cols-12">
                    {builtFor.map((item, index) => {
                        return (
                            <div key={index} className="col-span-12 lg:col-span-6 flex items-center justify-center">
                                {item}
                            </div>)
                    })}
                </div>
            </div>
            {/* <div className="col-span-12 lg:col-span-6">
                <h2 className="text-center text-xl leading-[1.1] my-4 mb-16">Part of</h2>
                <div className="grid grid-cols-12">
                    {partOf.map((item, index) => {
                        return (
                            <div key={index} className="col-span-12 lg:col-span-6 flex items-center justify-center">
                                {item}
                            </div>)
                    })}
                </div>
            </div> */}
        </div>
    )
}