import { Hono } from "hono";
import { DocumentationPage } from "../pages";

const docsRouter = new Hono();

docsRouter.get("/", (c) => {
  return c.html(<DocumentationPage />);
});

export default docsRouter;
