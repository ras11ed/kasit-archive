@"
# KASIT ARCHIVE

KASIT ARCHIVE is an AI-powered academic document archiving and quality intelligence platform designed for managing, indexing, searching, and analyzing academic documents using AI and Retrieval-Augmented Generation (RAG).

## Project Structure

- `frontend/` — Web application and user interface
- `backend/` — Server-side logic and APIs
- `ai/` — Document processing, embeddings, RAG, LLM, and AI Agent components
- `database/` — Database schemas, migrations, and database-related configuration
- `docs/` — Project documentation
- `tests/` — Automated tests
- `docker/` — Docker and development environment configuration

## Technology Stack

### Web Application

- Next.js
- React
- TypeScript

### Backend

- Next.js Server-Side APIs / Route Handlers
- Server-side business logic
- REST APIs

### Authentication & Authorization

- Auth0
- Role-Based Access Control (RBAC)
- User and group permissions

### Database

- Neon PostgreSQL
- Document metadata
- Users and permissions
- Document processing status
- Indexed document data
- Vector embeddings

### Storage

- File Storage Bucket
- Original uploaded documents
- Document files and related assets

### AI

- AI SDK
- AI Agent
- OCR
- Text Extraction
- Document Processing
- Embeddings
- Semantic Search
- Retrieval-Augmented Generation (RAG)
- Large Language Models (LLMs)

### Core Workflow

```text
User Upload
    ↓
Storage Bucket
    ↓
Document Processing
    ↓
Text Extraction / OCR
    ↓
Chunking
    ↓
Embeddings
    ↓
Indexed Document
    ↓
Database