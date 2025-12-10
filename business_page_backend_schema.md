# Business Page Backend Schema - FastAPI Implementation Guide

## Overview

This document outlines the database schema changes and API endpoints needed to fully support the business page creation form and subsequent page management features.

### Important Notes on Form Flow

The **Create Business Page** form collects core company information in **11 steps**:

1. **Basic Information** - Name, handle, description, tagline
2. **Company Details** - Industry, size, stage, legal structure
3. **Mission & Vision** - Mission, vision, values
4. **Business Details** - Services, specialties, target audience, business model
5. **Product Information** - Product name, features, pricing, integrations
6. **Market Analysis** - Target market, competition, TAM/SAM/SOM
7. **Contact & Social** - Contact info, social media links
8. **Company Culture** - Values, perks, team diversity
9. **Office Locations** - Physical offices, headquarters, remote work
10. **Achievements** - Awards, certifications, partnerships, milestones
11. **Review & Create** - Final review before submission

### Features Managed After Page Creation

The following features require user/profile selection and are managed **separately after the page is created** via dedicated management screens:

- **Team & Founders** - Link existing platform users as founders/team members
- **Investors** - Add investment firms or individuals
- **Jobs & Openings** - Create and manage job postings
- **Company Updates** - Post news and announcements

These have their own dedicated APIs documented below.

---

## Current State vs Required State

### What's Already in the API (from business_page.md)

The current `POST /api/v1/pages/` endpoint accepts these fields:

```python
# Already supported in CreatePageData
businessTitle: str          # Required
email: str                  # Required
pagePhoneNumbers: list[str] # Optional
headline: str               # Optional
tagline: str                # Optional
description: str            # Optional
websiteUrl: str             # Optional
foundedYear: int            # Optional
industry: str               # Optional
companySize: str            # Optional
companyStage: str           # Optional
legalStructure: str         # Optional
businessModel: str          # Optional
location: str               # Optional
isRemoteWorkAvailable: bool # Optional
primaryLocation: str        # Optional
headquarterLocation: str    # Optional
missionStatement: str       # Optional
visionStatement: str        # Optional
companyValues: list[str]    # Optional
specialties: list[str]      # Optional
services: list[str]         # Optional
fundingStage: str           # Optional
annualRevenue: str          # Optional
totalFundingRaised: str     # Optional
numberOfCustomers: int      # Optional
monthlyRecurringRevenue: str # Optional
monthGrowthRatePercentage: float # Optional
productName: str            # Optional
productDescription: str     # Optional
keyFeatures: list[str]      # Optional
integrations: list[str]     # Optional
```

### What's Missing (from frontend form inputs)

These fields exist in the frontend form but may not be in the backend:

---

## Database Schema Changes

### 1. Update `business_pages` Table

Add these columns to the main business_pages table:

