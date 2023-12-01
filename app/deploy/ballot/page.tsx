"use client"

import { BallotDaoDeployer } from "@/components/main/deploy/ballot-dao/ballot-dao-deployer";
import { BallotDaoForm } from "@/components/main/deploy/ballot-dao/ballot-dao-form";
import { DeploymentInfoItem, DeploymentInformation } from "@/components/main/deploy/deployment-information";
import { PageHeader, PageHeaderItem } from "@/components/main/shared/page-header";
import { useEffect, useState } from "react";

const item: PageHeaderItem = {
    name: "Ballot",
    source: "https://github.com/icolomina/ballot-contract",
    publisher: "icolomina",
    description: `
    The smart contract provides functions for configuring voting start and end timestamps, allowing users to vote for candidates, delegate votes, and counts votes, while enforcing rules to maintain the integrity of the voting process.
    For more information: https://github.com/icolomina/ballot-contract/tree/main
    `,
}
export default function BallotPage() {
    const [numberOfTransactions, setNumberOfTransactions] = useState<number>(0);
    const [info, setInfo] = useState<DeploymentInfoItem[]>([]);

    const [wasmDeploy, setWasmDeploy] = useState<boolean>(false);
    const [admin, setAdmin] = useState<string>("");
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);

    useEffect(() => {
        let numberOfTransactions = 1;
        if (wasmDeploy) {
            numberOfTransactions++;
        }
        if (admin && startTime && endTime) {
            numberOfTransactions++;
        }
        setNumberOfTransactions(numberOfTransactions);
    }, [wasmDeploy, admin, startTime, endTime])

    return (
        <div className="container mx-auto">
            <PageHeader item={item} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <BallotDaoForm
                        setWASMDeploy={setWasmDeploy} 
                        setAdmin={setAdmin}
                        setStartTime={setStartTime}
                        setEndTime={setEndTime} />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <DeploymentInformation
                        numberOfTransaction={numberOfTransactions}
                        information={info}
                        btn={<BallotDaoDeployer
                            setInfo={setInfo}
                            deployWasm={wasmDeploy}
                            admin={admin}
                            startTime={startTime}
                            endTime={endTime} />} />
                </div>
            </div>
        </div>
    );
}