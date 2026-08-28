CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(320) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(120),
    status VARCHAR(32) NOT NULL,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE roles (
    id UUID PRIMARY KEY,
    name VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE parent_pins (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    pin_hash VARCHAR(255) NOT NULL,
    failed_attempts INTEGER NOT NULL DEFAULT 0 CHECK (failed_attempts >= 0),
    locked_until TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE child_profiles (
    id UUID PRIMARY KEY,
    parent_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    display_name VARCHAR(80) NOT NULL,
    age_range VARCHAR(32) NOT NULL CHECK (age_range IN ('UNDER_2', 'AGES_2_TO_4', 'AGES_5_TO_7', 'AGES_8_TO_10', 'AGES_11_TO_12')),
    avatar_key VARCHAR(80),
    default_session_minutes INTEGER NOT NULL CHECK (default_session_minutes BETWEEN 1 AND 180),
    favorites_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    playlists_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    recently_watched_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX idx_child_profiles_parent ON child_profiles(parent_user_id);

INSERT INTO roles (id, name) VALUES
    ('10000000-0000-0000-0000-000000000001', 'PARENT'),
    ('10000000-0000-0000-0000-000000000002', 'REVIEWER'),
    ('10000000-0000-0000-0000-000000000003', 'MODERATOR'),
    ('10000000-0000-0000-0000-000000000004', 'ADMIN');
