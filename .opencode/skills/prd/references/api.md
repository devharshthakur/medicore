# API contract

RESTful, with consistent response envelopes and error shapes. Share request and response types between frontend and backend.

## Response envelope

```jsonc
// Success
{ "success": true, "data": { /* ... */ }, "message": "OK" }

// Error
{ "success": false, "error": { "code": "SLOT_UNAVAILABLE", "message": "This slot was just booked by another patient." } }

// Paginated list
{ "success": true, "data": [], "meta": { "page": 1, "limit": 20, "total": 348, "totalPages": 18 } }
```

## Core endpoints

| Module        | Method + path                            | Auth required                  |
| ------------- | ---------------------------------------- | ------------------------------ |
| Auth          | POST /auth/login                         | Public                         |
| Auth          | POST /auth/refresh                       | Refresh token                  |
| Users         | GET /users/:id                           | Self or Admin                  |
| Hospitals     | GET /hospitals                           | Super Admin                    |
| Departments   | GET /hospitals/:id/departments           | Hospital staff                 |
| Doctors       | GET /doctors?hospitalId=&specialisation= | Any authenticated              |
| Appointments  | POST /appointments                       | Patient / Receptionist         |
| Appointments  | PATCH /appointments/:id/status           | Doctor / Receptionist          |
| EMR           | POST /medical-records                    | Doctor                         |
| EMR           | GET /medical-records/:patientId          | Doctor / Nurse / Patient (own) |
| Prescriptions | POST /prescriptions                      | Doctor                         |
| Prescriptions | GET /prescriptions/:id/pdf               | Doctor / Patient (own)         |
| Lab Orders    | POST /lab-orders                         | Doctor                         |
| Lab Results   | PATCH /lab-orders/:id/result             | Lab Technician                 |
| Medicines     | GET /medicines?search=&hospitalId=       | Pharmacist / Doctor            |
| Invoices      | POST /invoices                           | Receptionist / Accountant      |
| Payments      | POST /payments/webhook/stripe            | Stripe (signature verified)    |
| Analytics     | GET /analytics/revenue?from=&to=         | Admin / Accountant             |
| Notifications | GET /notifications/me                    | Any authenticated              |

Auth module endpoints are listed in `modules/auth.md`. Paths are illustrative; the project may change them if the contract stays consistent. Every endpoint needs API documentation.
