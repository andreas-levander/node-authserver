import { verifyToken } from "../services/tokens.js";

const auth = async (request, response, next) => {
  if (await verifyToken(request.token)) next();
  else return response.status(401).json({ error: "unauthorized" });
};

export default auth;
