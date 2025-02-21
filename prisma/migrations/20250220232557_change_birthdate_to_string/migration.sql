-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_customers" ("address", "birthdate", "created_at", "email", "id", "name", "phone") SELECT "address", "birthdate", "created_at", "email", "id", "name", "phone" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
