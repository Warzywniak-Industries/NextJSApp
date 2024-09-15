"use client";

import { useState } from 'react'
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

export default function PostEditor() {
  const title = "Hamburger Lover"
  const description = "<h1>Hamburger Lovers: Your One-Stop Shop for Burger Bliss</h1><h2>Bringing the World's Best Burgers to Your Doorstep</h2><p>Are you a die-hard hamburger enthusiast? Do you crave juicy patties, perfectly toasted buns, and mouthwatering toppings?</p><p>Look no further than Hamburger Lovers! We're an innovative startup dedicated to connecting burger lovers like you with the most delicious and diverse burger offerings in your city.</p><h3>What We Offer:</h3><ul><li><strong>Curated Burger Selection:</strong> We partner with top-rated burger joints, hidden gems, and artisanal burger chefs to bring you a curated menu of the best burgers in town.</li><li><strong>Convenient Ordering:</strong> Our user-friendly platform allows you to browse menus, customize your burgers, and place orders with just a few taps.</li><li><strong>Fast and Reliable Delivery:</strong> We work with trusted delivery partners to ensure your burger arrives hot, fresh, and on time.</li><li><strong>Exclusive Deals and Promotions:</strong> Get access to exclusive discounts, loyalty programs, and special offers on your favorite burgers.</li></ul><h3>Join the Hamburger Lovers Community:</h3><p>We're more than just a delivery service - we're a community of passionate burger lovers. Follow us on social media for burger news, reviews, and drool-worthy photos.</p><h3>Ready to Bite into the Best?</h3><p>Download the Hamburger Lovers app today and start exploring a world of burger deliciousness!</p>";
  const target = 5000;
  const raised = 3270.34;
  const progress = Math.round(raised / target * 1000) / 10;
  const images = Array<string>('/img/Kacper.png', '/img/Wojciech.png', '/img/Artur.png', '/img/Wojciech.png');
  const tags = Array<string>('Pizza', 'Food', 'Shop');
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
        <div className="space-y-4 md:col-span-7">
          <Card className='shadow-md bg-white'>
            <CardContent className='p-6'>
              <Gallery images={images} />
            </CardContent>
          </Card>
          <Card className="space-y-2 shadow-md bg-white">
            <CardContent>
              <div className='space-y-2 mt-4'>
                <div className='relative starter-desc' dangerouslySetInnerHTML={{ __html: description }}>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 md:col-span-5">
          <Card className="shadow-md bg-white">
            <CardHeader>
              <CardTitle className='flex items-center'>{title}</CardTitle>
              <div className='flex'>
                {tags.map((tag, i) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 me-1 shadow-md">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="price">Target Funding: <Badge>{formatPrice(raised)}</Badge> / <Badge>{formatPrice(target, true)}</Badge></Label>
                <div className="w-full bg-gray-200 rounded-full h-8 shadow-inner">
                  <div
                    className="flex font-bold items-center justify-center bg-gradient-to-r from-primary to-accent h-8 rounded-full shadow-md animate-pulse"
                    style={{ width: `${progress}%` }}
                  >
                    {progress}%
                  </div>
                </div>
              </div>
              <div className="space-y-2 flex justify-center">
                <Button className='mt-4 rounded-full px-12'>Donate 🎉</Button>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {goals.map((goal, i) => (
              <Card key={goal.id} className='shadow-md bg-white relative'>
                {raised >= goal.price && (
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-white rounded-md" />
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary to-secondary [mask-image:linear-gradient(white,transparent_75%)]" />
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