```sql
-- Social Media Links
ALTER TABLE business_pages ADD COLUMN social_linkedin VARCHAR(500);
ALTER TABLE business_pages ADD COLUMN social_twitter VARCHAR(500);
ALTER TABLE business_pages ADD COLUMN social_facebook VARCHAR(500);
ALTER TABLE business_pages ADD COLUMN social_instagram VARCHAR(500);

-- Additional Contact Info (separate from page email)
ALTER TABLE business_pages ADD COLUMN contact_email VARCHAR(255);
ALTER TABLE business_pages ADD COLUMN contact_phone VARCHAR(50);
ALTER TABLE business_pages ADD COLUMN contact_address TEXT;

-- Achievements (stored as JSON arrays)
ALTER TABLE business_pages ADD COLUMN certifications JSONB DEFAULT '[]';
ALTER TABLE business_pages ADD COLUMN awards JSONB DEFAULT '[]';
ALTER TABLE business_pages ADD COLUMN partnerships JSONB DEFAULT '[]';
ALTER TABLE business_pages ADD COLUMN patents JSONB DEFAULT '[]';

-- Extended Metrics
ALTER TABLE business_pages ADD COLUMN mrr_amount DECIMAL(15,2);
ALTER TABLE business_pages ADD COLUMN arr_amount DECIMAL(15,2);
ALTER TABLE business_pages ADD COLUMN churn_rate DECIMAL(5,2);
ALTER TABLE business_pages ADD COLUMN customer_ltv DECIMAL(15,2);
ALTER TABLE business_pages ADD COLUMN customer_cac DECIMAL(15,2);
ALTER TABLE business_pages ADD COLUMN burn_rate DECIMAL(15,2);
ALTER TABLE business_pages ADD COLUMN runway_months INTEGER;
ALTER TABLE business_pages ADD COLUMN valuation DECIMAL(20,2);
ALTER TABLE business_pages ADD COLUMN last_funding_date DATE;
ALTER TABLE business_pages ADD COLUMN next_milestone VARCHAR(500);

-- Market Analysis
ALTER TABLE business_pages ADD COLUMN target_market TEXT;
ALTER TABLE business_pages ADD COLUMN competitive_advantage TEXT;
ALTER TABLE business_pages ADD COLUMN technology_stack JSONB DEFAULT '[]';
ALTER TABLE business_pages ADD COLUMN total_addressable_market DECIMAL(20,2);
ALTER TABLE business_pages ADD COLUMN serviceable_market DECIMAL(20,2);
ALTER TABLE business_pages ADD COLUMN obtainable_market DECIMAL(20,2);
ALTER TABLE business_pages ADD COLUMN market_growth_rate DECIMAL(5,2);
ALTER TABLE business_pages ADD COLUMN competitors JSONB DEFAULT '[]';

-- Company Culture
ALTER TABLE business_pages ADD COLUMN culture_perks JSONB DEFAULT '[]';
ALTER TABLE business_pages ADD COLUMN team_size INTEGER;
ALTER TABLE business_pages ADD COLUMN average_team_age INTEGER;
ALTER TABLE business_pages ADD COLUMN diversity_male_percent DECIMAL(5,2);
ALTER TABLE business_pages ADD COLUMN diversity_female_percent DECIMAL(5,2);

-- Other
ALTER TABLE business_pages ADD COLUMN languages JSONB DEFAULT '[]';
ALTER TABLE business_pages ADD COLUMN tags JSONB DEFAULT '[]';
ALTER TABLE business_pages ADD COLUMN timezone VARCHAR(50);
ALTER TABLE business_pages ADD COLUMN long_description TEXT;
```

---

### 2. Create New Related Tables

#### Tables for Page Creation (Achievements Step)

These tables support data collected during page creation:

##### `page_milestones` Table

```sql
CREATE TABLE page_milestones (
    id SERIAL PRIMARY KEY,
    business_page_id INTEGER NOT NULL REFERENCES business_pages(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    milestone_date DATE NOT NULL,
    category VARCHAR(100), -- 'Funding', 'Product', 'Team', 'Partnership', 'Revenue'
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_milestones_page_id ON page_milestones(business_page_id);
```

##### `page_office_locations` Table

```sql
CREATE TABLE page_office_locations (
    id SERIAL PRIMARY KEY,
    business_page_id INTEGER NOT NULL REFERENCES business_pages(id) ON DELETE CASCADE,
    city VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    country VARCHAR(100),
    office_type VARCHAR(100) NOT NULL, -- 'Headquarters', 'Branch', 'R&D', 'Sales', 'Remote Hub'
    employee_count INTEGER DEFAULT 0,
    phone VARCHAR(50),
    email VARCHAR(255),
    is_headquarters BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_office_locations_page_id ON page_office_locations(business_page_id);
```

---

#### Tables for Post-Creation Management

These tables support features managed **after page creation** via dedicated management screens:

##### `page_founders` Table

> **Note:** Founders are added after page creation, allowing linking to existing platform users.

```sql
CREATE TABLE page_founders (
    id SERIAL PRIMARY KEY,
    business_page_id INTEGER NOT NULL REFERENCES business_pages(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id), -- Optional: Link to platform user
    name VARCHAR(200) NOT NULL,
    title VARCHAR(200) NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    twitter_url VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_founders_page_id ON page_founders(business_page_id);
CREATE INDEX idx_page_founders_user_id ON page_founders(user_id);
```

##### `page_team_members` Table

> **Note:** Team members are added after page creation, allowing linking to existing platform users.

