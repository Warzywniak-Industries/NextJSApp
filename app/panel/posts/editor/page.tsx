import StartupEditor from '@/components/StartupEditor'
import StartupsProvider from '@/context/StartupsContext'
import React from 'react'

export default function page() {
  return (
    <StartupsProvider>
      <StartupEditor/>
    </StartupsProvider>
  )
}
