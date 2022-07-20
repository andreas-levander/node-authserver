import Joi from "joi";
import ejv from "express-joi-validation";
import {
  createValidator,
  ValidatedRequestSchema,
} from "express-joi-validation";
const { ContainerTypes } = ejv;

const loginSchema = Joi.object({
  username: Joi.string().optional(),
  password: Joi.string().optional(),
});

interface LoginRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    username?: string;
    password?: string;
  };
  [ContainerTypes.Body]: {
    username?: string;
    password?: string;
  };
}

const loginQueryValidator = createValidator({ passError: true }).query(
  loginSchema
);
const loginBodyValidator = createValidator({ passError: true }).body(
  loginSchema
);

export { loginQueryValidator, loginBodyValidator, LoginRequestSchema };
