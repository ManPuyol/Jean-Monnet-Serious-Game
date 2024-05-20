"use client"

import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/submit-button";
import { NextResponse } from "next/server";
import { signUp } from "@/controllers/auth";
import { FormEvent, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PasswordInput } from "@/components/password-input";

export default function Login(){
  let [isPending, startTransition] = useTransition();
  const { toast } = useToast()
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    startTransition(async () => {
      const result = await signUp(data);
      const { error } = JSON.parse(result);
      if (error?.message) {
        toast({
          variant: "destructive",
          title: error.message
        });
      }else 
        toast({
          variant: "primary",
          title: "Account created successfully! Please sign in."
        });
        router.push('/sign-in');
    });
  }
  
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="animate-in mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input 
                  id="first-name" 
                  name="first-name"
                  placeholder="Max" 
                  required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input 
                  id="last-name" 
                  name="last-name"
                  placeholder="Robinson" 
                  required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password" name="password" required
                autoComplete="new-password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm password</Label>
              <PasswordInput
                id="confirm-password" name="confirm-password" required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {!isPending ?
                "Create account"
                :
                <LoaderCircle className={cn(" animate-spin")} />
              }
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with ...
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
