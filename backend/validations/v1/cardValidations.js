const { z } = require("zod");

const createCardSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    mediaHandles: z.record(z.string().url()),
    interests: z
      .array(z.string().min(1))
      .nonempty("There should be at least one interest"),
  })
  .strict();

const updateCardSchema = createCardSchema.partial().refine(
    function(data){
        return Object.keys(data).length > 0;
    },
    {
        message: "At least one field is required to update the card."
    }
)

module.exports = {
  createCardSchema,
  updateCardSchema,
};
