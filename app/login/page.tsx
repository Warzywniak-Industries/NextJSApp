import Login from '@/components/login'
import Signup from '@/components/signup'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default function page() {
  return (
    <div className='flex items-center justify-center'>
        <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className='w-full'>
            <TabsTrigger value="account" className='w-full'>Account</TabsTrigger>
            <TabsTrigger value="password" className='w-full'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account"><Login/></TabsContent>
        <TabsContent value="password"><Signup/></TabsContent>
    </Tabs>
    </div>
    

  )
}
