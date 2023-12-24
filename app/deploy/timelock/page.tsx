"use client"

import { useSorosanSDK } from "@sorosan-sdk/react";
import { useEffect, useState } from "react";
import { PageHeaderItem, PageHeader } from "@/components/main/shared/page-header";
import { DeploymentInfoItem, DeploymentInformation } from "@/components/main/deploy/deployment-information";
import { TokenDeployer } from "@/components/main/deploy/token-deployer";
import { TimelockDeployer } from "@/components/main/deploy/timelock-deployer";
import { TimelockForm } from "@/components/main/deploy/timelock-form";
import { time } from "console";

const item: PageHeaderItem = {
    name: "Soroban Timelock",
    version: "0.0.1",
    publisher: "Stellar Development Foundation",
    source: "https://github.com/stellar/soroban-examples/tree/main/timelock",
    description: "Timelock smart contract that implements and simplifies the claimable balance similar to the claimable balance feature available on Stellar.",
}

export default function TimelockPage() {
    const [numberOfTransactions, setNumberOfTransactions] = useState<number>(0);
    const [info, setInfo] = useState<DeploymentInfoItem[]>([]);

    const [wasmDeploy, setWasmDeploy] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    const [claimants, setClaimants] = useState<string[]>([]);
    const [timeBoundKind, setTimeBoundKind] = useState<0 | 1>(1);
    const [timeBoundTimestamp, setTimeBoundTimestamp] = useState<number>(0);

    useEffect(() => {
        let numberOfTransactions = 1;
        if (wasmDeploy) {
            numberOfTransactions++;
        }

        if (token && amount) {
            numberOfTransactions++;
        }

        if (claimants.length > 0 && timeBoundTimestamp > 0) {
            numberOfTransactions++;
        }
        setNumberOfTransactions(numberOfTransactions);
    }, [wasmDeploy, token, amount, claimants, timeBoundTimestamp])

    return (
        <div className="container mx-auto">
            <PageHeader item={item} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <TimelockForm
                        setWASMDeploy={setWasmDeploy}
                        setToken={setToken}
                        setAmount={setAmount}
                        setClaimants={setClaimants}
                        setTimeBoundKind={setTimeBoundKind}
                        setTimeBoundTimestamp={setTimeBoundTimestamp} />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <DeploymentInformation
                        numberOfTransaction={numberOfTransactions}
                        information={info}
                        btn={<TimelockDeployer
                            setInfo={setInfo}
                            deployWasm={wasmDeploy}
                            token={token.trim()}
                            amount={amount}
                            claimants={claimants} 
                            timeBoundKind={timeBoundKind}
                            timeBoundTimestamp={timeBoundTimestamp} />} />
                </div>
            </div>
        </div>
    );
}