"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, SendIcon, CheckCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactFormDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Here you would typically send the form data to your server
    // For example:
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    // });
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after successful submission
    setTimeout(() => {
      setOpen(false);
      // Reset after dialog closes
      setTimeout(() => {
        form.reset();
        setIsSubmitted(false);
      }, 300);
    }, 2000);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="px-6 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <span>Contact Me</span>
          <SendIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] rounded-xl border-border/60 shadow-xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl">Get in Touch</DialogTitle>
          <DialogDescription className="text-base">
            Fill out the form below and I&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 space-y-4"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-5 text-primary border border-primary/20">
              <CheckCircleIcon className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-center">Message Sent!</h3>
            <p className="text-center text-muted-foreground max-w-[300px]">
              Thank you for reaching out. I&apos;ll respond to your message soon.
            </p>
          </motion.div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        className="rounded-lg h-11 border-border/60 focus-visible:ring-primary/30" 
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
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="example@email.com" 
                        type="email"
                        className="rounded-lg h-11 border-border/60 focus-visible:ring-primary/30" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your phone number"
                        type="tel" 
                        className="rounded-lg h-11 border-border/60 focus-visible:ring-primary/30" 
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
                    <FormLabel className="text-sm font-medium">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What would you like to talk about?"
                        className="min-h-[100px] resize-none rounded-lg border-border/60 focus-visible:ring-primary/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-12 rounded-lg text-base font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
} 