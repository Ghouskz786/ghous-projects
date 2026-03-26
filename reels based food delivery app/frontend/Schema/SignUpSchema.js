import { z } from "zod";
const signUpSchema = z
  .object({
    userName: z.string({ message: "User name must be an string" }),
    email: z.email({ message: "Invalid email" }),
    password: z
      .string({ message: "password must be an string" })
      .regex(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!@#$%^&*]).{8,}$/, {
        message:
          "password should contain atleast 8 characters one uppercase and one special character",
      }),
    contact: z
      .string({ message: "contact number must be a string" })
      .length(12, { message: "number must be of 12 characters" })
      .regex(/^[0-9]{4}-[0-9]{7}$/, {
        message: "number should follow pattern 0300-0000000",
      }),
    verifyPassword: z.string({ message: "confirm password must be an string" }),
    role: z.string({ message: "role must be string" }).refine(
      (val) => {
        if (["user", "admin"].includes(val)) {
          return true;
        } else {
          return false;
        }
      },
      { message: "role must contain user or admin" },
    ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.verifyPassword) {
      ctx.addIssue({
        message: "confirm password doesn't matches",
      });
    }
  });
export default signUpSchema;
