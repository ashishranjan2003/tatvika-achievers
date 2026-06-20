"""
Seed database with default sections.

Run from backend root:
  python -m app.scripts.seed_db
"""

import asyncio
from datetime import datetime

from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import DATABASE_NAME, MONGO_URI


async def seed_sections(client: AsyncIOMotorClient):
    """Create default sections in MongoDB."""
    db = client[DATABASE_NAME]
    collection = db.content_sections

    default_sections = [
        {
            'section_id': 'lectures-academic',
            'menu_label': 'Lectures',
            'route_path': '/courses',
            'parent_label': 'Courses',
            'targets': ['Academic'],
            'current_status': 'active',
            'title': 'Academic Lectures',
            'subtitle': 'Browse lecture packs by subject and class.',
            'filters': ['All Subjects', 'Accounts', 'Economics', 'Business Studies'],
            'cards': [
                {
                    'id': 'lecture-1',
                    'title': 'Accountancy Basics',
                    'subject': 'Accounts',
                    'class_section': '11th Class',
                    'price': '₹450',
                    'duration': 90,
                    'action_url': '/purchase?item=lecture-1',
                    'action_label': 'View',
                }
            ],
            'updated_at': datetime.utcnow(),
        },
        {
            'section_id': 'books-academic',
            'menu_label': 'Book',
            'route_path': '/notes',
            'parent_label': 'Book',
            'targets': ['Academic'],
            'current_status': 'coming_soon',
            'heading': 'Study Notes Coming Soon',
            'subheading': 'Download chapter-wise notes and quick revision sheets.',
            'preview_items': ['Chapter Summaries', 'Quick Revision', 'Formulas & Concepts'],
            'cta_label': 'Notify me when live',
            'updated_at': datetime.utcnow(),
        },
        {
            'section_id': 'tests-academic',
            'menu_label': 'Test Series',
            'route_path': '/tests',
            'parent_label': 'Test Series',
            'targets': ['Academic'],
            'current_status': 'empty',
            'title': 'Test Series',
            'message': 'No tests available right now.',
            'guidance': 'Check back soon for mock tests, practice papers, and analytics.',
            'updated_at': datetime.utcnow(),
        },
        {
            'section_id': 'resources-free',
            'menu_label': 'Free Resources',
            'route_path': '/resources',
            'parent_label': 'Resources',
            'targets': ['Free'],
            'current_status': 'active',
            'title': 'Free Resources',
            'subtitle': 'Download free study materials curated by our experts.',
            'filters': ['All', 'Mindmaps', 'Summaries', 'Formulas'],
            'cards': [
                {
                    'id': 'resource-1',
                    'title': 'Accounts Chapter 1 Mindmap',
                    'subject': 'Accounts',
                    'size': '2 MB PDF',
                    'tags': ['Mindmap', 'Accounts'],
                    'preview_url': '/preview/resource-1',
                    'download_url': '/download/resource-1',
                }
            ],
            'updated_at': datetime.utcnow(),
        },
    ]

    for section in default_sections:
        result = await collection.update_one(
            {'section_id': section['section_id']},
            {'$set': section},
            upsert=True,
        )
        status = 'inserted' if result.upserted_id else 'updated'
        print(f"✓ {section['section_id']} ({status})")

    print(f"\nSeeded {len(default_sections)} sections into MongoDB.")


async def create_indexes(client: AsyncIOMotorClient):
    """Create database indexes for performance and uniqueness."""
    db = client[DATABASE_NAME]
    collection = db.content_sections

    # Unique index on section_id
    await collection.create_index('section_id', unique=True)
    print("✓ Created unique index on section_id")

    # Text search index for titles and subtitles
    await collection.create_index([('title', 'text'), ('subtitle', 'text')])
    print("✓ Created text index on title and subtitle")


async def main():
    """Run seed and index setup."""
    client = AsyncIOMotorClient(MONGO_URI)
    try:
        print('Creating indexes...')
        await create_indexes(client)

        print('\nSeeding default sections...')
        await seed_sections(client)

        print('\n✅ Database setup complete!')
    finally:
        client.close()


if __name__ == '__main__':
    asyncio.run(main())
