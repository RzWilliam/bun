import { Elysia } from "elysia";

export const auth = (app: Elysia) =>
    
  app.derive(async ({ request: { headers }, jwt, set }) => {
    try {
      const getToken = headers.get("X-Authorization");
      if (!getToken) throw new Error("No token");
      const decoded = await jwt.verify(getToken, process.env.JWT_SECRET);
      if (decoded.userId) {
        return decoded;
      } else {
        throw new Error("Invalid Token");
      }
    } catch (err) {
      set.status = 300;
      return console.log(err);
    }
  });