```sql
CREATE TABLE page_team_members (
    id SERIAL PRIMARY KEY,
    business_page_id INTEGER NOT NULL REFERENCES business_pages(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id), -- Optional: Link to platform user
    name VARCHAR(200) NOT NULL,
    role VARCHAR(200) NOT NULL,
    department VARCHAR(200) NOT NULL,
    avatar_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_team_members_page_id ON page_team_members(business_page_id);
CREATE INDEX idx_page_team_members_user_id ON page_team_members(user_id);
```

##### `page_investors` Table

> **Note:** Investors are added after page creation via the page management dashboard.

```sql
CREATE TABLE page_investors (
    id SERIAL PRIMARY KEY,
    business_page_id INTEGER NOT NULL REFERENCES business_pages(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'VC', 'Angel', 'Corporate', 'Accelerator', etc.
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    investment_round VARCHAR(100), -- 'Seed', 'Series A', etc.
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_investors_page_id ON page_investors(business_page_id);
```

##### `page_jobs` Table

> **Note:** Jobs are created after page creation via a dedicated job posting flow.

```sql
CREATE TABLE page_jobs (
    id SERIAL PRIMARY KEY,
    business_page_id INTEGER NOT NULL REFERENCES business_pages(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    department VARCHAR(200) NOT NULL,
    job_type VARCHAR(50) NOT NULL, -- 'Full-time', 'Part-time', 'Contract', 'Internship'
    location VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    requirements JSONB DEFAULT '[]',
    salary_range VARCHAR(100),
    is_remote BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_jobs_page_id ON page_jobs(business_page_id);
CREATE INDEX idx_page_jobs_active ON page_jobs(is_active);
```

##### `page_updates` Table

> **Note:** Updates/announcements are posted after page creation via the page management dashboard.

```sql
CREATE TABLE page_updates (
    id SERIAL PRIMARY KEY,
    business_page_id INTEGER NOT NULL REFERENCES business_pages(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id),
    author_name VARCHAR(200) NOT NULL,
    category VARCHAR(100), -- 'News', 'Product', 'Milestone', 'Announcement'
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_updates_page_id ON page_updates(business_page_id);
```

---

## API Endpoints

### Page Creation API

The main `POST /api/v1/pages/` endpoint handles all 11 steps of the create page form. See the "Updated CreatePageData Schema" section below for the full request body.

---

### Post-Creation Management APIs

These APIs manage features that are added **after** the page is created:

#### Founders API

| Method | Endpoint                                        | Description       | Auth        |
| ------ | ----------------------------------------------- | ----------------- | ----------- |
| GET    | `/api/v1/pages/{page_id}/founders`              | List all founders | Public      |
| POST   | `/api/v1/pages/{page_id}/founders`              | Add a founder     | OWNER/ADMIN |
| PUT    | `/api/v1/pages/{page_id}/founders/{founder_id}` | Update founder    | OWNER/ADMIN |
| DELETE | `/api/v1/pages/{page_id}/founders/{founder_id}` | Remove founder    | OWNER/ADMIN |

**Request Body (POST/PUT):**

```json
{
  "userId": 123,
  "name": "John Doe",
  "title": "CEO & Co-Founder",
  "bio": "10+ years in tech...",
  "avatarUrl": "https://...",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "twitterUrl": "https://twitter.com/johndoe",
  "displayOrder": 1
}
```

> **Note:** `userId` is optional. If provided, the founder will be linked to an existing platform user.

#### Team Members API

| Method | Endpoint                                   | Description       | Auth        |
| ------ | ------------------------------------------ | ----------------- | ----------- |
| GET    | `/api/v1/pages/{page_id}/team`             | List team members | Public      |
| POST   | `/api/v1/pages/{page_id}/team`             | Add team member   | OWNER/ADMIN |
| PUT    | `/api/v1/pages/{page_id}/team/{member_id}` | Update member     | OWNER/ADMIN |
| DELETE | `/api/v1/pages/{page_id}/team/{member_id}` | Remove member     | OWNER/ADMIN |

**Request Body (POST/PUT):**

```json
{
  "userId": 456,
  "name": "Jane Smith",
  "role": "Senior Engineer",
  "department": "Engineering",
  "avatarUrl": "https://...",
  "linkedinUrl": "https://linkedin.com/in/janesmith",
  "displayOrder": 1
}
```

