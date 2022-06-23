import Ajv from "ajv";
import { USERNAME_MINLENGTH } from "../../utils/config.js";

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: USERNAME_MINLENGTH },
  },
  required: ["username"],
  additionalProperties: false,
};

const removeUserValidate = ajv.compile(schema);

export default removeUserValidate;
