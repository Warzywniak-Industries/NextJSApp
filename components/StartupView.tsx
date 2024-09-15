"use client";

import { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Goal } from "@/components/editor/goalEditor"
import { UploadedImage } from "@/components/editor/dropZone"
import { Gallery } from "@/components/post/gallery"
import '@/fontawesome';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useStartups } from '@/context/StartupsContext';
import { ProcessedStartup } from '@/types/Startup';
import { LoadingAnimation } from './ui/loading-animation';

export default function StartupView({ params }: { params: { uid: string } }) {
  const [startup, setStartup] = useState<ProcessedStartup | null>(null);
  const [noThumbnail, setNoThumbnail] = useState<boolean>(false);
  const { uid } = params;
  const { getStartupByUid } = useStartups();

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const startup = await getStartupByUid(uid);
        setStartup(startup);
        console.log("xdddd",startup);
        return startup;
      } catch (error) {
        console.error("An error occured when fetching post by uid!", error);
    } finally {
      console.log("No startup found");
    }
    }
    if(!uid){
      console.log("No uid found");
    }
    else{
      fetchStartup();
      if(startup){
        if (!startup.logo) {
          startup.logo = ""
          setNoThumbnail(true);
        }
        if (!startup.thumbails) startup.thumbails = [];
        if (!startup.tags) startup.tags = [];
      }
    }
  }, [startup]);

  if(!startup) return <div className='w-full flex justify-center items-center mt-20'><LoadingAnimation /></div>;

  // const images = [startup.logo, ... startup.thumbails as string[]];
  // const tags = startup.tags;
  // const title = startup.name;
  // const description = startup.description;

  const target = 5000;
  const raised = 3270.34;
  const progress = Math.round(raised / target * 1000) / 10;
  const goals = Array<Goal>(
    { id: 1, title: 'Start', price: 500, icon: "a", rewards: ["we may not drop this", "we can eat food"] },
    { id: 2, title: 'Mid', price: 2000, icon: "a", rewards: ["there is a chance we will succeed", "we will spend all the money stupidly"] },
    { id: 3, title: 'End game :O', price: 4000, icon: "a", rewards: ["we will succeed", "we spent all the money stupidly"] }
  );

  function formatPrice(price: number, hideDecimals: boolean = false) {
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: hideDecimals ? 0 : 2,
      maximumFractionDigits: hideDecimals ? 0 : 2,
    };
    return price.toLocaleString('en-US', options);
  }

  return (
    <div className="w-[80%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className={`space-y-4 md:col-span-7 ${noThumbnail? "hidden" : "visible"}`}>
          <Card className='shadow-md bg-white'>
            <CardContent className='p-6'>
              <Gallery images={startup.thumbails ? [startup.logo, ... startup.thumbails as string[]] : Array<string>('/img/Wojciech.png')} />
            </CardContent>
          </Card>
          <Card className="space-y-2 shadow-md bg-white">
            <CardContent>
              <div className='space-y-2 mt-4'>
                <div className='relative' dangerouslySetInnerHTML={{ __html: startup.description }}>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 md:col-span-5">
          <Card className="shadow-md bg-white">
            <CardHeader>
              <CardTitle className='flex items-center'>{startup.name}</CardTitle>
              <div className='flex'>
                {startup.tags ? startup.tags.map((tag, i) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 me-1 shadow-md">
                    {tag}
                  </Badge>
                )) : <></>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="price">Target Funding: <Badge>{formatPrice(raised)}</Badge> / <Badge>{formatPrice(target, true)}</Badge></Label>
                <div className="w-full bg-gray-200 rounded-full h-8 shadow-inner">
                  <div
                    className="flex font-bold items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 h-8 rounded-full shadow-md animate-pulse"
                    style={{ width: `${progress}%` }}
                  >
                    {progress}%
                  </div>
                </div>
              </div>
              <div className='flex flex-row w-full justify-center items-center align-middle mt-2'>
                  <Button className='hover:opacity-70'>
                    <Link href="/funding">🎉 Fund</Link>
                  </Button>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {goals.map((goal, i) => (
              <Card key={goal.id} className='shadow-md bg-white relative'>
                {raised >= goal.price && (
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-white rounded-md" />
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-400 to-blue-500 [mask-image:linear-gradient(white,transparent_75%)]" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="relative flex justify-between items-center">
                    <span>Tier: {goal.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-bold">{raised >= goal.price ? formatPrice(goal.price, true) : formatPrice(raised)} / {formatPrice(goal.price, true)}</span>
                  </div>
                  <h3 className="font-semibold mb-1">Rewards:</h3>
                  <ul className="list-disc pl-5">
                    {goal.rewards.map((reward, index) => (
                      <li key={index}>{reward}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}