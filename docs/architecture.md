# AI Diary Architecture

## Overview

AI Diary is organized as a frontend application, an AI-focused backend service, and supporting infrastructure.

- `frontend`: Next.js application for login, upload, chat, and diary browsing.
- `services/python-api`: FastAPI service for auth, uploads, image analysis, chat, and diary generation.
- `services/go-gateway`: Optional gateway reserved for a future high-concurrency upload and API edge layer.
- `deploy`: Local development and deployment assets such as Docker Compose and Nginx.

## V1 Scope

The first version should prioritize:

1. Authentication and a minimal demo user flow
2. Image upload with metadata persistence
3. Image analysis orchestration
4. Chat session creation and message persistence
5. End-of-session diary generation
6. Diary list and detail retrieval

## Suggested Runtime Flow

1. User logs in from the Next.js frontend.
2. Frontend uploads an image to the FastAPI backend.
3. Backend stores the file in MinIO or S3 and saves metadata in PostgreSQL.
4. Backend triggers image analysis and stores the analysis result.
5. User starts a chat session using the uploaded image context.
6. When the session ends, the backend generates a diary entry and persists it.
7. Frontend loads diary history and diary detail pages from the backend API.

## Infra Notes

- PostgreSQL stores core business data.
- Redis can be used for caching, rate limiting, and async job coordination.
- MinIO is recommended for local object storage parity with S3.
- Nginx can serve as the local reverse proxy in development or production-like environments.

## Phase Recommendation

For the first milestone, keep the system simple:

- Use only `frontend` + `python-api` as mandatory services.
- Keep `go-gateway` as a reserved extension point.
- Start with synchronous APIs first, then add background jobs and WebSocket optimizations.
