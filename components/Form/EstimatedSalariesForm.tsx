"use client";

import * as z from "zod";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EstimatedSalatiesSchema } from "@/lib/validations";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const EstimatedSalariesForm = ({ status }: { status: Promise<any> }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      status.then((res) => {
        if (res) setIsSubmitting(false);
      });
    } catch (error) {
      console.log("The status promise had an issue", error);
      setIsSubmitting(false);
      throw error;
    }
  }, [status]);

  const router = useRouter();

  const form = useForm<z.infer<typeof EstimatedSalatiesSchema>>({
    resolver: zodResolver(EstimatedSalatiesSchema),
    defaultValues: {
      jobTitle: "",
      location: "",
      radius: "",
    },
  });

  const { isValid } = useFormState({ control: form.control });

  const onSubmit = (values: z.infer<typeof EstimatedSalatiesSchema>) => {
    setIsSubmitting(true);
    try {
      // convert the values to URL params
      if (values.radius === "") values.radius = "100";
      const params = new URLSearchParams(values);
      // redirect to the new URL
      router.push(`/salaries?${params.toString()}`);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-5">
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-natural-6 dark:text-white">
                  Job Title <span className="text-primary"> *</span>
                </FormLabel>
                <FormControl className="h-[48px] rounded-[10px] py-3 pl-5">
                  <Input
                    className=" border-[1px] bg-natural-2 font-manrop text-[14px]  font-semibold text-natural-8 ring-0 focus:ring-primary dark:border-natural-6 dark:bg-darkBg-2 dark:text-natural-6"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-white" />
              </FormItem>
            )}
          />

          <div className="lg:flex lg:justify-between lg:gap-8">
            <div className="mt-5 lg:w-1/2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-natural-6 dark:text-white">
                      Location<span className="text-primary"> *</span>
                    </FormLabel>
                    <FormControl className="h-[48px] rounded-[10px] py-3 pl-5">
                      <Input
                        className="border-[1px] bg-natural-2 font-manrop text-[14px]  font-semibold text-natural-8 ring-0 focus:ring-primary dark:border-natural-6 dark:bg-darkBg-2 dark:text-natural-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-white" />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5 lg:w-1/2">
              <FormField
                control={form.control}
                name="radius"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" font-semibold text-natural-6 dark:text-white">
                      Radius
                    </FormLabel>
                    <FormControl className="h-[48px] rounded-[10px] py-3 pl-5">
                      <Input
                        className="border-[1px] bg-natural-2 font-manrop text-[14px]  font-semibold text-natural-8 ring-0 focus:ring-primary dark:border-natural-6 dark:bg-darkBg-2 dark:text-natural-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-white" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <p className="mt-5 text-xs font-light italic text-primary">
            * mandatory fields
          </p>
        </div>
        <Button type="submit" className="mt-5" disabled={!isValid}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <p>Submitting...</p>
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EstimatedSalariesForm;
