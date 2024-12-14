"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { signIn } from "@/lib/appwrite";
import React, { useState } from "react";
import { signIn } from "@/lib/appwrite";
import LoadingSpinner from "@/components/shared/loading";
// import LoadingSpinner from "./shared/Loading";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      const res = await signIn({
        email: data.email,
        password: data.password,
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex  w-full items-center justify-center px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="   mx-auto max-w-sm space-y-8 rounded-xl border shadow-lg"
        >
          <div className="p-6">
            <h1 className=" text-2xl font-semibold">Login</h1>
            <p className="">Enter your email and password below</p>
          </div>
          <div className="space-y-4 p-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="me@example.com"
                      className="focus:ring-light-400 focus:ring-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel className="">Password</FormLabel>
                    <Link
                      href="#"
                      className=" ml-auto text-sm underline hover:text-gray-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      className="border-light-400 bg-light-300 text-light-700 focus:ring-light-400 focus:ring-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="border-light-600 bg-light-600 text-light-100 hover:border-light-400 hover:text-light-600 w-full border transition-all hover:bg-transparent"
            >
              Login
            </Button>
          </div>
          <div className=" p-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className=" underline hover:text-gray-500">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
      {isSubmitting && <LoadingSpinner isLoading={isSubmitting} />}
    </div>
  );
};

export default Login;
