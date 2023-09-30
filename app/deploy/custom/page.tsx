"use client"

import { ArgItem, CustomDeployer } from "@/components/main/deploy/custom-deployer";
import { CustomForm } from "@/components/main/deploy/custom-form";
import { DeploymentInfoItem, DeploymentInformation } from "@/components/main/deploy/deployment-information";
import { PageHeader, PageHeaderItem } from "@/components/main/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

const item: PageHeaderItem = {
    name: "Custom Deployment",
    version: "0.0.1",
    publisher: "",
    description: "Upload your .wasm file and deploy it as a smart contract.",
}

export default function CustomPage() {
    const [numberOfTransactions, setNumberOfTransactions] = useState<number>(0);
    const [info, setInfo] = useState<DeploymentInfoItem[]>([]);

    const [file, setFile] = useState<File>();
    const [initialiseMethod, setInitialiseMethod] = useState<string>("");
    const [initialiseArgs, setInitialiseArgs] = useState<ArgItem[]>([]);

    useEffect(() => {
        let numberOfTransactions = 0;
        if (file) {
            numberOfTransactions += 2;
        }
        if (initialiseMethod) {
            numberOfTransactions++;
        }
        setNumberOfTransactions(numberOfTransactions);
    }, [file, initialiseMethod])

    return (
        <div className="container mx-auto">
            <PageHeader item={item} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <CustomForm setFile={setFile}
                        setInitialiseMethod={setInitialiseMethod}
                        setInitialiseArgs={setInitialiseArgs} />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <DeploymentInformation
                        numberOfTransaction={numberOfTransactions}
                        information={info}
                        btn={<CustomDeployer
                            setInfo={setInfo}
                            wasm={file}
                            initialiseMethod={initialiseMethod}
                            initialiseArgs={initialiseArgs} />} />
                </div>
            </div>
        </div>
    );
}