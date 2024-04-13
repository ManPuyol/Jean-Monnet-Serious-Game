"use client"
import Link from "next/link"
import { LoaderCircle, EyeIcon, EyeOffIcon } from 'lucide-react';
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
import { FormEvent, useTransition } from "react";
import { signIn } from "@/controllers/auth";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { PasswordInput } from "@/components/password-input";

export default function Login() {
  let [isPending, startTransition] = useTransition();
  const { toast } = useToast()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    startTransition(async () => {
      const result = await signIn(data);
      const { error } = JSON.parse(result);
      if (error?.message) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Please try again"
        });
      }
    });
  }

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
          <form onSubmit={handleSubmit} className="grid gap-4">
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
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link> */}
              </div>
              <PasswordInput
                id="password" name="password" required
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {!isPending ?
                "Login"
                :
                <LoaderCircle className={cn(" animate-spin")} />
              }
            </Button>
            {/* <Button type="button" variant="outline" className="w-full" disabled={isPending}>
              Login with ...
            </Button> */}
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
