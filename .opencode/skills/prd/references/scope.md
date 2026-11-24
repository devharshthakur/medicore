# Scope

## In scope

### Foundation

- Project scaffold: monorepo structure, containerised local services, environment config
- PostgreSQL schema covering all core models, with migrations
- Authentication: access and refresh sessions, email OTP verification
- Role-based access control for all 9 roles
- Hospital onboarding: Super Admin creates and verifies a hospital
- Department and doctor profile setup

### Clinical

- Doctor availability calendar: weekly schedule with configurable time slots
- Appointment booking engine with conflict detection
- Appointment status lifecycle: PENDING → CONFIRMED → IN_PROGRESS → COMPLETED
- Electronic Medical Record created during an appointment encounter
- Vitals, diagnosis, treatment plan, allergy and medication history
- Prescriptions: medicine search, dosage, frequency, PDF export
- Laboratory: doctor creates test orders, lab tech uploads results, approval workflow
- Pharmacy: medicine inventory, expiry tracking, prescription fulfilment

### Financial and communication

- Billing: invoice generation, line items from all departments, online payment gateway integration (Stripe and Razorpay)
- Real-time notifications: in-app, email, SMS
- Patient portal: view records, download reports, track invoices, make payments

### Insight and delivery

- Role-specific dashboards with charts: revenue, appointments, patient growth
- Global search with filters and pagination across patients, doctors, medicines
- Unit tests for core services, integration tests for critical API paths
- Production container configuration, reverse proxy, SSL
- Seed demo data, README, generated API docs

## Out of scope (this version)

- Video consultation (WebRTC / Daily.co)
- DICOM image rendering (radiology viewer)
- AI-assisted diagnostics or ML predictions
- Native mobile apps (iOS / Android)
- HL7 / FHIR interoperability connectors
