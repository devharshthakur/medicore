# Data model

Normalise to 3NF. This file gives entities, relationships, and constraints. The full field list for each entity is a design task.

## Core entities

| Entity        | Relates to                          | Relationship                      |
| ------------- | ----------------------------------- | --------------------------------- |
| Hospital      | User, Department, Room              | One Hospital → Many               |
| User          | Role, Hospital                      | Many Users → One Hospital         |
| Doctor        | User, Department, Appointment       | One-to-One with User              |
| Patient       | User, Hospital                      | One-to-One with User              |
| Appointment   | Doctor, Patient, Department         | Many-to-One each                  |
| MedicalRecord | Appointment, Patient, Doctor        | One Appointment → One Record      |
| Prescription  | MedicalRecord, Medicine             | Many-to-Many via PrescriptionItem |
| LabOrder      | MedicalRecord, LabTest              | One Record → Many Orders          |
| Invoice       | Appointment, Patient                | One Appointment → One Invoice     |
| InvoiceItem   | Invoice, (Lab / Pharmacy / Consult) | Many-to-One Invoice               |
| Notification  | User, (linked entity)               | Polymorphic recipient             |
| AuditLog      | User, any entity                    | All write operations logged       |

## Constraints

- Soft delete (`deletedAt`) on Patient, Doctor, and Appointment.
- Medical records are never permanently deleted (legal and clinical requirement).
- Use a separate reusable Address model for hospitals, patients, and suppliers.
- Every hospital-specific table has `hospitalId`.
- Lab test reference ranges are stored in the database so out-of-range values can be flagged (for example haemoglobin 13.0–17.5 g/dL for males).

## Open design decisions

- Doctor availability: repeating weekly schedule vs. individual time slots.
- Prescription ↔ medicine many-to-many, where dosage, frequency, and duration differ per item.
- Lab result storage: structured key-value, file attachment, or hybrid.
- Indexes: at minimum `hospitalId`, `patientId`, `doctorId`, `appointmentDate`, and any column used in WHERE clauses. Base further indexes on query-plan evidence.

Record each decision made in the repo's own docs, not here.
