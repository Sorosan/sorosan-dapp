import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { WASMCheckBox } from "./shared/wasm-checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { InlineIcon } from "@iconify/react";
import { FormSubInfo } from "@/components/main/deploy/shared/form-subinfo";

export interface TimelockFormProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setWASMDeploy: Function;
    setToken: Function;
    setAmount: Function;
    setClaimants: Function;
    setTimeBoundKind: Function;
    setTimeBoundTimestamp: Function;
}

export const TimelockForm = ({
    setWASMDeploy,
    setToken,
    setAmount,
    setClaimants,
    setTimeBoundKind,
    setTimeBoundTimestamp
}: TimelockFormProps) => {
    const { toast } = useToast();

    const [claimants, setClaimantsLocal] = useState<string[]>([]);

    const removeClaimant = (i: number) => {
        const rows = [...claimants];
        rows.splice(i, 1);
        setClaimantsLocal(rows);
        setClaimants(rows);
    }

    const handleChange = (i: number, e: any) => {
        const { name, value } = e.target;
        const list = [...claimants];
        list[i] = value;
        setClaimantsLocal(list);
        setClaimants(list);
    }

    const addClaimant = () => {
        if (claimants.length >= 10) {
            toast({ title: "Error", description: "Maximum 10 claimants" });
            return;
        };
        setClaimantsLocal([...claimants, ""])
        setClaimants([...claimants, ""])
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contract Parameters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <FormSubInfo title="Deploy WASM File">
                            <div>
                                This is optional. Checking this will deploy the token
                                WASM file to the Soroban and require an additional
                                transaction signing. If not, then it&#39;ll use the latest
                                Token WASM file deployed on the network.
                            </div>
                        </FormSubInfo>
                        <WASMCheckBox className="my-4" placeholder="Token Name"
                            setDeployWasm={setWASMDeploy}
                        />
                    </div>

                    <FormSubInfo title="Deploy Contract and Approve">
                        <div>
                            This will require you to have the token in your wallet
                            and approve it for the timelock contract. This will
                            require two transaction signing. One for deploying the
                            contract and another for approving the token.
                        </div>
                    </FormSubInfo>
                    <div className="flex flex-col space-y-1.5">
                        <h2>Token</h2>
                        <Input required={true} className="my-4" placeholder="Token Name"
                            onChange={(e) => setToken(e.target.value)} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <h2>Amount</h2>
                        <Input required={true} className="my-4" placeholder="Token Name"
                            onChange={(e) => setAmount(e.target.value)} />
                    </div>

                    <FormSubInfo title="Initialise">
                        <div>
                            This will initialise the contract with the given
                            parameters. This will require an additional transaction
                            signing.
                        </div>
                    </FormSubInfo>
                    <div className="flex flex-col space-y-1.5">
                        <h2>Timebound</h2>
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-12 md:col-span-8">
                                <Input type="number" required={true}
                                    className="my-4" placeholder="Timestamp"
                                    onChange={(e) => setTimeBoundTimestamp(parseInt(e.target.value))} />
                            </div>
                            <div className="col-span-12 md:col-span-4">
                                <Select onValueChange={(e) => setTimeBoundKind(e === "1" ? 1 : 0)}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select Kind" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Methods</SelectLabel>
                                            <SelectItem value={"1"}>Before</SelectItem>
                                            <SelectItem value={"0"}>After</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <h2>Claimiants</h2>
                            <Button onClick={addClaimant}>Add Claimant</Button>
                            {claimants.map((c, index) => {
                                return (
                                    <div key={index}>
                                        <div className="flex items-center space-x-2">
                                            <Input type="text" required={true}
                                                className="" placeholder="Claimant Address"
                                                value={c}
                                                onChange={(e) => handleChange(index, e)} />

                                            <Button onClick={() => removeClaimant(index)}>
                                                <InlineIcon icon="ph:trash-bold" />
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col">

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}