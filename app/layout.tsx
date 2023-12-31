"use client"

import './globals.css'
// import type { Metadata } from 'next'
import { gilroy } from './fonts'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Lato } from 'next/font/google'
import { SorosanProvider } from '@sorosan-sdk/react'
import { Footer } from '@/components/main/footer'
import { NavBar } from '@/components/main/nav-bar'
import { Toaster } from '@/components/ui/toaster'
import { NetworkProvider, networkType, useSorosanNetwork } from '@/components/main/network/network-provider'
import { useEffect, useState } from 'react'

// If loading a variable font, you don't need to specify the font weight
const lato = Lato({
  subsets: ["latin-ext"],
  weight: "400"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${gilroy.variable} ${lato.className} font-sans`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NetworkProvider>
            <WrapRoot>
              {children}
            </WrapRoot>
          </NetworkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

function WrapRoot({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState<number>(0);
  const network = useSorosanNetwork();

  useEffect(() => {
    console.log("WrapRoot Change Network to", network.selectedNetwork);
    setKey(key + 1);
  }, [network.selectedNetwork]);

  return (
    <div>
      <NavBar />
      <SorosanProvider key={key} network={network.selectedNetwork as networkType}>
        <div className="min-h-screen">
          {children}
        </div>
      </SorosanProvider>
      <Footer />
      <Toaster />
    </div>
  )
}

