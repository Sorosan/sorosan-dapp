"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { InlineIcon } from "@iconify/react/dist/iconify.js";

export const ToggleTheme = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) {
        return null;
    }

    return (
        <Button variant="ghost"
            className={`w-fit rounded-md`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "light"
                ? <InlineIcon icon="radix-icons:moon" style={{ fontSize: "18px "}} />
                : <InlineIcon icon="radix-icons:sun" style={{ fontSize: "18px "}} />}

        </Button>
    );
};