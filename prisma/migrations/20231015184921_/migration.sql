-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patient_id" TEXT NOT NULL,
    "patient_name" TEXT NOT NULL,
    "heart_rate" REAL NOT NULL,
    "body_temperature" REAL NOT NULL,
    "patient_frequent_sickness" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_patient_id_key" ON "Patient"("patient_id");
