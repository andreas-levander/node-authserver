import Joi from "joi";
import ejv from "express-joi-validation";
import {
  createValidator,
  ValidatedRequestSchema,
} from "express-joi-validation";
const { ContainerTypes } = ejv;
import roles from "../roles.js";
import { USERNAME_MINLENGTH } from "../../utils/config.js";

const newUserSchema = Joi.object({
  username: Joi.string().required().min(USERNAME_MINLENGTH).alphanum(),
  roles: Joi.array()
    .required()
    .items(Joi.string().valid(...Object.values(roles))),
});

interface NewUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    username: string;
    roles: string[];
  };
}

const newUserBodyValidator = createValidator({ passError: true }).body(
  newUserSchema
);

export { newUserBodyValidator, NewUserRequestSchema };
