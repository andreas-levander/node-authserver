import Ajv from "ajv";
import roles from "../roles.js";
import { USERNAME_MINLENGTH } from "../../utils/config.js";

const ajv = new Ajv();

const schema = {
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
