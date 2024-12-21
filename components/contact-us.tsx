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
// import { toast } from "sonner";

const loginSchema = z.object({
  name: z.string().min(3, {
    message: "Title is required (min - 3 charactors)",
  }),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(15, {
    message: "Description is required (min - 15 charactors)",
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
      setIsSubmitting(true);

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-description mb-8 mt-10">
          Have any questions? We&lsquo;d love to hear from you!
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 px-2 md:px-6">
              {/* Form fields remain the same */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start text-lg">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        className="border-none bg-[#11142b]"
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
                    <FormLabel className="flex justify-start text-lg">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        className="border-none bg-[#11142b]"
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
                  <FormItem>
                    <FormLabel className="flex justify-start text-lg">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={10}
                        id="message"
                        className="border-none bg-[#11142b]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="btn-gradient w-[120px] text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ContactUs;
