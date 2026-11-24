# Notification system

Notifications are generated as events inside the backend. A notification worker subscribes to the event bus and dispatches through the right channel. Channels are in-app (real-time), email, and SMS.

| Trigger event                  | Channels              |
| ------------------------------ | --------------------- |
| Appointment confirmed          | Email + SMS + In-app  |
| Appointment reminder (24h)     | Email + SMS           |
| Lab report approved            | Email + In-app push   |
| Prescription ready at pharmacy | SMS + In-app          |
| Invoice generated              | Email + In-app        |
| Payment received               | Email + SMS           |
| Low stock alert (staff only)   | Email + In-app        |
| Emergency appointment created  | In-app + SMS (doctor) |

## Design rule

Use fan-out: one event drives multiple channel handlers. Each handler runs independently, so a failed SMS never blocks the email.
