
import { SOROSAN_DOC_URL, SOROSAN_SAMPLE_URL, SOROSAN_SDK_REACT_URL } from "@/lib/constants"
import { Feature, Features } from "../shared/features"
import { Title } from "@/components/main/shared/title"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneLight, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";


export interface SetUpProps
    extends React.HTMLAttributes<HTMLDivElement> {
}

export const SetUp = ({ className }: SetUpProps) => {
    const { theme } = useTheme();

    return (
        <div className={cn("grid grid-cols-12 gap-8", className)}>
            <div className="col-span-12 md:col-span-6 flex justify-center items-center">
                <div>
                    <Title className="gradient-text text-center m-0">Set Up SoroSan SDK</Title>
                    <div>
                        Get the SDK for React and start building your app.
                    </div>
                </div>
            </div>
            <div className="col-span-12 md:col-span-6">
                <SyntaxHighlighter
                    className="!bg-transparent"
                    language="javascript" style={theme == "dark" ? atomOneDark : atomOneLight}>
                    {codeString}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

const codeString = `
// Root.tsx, Layout.tsx, or any component
import { SorosanProvider } from '@sorosan-sdk/react'

export default function Component() {
    const { sdk } = useSorosan();

    return (
        <SorosanProvider>
            {children}
        </SorosanProvider>
    )
}
`;
