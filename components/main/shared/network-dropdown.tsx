"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup, 
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { networkType, useSorosanNetwork } from "@/components/main/network/network-provider";

export function NetworkDropdown() {
    const [selectedNetwork, setSelectedNetwork] = useState<string>("futurenet");
    const network = useSorosanNetwork();

    const changeSelectedNetwork = (changedNetwork: string) => {
        const net: networkType = changedNetwork as networkType;
        setSelectedNetwork(net.toString());
        console.log("Change Network to", net);
        network.changeSelectedNetwork(net);
        window.localStorage.setItem("sorosan-network", net.toString());
        // console.log("network", network.selectedNetwork);
    }

    useEffect(() => {
        const net: any = window.localStorage.getItem("sorosan-network") || "futurenet";
        changeSelectedNetwork(net);
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="capitalize">{selectedNetwork}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Network Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedNetwork} onValueChange={changeSelectedNetwork}>
                    <DropdownMenuRadioItem value="mainnet" disabled={true}>Mainnet (Coming in 2024)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="futurenet">Futurenet</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="testnet">Testnet</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}