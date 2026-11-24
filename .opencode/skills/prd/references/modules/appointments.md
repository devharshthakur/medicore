# Appointment module

Central scheduling engine. It must handle concurrent booking and never double-book a doctor.

## Business rules

- A doctor works in one or more departments and defines time slots (for example 9:00–13:00 in 30-minute intervals).
- A patient cannot have two appointments at the same time across any doctor.
- States: PENDING → CONFIRMED → IN_PROGRESS → COMPLETED | CANCELLED | NO_SHOW.
- Emergency bookings bypass normal slot availability and are flagged EMERGENCY.
- Reminders go out 24 hours and 1 hour before, by email and SMS, as scheduled jobs.

## Concurrency

When two patients try to book the same slot at the same time, only one may succeed. Use database-level locking (`SELECT … FOR UPDATE`) or an optimistic concurrency pattern. The loser gets the error code `SLOT_UNAVAILABLE`.
