import { factory, primaryKey } from "@mswjs/data";

const db = factory({
  document: {
    id: primaryKey(String),
    description: String,
    total: Number,
  },
});

export const handlers = [...db.document.toHandlers("rest")];
