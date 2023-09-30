"use client"

import { DeployerInformation } from "@/components/main/deploy/deployer-information";
import { DeploymentInfoItem, DeploymentInformation } from "@/components/main/deploy/deployment-information";
import { TokenDeployer } from "@/components/main/deploy/token-deployer";
import { TokenForm } from "@/components/main/deploy/token-form";
import { PageHeader, PageHeaderItem } from "@/components/main/shared/page-header";
import { useState, useEffect } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { TokenWrapForm } from "@/components/main/deploy/token-wrap-form";

const item: PageHeaderItem = {
    name: "Soroban Smart Contract Token",
    version: "0.0.1",
    publisher: "Stellar Development Foundation",
    source: "https://github.com/stellar/soroban-examples/tree/main/token",
    description: "Token contract that implements the Stellar token interface.",
}

export default function DeployTokenPage() {
    const [numberOfTransactions, setNumberOfTransactions] = useState<number>(0);
    const [info, setInfo] = useState<DeploymentInfoItem[]>([]);

    const [wasmDeploy, setWasmDeploy] = useState<boolean>(false);
    const [tokenName, setTokenName] = useState<string>("");
    const [tokenSymbol, setTokenSymbol] = useState<string>("");
    const [tokenDecimal, setTokenDecimal] = useState<number>(0);

    const [issuer, setIssuer] = useState<string>("");

    useEffect(() => {
        let numberOfTransactions = 1;
        if (wasmDeploy) {
            numberOfTransactions++;
        }
        if (tokenName && tokenSymbol && tokenDecimal) {
            numberOfTransactions++;
        }
        setNumberOfTransactions(numberOfTransactions);
    }, [wasmDeploy, tokenName, tokenSymbol, tokenDecimal, issuer])

    const onTabChange = (value: string) => {
        if (value === "contract") {
            // Clear the wrap form
            setTokenSymbol("");
            setIssuer("");
            setNumberOfTransactions(1);
        } else if (value === "wrap") {
            // Clear the contract form
            setWasmDeploy(false);
            setTokenName("");
            setTokenSymbol("");
            setTokenDecimal(0);
            setNumberOfTransactions(3);
        }
    }

    return (
        <div className="container mx-auto">
            <PageHeader item={item} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <Tabs defaultValue="contract" onValueChange={onTabChange}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="contract">Smart Contract</TabsTrigger>
                            <TabsTrigger value="wrap">Wrap Contract</TabsTrigger>
                        </TabsList>
                        <TabsContent value="contract">
                            <TokenForm
                                setWASMDeploy={setWasmDeploy}
                                setTokenName={setTokenName}
                                setTokenSymbol={setTokenSymbol}
                                setTokenDecimal={setTokenDecimal} />
                        </TabsContent>
                        <TabsContent value="wrap">
                            <TokenWrapForm
                                setTokenSymbol={setTokenSymbol}
                                setIssuer={setIssuer} />
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <DeploymentInformation
                        numberOfTransaction={numberOfTransactions}
                        information={info}
                        btn={<TokenDeployer
                            setInfo={setInfo}
                            deployWasm={wasmDeploy}
                            name={tokenName}
                            symbol={tokenSymbol}
                            decimal={tokenDecimal}
                            issuer={issuer} />} />
                </div>
            </div>
        </div>
    );
}