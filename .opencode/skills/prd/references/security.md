# Security requirements

Medical data is highly sensitive. These requirements are non-negotiable.

| Control                | Requirement                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------ |
| Password hashing       | bcrypt, cost factor at least 12 (or equivalent strength)                             |
| Transport security     | HTTPS everywhere; HTTP redirects to HTTPS at the proxy                               |
| Secrets                | At least 256-bit random secrets, in environment variables only. Never commit `.env`. |
| Refresh token rotation | New refresh token on every use; old one invalidated                                  |
| Rate limiting          | 100 req / 15 min per IP on auth endpoints; 1000 req / min on the API                 |
| CORS                   | Strict allow-list of frontend domains                                                |
| Security headers       | All recommended HTTP security headers enabled                                        |
| SQL injection          | Parameterised queries only; no raw SQL built from user input                         |
| XSS                    | Sanitise all user-supplied HTML                                                      |
| CSRF                   | SameSite=Strict cookies; CSRF token on state-changing requests                       |
| Input validation       | Schema validation on both client and server                                          |
| Audit logging          | Every create/update/delete logged with userId, IP, timestamp                         |
| File upload            | Validate MIME type and extension; scan for malware or reject executables             |
| Data encryption        | Sensitive columns (diagnosis, notes) encrypted at rest                               |

Set up error monitoring from day one so background-job failures are not silent. Never log passwords, tokens, or OTPs.
