# Billing and payments

Aggregates charges from all departments (consultation fee, lab tests, medicines, room charges) into one invoice per visit.

## Invoice lifecycle

1. Items are added to a draft invoice as services are rendered during the visit.
2. Receptionist or Accountant finalises the invoice and shares it with the patient.
3. Patient pays by Stripe card, Razorpay UPI/Netbanking, or cash at the counter.
4. Payment confirmation sends a receipt email and sets the invoice status to PAID.
5. Insurance claims follow a separate TPA (Third Party Administrator) workflow.

## Rules

- An invoice total must equal the sum of its line items.
- Never trust client-side payment confirmation. Confirm through the gateway webhook and verify its signature.
- Webhook endpoint (for example `POST /payments/webhook/stripe`) is public but signature-verified.
- Tests must include a simulated payment webhook.
- Use gateway test mode in development.
