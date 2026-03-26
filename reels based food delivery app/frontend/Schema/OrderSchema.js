import { z } from "zod";

const orderSchema = z.object({
  address: z.string({ message: "address must be an string" }),
});
export default orderSchema;
