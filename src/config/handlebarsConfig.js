import handlebars from "express-handlebars";
import paths from "../utils/paths.js";

export const handlebarsConfig = (app) => {
  app.engine("handlebars", handlebars.engine());

  app.set("views", paths.views);

  app.set("view engine", "handlebars");
};
