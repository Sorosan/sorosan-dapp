"use client"

import { MainFeatures } from '@/components/main/index/main-features'
import RoadMap from '@/components/main/index/road-map'
import { TitleChanger } from '@/components/main/shared/title-changer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="container py-24 px-8">
      <div>
        <TitleChanger titles={['san', '3', '三']} />
      </div>

      <div className="container">
        <MainFeatures />
        <RoadMap className="mx-16" />
      </div>
      <div className='h-screen'></div>
      <div className='h-screen'></div>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
      </motion.div>
    </main>
  )
}
