# Tatvika Database Design

## 1. Overview

The database is designed to support a fully dynamic e-learning platform where the frontend UI for:

- Lectures
- Book
- Test Series
- Free Resources
- Professional / coming-soon sections

is driven from MongoDB instead of hard-coded constants.

The design supports three layout modes:

- active
- empty
- coming_soon

---

## 2. Design Principles

1. Section-driven storage
   Every UI area is represented as a section document in MongoDB.

2. Admin-first content control
   The admin panel can update the layout, status, cards, and CTA fields without React code changes.

3. Frontend compatibility
   Field names are designed to align with current frontend usage and to allow simple mapping to React components.

4. Flexible state model
   The same section can transition between live, empty, and upcoming states.

---

## 3. Core Collections

### 3.1 content_sections
Primary collection for dynamic page layout data.

#### Purpose
Stores:
- section identity
- page route
- section title/subtitle
- current status
- content cards
- filters/tags
- CTA / waitlist implementation details

#### Recommended schema

{
  "section_id": "string",
  "menu_label": "string",
  "route_path": "string",
  "parent_label": "string | null",
  "targets": ["string"],
  "current_status": "active | empty | coming_soon",
  "title": "string",
  "subtitle": "string | null",
  "filters": ["string"],
  "cards": [
    {
      "id": "string",
      "title": "string",
      "subject": "string",
      "class_section": "string | null",
      "price": "string | null",
      "actual_price": "string | null",
      "questions": 0,
      "duration": 0,
      "tags": ["string"],
      "type": "lecture | note | test | resource"
    }
  ],
  "message": "string | null",
  "guidance": "string | null",
  "heading": "string | null",
  "subheading": "string | null",
  "preview_items": ["string"],
  "cta_label": "string | null",
  "created_at": "ISODate",
  "updated_at": "ISODate"
}

#### Notes
- `cards` should be an array of flexible objects so the same schema can serve lecture, note, and test content.
- `current_status` drives UI rendering behavior in the frontend.

---

### 3.2 content_items
Secondary collection for reusable item-level content.

#### Purpose
Stores individual content entities that can be referenced by one or more sections.

#### Recommended schema

{
  "item_id": "string",
  "section_id": "string",
  "type": "lecture | note | test | resource",
  "title": "string",
  "subject": "string",
  "class_section": "string | null",
  "price": "string | null",
  "actual_price": "string | null",
  "questions": 0,
  "duration": 0,
  "tags": ["string"],
  "is_active": true,
  "created_at": "ISODate",
  "updated_at": "ISODate"
}

#### Why this collection exists
This allows the admin panel to manage a single base item catalog and then attach those items to different sections.

---

### 3.3 waitlist_signups
Collection for capturing interest in future launch content.

#### Recommended schema

{
  "signup_id": "string",
  "section_id": "string",
  "email": "string",
  "name": "string | null",
  "phone": "string | null",
  "source": "notify-me | professional-launch",
  "created_at": "ISODate"
}

#### Use cases
- Professional section launch list
- Waitlist capture for future content
- Email notification follow-up

---

### 3.4 admin_users
Collection for future admin authentication and audit control.

#### Recommended schema

{
  "admin_id": "string",
  "email": "string",
  "password_hash": "string",
  "role": "super_admin | editor",
  "is_active": true,
  "created_at": "ISODate"
}

---

## 4. State Model Mapping

The following mapping should be used by the backend and frontend together:

| current_status | UI rendering behavior | Required fields |
|---|---|---|
| active | Show cards / filters / metadata | title, subtitle, cards, filters |
| empty | Show guidance / empty-state message | title, message, guidance |
| coming_soon | Show launch card / waitlist CTA | heading, subheading, preview_items, cta_label |

This is the core model used by the portal API.

---

## 5. Example Documents

### 5.1 Lectures - active

{
  "section_id": "lectures-academic",
  "menu_label": "Lectures",
  "route_path": "/courses",
  "current_status": "active",
  "title": "Academic lectures",
  "subtitle": "Choose classes and start learning",
  "filters": ["All subjects", "Accounts", "Economics"],
  "cards": [
    {
      "id": "lecture-1",
      "title": "Accounts Masterclass",
      "subject": "Accounts",
      "class_section": "11th Class",
      "price": "₹750"
    }
  ]
}

### 5.2 Book - empty

{
  "section_id": "books-academic",
  "menu_label": "Book",
  "route_path": "/notes",
  "current_status": "empty",
  "title": "Book section",
  "message": "No book items are available for this selection yet.",
  "guidance": "Select a different class or publish content from the admin panel."
}

### 5.3 Professional - coming_soon

{
  "section_id": "professional-launch",
  "menu_label": "Professional",
  "route_path": "/courses",
  "current_status": "coming_soon",
  "heading": "Professional courses launching soon",
  "subheading": "Foundation & Post-Foundation content is being prepared.",
  "preview_items": [
    "Foundation level notes & lectures",
    "Post-Foundation exam prep packs",
    "Mock test series"
  ],
  "cta_label": "Notify me when live"
}

---

## 6. Query Patterns

### 6.1 Fetch all dynamic sections
Use a simple query over `content_sections`.

### 6.2 Fetch one section by route
Query by:
- `route_path`
- or `section_id`

### 6.3 Fetch cards for one section
Use `section_id` and return `cards` array.

### 6.4 Update layout from admin panel
Use `upsert` with `section_id` as the immutable key.

---

## 7. Index Recommendations

Create indexes for fast admin and portal access:

- `content_sections.section_id` -> unique
- `content_sections.route_path` -> indexed
- `content_sections.menu_label` -> indexed
- `content_items.section_id` -> indexed
- `waitlist_signups.section_id` -> indexed

---

## 8. Validation Rules

The database should always enforce:

- `current_status` must be one of `active`, `empty`, `coming_soon`
- `section_id` must be unique
- `menu_label` and `route_path` must be present for portal rendering
- `cards` must be an array when `current_status = active`
- `preview_items` must be an array when `current_status = coming_soon`

---

## 9. Admin Panel Workflow

1. Open the admin module.
2. Select a section.
3. Choose status: active / empty / coming_soon.
4. Edit metadata and content cards.
5. Save the response to MongoDB.
6. Frontend immediately reflects the updated state through the portal APIs.

---

## 10. Expected Outcome

This database design enables the platform to become a true content-driven system:

- Lectures can change from live cards to empty guidance
- Professional sections can become launch/waitlist pages
- Book and Test Series content can be edited and filtered dynamically
- Admin users can control the entire front-end presentation without touching React component logic
