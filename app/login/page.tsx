import Login from '@/components/login'
import Signup from '@/components/signup'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default function page() {
  return (
    <div className='flex items-center justify-center'>
        <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className='w-full'>
            <TabsTrigger value="login" className='w-full'>Login</TabsTrigger>
            <TabsTrigger value="register" className='w-full'>Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><Login/></TabsContent>
        <TabsContent value="register"><Signup/></TabsContent>
    </Tabs>
    </div>
    

  )
}
