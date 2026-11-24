# Roles and permissions

| Role           | Primary responsibilities                                                               |
| -------------- | -------------------------------------------------------------------------------------- |
| Super Admin    | Platform-wide management, hospital onboarding, subscription billing, global analytics  |
| Hospital Admin | Configure hospital: departments, staff, beds, hospital-level analytics, billing config |
| Doctor         | Patient encounters, EMR, prescriptions, lab/radiology orders, availability calendar    |
| Nurse          | Vitals recording, medication administration notes, ward management                     |
| Receptionist   | Patient registration, appointment scheduling, invoice generation                       |
| Lab Technician | Receive test orders, upload results, approve reports                                   |
| Pharmacist     | Verify prescriptions, dispense medicines, manage inventory                             |
| Accountant     | Financial reports, insurance claims, payment reconciliation                            |
| Patient        | View own records, book appointments, download reports, manage payments                 |

## Rules

- Every endpoint declares which roles may call it. Enforce this in one central place.
- Super Admin is cross-tenant. All other roles are limited to their own hospital.
- A patient sees only their own data.
- Keep a permissions matrix (endpoint × role). It doubles as the test specification.
