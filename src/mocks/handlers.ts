import { rest } from "msw";

export const handlers = [
  rest.get("/resource", (req, res, ctx) => {
    return res(
      ctx.json({
        firstName: "Hello",
        lastName: "World",
      })
    );
  }),
];
