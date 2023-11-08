"use client"

import Link from "next/link";
import { InlineIcon } from "@iconify/react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ToggleTheme } from "../ui/toggle-theme";
import { ConnectWallet } from "./shared/connect-wallet";
import { NetworkDropdown } from "./shared/network-dropdown";

interface NavItem {
    title: string;
    href: string;
}

const items: NavItem[] = [
    {
        title: 'Deploy',
        href: '/deploy',
    },
    {
        title: 'Tools',
        href: '/tool',
    },
    {
        title: 'SDK',
        href: '/sdk',
    },
    {
        title: 'Developer (Coming Soon)',
        href: '/',
    },
]

export interface NavBarProps
    extends React.HTMLAttributes<HTMLDivElement> {
}

export const NavBar = ({ }: NavBarProps) => {
    return (
        <div className="bg-nav flex gap-x-4 px-2 justify-between py-3 sticky top-0 z-50">
            <div className="w-3/12 h-10 mx-4">
                <div className="flex items-center justify-center gap-x-4">
                    <h1 className="text-4xl">三</h1>
                    <Link href="/">
                        <h2 className="text-2xl font-semibold dark:text-white">Sorosan</h2>
                    </Link>
                </div>
            </div>
            <div className="w-6/12 h-10 hidden md:block">
                <NavMenu className="flex items-center justify-center gap-x-16" />
            </div>
            <div className="w-3/12 h-10  hidden md:flex">
                <div className="flex items-center justify-center gap-x-2">
                    <ToggleTheme />
                    <ConnectWallet />
                    <NetworkDropdown />
                </div>
            </div>
            <div className="w-3/12 h-10block md:hidden">
                <Sheet>
                    <SheetTrigger asChild className="float-right">
                        <InlineIcon icon="icon-park:hamburger-button" />
                    </SheetTrigger>
                    <SheetContent>
                        <NavMenu className="my-8" />
                        <div className="flex items-center gap-x-2">
                            <ConnectWallet />
                            <ToggleTheme />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

        </div>
    )
}

const NavMenu = ({ className }: any) => {
    return (
        <ul className={className}>
            {items.map((item, index) => {
                return (
                    <li key={index} className="hover:text-primary py-2">
                        <Link href={item.href || ""} aria-current="page">
                            <h2>{item.title}</h2>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

