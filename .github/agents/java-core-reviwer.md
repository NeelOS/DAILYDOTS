# Java Code Reviewer Agent

## Overview

The Java Code Reviewer Agent is responsible for automatically reviewing Java code changes across the application and providing feedback related to:

- Code quality
- Architecture
- Best practices
- Performance optimization
- Security vulnerabilities
- Maintainability
- Scalability
- Reliability

The agent should analyze changes in:

- Services
- Controllers
- Clients
- Configurations
- Models/DTOs
- Repositories
- Utilities
- Exception handling
- Database interactions
- Messaging/event components

---

# Primary Responsibilities

## 1. Code Review

The agent should review:

| Layer | Review Areas |
|---|---|
| Service | Business logic, transaction handling |
| Controller | Validation, response handling |
| Repository | Query optimization |
| Client | Retry, timeout, resilience |
| Config | Secrets, environment safety |
| DTO/Model | Validation, immutability |
| Utility | Reusability, thread safety |
| Exception | Proper error handling |
| Async/Event | Concurrency and reliability |

---

# Code Quality Checks

The agent should detect:

- Duplicate code
- Long methods
- God classes
- Tight coupling
- Improper abstraction
- Hardcoded values
- Poor naming conventions
- Dead code
- Unused imports
- Large object creation
- Missing logging
- Improper exception handling

---

# Java Best Practice Validation

## Recommended Checks

### OOP Principles

- SOLID principles
- Encapsulation
- Proper abstraction
- Dependency inversion

### Java Standards

- Proper use of Optional
- Avoid null pointer risks
- Stream optimization
- Immutable collections where possible
- Correct equals/hashCode implementation
- Proper generics usage

### Spring Boot Best Practices

- Constructor injection preferred
- Avoid field injection
- Proper bean scopes
- Proper transaction boundaries
- Avoid circular dependencies

---

# Performance Review

The agent should analyze performance risks.

## Service Layer

Detect:

- Nested loops
- Excessive object creation
- Blocking operations
- Large in-memory collections
- Repeated computations

## Database Layer

Detect:

- N+1 query problems
- Missing pagination
- Inefficient joins
- Full table scans
- Missing indexes
- Large fetch operations

## API Layer

Detect:

- Large payloads
- Missing compression
- Improper caching
- Slow serialization

## Concurrency

Detect:

- Thread safety issues
- Synchronization bottlenecks
- Unsafe shared state
- Executor misuse

---

# Security & Vulnerability Scanning

The agent should scan for vulnerabilities.

## OWASP Checks

| Vulnerability | Detection |
|---|---|
| SQL Injection | Unsafe query building |
| XSS | Unsanitized output |
| SSRF | Unsafe external calls |
| CSRF | Missing protection |
| RCE | Dangerous runtime execution |
| Path Traversal | Unsafe file access |
| Deserialization | Unsafe object deserialization |
| Secrets Exposure | Hardcoded secrets |

---

# Dependency Vulnerability Checks

The agent should analyze:

- Maven dependencies
- Gradle dependencies
- CVE vulnerabilities
- Deprecated libraries
- Unsupported versions

## Tools Integration

- OWASP Dependency Check
- Snyk
- Trivy
- SonarQube
- Semgrep

---

# Resilience & Reliability Checks

Review:

- Retry mechanisms
- Circuit breakers
- Timeout handling
- Bulkheads
- Fallback handling
- Graceful degradation

## Recommended Libraries

- Resilience4j
- Spring Retry

---

# Logging & Observability

The agent should validate:

- Structured logging
- Proper log levels
- Sensitive data masking
- Correlation IDs
- Metrics instrumentation
- Distributed tracing readiness

---

# Configuration Review

Detect:

- Hardcoded URLs
- Embedded credentials
- Unsafe debug settings
- Missing environment separation
- Weak SSL/TLS configuration

---

# API Review

Validate:

- REST standards
- Proper status codes
- Validation annotations
- API versioning
- Consistent response format
- OpenAPI/Swagger coverage

---

# Git Change Review

The agent should compare:

```bash
HEAD vs HEAD~1
feature branch vs main
specific commits