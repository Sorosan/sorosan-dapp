"use client"

import { DeploymentInfoItem, DeploymentInformation } from "@/components/main/deploy/deployment-information";
import { NFTDeployer } from "@/components/main/deploy/nft-deployer";
import { NFTForm } from "@/components/main/deploy/nft-form";
import { PageHeader, PageHeaderItem } from "@/components/main/shared/page-header";
import { useEffect, useState } from "react";

const item: PageHeaderItem = {
    name: "Deployer",
    source: "https://github.com/stellar/soroban-examples/tree/main/deployer/deployer",
    publisher: "Stellar Development Foundation",
    description: "Cast, Delegating and count votes on chai. (Modified for Preview 11)",
}
export default function DeployerPage() {
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

            {/*
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <NFTForm
                        setWASMDeploy={setWasmDeploy}
                        setTokenName={setTokenName}
                        setTokenSymbol={setTokenSymbol} />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <DeploymentInformation
                        numberOfTransaction={numberOfTransactions}
                        information={info}
                        btn={<NFTDeployer
                            setInfo={setInfo}
                            deployWasm={wasmDeploy}
                            name={tokenName}
                            symbol={tokenSymbol} />} />
                </div>
            </div>
            */}
        </div>
    );
}