> **Note:** `userId` is optional. If provided, the team member will be linked to an existing platform user.

#### Investors API

| Method | Endpoint                                          | Description     | Auth        |
| ------ | ------------------------------------------------- | --------------- | ----------- |
| GET    | `/api/v1/pages/{page_id}/investors`               | List investors  | Public      |
| POST   | `/api/v1/pages/{page_id}/investors`               | Add investor    | OWNER/ADMIN |
| PUT    | `/api/v1/pages/{page_id}/investors/{investor_id}` | Update investor | OWNER/ADMIN |
| DELETE | `/api/v1/pages/{page_id}/investors/{investor_id}` | Remove investor | OWNER/ADMIN |

**Request Body (POST/PUT):**

```json
{
  "name": "Sequoia Capital",
  "type": "VC",
  "logoUrl": "https://...",
  "websiteUrl": "https://sequoiacap.com",
  "investmentRound": "Series A",
  "displayOrder": 1
}
```

#### Jobs API

| Method | Endpoint                                | Description        | Auth        |
| ------ | --------------------------------------- | ------------------ | ----------- |
| GET    | `/api/v1/pages/{page_id}/jobs`          | List jobs          | Public      |
| GET    | `/api/v1/pages/{page_id}/jobs/{job_id}` | Get job details    | Public      |
| POST   | `/api/v1/pages/{page_id}/jobs`          | Create job posting | OWNER/ADMIN |
| PUT    | `/api/v1/pages/{page_id}/jobs/{job_id}` | Update job         | OWNER/ADMIN |
| DELETE | `/api/v1/pages/{page_id}/jobs/{job_id}` | Delete job         | OWNER/ADMIN |

**Request Body (POST/PUT):**

```json
{
  "title": "Senior Software Engineer",
  "department": "Engineering",
  "jobType": "Full-time",
  "location": "Singapore",
  "description": "We are looking for...",
  "requirements": ["5+ years experience", "Python", "FastAPI"],
  "salaryRange": "$80,000 - $120,000",
  "isRemote": true,
  "isActive": true,
  "expiresAt": "2024-03-01T00:00:00Z"
}
```

#### Updates/Announcements API

| Method | Endpoint                                      | Description   | Auth        |
| ------ | --------------------------------------------- | ------------- | ----------- |
| GET    | `/api/v1/pages/{page_id}/updates`             | List updates  | Public      |
| POST   | `/api/v1/pages/{page_id}/updates`             | Create update | OWNER/ADMIN |
| PUT    | `/api/v1/pages/{page_id}/updates/{update_id}` | Edit update   | OWNER/ADMIN |
| DELETE | `/api/v1/pages/{page_id}/updates/{update_id}` | Delete update | OWNER/ADMIN |

**Request Body (POST/PUT):**

```json
{
  "title": "We just raised Series A!",
  "content": "Excited to announce...",
  "authorName": "John Doe",
  "category": "Funding",
  "isPublished": true
}
```

---

### Page Creation-Related APIs

These APIs support features that can be added during or after page creation:

#### Milestones API

| Method | Endpoint                                            | Description      | Auth        |
| ------ | --------------------------------------------------- | ---------------- | ----------- |
| GET    | `/api/v1/pages/{page_id}/milestones`                | List milestones  | Public      |
| POST   | `/api/v1/pages/{page_id}/milestones`                | Add milestone    | OWNER/ADMIN |
| PUT    | `/api/v1/pages/{page_id}/milestones/{milestone_id}` | Update milestone | OWNER/ADMIN |
| DELETE | `/api/v1/pages/{page_id}/milestones/{milestone_id}` | Remove milestone | OWNER/ADMIN |

**Request Body (POST/PUT):**

```json
{
  "title": "Reached 10,000 customers",
  "description": "A major milestone for our company...",
  "milestoneDate": "2024-01-15",
  "category": "Revenue",
  "displayOrder": 1
}
```

#### Office Locations API

| Method | Endpoint                                      | Description   | Auth        |
| ------ | --------------------------------------------- | ------------- | ----------- |
| GET    | `/api/v1/pages/{page_id}/offices`             | List offices  | Public      |
| POST   | `/api/v1/pages/{page_id}/offices`             | Add office    | OWNER/ADMIN |
| PUT    | `/api/v1/pages/{page_id}/offices/{office_id}` | Update office | OWNER/ADMIN |
| DELETE | `/api/v1/pages/{page_id}/offices/{office_id}` | Remove office | OWNER/ADMIN |

