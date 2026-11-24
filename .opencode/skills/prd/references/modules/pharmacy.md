# Pharmacy module

Manages medicine stock and fulfils prescriptions. Expiry tracking and low-stock alerts are patient-safety features.

## Inventory rules

- Each medicine batch has: batch number, manufacturing date, expiry date, quantity, unit cost, MRP.
- FIFO dispensing: the oldest batch is consumed first.
- Low-stock alert when quantity falls below the reorder level, which is configurable per medicine.
- Expired stock is flagged and quarantined. It cannot be dispensed, and dispensing it raises a validation error.

## Jobs

A nightly job scans for medicines expiring within 30 days and sends a report to the Pharmacist and Hospital Admin.

## Roles

Pharmacist verifies prescriptions, dispenses, and manages inventory. Doctors can search medicines.
