import Joi from "joi";
import ejv from "express-joi-validation";
import {
  createValidator,
  ValidatedRequestSchema,
} from "express-joi-validation";
const { ContainerTypes } = ejv;

const removeUserSchema = Joi.object({
  username: Joi.string().required(),
});

interface RemoveUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    username: string;
  };
}

const removeUserBodyValidator = createValidator({ passError: true }).body(
  removeUserSchema
);

export { removeUserBodyValidator, RemoveUserRequestSchema };
