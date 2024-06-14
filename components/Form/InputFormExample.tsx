"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { useRouter } from "next/navigation";

import { ExampleSchema } from "@/lib/validations";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const InputFormExample = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidInput, setIsValidInput] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ExampleSchema>>({
    resolver: zodResolver(ExampleSchema),
    defaultValues: {
      example: "",
    },
  });

  const { isValid } = useFormState({ control: form.control }); // Access formState

  useEffect(() => {
    if (isValid) setIsValidInput(true);
  }, [isValid]);

  const onSubmit = () => {
    setIsSubmitting(true);

    try {
      router.push("/");
      toast({
        title: "Your example has been submitted.",
        variant: "default",
      });
    } catch (error) {
      router.push("/");
      toast({
        title: `Example successfully created `,
        variant: "destructive",
      });
    } finally {
      setIsValidInput(false);
      setIsSubmitting(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="example"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Example</FormLabel>
              <FormControl>
                <Input placeholder="Input example" {...field} />
              </FormControl>
              <FormDescription>
                This is an example on how to use input
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isValidInput}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default InputFormExample;
