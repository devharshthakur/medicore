# Laboratory module

Lab technicians receive orders created by doctors. Results go through a review workflow before the patient can see them.

## Workflow

1. Doctor creates a LabOrder (linked to a MedicalRecord) with one or more tests.
2. Receptionist or Lab Tech receives the order. Status becomes SAMPLE_COLLECTED.
3. Lab Tech processes the sample and uploads a structured result or a PDF report.
4. Senior Lab Tech or Lab Manager reviews and approves the report.
5. Patient and Doctor are notified. The report is now visible in both portals.

## Rules

- Reference ranges are stored in the database. Out-of-range values are flagged (red) on the report.
- A patient cannot see a result before approval.
- Approved reports trigger "Lab report approved" notifications. See `notifications.md`.
