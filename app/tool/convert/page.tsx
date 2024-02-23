"use client";

import { useSorosanSDK } from "@sorosan-sdk/react";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { PageHeaderItem, PageHeader } from "@/components/main/shared/page-header";

const toStroop = "XLM => Stroop";
const toXLM = "Stroop => XLM";

export default function ConvertPage() {
    const { sdk } = useSorosanSDK();

    const [info, setInfo] = useState<PageHeaderItem>({
        name: toStroop,
        description: "Convert XLM to Stroop (lowest xlm unit)",
    });
    const [xlmToStroop, setXlmToStroop] = useState<boolean>(true);

    const [question, setQuestion] = useState<number>(0);
    const [answer, setAnswer] = useState<number>(0);

    const handleConversionChange = () => {
        if (xlmToStroop) {
            info.name = toXLM;
        }
        else {
            info.name = toStroop;
        }

        setQuestion(answer);
        setAnswer(question);

        setXlmToStroop(!xlmToStroop);
        setInfo(info);
    }

    const handleConverstion = (e: any) => {
        let value;
        if (xlmToStroop) {
            value = sdk.util.toStroop(e.target.value);
        }
        else {
            value = sdk.util.toXLM(e.target.value);
        }

        setQuestion(e.target.value);
        setAnswer(value ? value.toNumber() : 0);
    }
    return (
        <div className="container mx-auto">
            <PageHeader key={xlmToStroop ? 1 : 0} item={info} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-5">
                    <Input type="number" value={question}
                        onChange={handleConverstion}
                        placeholder="43c83307b..." />
                </div>
                <div className="col-span-12 md:col-span-2 flex items-center justify-center">
                    <ArrowLeftRight
                        className="cursor-pointer"
                        onClick={handleConversionChange} />
                </div>
                <div className="col-span-12 md:col-span-5">
                    <Input value={answer} readOnly={true}
                        placeholder="43c83307b..." />
                </div>
            </div>
        </div>
    )
}
