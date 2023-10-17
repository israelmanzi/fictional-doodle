/*
  Warnings:

  - Added the required column `updated_at` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patient_id" TEXT NOT NULL,
    "patient_name" TEXT NOT NULL,
    "heart_rate" REAL NOT NULL,
    "body_temperature" REAL NOT NULL,
    "patient_frequent_sickness" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Patient" ("body_temperature", "heart_rate", "id", "patient_frequent_sickness", "patient_id", "patient_name") SELECT "body_temperature", "heart_rate", "id", "patient_frequent_sickness", "patient_id", "patient_name" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
CREATE UNIQUE INDEX "Patient_patient_id_key" ON "Patient"("patient_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
