"use client"
import Link from "next/link"

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
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
import { useFormState } from "react-dom";
import { signIn } from "@/controllers/auth";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [errorMessage, send] = useFormState(signIn, undefined);
  const { toast } = useToast()


  useEffect(() => {
    if (errorMessage == undefined) return

    const { error } = JSON.parse(errorMessage);

    if (error?.message) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    } else {
      toast({
        title: "You are successfully register.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              register complete
            </code>
          </pre>
        ),
      });
    }
    
  }, [errorMessage])
  


  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="animate-in mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={send} className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <SubmitButton type="submit" className="w-full">
              Login
            </SubmitButton>
            <Button variant="outline" className="w-full">
              Login with ...
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
        {errorMessage}
      </Card>
    </div>
  );
}
