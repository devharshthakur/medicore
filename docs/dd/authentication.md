# Authentication — Design Document

**Product design | MedCore HMS**

## 1. Purpose

Authentication confirms who is using MedCore and establishes the role and hospital boundary that apply to that user. It is the entry point to the hospital management platform and a prerequisite for protected features.

## 2. Users and roles

MedCore supports nine roles. The descriptions below define each role’s main purpose and typical responsibilities. They are not a complete list of allowed actions; exact permissions must be specified for each protected action.

- **Super Admin** — Manages the platform across hospitals. Responsibilities include onboarding hospitals, managing subscription billing, and reviewing platform-wide analytics. This is the only role with cross-hospital scope.
- **Hospital Admin** — Configures and oversees one hospital. Responsibilities include managing departments, staff, beds, hospital-level analytics, and hospital billing settings. Access remains limited to the assigned hospital.
- **Doctor** — Provides clinical care. Responsibilities include patient encounters, medical records, prescriptions, lab and radiology orders, and maintaining an availability calendar. Access must remain within the assigned hospital and permitted patient workflows.
- **Nurse** — Supports patient care and ward operations. Responsibilities include recording vitals, documenting medication administration notes, and managing ward-related work. Access must remain limited to permitted care tasks and the assigned hospital.
- **Receptionist** — Supports patient intake and front-desk workflows. Responsibilities include registering patients, scheduling appointments, and generating invoices. The PRD does not define access to clinical records; do not assume it.
- **Lab Technician** — Processes diagnostic work. Responsibilities include receiving test orders, uploading results, and approving reports. Access should be limited to permitted lab workflows and the assigned hospital.
- **Pharmacist** — Supports safe medicine dispensing and stock control. Responsibilities include verifying prescriptions, dispensing medicines, and managing inventory within the assigned hospital.
- **Accountant** — Handles hospital financial workflows. Responsibilities include financial reports, insurance claims, and payment reconciliation. The PRD does not define access to clinical data; do not assume it.
- **Patient** — Uses patient-facing services. Responsibilities include booking appointments, viewing their own records, downloading reports, and managing payments. A Patient must never access another patient’s data.

## 3. Mandatory access boundaries

- Super Admin may operate across hospital tenants.
- Every other role is scoped to its own hospital at authentication. Requests must not expose another hospital’s data, even when a user guesses or changes an identifier.
- Patients may access only their own data.
- Every protected endpoint or action must declare and enforce its permitted roles. Maintain a role-to-action permissions matrix; the PRD does not provide the complete matrix.

## 4. Main authentication journey

1. **Account creation:** The system creates an account, but who may create accounts and assign roles is still undecided.
2. **Verification:** Confirm email with a six-digit OTP and confirm phone with an SMS OTP. The PRD requires both verification flows but does not say whether both must finish before first sign-in.
3. **Sign-in:** A successful login issues an access token with a 15-minute lifetime and a refresh token with a 7-day lifetime in an HTTP-only cookie.
4. **Session renewal:** Each refresh issues a new refresh token and invalidates the old token. A used refresh token cannot be reused.
5. **Current-user context:** Provide the signed-in user’s profile and permissions so the application can present appropriate workflows. Server-side checks remain authoritative.
6. **Sign-out:** Revoke the current device’s refresh session. Support signing out all devices by revoking all of the user’s sessions.
7. **Password recovery:** Send a reset link by email. Validate the reset token before updating the stored password.

## 5. Required capabilities

- Registration with email verification.
- Sign-in and sign-out, including per-device session revocation and revocation of all sessions.
- Access-token refresh with one-time refresh-token rotation.
- Password recovery and password reset.
- Email OTP verification and phone SMS OTP verification.
- A current-user profile that includes permissions.

## 6. Security requirements

- Hash passwords using bcrypt with cost factor at least 12, or an equivalent-strength approach.
- Never log passwords, tokens, or OTPs; sanitize logs.
- Apply the authentication rate limit: 100 requests per 15 minutes per IP.
- Use HTTPS everywhere and configure strict frontend-origin allow-lists.
- Use SameSite=Strict cookies and CSRF protection on state-changing requests.
- Validate input on both client and server.

## 7. Important exceptions and failure cases

- Reject expired, invalid, or previously used refresh tokens. Do not issue a new session from a revoked token.
- Reject access to another hospital’s records, even if the caller supplies a valid-looking identifier.
- Reject a Patient’s attempt to read another patient’s record.
- Do not treat a role label alone as permission for every action; enforce the configured action-level permissions.
- The PRD does not define OTP expiry, resend limits, lockout behavior, account suspension, duplicate-account handling, or recovery for an inaccessible email or phone. These remain open decisions.

## 8. Open product decisions

- Can patients register themselves, or must a hospital create their accounts?
- Who creates staff accounts, assigns roles, changes roles, and removes access?
- Who assigns hospital membership? Can a person belong to more than one hospital? The current cross-cutting rule says non-Super Admin users are scoped to one hospital.
- Must email and phone verification both complete before the user can sign in or access protected workflows?
- Which roles require a phone number? The PRD does not define role-specific exceptions.
- What are the OTP expiration and resend rules, and what happens after repeated failed attempts?
- What precise action-level permissions apply to each role? The role responsibilities above come from the PRD; the full permissions matrix is still required.
