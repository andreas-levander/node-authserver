import Ajv, { JSONSchemaType } from "ajv";
import roles from "../roles.js";
import { USERNAME_MINLENGTH } from "../../utils/config.js";

const ajv = new Ajv.default();

interface NewUser {
  username: string;
  roles: string[];
}

const schema: JSONSchemaType<NewUser> = {
  type: "object",
  properties: {
    username: { type: "string", minLength: USERNAME_MINLENGTH },
    roles: {
      type: "array",
      minItems: 1,
      uniqueItems: true,
      items: { type: "string", enum: Object.values(roles) },
    },
  },
  required: ["username", "roles"],
  additionalProperties: false,
};

const newUserValidate = ajv.compile(schema);

export default newUserValidate;
