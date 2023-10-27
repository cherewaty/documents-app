import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";

const db = factory({
  document: {
    id: primaryKey(faker.string.uuid),
    type: String,
    description: faker.lorem.sentence,
    amount: faker.finance.amount,
  },
});

for (let i = 0; i < 10; i++) {
  db.document.create();
}

export const handlers = [...db.document.toHandlers("rest", "/api")];
