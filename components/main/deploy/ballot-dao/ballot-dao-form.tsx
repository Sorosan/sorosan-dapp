import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormSubInfo } from "@/components/main/deploy/shared/form-subinfo"
import { WASMCheckBox } from "@/components/main/deploy/shared/wasm-checkbox"
import { Input } from "@/components/ui/input";
import { useSorosanSDK } from "@sorosan-sdk/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export interface BallotDaoFormProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setWASMDeploy: Function;
    setAdmin: Function;
    setStartTime: Function;
    setEndTime: Function;
}

export const BallotDaoForm = ({
    setWASMDeploy,
    setAdmin,
    setStartTime,
    setEndTime
}: BallotDaoFormProps) => {
    const { sdk } = useSorosanSDK();

    const [useWallet, setUseWallet] = useState<boolean>(false);
    const [adminValue, setAdminValue] = useState<string>("");
    const [pk, setPK] = useState<string>("");

    useEffect(() => {
        (async () => {
            await sdk.connectWallet();
            if (sdk.publicKey) {
                setUseWallet(true)
                setPK(sdk.publicKey.toString())
            }
        })();
    }, [])

    const setAdminForm = (val: string) => {
        setAdmin(val);
        setAdminValue(val);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contract Parameters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <FormSubInfo title="Deploy WASM File">
                        <div>
                            This is optional. Checking this will deploy the token
                            WASM file to the Soroban and require an additional
                            transaction signing. If not, then it&#39;ll use the latest
                            Token WASM file deployed on the network.
                        </div>
                    </FormSubInfo>
                    <div className="flex flex-col space-y-1.5">
                        <WASMCheckBox className="my-4" placeholder="Token Name"
                            setDeployWasm={setWASMDeploy}
                        />
                    </div>

                    <FormSubInfo title="Configure">
                        <div>
                            Filling this section will configure the ballot
                            with the given admin, start time and end time and will require
                            an additional transaction signing.
                        </div>
                    </FormSubInfo>
                    <div className="flex flex-col space-y-1.5">
                        <h2 className="text-normal">Admin</h2>
                        <Input required={true} className="my-4" placeholder="Admin"
                            value={adminValue}
                            onChange={(e) => setAdminForm(e.target.value)}
                        />
                        <Button onClick={() => setAdminForm(pk)} disabled={useWallet ? false : true} >
                            {useWallet ? "Use wallet address" : "Connect wallet to admin wallet address"}
                        </Button>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <h2>Vote start time</h2>
                        <Input required={true} className="my-4" placeholder="Start time"
                            type="number"
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <h2>Vote end time</h2>
                        <Input required={true} className="my-4" placeholder="End Time"
                            type="number"
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// pub fn configure(env: Env, admin: Address, ts_start: u64, ts_end: u64) -> Result<bool, Error> {
//     admin.require_auth();
//     storage::store_config(&env, ts_start, ts_end);
//     Ok(true)
// }