**Request Body (POST/PUT):**

```json
{
  "city": "Singapore",
  "address": "1 Raffles Place, #20-01",
  "country": "Singapore",
  "officeType": "Headquarters",
  "employeeCount": 50,
  "phone": "+65 1234 5678",
  "email": "singapore@company.com",
  "isHeadquarters": true
}
```

---

## Update Main Page Create/Update Endpoint

### Updated Pydantic Schema

```python
# schemas/business_page.py

from pydantic import BaseModel, EmailStr, HttpUrl, Field
from typing import Optional, List
from datetime import date

class SocialMediaLinks(BaseModel):
    linkedin: Optional[HttpUrl] = None
    twitter: Optional[HttpUrl] = None
    facebook: Optional[HttpUrl] = None
    instagram: Optional[HttpUrl] = None

class ContactInfo(BaseModel):
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class KeyMetrics(BaseModel):
    customers: Optional[int] = None
    mrr: Optional[float] = None
    arr: Optional[float] = None
    churn_rate: Optional[float] = Field(None, ge=0, le=100)
    ltv: Optional[float] = None
    cac: Optional[float] = None
    burn_rate: Optional[float] = None
    runway_months: Optional[int] = None
    valuation: Optional[float] = None
    last_funding_date: Optional[date] = None
    next_milestone: Optional[str] = None

class MarketAnalysis(BaseModel):
    target_market: Optional[str] = None
    competitive_advantage: Optional[str] = None
    technology_stack: Optional[List[str]] = []
    total_addressable_market: Optional[float] = None
    serviceable_market: Optional[float] = None
    obtainable_market: Optional[float] = None
    market_growth_rate: Optional[float] = None
    competitors: Optional[List[str]] = []

class CompanyCulture(BaseModel):
    perks: Optional[List[str]] = []
    team_size: Optional[int] = None
    average_age: Optional[int] = None
    diversity_male_percent: Optional[float] = Field(None, ge=0, le=100)
    diversity_female_percent: Optional[float] = Field(None, ge=0, le=100)

class CreatePageRequest(BaseModel):
    # Required fields
    business_title: str = Field(..., min_length=2, max_length=200)
    email: EmailStr

    # Basic Info
    page_phone_numbers: Optional[List[str]] = Field(default=[], max_items=5)
    headline: Optional[str] = Field(None, max_length=300)
    tagline: Optional[str] = Field(None, max_length=500)
    description: Optional[str] = Field(None, max_length=2000)
    long_description: Optional[str] = Field(None, max_length=5000)
    website_url: Optional[HttpUrl] = None

    # Company Details
    founded_year: Optional[int] = Field(None, ge=1800, le=2100)
    industry: Optional[str] = None
    company_size: Optional[str] = None
    company_stage: Optional[str] = None
    legal_structure: Optional[str] = None
    business_model: Optional[str] = None

    # Location
    location: Optional[str] = None
    is_remote_work_available: Optional[bool] = False
    primary_location: Optional[str] = None
    headquarter_location: Optional[str] = None
    timezone: Optional[str] = None

    # Mission & Vision
    mission_statement: Optional[str] = Field(None, max_length=1000)
    vision_statement: Optional[str] = Field(None, max_length=1000)
    company_values: Optional[List[str]] = Field(default=[], max_items=20)

    # Services
    specialties: Optional[List[str]] = Field(default=[], max_items=30)
    services: Optional[List[str]] = Field(default=[], max_items=30)

    # Funding
    funding_stage: Optional[str] = None
    annual_revenue: Optional[str] = None
    total_funding_raised: Optional[str] = None
    number_of_customers: Optional[int] = None
    monthly_recurring_revenue: Optional[str] = None
    month_growth_rate_percentage: Optional[float] = None

    # Product
    product_name: Optional[str] = None
    product_description: Optional[str] = None
    key_features: Optional[List[str]] = Field(default=[], max_items=20)
    integrations: Optional[List[str]] = Field(default=[], max_items=30)

    # NEW: Social Media
    social_media: Optional[SocialMediaLinks] = None

    # NEW: Contact Info
    contact_info: Optional[ContactInfo] = None

    # NEW: Achievements
    certifications: Optional[List[str]] = Field(default=[], max_items=20)
    awards: Optional[List[str]] = Field(default=[], max_items=20)
    partnerships: Optional[List[str]] = Field(default=[], max_items=20)
    patents: Optional[List[str]] = Field(default=[], max_items=20)

    # NEW: Key Metrics
    key_metrics: Optional[KeyMetrics] = None

    # NEW: Market Analysis
    market: Optional[MarketAnalysis] = None

    # NEW: Company Culture
    culture: Optional[CompanyCulture] = None

    # NEW: Other
    languages: Optional[List[str]] = Field(default=[], max_items=20)
    tags: Optional[List[str]] = Field(default=[], max_items=30)
```

