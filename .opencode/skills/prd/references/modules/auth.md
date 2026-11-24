# Authentication module

Foundation of the platform. Every other module depends on knowing who the caller is and what they may do.

## Required endpoints

- `POST /auth/register` — create account with email verification
- `POST /auth/login` — issue access token (15 min TTL) and refresh token (7 days, httpOnly cookie)
- `POST /auth/refresh` — exchange refresh token for a new access token
- `POST /auth/forgot-password` — send reset link by email
- `POST /auth/reset-password` — validate token, update hashed password
- `POST /auth/verify-email` — confirm email with a 6-digit OTP
- `POST /auth/verify-phone` — confirm phone with an SMS OTP
- `POST /auth/logout` — revoke the refresh token
- `GET /auth/me` — current user profile with permissions

## Rules

- Refresh token rotation: issue a new token on every use and invalidate the old one. A used token cannot be reused.
- Sessions are tracked per device, so a single device or all devices can be logged out.
- Hash passwords with bcrypt, cost factor at least 12 (or an equivalent the project chooses).
- Never log passwords, tokens, or OTPs. Sanitise logs.
- Hospital scope is set at authentication time.

Implementation mechanism (Better Auth) is the project's choice. The behaviours above are the requirement.
