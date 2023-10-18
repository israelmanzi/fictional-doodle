-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patient_id" TEXT NOT NULL,
    "patient_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "record_id" TEXT NOT NULL,
    "heart_rate" REAL NOT NULL,
    "body_temperature" REAL NOT NULL,
    "patient_frequent_sickness" TEXT,
    "patient_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Record_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient" ("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_patient_id_key" ON "Patient"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "Record_record_id_key" ON "Record"("record_id");
