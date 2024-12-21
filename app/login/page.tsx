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
import React, { useState } from "react";
import { signIn } from "@/lib/appwrite";
import LoadingSpinner from "@/components/shared/loading";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/DataContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { setUserId } = useDataContext();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      const res = await signIn({
        email: data.email,
        password: data.password,
      });
      const userId = res.userId;
      localStorage.setItem("userId", userId);
      setUserId(userId);
      router.replace("/");
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 pt-16 max-md:items-start max-md:pt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-sm space-y-8 rounded-xl border border-gray-600 shadow-lg"
        >
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Login</h1>
            <p>Enter your email and password below</p>
          </div>
          <div className="space-y-4 p-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="me@example.com"
                      className="border border-gray-600 bg-card"
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
                      className="ml-auto text-sm text-gray-400 underline hover:text-gray-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      className="border border-gray-600 bg-card"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="btn-gradient w-full">
              Login
            </Button>
          </div>
          <div className="p-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline hover:text-gray-500">
              Register
            </Link>
          </div>
        </form>
      </Form>
      {isSubmitting && <LoadingSpinner isLoading={isSubmitting} />}
    </div>
  );
};

export default Login;
