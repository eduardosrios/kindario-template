# Security Policy

## Supported Version

Security fixes are applied to the latest state of the `main` branch.

## Reporting a Vulnerability

Do not open public issues for security vulnerabilities.

Instead, contact the repository owner through GitHub and include:

- A clear summary of the issue
- Steps to reproduce it
- The affected file, asset, dependency, or interaction
- The expected risk or impact
- Any suggested remediation if available

## Relevant Security Scope

For this repository, valid reports may include:

- Cross-site scripting or unsafe DOM injection
- Insecure third-party assets or scripts
- Exposed secrets, keys, or tokens
- Misleading donation UX that could harm user trust
- Accessibility regressions that create serious user risk
- Dependency vulnerabilities in project tooling

## Out of Scope

The repository itself is a static template. It does not process live donations, store donor records, or manage production infrastructure by default. Security issues in downstream deployments, payment providers, analytics tools, or custom hosting stacks should be reported to the operators of those systems.
