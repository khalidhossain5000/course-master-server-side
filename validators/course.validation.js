import Joi from "joi";

const courseValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),

  isFree: Joi.boolean().required(),

  price: Joi.when("isFree", {
    is: true,
    then: Joi.valid(0), 
    otherwise: Joi.number().min(1).required(), // paid হলে minimum 1
  }),

  instructor: Joi.string().required(),
  category: Joi.string().required(),
  batchName: Joi.string().required(),

  thumbnail: Joi.string().uri().required(),

  lessons: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        videoUrl: Joi.string().uri().required(),
      })
    )
    .min(1)
    .required(),
});

export default courseValidation;
