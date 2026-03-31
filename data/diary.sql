-- AI Diary 数据库表结构
-- 推荐数据库：PostgreSQL 15+
-- 字符集：UTF8

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE,
    username VARCHAR(64) UNIQUE,
    avatar_url TEXT,
    password_hash TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- 图片资源表
CREATE TABLE IF NOT EXISTS images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    original_filename VARCHAR(255),
    mime_type VARCHAR(100) NOT NULL,
    size_bytes BIGINT NOT NULL CHECK (size_bytes >= 0),
    width INT,
    height INT,
    storage_provider VARCHAR(30) NOT NULL DEFAULT 's3',
    storage_bucket VARCHAR(100),
    storage_key TEXT NOT NULL,
    public_url TEXT,
    sha256 VARCHAR(64),
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_images_user_id ON images(user_id);
CREATE INDEX IF NOT EXISTS idx_images_uploaded_at ON images(uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_images_sha256 ON images(sha256);

-- AI 图像分析表
CREATE TABLE IF NOT EXISTS image_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_id UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
    model_name VARCHAR(100) NOT NULL,
    prompt_version VARCHAR(50),
    raw_result JSONB NOT NULL,
    summary TEXT,
    detected_objects JSONB,
    scene_tags JSONB,
    emotion_tags JSONB,
    confidence NUMERIC(5,4),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_image_analyses_image_id ON image_analyses(image_id);
CREATE INDEX IF NOT EXISTS idx_image_analyses_created_at ON image_analyses(created_at DESC);

-- 会话表（一次图片聊天流程）
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_id UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
    image_analysis_id UUID REFERENCES image_analyses(id) ON DELETE SET NULL,
    title VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- active / ended / archived
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    last_message_at TIMESTAMPTZ,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_image_id ON chat_sessions(image_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_last_message_at ON chat_sessions(last_message_at DESC);

-- 消息表
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('system', 'user', 'assistant')),
    content TEXT NOT NULL,
    token_count INT,
    model_name VARCHAR(100),
    sequence_no INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_chat_messages_session_seq
    ON chat_messages(session_id, sequence_no);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- 日记表（结束聊天后生成）
CREATE TABLE IF NOT EXISTS diaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL UNIQUE REFERENCES chat_sessions(id) ON DELETE CASCADE,
    image_id UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    diary_date DATE NOT NULL DEFAULT CURRENT_DATE,
    cover_image_url TEXT,
    content TEXT NOT NULL,
    content_markdown TEXT,
    mood VARCHAR(50),
    weather VARCHAR(50),
    location_text VARCHAR(255),
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    ai_model_name VARCHAR(100),
    ai_prompt_version VARCHAR(50),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_diaries_user_id ON diaries(user_id);
CREATE INDEX IF NOT EXISTS idx_diaries_diary_date ON diaries(diary_date DESC);
CREATE INDEX IF NOT EXISTS idx_diaries_created_at ON diaries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diaries_tags ON diaries USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_diaries_is_deleted ON diaries(is_deleted);

-- 可选：用户反馈表
CREATE TABLE IF NOT EXISTS diary_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diary_id UUID NOT NULL REFERENCES diaries(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
    feedback_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_diary_feedback_diary_id ON diary_feedback(diary_id);
CREATE INDEX IF NOT EXISTS idx_diary_feedback_user_id ON diary_feedback(user_id);

-- 通用更新时间触发器
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_diaries_updated_at ON diaries;
CREATE TRIGGER trg_diaries_updated_at
BEFORE UPDATE ON diaries
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- 示例：插入开发测试用户
-- INSERT INTO users (email, username) VALUES ('demo@example.com', 'demo_user');
