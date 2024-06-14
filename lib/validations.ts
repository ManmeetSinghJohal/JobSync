import * as z from "zod";

export const ExampleSchema = z.object({
  example: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(130, { message: "Title must be less than 130 characters." }),
});

export const EstimatedSalatiesSchema = z.object({
  jobTitle: z
    .string()
    .min(2, "Job title must be at least 2 characters.")
    .max(25, "Job title must be less than 25 characters."),
  location: z
    .string()
    .min(2, "Location should be at least 2 characters")
    .max(20, "Location should not be bigger than 20 characters."),
  radius: z.optional(
    z.string().refine((val) => {
      const num = Number(val);
      return num >= 0 && num < 1000;
    }, "Radius must be between 1 and 1000 km")
  ),
});
