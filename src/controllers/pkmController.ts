import { Elysia, t } from "elysia";
import Pkm from "../models/pkmModel";

export const pkmController = (app: Elysia) =>
  app
    .get("/", async () => {
      const pkms = await Pkm.find();

      return pkms;
    })

    .post("/new", async (handler: Elysia.Handler) => {
      try {
        const newPkm = new Pkm();
        newPkm.name = handler.body.name;
        newPkm.type = handler.body.type;
        newPkm.level = handler.body.level;

        const savePkm = await newPkm.save();

        return console.log("Created" + savePkm);
      } catch (err) {
        return console.log(err);
      }
    })

    .delete("/delete/:id", async (handler: Elysia.handler) => {
      try {
        const pkmToDelete = await Pkm.findByIdAndDelete(handler.params.id);

        return console.log("Deleted : " + pkmToDelete);
      } catch (err) {
        return console.log(err);
      }
    })

    .put("update/:id", async (handler: Elysia.handler) => {
      try {
        const updatePkm = await Pkm.findByIdAndUpdate(handler.params.id);

        if (!updatePkm) throw new Error("No Pkm found");

        handler.body.name ? (updatePkm.name = handler.body.name) : "";
        handler.body.type ? (updatePkm.type = handler.body.type) : "";
        handler.body.level ? (updatePkm.level = handler.body.level) : "";

        const savePkm = await updatePkm.save();

        return console.log("Updated :" + updatePkm + savePkm);
      } catch (err) {
        return console.log(err);
      }
    });
