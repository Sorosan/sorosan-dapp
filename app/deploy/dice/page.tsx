"use client"

import { DeploymentInfoItem, DeploymentInformation } from "@/components/main/deploy/deployment-information";
import { DiceDeployer } from "@/components/main/deploy/dice/dice-deployer";
import { DiceForm } from "@/components/main/deploy/dice/dice-form";
import { NFTDeployer } from "@/components/main/deploy/nft-deployer";
import { NFTForm } from "@/components/main/deploy/nft-form";
import { PageHeader, PageHeaderItem } from "@/components/main/shared/page-header";
import { useEffect, useState } from "react";

const item: PageHeaderItem = {
    name: "Dice",
    source: "https://github.com/Sorosan/soroban-contracts/dice",
    publisher: "Sorosan",
    description: "Simple 6 face dice that returns a random number between 1 and 6 using the random number generator on Soroban.",
}
export default function DicePage() {
    const [numberOfTransactions, setNumberOfTransactions] = useState<number>(0);
    const [info, setInfo] = useState<DeploymentInfoItem[]>([]);

    const [wasmDeploy, setWasmDeploy] = useState<boolean>(false);
    const [tokenName, setTokenName] = useState<string>("");
    const [tokenSymbol, setTokenSymbol] = useState<string>("");

    useEffect(() => {
        let numberOfTransactions = 1;
        if (wasmDeploy) {
            numberOfTransactions++;
        }
        if (tokenName && tokenSymbol) {
            numberOfTransactions++;
        }
        setNumberOfTransactions(numberOfTransactions);
    }, [wasmDeploy, tokenName, tokenSymbol])

    return (
        <div className="container mx-auto">
            <PageHeader item={item} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <DiceForm setWASMDeploy={setWasmDeploy} />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <DeploymentInformation
                        numberOfTransaction={numberOfTransactions}
                        information={info}
                        btn={<DiceDeployer
                            setInfo={setInfo}
                            deployWasm={wasmDeploy} />} />
                </div>
            </div>
        </div>
    );
}