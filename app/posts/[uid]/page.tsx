"use client";

import '@/fontawesome';
import React from 'react';
import StartupsProvider from '@/context/StartupsContext';
import StartupView from '@/components/StartupView';

export default function PostEditor({ params }: { params: { uid: string } }) {

  return (
    <StartupsProvider>
      <StartupView params={{
        uid: params.uid
      }}/>
    </StartupsProvider>
  )
}