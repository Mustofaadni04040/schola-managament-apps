"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

export default function LoginPage() {
  const { isLoaded, user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router, isSignedIn]);

  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full space-y-6 rounded-xl bg-white px-4 py-10 ring-1 ring-gray-200 sm:w-96 sm:px-8"
        >
          <header className="text-center">
            <Image
              src="/schola_logo.svg"
              alt=""
              width={100}
              height={100}
              className="mx-auto w-auto h-auto"
              priority
            />
          </header>
          <Clerk.GlobalError />
          <Clerk.Field name="identifier" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-[#ffc13b]">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-[#ffc13b] hover:[#ffc13b]/80 focus:ring-[1.5px] focus:ring-[#ffc13b] data-[invalid]:ring-red-400"
            />
            <Clerk.FieldError className="block text-sm text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-[#ffc13b]">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-[#ffc13b] hover:[#ffc13b]/80 focus:ring-[1.5px] focus:ring-[#ffc13b] data-[invalid]:ring-red-400"
            />
            <Clerk.FieldError className="block text-sm text-red-400" />
          </Clerk.Field>

          <SignIn.Action
            submit
            className={`w-full rounded-md bg-[#ffc13b] px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-[#ffc13b] hover:bg-[#ffc13b]/80 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[#ffc13b] active:text-white/70 ${
              isLoaded ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            }`}
            disabled={!isLoaded}
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