---

## FastAPI Router Implementation

```python
# routers/pages.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

router = APIRouter(prefix="/pages", tags=["Business Pages"])

# ==================== FOUNDERS ====================

@router.get("/{page_id}/founders", response_model=List[FounderResponse])
async def get_founders(
    page_id: int,
    db: Session = Depends(get_db)
):
    """Get all founders for a business page"""
    page = get_page_or_404(db, page_id)
    return db.query(PageFounder).filter(
        PageFounder.business_page_id == page_id
    ).order_by(PageFounder.display_order).all()


@router.post("/{page_id}/founders", response_model=FounderResponse)
async def add_founder(
    page_id: int,
    data: CreateFounderRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a founder to a business page (OWNER/ADMIN only)"""
    page = get_page_or_404(db, page_id)
    check_page_admin_permission(db, page_id, current_user.id)

    founder = PageFounder(
        business_page_id=page_id,
        **data.dict()
    )
    db.add(founder)
    db.commit()
    db.refresh(founder)
    return founder


@router.put("/{page_id}/founders/{founder_id}", response_model=FounderResponse)
async def update_founder(
    page_id: int,
    founder_id: int,
    data: UpdateFounderRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a founder (OWNER/ADMIN only)"""
    check_page_admin_permission(db, page_id, current_user.id)

    founder = db.query(PageFounder).filter(
        PageFounder.id == founder_id,
        PageFounder.business_page_id == page_id
    ).first()

    if not founder:
        raise HTTPException(status_code=404, detail="Founder not found")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(founder, key, value)

    db.commit()
    db.refresh(founder)
    return founder


@router.delete("/{page_id}/founders/{founder_id}")
async def delete_founder(
    page_id: int,
    founder_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Remove a founder (OWNER/ADMIN only)"""
    check_page_admin_permission(db, page_id, current_user.id)

    founder = db.query(PageFounder).filter(
        PageFounder.id == founder_id,
        PageFounder.business_page_id == page_id
    ).first()

    if not founder:
        raise HTTPException(status_code=404, detail="Founder not found")

    db.delete(founder)
    db.commit()
    return {"message": "Founder removed successfully"}


# ==================== TEAM MEMBERS ====================
# Similar CRUD pattern as founders...

# ==================== INVESTORS ====================
# Similar CRUD pattern...

# ==================== JOBS ====================
# Similar CRUD pattern with additional isActive filter for public GET...

# ==================== UPDATES ====================
# Similar CRUD pattern...

# ==================== MILESTONES ====================
# Similar CRUD pattern...

# ==================== OFFICE LOCATIONS ====================
# Similar CRUD pattern...
```

---

## Which Tables Update on Which API

