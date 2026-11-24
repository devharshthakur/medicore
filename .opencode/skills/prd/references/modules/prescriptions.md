# Prescription module

Doctors issue prescriptions at the end of an encounter. A prescription links to a medical record and can be printed or downloaded as a signed PDF.

## Fields (per item)

- Medicine name, searchable from the pharmacy inventory
- Form: tablet / capsule / syrup / injection / topical
- Dosage (for example 500 mg), frequency (OD / BD / TDS / QID / SOS), duration in days
- Special instructions (take after food, avoid sunlight, and so on)
- Doctor's digital signature, stored as SVG or PNG and overlaid on the PDF

## PDF

The PDF should look professional and carry the hospital letterhead. Build it from an HTML template if practical.

## Related

- The Pharmacist verifies and dispenses. See `pharmacy.md`.
- "Prescription ready at pharmacy" triggers a notification. See `notifications.md`.
