'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/context/AuthContext'
//import { ButtonLoading } from './ButtonLoading'

import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ButtonLoading } from '@/components/ButtonLoading'
//import UserHeader from './UserHeader'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [authenticating, setAuthenticating] = useState(false)

  const { toast } = useToast()

  const { login } = useAuth()

  const router = useRouter();

  const handleRedirect = () => {
      router.push('./signup');
  };

  async function handleLogin() {
    if (!email || !password) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill in your email and password.",})
      return
    }
    
    setAuthenticating(true)
    interface AuthError {
      code: string;
      message: string;
    }
    
    try {
      await login(email, password);
    } catch (error) {
      const authError = error as AuthError;
      const errorMessages: { [key: string]: string } = {
        'auth/invalid-email': 'Invalid email.',
        'auth/user-not-found': 'User not found.',
        'auth/wrong-password': 'Wrong password.',
        'auth/invalid-credential': 'Invalid credential.',
      };
    
      const description = errorMessages[authError.code] || 'An error occurred. Please try again later.';
      
      toast({
        title: "Uh oh! Something went wrong.",
        description,
      });
    
      console.error(authError);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome back! 👋
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please login to continue.
      </p>

      <form className="my-8" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input type="email" placeholder="Email" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input type="password" placeholder="Password" className="w-full" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </LabelInputContainer>

        <div className='flex items-center justify-center w-full'>
          {authenticating ? <ButtonLoading ></ButtonLoading> : <Button variant="outline" className='w-full' onClick={() => handleLogin()}>Login</Button>}
        </div>

        

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
      <div className="flex items-center justify-center mt-8">
          <span className="text-neutral-600 dark:text-neutral-300 text-sm">
            Don&apos;t have an account?
            <Button variant="link" className="ml-1" onClick={handleRedirect}>
              Sign Up
            </Button>
          </span>
        </div>
    </div>
    
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};