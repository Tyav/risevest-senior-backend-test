import { body } from "express-validator";

export const createUserValidator = [
  body("name", "Name of new user ")
    .isLength({
      min: 3,
      max: 200,
    })
    .exists()
    .trim()
    .escape(),
  body("email", "Email of user")
    .isLength({
      min: 3,
      max: 200,
    })
    .exists()
    .isEmail()
    .trim()
    .escape(),
];
