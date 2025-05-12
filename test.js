CREATE OR REPLACE TABLE user_skill_mappings (
    id INTEGER AUTOINCREMENT START = 1 INCREMENT = 1 PRIMARY KEY,
    source_name VARCHAR(100) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    created_at TIMESTAMP_LTZ DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP_LTZ
);