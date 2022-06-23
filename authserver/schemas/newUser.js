import Ajv from "ajv";
import { roles } from "../services/tokens.js";

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 5 },
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

const userValidate = ajv.compile(schema);

export default userValidate;
