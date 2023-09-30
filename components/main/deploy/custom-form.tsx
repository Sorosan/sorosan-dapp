import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { ArgItem } from "./custom-deployer";
import { InlineIcon } from "@iconify/react";
import { FormSubInfo } from "./shared/form-subinfo";

export interface CustomFormProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setFile: Function;
    setInitialiseMethod: Function;
    setInitialiseArgs: Function;

}

export const CustomForm = ({
    setFile,
    setInitialiseMethod,
    setInitialiseArgs
}: CustomFormProps) => {
    const [args, setArgs] = useState<ArgItem[]>([]);
    const [wasmExports, setWasmExports] = useState<any[]>([]);
    const [file, setWasmFile] = useState<File>();

    useEffect(() => {
        (async () => {
            if (!file) return;

            const bytes = await file.arrayBuffer();
            const results = await WebAssembly.compile(bytes);
            const wasmExports = WebAssembly.Module.exports(results);
            const funcs = wasmExports.filter((desc) => desc.kind === "function");
            setWasmExports(funcs);
        })();
    }, [file]);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setWasmFile(e.target.files[0]);
            setFile(e.target.files[0]);
        }
    };

    const scValTypes: string[] = [
        "scvBool",
        // "scvVoid",
        // "scvError",
        "scvU32",
        "scvI32",
        "scvU64",
        "scvI64",
        "scvTimepoint",
        "scvDuration",
        "scvU128",
        "scvI128",
        "scvU256",
        "scvI256",
        "scvBytes",
        "scvString",
        "scvSymbol",
        // "scvVec",
        // "scvMap",
        "scvAddress",
        // "scvContractInstance",
        // "scvLedgerKeyContractInstance",
        // "scvLedgerKeyNonce"
    ];

    const addArg = () => {
        setArgs([...args, { type: "scvString", value: "" }]);
    }

    return (
        <Card className="p-4 px-8 bg-light rounded-3xl border-0">
            <CardHeader>
                <CardTitle>Contract Parameter</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormSubInfo title="Web Assembly File">
                        <div>
                            Upload a .wasm file and deploy it to the Soroban.
                            This will require two transaction signing. One for
                            deploying the wasm file and another for deploying the
                            contract.
                        </div>
                    </FormSubInfo>
                    <Input
                        type="file"
                        accept="application/wasm"
                        onChange={handleFileChange}
                    />

                    <FormSubInfo title="Initialise">
                        <div>
                            Add the required parameters to initialise the contract.
                            This will require an additional transaction signing.
                        </div>
                    </FormSubInfo>
                    {(file && wasmExports.length > 0)
                        ?
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Select onValueChange={(e) => setInitialiseMethod(e)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Methods</SelectLabel>
                                            <ScrollArea className="h-[200px] rounded-md">
                                                {wasmExports.map((desc, index) => {
                                                    return <SelectItem key={index} value={desc.name}>{desc.name}</SelectItem>
                                                })}
                                            </ScrollArea>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Button onClick={addArg}>Add new param</Button>
                                {args.map((arg, index) => {
                                    return (
                                        <div key={index} className="grid grid-cols-12 gap-2">
                                            <div className="col-span-7">
                                                <Input
                                                    onChange={(e) => {
                                                        const newArgs = [...args];
                                                        newArgs[index].value = e.target.value;
                                                        setArgs(newArgs);
                                                        setInitialiseArgs(newArgs);
                                                    }}></Input>
                                            </div>
                                            <div className="col-span-4">
                                                <Select
                                                    defaultValue={arg.type}
                                                    onValueChange={(e) => {
                                                        const newArgs = [...args];
                                                        newArgs[index].type = e;
                                                        setArgs(newArgs);
                                                        setInitialiseArgs(newArgs);
                                                    }}>
                                                    <SelectTrigger className="">
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Methods</SelectLabel>
                                                            <ScrollArea className="h-[200px] rounded-md">
                                                                {scValTypes.map((scValType, index) => {
                                                                    return <SelectItem key={index} value={scValType}>{scValType}</SelectItem>
                                                                })}
                                                            </ScrollArea>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="col-span-1">
                                                <Button className="font-bold"
                                                    onClick={() => {
                                                        const newArgs = [...args];
                                                        newArgs.splice(index, 1);
                                                        setArgs(newArgs);
                                                        setInitialiseArgs(newArgs);
                                                    }}>
                                                    <InlineIcon icon="ph:trash-bold" />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        : <>
                            Can&quot;t find wasm module, you can deploy contract,
                            but will need to initialise it manually
                        </>}
                </div>
            </CardContent>
        </Card>
    )
}