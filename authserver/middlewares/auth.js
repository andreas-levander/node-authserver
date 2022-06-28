import { verifyToken } from "../services/tokens.js";
import roles from "../schemas/roles.js";

const auth = async (request, response, next) => {
  const payload = await verifyToken(request.token);
  if (!payload || !payload.roles.includes(roles.admin))
    return response.status(401).json({ error: "unauthorized" });

  request.user = payload.username;

  next();
};

export default auth;
