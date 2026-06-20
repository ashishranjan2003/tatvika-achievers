# Tatvika Backend Guide

## 1. Purpose

This backend is designed to make the Tatvika frontend fully dynamic from the database instead of relying on hard-coded page content.

The main frontend routes that must be configurable from the admin panel are:

- /courses  -> Lectures
- /notes    -> Book
- /tests    -> Test Series
- /resources -> Free Resources

Each of these sections can be served in one of three states:

- active: render cards, filters, metadata, CTA actions
- empty: render a guided empty state message
- coming_soon: render a rich waitlist / launch-card state

---

## 2. Frontend-to-Backend Mapping

The following frontend behavior is the source of truth for the backend contract:

### 2.1 Navigation structure
The current sidebar and route logic in the React app uses these labels and paths:

- Lectures -> /courses
- Book -> /notes
- Test Series -> /tests
- Free Resources -> /resources

The backend must expose these through `/api/v1/portal/navigation` and `/api/v1/portal/sections`.

### 2.2 Dynamic section states
The frontend currently supports:

- product card grids for Lectures / Books
- test metadata cards for Test Series
- subject / filter chips
- coming soon placeholders
- empty guidance blocks

These are the exact states the backend should store and return from MongoDB.

### 2.3 Admin-controlled content model
Admin operations must be able to:

- create/update a section layout
- switch current_status between active / empty / coming_soon
- update cards, filters, titles, subtitles, CTA labels
- update coming-soon preview checklist text
- update waitlist messaging and empty-state guidance

---

## 3. Backend Architecture

### 3.1 Stack

- FastAPI for REST API layer
- Motor (Async MongoDB driver) for asynchronous DB access
- Pydantic v2 for request/response validation
- MongoDB collections for dynamic content and admin state

### 3.2 Folder structure

backend/
  app/
    main.py
    database.py
    core/
      config.py
    models/
      common.py
      courses.py
      admin.py
    routes/
      portal.py
      admin.py
    crud/
      portal.py
      admin.py

---

## 4. Data Flow

1. Admin updates a section in the admin panel.
2. Admin API writes the section document to MongoDB.
3. Frontend calls portal APIs to fetch the section and its layout.
4. Frontend renders the section based on `current_status` and the returned schema.

This design allows the same UI to behave as:

- a content grid
- a guided empty state
- a launch/waitlist state

without changing frontend route code for each section.

---

## 5. MongoDB Collections

### 5.1 content_sections
Purpose: store section layout, content cards, status, and UI configuration.

Recommended document shape:

{
  "section_id": "lectures-academic",
  "menu_label": "Lectures",
  "route_path": "/courses",
  "parent_label": "Courses",
  "targets": ["Academic", "Professional"],
  "current_status": "active",
  "title": "Academic lectures",
  "subtitle": "Browse lecture packs by class",
  "filters": ["All subjects", "Accounts", "Economics"],
  "cards": [
    {
      "id": "lecture-1",
      "title": "Accounts Masterclass",
      "subject": "Accounts",
      "class_section": "11th Class",
      "price": "₹750",
      "actual_price": "₹1,000"
    }
  ],
  "updated_at": "2026-06-14T12:00:00"
}

### 5.2 content_items
Purpose: store reusable content entries for all sections.

Example:

{
  "item_id": "lecture-1",
  "section_id": "lectures-academic",
  "type": "lecture",
  "title": "Accounts Masterclass",
  "subject": "Accounts",
  "class_section": "11th Class",
  "price": "₹750",
  "questions": 0,
  "duration": 90,
  "is_featured": true
}

### 5.3 waitlist_signups
Purpose: capture visitors interested in professional / coming soon content.

Example:

{
  "email": "student@example.com",
  "section_id": "professional-launch",
  "source": "notify-me",
  "created_at": "2026-06-14T12:00:00"
}

### 5.4 admin_users
Purpose: secure admin access in future.

Example:

{
  "admin_id": "admin-001",
  "email": "admin@tatvika.in",
  "role": "super_admin",
  "is_active": true
}

---

## 6. API Design

### 6.1 Portal APIs

GET /api/v1/portal/navigation
- Returns all top-level labels, href values, and quick metadata for sidebar rendering.

GET /api/v1/portal/sections
- Returns all section summaries for the current website.

GET /api/v1/portal/sections/{section_id}
- Returns the full layout payload for one section.
- The response must vary based on `current_status`.

POST /api/v1/portal/waitlist
- Stores a waitlist submission for a coming-soon or professional section.

### 6.2 Admin APIs

PUT /api/v1/admin/sections/{section_id}/layout
- Creates or updates the layout configuration of a section.

DELETE /api/v1/admin/sections/{section_id}
- Removes a section document from MongoDB.

---

## 7. Response Contract Rules

### 7.1 Active section response
Used when a section is live and has cards to display.

Required fields:

- section_id
- menu_label
- route_path
- layout.current_status = active
- layout.title
- layout.subtitle
- layout.cards
- layout.filters

### 7.2 Empty section response
Used when the section exists but has no usable content yet.

Required fields:

- current_status = empty
- title
- message
- guidance

### 7.3 Coming soon response
Used for professional or future-release states.

Required fields:

- current_status = coming_soon
- heading
- subheading
- preview_items
- cta_label

---

## 8. Pydantic Model Strategy

The backend should use Pydantic discriminated unions for layout responses so the API can validate different structures cleanly.

Recommended approach:

- `ActiveSectionLayout`
- `EmptySectionLayout`
- `ComingSoonLayout`

Use a union field with:

- `Field(..., discriminator='current_status')`

This guarantees the API returns the correct structure based on the stored status.

---

## 9. Admin Panel Requirements

The admin panel should be able to:

1. Choose a section (Lectures / Book / Test Series / Free Resources)
2. Select current_status
3. Write a title and subtitle
4. Add or remove cards
5. Add filters/tags
6. Update empty-state guidance text
7. Update waitlist copy and CTA text
8. Save the document to MongoDB

---

## 10. Implementation Notes

- Keep the API contract stable so the frontend does not need to know Mongo internals.
- Always validate payloads using Pydantic before DB writes.
- Return consistent field names for frontend compatibility.
- Keep section IDs predictable so the frontend can resolve the content easily.

Recommended section naming convention:

- lectures-academic
- lectures-professional
- books-academic
- books-professional
- test-series-academic
- test-series-professional
- free-resources

---

## 11. Expected Outcome

Once implemented, the admin panel can change the visual behavior of the Tatvika platform without modifying React code:

- switch Lectures from active to empty
- switch Professional content to coming_soon
- update card lists and filters from MongoDB
- control test metadata, notes, and resource cards dynamically
