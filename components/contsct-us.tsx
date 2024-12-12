"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const loginSchema = z.object({
  name: z.string().min(5, {
    message: "Title is required",
  }),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(15, {
    message: "Description is required (min - 30 charactors)",
  }),
});

type FormValues = z.infer<typeof loginSchema>;

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      //   setIsSubmitting(true);
      //   const res = await signIn({
      //     email: data.email,
      //     password: data.password,
      //   });
      //   console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="px-6 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="section-title ">Get In Touch</h2>
        <p className="section-description mb-8 mt-10">
          Have any questions? We&lsquo;d love to hear from you!
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 p-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start">Title</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        className="bg-[#11142b]"
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
                    <FormLabel className="flex justify-start">
                      Subtitle
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        className="bg-[#11142b]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="border-0">
                    <FormLabel className="flex justify-start">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={10}
                        id="message"
                        className=" bg-[#11142b]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="btn-gradient w-[120px] text-lg">
                Send
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ContactUs;
