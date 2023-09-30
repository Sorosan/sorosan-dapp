"use client"

import { MainFeatures } from '@/components/main/index/main-features'
import { Feature, Features } from '@/components/main/shared/features'
import { Title } from '@/components/main/shared/title'
import { TitleChanger } from '@/components/main/shared/title-changer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleTheme } from '@/components/ui/toggle-theme'
import { SOROSAN_DOC_URL } from '@/lib/constants'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { InlineIcon } from '@iconify/react';
import { Command } from '@/components/main/shared/command'
import { SDKFeatures } from '@/components/main/sdk/sdk-features'
import { GettingStarted } from '@/components/main/sdk/getting-started'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes'
import { SetUp } from '@/components/main/sdk/set-up'
import { GasEstimator } from '@/components/main/sdk/gas-estimator'
import { SDKSamples } from '@/components/main/sdk/sdk-samples'

export default function SDKPage() {
    const router = useRouter()

    return (
        <main className="container mx-auto md:px-32">
            <motion.div className="my-16 text-center text-4xl font-bold h-screen"
                initial={{ y: 128, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}>

                <h3 className="text-5xl md:text-6xl lg:text-7xl gradient-text">
                    Build your Soroban Web3 app in JavaScript or Typescript!
                </h3>
                <Button className="my-8"
                    onClick={() => router.push(SOROSAN_DOC_URL)}>
                    Goto Documentation
                </Button>
            </motion.div>

            <SDKFeatures className="my-4" />
            <GettingStarted className="my-8" />
            <SetUp className="my-32" />
            <SDKSamples className="my-64" />
        </main>
    )
}