| API Endpoint                           | Tables Affected                    | Auto-Updates                       |
| -------------------------------------- | ---------------------------------- | ---------------------------------- |
| `POST /pages/`                         | `business_pages`, `page_members`   | Creates page + owner member record |
| `PUT /pages/{id}`                      | `business_pages`                   | Updates `updated_at`               |
| `DELETE /pages/{id}`                   | `business_pages`                   | Soft delete (sets `deleted_at`)    |
| `POST /pages/{id}/founders`            | `page_founders`                    | None                               |
| `POST /pages/{id}/team`                | `page_team_members`                | None                               |
| `POST /pages/{id}/investors`           | `page_investors`                   | None                               |
| `POST /pages/{id}/jobs`                | `page_jobs`                        | Sets `posted_at`                   |
| `POST /pages/{id}/updates`             | `page_updates`                     | Sets `published_at`                |
| `POST /pages/{id}/milestones`          | `page_milestones`                  | None                               |
| `POST /pages/{id}/offices`             | `page_office_locations`            | None                               |
| `POST /pages/{id}/pricing-tiers`       | `page_pricing_tiers`               | None                               |
| `POST /pages/{id}/members`             | `page_members`                     | None                               |
| `POST /pages/{id}/follow`              | `page_followers`, `business_pages` | Updates `total_followers` count    |
| `POST /feed/posts` (with authorPageID) | `posts`, `business_pages`          | Updates `total_posts` count        |

---

## Migration Steps

1. **Run SQL migrations** to add new columns and tables
2. **Update SQLAlchemy models** to match new schema
3. **Update Pydantic schemas** for request/response validation
4. **Add new router endpoints** for each resource
5. **Update the main page create/update** to handle new fields
6. **Test all endpoints** with the frontend form

---

## Frontend Form Field → Backend Field Mapping

| Frontend Form Field | Backend Field Name             | Table                                |
| ------------------- | ------------------------------ | ------------------------------------ |
| Business Name       | `business_title`               | business_pages                       |
| Handle              | `headline`                     | business_pages                       |
| Description         | `description`                  | business_pages                       |
| Long Description    | `long_description`             | business_pages                       |
| Tagline             | `tagline`                      | business_pages                       |
| Industry            | `industry`                     | business_pages                       |
| Company Size        | `company_size`                 | business_pages                       |
| Company Stage       | `company_stage`                | business_pages                       |
| Legal Structure     | `legal_structure`              | business_pages                       |
| Business Model      | `business_model`               | business_pages                       |
| Founded Year        | `founded_year`                 | business_pages                       |
| Location            | `location`                     | business_pages                       |
| Headquarters        | `headquarter_location`         | business_pages                       |
| Timezone            | `timezone`                     | business_pages                       |
| Remote Work         | `is_remote_work_available`     | business_pages                       |
| Website             | `website_url`                  | business_pages                       |
| Mission             | `mission_statement`            | business_pages                       |
| Vision              | `vision_statement`             | business_pages                       |
| Values              | `company_values`               | business_pages                       |
| Specialties         | `specialties`                  | business_pages                       |
| Services            | `services`                     | business_pages                       |
| Target Audience     | `target_market`                | business_pages                       |
| Funding Stage       | `funding_stage`                | business_pages                       |
| Revenue             | `annual_revenue`               | business_pages                       |
| Total Funding       | `total_funding_raised`         | business_pages                       |
| Contact Email       | `contact_email`                | business_pages                       |
| Contact Phone       | `contact_phone`                | business_pages                       |
| Contact Address     | `contact_address`              | business_pages                       |
| LinkedIn            | `social_linkedin`              | business_pages                       |
| Twitter             | `social_twitter`               | business_pages                       |
| Facebook            | `social_facebook`              | business_pages                       |
| Instagram           | `social_instagram`             | business_pages                       |
| Certifications      | `certifications`               | business_pages                       |
| Awards              | `awards`                       | business_pages                       |
| Partnerships        | `partnerships`                 | business_pages                       |
| Product Name        | `product_name`                 | business_pages                       |
| Product Description | `product_description`          | business_pages                       |
| Key Features        | `key_features`                 | business_pages                       |
| Integrations        | `integrations`                 | business_pages                       |
| MRR                 | `mrr_amount`                   | business_pages                       |
| Growth Rate         | `month_growth_rate_percentage` | business_pages                       |
| Customers           | `number_of_customers`          | business_pages                       |
| Founders            | -                              | page_founders (separate API)         |
| Team Members        | -                              | page_team_members (separate API)     |
| Investors           | -                              | page_investors (separate API)        |
| Jobs                | -                              | page_jobs (separate API)             |
| Updates             | -                              | page_updates (separate API)          |
| Milestones          | -                              | page_milestones (separate API)       |
| Office Locations    | -                              | page_office_locations (separate API) |
| Pricing Tiers       | -                              | page_pricing_tiers (existing API)    |
