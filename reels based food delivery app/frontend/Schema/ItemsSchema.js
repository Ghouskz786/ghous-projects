import { z } from "zod";
const itemSchema = z.object({
  itemName: z.string({ message: "item name must be an string" }),
  itemDescription: z
    .string({ message: "item description must be an string" })
    .optional(),
  itemContent: z.custom(
    (val) => {
      if (["video/mp4"].includes(val.type) && val.size <= 10484760) {
        return true;
      } else {
        return false;
      }
    },
    { message: "file should only be video and less than 10mbs" },
  ),
});
export default itemSchema;
