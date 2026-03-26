import { z } from "zod";
const loginSchema = z.object({
  userEmail: z.email({ message: "Invalid email" }),
  password: z
    .string({ message: "password must be an string" })
    .regex(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!@#$%^&*]).{8,}$/, {
      message:
        "password should contain atleast 8 characters one uppercase and one special character",
    }),
});
export default loginSchema;
