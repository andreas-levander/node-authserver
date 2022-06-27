import { verifyToken } from "../services/tokens.js";

const auth = async (request, response, next) => {
  const payload = await verifyToken(request.token);
  if (!payload || !payload.roles.includes("admin"))
    return response.status(401).json({ error: "unauthorized" });

  request.user = payload.username;

  next();
};

export default auth;
