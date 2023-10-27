import { faker } from "@faker-js/faker";
import { factory, nullable, primaryKey } from "@mswjs/data";
import { DocumentStatus, Role } from "../types";

const db = factory({
  document: {
    id: primaryKey(faker.string.uuid),
    type: String,
    description: faker.lorem.sentence,
    amount: faker.finance.amount,
    reviewer: nullable(Number),
    status: Number,
  },
});

for (let i = 0; i < 10; i++) {
  db.document.create({
    reviewer: Role.EMPLOYEE,
    status: DocumentStatus.PENDING,
  });
}

export const handlers = [...db.document.toHandlers("rest", "/api")];
