import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv.default();

interface LoginData {
  username: string;
  password: string;
}

const schema: JSONSchemaType<LoginData> = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "password"],
  additionalProperties: false,
};

const loginValidate = ajv.compile(schema);

export default loginValidate;
