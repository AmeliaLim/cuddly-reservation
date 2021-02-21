DROP TABLE IF EXISTS schedule;

CREATE TABLE IF NOT EXISTS schedule (
    ID SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    day INT NOT NULL,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ
);