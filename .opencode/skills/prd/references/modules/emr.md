# Electronic Medical Records (EMR)

A medical record is created when a doctor starts an appointment encounter. It is **append-only**: doctors can add notes but cannot delete past entries. Records are never permanently deleted.

## Data points

- Vitals: BP, pulse, temperature, SpO2, height, weight, BMI (auto-calculated)
- Chief complaint and presenting symptoms
- Differential and confirmed diagnosis (ICD-10 codes where possible)
- Treatment plan with instructions
- Allergies and adverse drug reactions
- Vaccination history: date, vaccine name, batch number, next due date
- Family history flags: diabetes, hypertension, cancer, cardiac
- Attached files: scanned documents and images, max 20 MB per file, in object storage

## Privacy

Records must be encrypted in transit and at rest. Sensitive fields (diagnosis, notes) need column-level encryption, or a documented reason why row-level security is sufficient.

## Access

Doctor and Nurse may read. A Patient may read only their own. Another hospital's staff may never read them.
