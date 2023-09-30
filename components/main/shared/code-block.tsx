import SyntaxHighlighter from "react-syntax-highlighter";
import { useTheme } from "next-themes";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { InlineIcon } from "@iconify/react"
import { ClipBoard } from "./clip-board";
import { useEffect, useState } from "react";

export interface CodeBlockProps
    extends React.HTMLAttributes<HTMLDivElement> {
    code: string;
    language?: string;
}

export const CodeBlock = ({
    code,
    language
}: CodeBlockProps) => {
    const [codeStyle, setCodeStyle] = useState({} as any)
    const { theme } = useTheme();

    useEffect(() => {
        if (theme == "dark")
            setCodeStyle(atomOneDark)
        else
            setCodeStyle(atomOneLight)
    }, [theme])

return (
    <div className="relative">
        <SyntaxHighlighter
            className="!bg-transparent"
            language={language || "javascript"} style={codeStyle}>
            {code}
        </SyntaxHighlighter>
        <ClipBoard className="absolute"
            style={{ top: 0, right: 0 }}
            command={code} />
    </div>

)
}
