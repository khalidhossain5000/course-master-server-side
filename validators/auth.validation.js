import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string().min(5).max(40).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 5 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Please provide a valid email",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});
