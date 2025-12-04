import Joi from "joi";

const instructorValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  designation: Joi.string().allow("").optional(),
  bio: Joi.string().allow("").optional(),
  profileImage: Joi.string().uri().allow("").optional().messages({
    "string.uri": "Profile image must be a valid URL",
  }),
});

export default instructorValidation;
