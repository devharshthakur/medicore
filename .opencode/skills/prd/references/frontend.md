# Frontend requirements

The frontend must feel like a professional clinical tool: clean, information-dense, and fast. Reference Practo's doctor portal and Epic's Hyperspace for interaction patterns.

## Areas

- Auth screens: login, register, forgot-password, MFA
- Role-aware dashboards (doctor, patient, admin)
- Patient self-service portal
- Reusable pieces: data table, stat card, and feature components such as appointment card and prescription form

Folder structure and libraries follow the repo's Nuxt conventions, not the original Next.js layout.

## Doctor dashboard

- Today's appointments timeline, sorted by time and colour-coded by status
- Quick patient lookup search bar
- Pending lab result approvals widget
- Upcoming follow-ups calendar (mini month view)
- Recent prescriptions panel

## Hospital Admin dashboard

- KPI cards: total patients today, revenue today, occupied beds, active doctors
- Appointment volume bar chart (last 7 days)
- Department occupancy heat map
- Low-stock pharmacy alerts panel
- Recent activity log

## Quality

Responsive layouts, loading states, error states, and accessibility. Charts cover revenue, appointments, and patient growth.
