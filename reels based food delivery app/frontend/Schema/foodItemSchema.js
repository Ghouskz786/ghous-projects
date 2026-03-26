import z from "zod";
export const fooditemSchema = z.object({
  itemName: z.string({ message: "item name must be an string" }),
  itemDescription: z
    .string({ message: "item description must be an string" })
    .optional(),
  itemPrice: z.number({ message: "item price must be a number" }),
  itemContent: z.custom(
    (val) => {
      if (
        ["image/jpg", "image/jpeg", "image/png"].includes(val.type) &&
        val.size <= 10484760
      ) {
        return true;
      } else {
        return false;
      }
    },
    { message: "file should only be video and less than 10mbs" },
  ),
});
