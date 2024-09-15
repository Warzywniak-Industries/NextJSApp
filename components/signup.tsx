"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

import { useToast } from "./ui/use-toast";
import { useAuth } from "../context/AuthContext";
import { FirebaseError } from "firebase/app";

export default function Signup() {

    const router = useRouter();

    const handleRedirect = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push('./login');
    };

    const [, setAuthenticating] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const { toast } = useToast()

    const { signup } = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || password === '' || confirmPassword === '' || firstName === '') { // Last name is optional
        toast({
            title: "Uh oh! Something went wrong.",
            description: "Please fill in all fields.",})
        return
    }

    if (password.length < 6) {
        toast({
            title: "Uh oh! Something went wrong.",
            description: "Password must be at least 6 characters long.",})
        return
    }

    if (password !== confirmPassword) {
        toast({
            title: "Uh oh! Something went wrong.",
            description: "Passwords do not match.",})
        return
    }
    handleSignUp()
  };

  async function handleSignUp() {
    setAuthenticating(true)
    // Call API to create user
    
    try {
      await signup(email, password, firstName, lastName);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast({
              title: "Uh oh! Something went wrong.",
              description: "Email already in use.",
            });
            break;
          default:
            toast({
              title: "Uh oh! Something went wrong.",
              description: "An error occurred.",
            });
        }
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "An unknown error occurred.",
        });
      }
    } finally {
      setAuthenticating(false);
    }
  }
  return (
    <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to StartupHub 🚀
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Kickstart your ideas and connect with other entrepreneurs.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Artur" type="text" onChange={(e) => setFirstName(e.target.value)}/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Niemiec" type="text" onChange={(e) => setLastName(e.target.value)}/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="e36artur@example.com" type="email" onChange={(e) => setEmail(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password"  onChange={(e) => setPassword(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </LabelInputContainer>

        <Button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white  h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        >
          Sign up &rarr;
        </Button>

        <div className="flex items-center justify-center mt-8">
          <span className="text-neutral-600 dark:text-neutral-300 text-sm">
            Already have an account?
            <Button variant="link" className="ml-1" onClick={handleRedirect}>
              Login
            </Button>
          </span>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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