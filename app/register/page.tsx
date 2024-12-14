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
  // const router = useRouter();

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
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await createUser({
        email: data.email,
        firstName: data.fName,
        lastName: data.lName,
        password: data.password,
      });
      setIsAlert(true);
      console.log(res);

      // router.replace("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const closeDialog = () => {
  //   setIsAlert(false);
  // };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-gradient-top-to-bottom-inverse border-light-400 mx-auto max-w-sm space-y-8 rounded-xl border shadow-lg"
        >
          <div className="p-6">
            <h1 className="text-light-100 text-2xl font-semibold">Register</h1>
            <p className="text-light-500">
              Create a new account by filling out the details below
            </p>
          </div>
          <div className=" space-y-4 p-6">
            <FormField
              control={form.control}
              name="fName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-light-200">First Name</FormLabel>
                  <FormControl>
                    <Input
                      id="fName"
                      placeholder="John"
                      className="border-light-400 bg-light-300 text-light-700 focus:ring-light-400 focus:ring-2"
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
                  <FormLabel className="text-light-200">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      id="lName"
                      placeholder="Doe"
                      className="border-light-400 bg-light-300 text-light-700 focus:ring-light-400 focus:ring-2"
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
                  <FormLabel className="text-light-200">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      className="border-light-400 bg-light-300 text-light-700 focus:ring-light-400 focus:ring-2"
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
                  <FormLabel className="text-light-200">Password</FormLabel>
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
              Register
            </Button>
          </div>{" "}
          <div>
            <div className="text-light-500 p-6 text-center text-sm">
              Do you have an account?{" "}
              <Link
                href="/register"
                className="text-light-400 hover:text-light-300 underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </Form>
      {isSubmitting && <LoadingSpinner isLoading={isSubmitting} />}
      {/* {isAlert && (
        <DialogAlert
          isOpen={isAlert}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
          cancelLabel="Cancel"
          onCancell={closeDialog}
        />
      )} */}
    </div>
  );
};

export default RegisterForm;
