"use client"

import { BuildFeature } from '@/components/main/index/build-feature'
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
        <BuildFeature className="my-16 mb-32" />
        <RoadMap className="mx-16" />
      </div>
    </main>
  )
}
