'use client'
import dynamic from 'next/dynamic'

// Dynamically import the heavy 3D component with ssr: false
// This ensures that the heavy JavaScript payload is only fetched on the client
const ParticlesBackground = dynamic(() => import('@/shared/ui/react-bits/ParticlesBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />
})

export default ParticlesBackground
