"use client"

import { DeployerDeployer } from "@/components/main/deploy/deployer/deployer-deployer";
import { DeployerForm } from "@/components/main/deploy/deployer/deployer-form";
import { DeploymentInfoItem, DeploymentInformation } from "@/components/main/deploy/deployment-information";
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

    useEffect(() => {
        let numberOfTransactions = 1;
        if (wasmDeploy) {
            numberOfTransactions++;
        }
        setNumberOfTransactions(numberOfTransactions);
    }, [wasmDeploy])

    return (
        <div className="container mx-auto">
            <PageHeader item={item} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <DeployerForm setWASMDeploy={setWasmDeploy} />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <DeploymentInformation
                        numberOfTransaction={numberOfTransactions}
                        information={info}
                        btn={<DeployerDeployer
                            setInfo={setInfo}
                            deployWasm={wasmDeploy} />} />
                </div>
            </div>
        </div>
    );
}