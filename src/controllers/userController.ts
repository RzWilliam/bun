import { Elysia, t } from "elysia";
import User from "../models/userModel";
import { jwt } from "@elysiajs/jwt";
import { auth } from "../middleware/auth";

export const userController = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET as string,
      })
    )

    .get("/", async () => {
      const users = await User.find();

      return users;
    })

    .post("/register", async (handler: Elysia.handler) => {
      try {
        const newUser = new User();

        const password = await Bun.password.hash(handler.body.password);
        newUser.mail = handler.body.mail;
        newUser.password = password;

        const saveUser = await newUser.save();

        return console.log("Created" + saveUser);
      } catch (err) {
        return console.log(err);
      }
    })

    .post("/login", async (handler: Elysia.handler) => {
      try {
        const mail = handler.body.mail;
        const selectedUser = await User.findOne({ mail: mail });

        if (!selectedUser) throw new Error("No User found");

        const checkPassword = Bun.password.verifySync(
          handler.body.password,
          selectedUser.password
        );

        if (checkPassword) {
          const accessToken = await handler.jwt.sign({
            userId: selectedUser._id,
          });

          handler.set.headers = {
            "X-Authorization": accessToken,
          };
          handler.set.status = 201;

          return console.log("LOG SUCCESSFULLY : " + accessToken);
        } else {
          throw new Error("Mail or Password don't match");
        }
      } catch (err) {
        return console.log(err);
      }
    })

    // .use(auth)
    .delete("/delete/:id", async ({ request: { headers }, jwt, set, params }) => {
      try {
        const getToken = headers.get("X-Authorization");
        if (!getToken) throw new Error("No token");
        const decoded = await jwt.verify(getToken);
        if (decoded.userId) {
          const userToDelete = await User.findByIdAndDelete(params.id);
          if(!userToDelete)throw new Error("No user found");
          return console.log("Deleted : " + userToDelete.mail); 
        } else {
          throw new Error("Invalid Token");
        }
      } catch (err) {
        set.status = 300;
        return console.log(err);
      }
    });
