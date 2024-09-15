"use client";

import { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Goal } from "@/components/editor/goalEditor"
import { UploadedImage } from "@/components/editor/dropZone"
import { Gallery } from "@/components/post/gallery"
import '@/fontawesome';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import StartupsProvider, { useStartups } from '@/context/StartupsContext';
import { ProcessedStartup } from '@/types/Startup';
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