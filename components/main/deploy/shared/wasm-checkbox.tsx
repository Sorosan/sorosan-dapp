import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";

export interface WASMCheckBoxProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setDeployWasm: Function;
}

export const WASMCheckBox = ({
    setDeployWasm,
}: WASMCheckBoxProps) => {
    const [value, setValue] = useState<boolean>(false)
     
    const handleCheckBox = (e: any) => {
        const val = value;
        setValue(!val)
        setDeployWasm(!val)
    }
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id="wasm"
                checked={value}
                onClick={handleCheckBox} />
            <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Deploy WASM
            </label>
        </div>
    )
}
