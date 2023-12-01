"use client"

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSorosanSDK } from '@sorosan-client/react';
import { GasEstimator } from './gas-estimator';
import { code as gasEstimatorCode } from './code-sample/gas-estimator';
import { code as tokenInfoCode } from './code-sample/token-info';
import { CodeBlock } from '../shared/code-block';
import { Title } from '../shared/title';
import { Card, CardDescription } from '@/components/ui/card';
import { TokenInfo } from './token-info';

interface SDKSamplesProp
    extends React.HTMLAttributes<HTMLDivElement> { }

export const SDKSamples = ({ className, ...props }: SDKSamplesProp) => {
    return (
        <div className={cn("", className)}>
            <div className="text-center">
                <h5 className="gradient-text font-bold text-lg">Try Out</h5>
                <Title className="m-0">
                    See code samples to of gas calculation
                    and token information
                </Title>
            </div>
            {samples.map((sample, index) => {
                return (
                    <div key={index} className=" rounded-3xl bg-slate-50 dark:bg-zinc-900 my-8 p-4">
                        {index % 2 == 0
                            ?
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-12 lg:col-span-7" style={{ height: "512px", overflowY: "scroll" }}>
                                    <CodeBlock language={sample.language} code={sample.code} />
                                </div>
                                <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
                                    <div className="">
                                        {sample.component}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
                                    <div className="">
                                        {sample.component}
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-7" style={{ height: "512px", overflowY: "scroll" }}>
                                    <CodeBlock language={sample.language} code={sample.code} />
                                </div>
                            </div>
                        }

                    </div>
                )
            })}
        </div>
    );
};

interface SDKSample {
    title: string;
    description: string;
    code: string;
    language?: string;
    component: JSX.Element;
}

const samples: SDKSample[] = [
    {
        title: "Estimate Gas",
        description: "Estimate gas for a contract method",
        code: gasEstimatorCode,
        component: <GasEstimator />
    },
    {
        title: "Token Information",
        description: "Estimate gas for a contract method",
        code: tokenInfoCode,
        language: "tsx",
        component: <TokenInfo />
    }
]