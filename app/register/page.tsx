"use client";

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
import { useState } from "react";
import LoadingSpinner from "@/components/shared/loading";
import Link from "next/link";
// import DialogAlert from "./shared/AlertDialog";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/appwrite";
import { useDataContext } from "@/context/DataContext";

const registerSchema = z.object({
  fName: z.string().min(2, "First name must be at least 2 characters."),
  lName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character.",
    }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setUserId } = useDataContext();
  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await createUser({
        email: data.email,
        firstName: data.fName,
        lastName: data.lName,
        password: data.password,
      });
      const userId = res.$id;
      localStorage.setItem("userId", userId);
      setUserId(userId);
      router.replace("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 max-md:px-2 max-md:pt-5 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" mx-auto max-w-sm rounded-xl  border border-gray-600 shadow-lg "
        >
          <div className="p-6">
            <h1 className=" text-2xl font-semibold">Register</h1>
            <p>Create a new account by filling out the details below</p>
          </div>
          <div className=" space-y-4 p-6">
            <FormField
              control={form.control}
              name="fName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      id="fName"
                      placeholder="John"
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
              name="lName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      id="lName"
                      placeholder="Doe"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
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
                  <FormLabel>Password</FormLabel>
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
              Register
            </Button>
          </div>{" "}
          <div>
            <div className=" p-6 text-center text-sm">
              Do you have an account?{" "}
              <Link
                href="/login"
                className="text-gray-400 underline hover:text-gray-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </Form>
      {isSubmitting && <LoadingSpinner isLoading={isSubmitting} />}
    </div>
  );
};

export default RegisterForm;
