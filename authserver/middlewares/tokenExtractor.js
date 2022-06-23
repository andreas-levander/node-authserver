const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    return response.status(401).json({ error: "no auth token in request" });
  }

  next();
};

export default tokenExtractor;
