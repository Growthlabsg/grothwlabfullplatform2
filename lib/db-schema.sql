-- Database schema for GrowthLab platform

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  profile_image_url TEXT,
  bio TEXT,
  company VARCHAR(255),
  position VARCHAR(255),
  location VARCHAR(255),
  website VARCHAR(255),
  linkedin_url VARCHAR(255),
  twitter_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Startups table
CREATE TABLE startups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  description TEXT,
  industry VARCHAR(100),
  founding_date DATE,
  stage VARCHAR(50),
  website VARCHAR(255),
  employee_count INT,
  funding_raised DECIMAL(15, 2),
  funding_currency VARCHAR(3) DEFAULT 'SGD',
  pitch_deck_url TEXT,
  business_model TEXT,
  target_market TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  founder_id INT REFERENCES users(id)
);

-- Startup team members
CREATE TABLE startup_team_members (
  id SERIAL PRIMARY KEY,
  startup_id INT REFERENCES startups(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(100),
  joined_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(startup_id, user_id)
);

-- Events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(255),
  is_virtual BOOLEAN DEFAULT FALSE,
  virtual_meeting_link TEXT,
  max_participants INT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  organizer_id INT REFERENCES users(id)
);

-- Event registrations
CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'registered',
  attended BOOLEAN DEFAULT FALSE,
  UNIQUE(event_id, user_id)
);

-- Funding opportunities
CREATE TABLE funding_opportunities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  funding_type VARCHAR(50),
  amount_min DECIMAL(15, 2),
  amount_max DECIMAL(15, 2),
  currency VARCHAR(3) DEFAULT 'SGD',
  equity_min DECIMAL(5, 2),
  equity_max DECIMAL(5, 2),
  application_deadline DATE,
  eligibility_criteria TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  provider_id INT REFERENCES users(id)
);

-- Funding applications
CREATE TABLE funding_applications (
  id SERIAL PRIMARY KEY,
  funding_id INT REFERENCES funding_opportunities(id) ON DELETE CASCADE,
  startup_id INT REFERENCES startups(id) ON DELETE CASCADE,
  application_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  pitch_deck_url TEXT,
  additional_documents TEXT,
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Mentors table
CREATE TABLE mentors (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  expertise TEXT[],
  experience_years INT,
  bio TEXT,
  availability_schedule JSONB,
  hourly_rate DECIMAL(10, 2),
  rate_currency VARCHAR(3) DEFAULT 'SGD',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Mentorship sessions
CREATE TABLE mentorship_sessions (
  id SERIAL PRIMARY KEY,
  mentor_id INT REFERENCES mentors(id) ON DELETE CASCADE,
  mentee_id INT REFERENCES users(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Co-founder matching profiles
CREATE TABLE cofounder_profiles (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  skills TEXT[],
  interests TEXT[],
  experience_level VARCHAR(50),
  commitment_level VARCHAR(50),
  location_preference VARCHAR(100),
  bio TEXT,
  looking_for TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Co-founder matches
CREATE TABLE cofounder_matches (
  id SERIAL PRIMARY KEY,
  user1_id INT REFERENCES users(id) ON DELETE CASCADE,
  user2_id INT REFERENCES users(id) ON DELETE CASCADE,
  match_score DECIMAL(5, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user1_id, user2_id)
);

-- Resources (articles, guides, templates)
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  resource_type VARCHAR(50),
  content TEXT,
  file_url TEXT,
  thumbnail_url TEXT,
  author_id INT REFERENCES users(id),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Courses
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructor_id INT REFERENCES users(id),
  thumbnail_url TEXT,
  duration_hours INT,
  difficulty_level VARCHAR(50),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Course modules
CREATE TABLE course_modules (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  content TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Course enrollments
CREATE TABLE course_enrollments (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completion_date TIMESTAMP WITH TIME ZONE,
  progress_percentage DECIMAL(5, 2) DEFAULT 0,
  UNIQUE(course_id, user_id)
);

-- Jobs
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  company_id INT REFERENCES startups(id) ON DELETE CASCADE,
  location VARCHAR(255),
  is_remote BOOLEAN DEFAULT FALSE,
  job_type VARCHAR(50),
  salary_min DECIMAL(15, 2),
  salary_max DECIMAL(15, 2),
  salary_currency VARCHAR(3) DEFAULT 'SGD',
  application_deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Job applications
CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,
  job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id INT REFERENCES users(id) ON DELETE CASCADE,
  resume_url TEXT,
  cover_letter TEXT,
  application_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Feed posts
CREATE TABLE feed_posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  image_url TEXT,
  video_url TEXT,
  link_url TEXT,
  link_title VARCHAR(255),
  link_description TEXT,
  link_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Post likes
CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES feed_posts(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id)
);

-- Post comments
CREATE TABLE post_comments (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES feed_posts(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Connections (network)
CREATE TABLE connections (
  id SERIAL PRIMARY KEY,
  user1_id INT REFERENCES users(id) ON DELETE CASCADE,
  user2_id INT REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user1_id, user2_id)
);

-- Messages
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) ON DELETE CASCADE,
  recipient_id INT REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  related_id INT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Activity logs
CREATE TABLE activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id INT,
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_startups_industry ON startups(industry);
CREATE INDEX idx_startups_stage ON startups(stage);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_funding_opportunities_deadline ON funding_opportunities(application_deadline);
CREATE INDEX idx_mentors_expertise ON mentors USING GIN(expertise);
CREATE INDEX idx_cofounder_profiles_skills ON cofounder_profiles USING GIN(skills);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_feed_posts_created_at ON feed_posts(created_at);
CREATE INDEX idx_connections_status ON connections(status);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
