-- Q13. Cassandra event logging by user and time
CREATE KEYSPACE IF NOT EXISTS EventKeyspace
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE EventKeyspace;

DROP TABLE IF EXISTS UserEvents;
CREATE TABLE UserEvents (
  user_id text,
  event_time timestamp,
  event_id uuid,
  event_type text,
  status text,
  PRIMARY KEY ((user_id), event_time, event_id)
) WITH CLUSTERING ORDER BY (event_time DESC, event_id ASC);

-- Insert multiple events
INSERT INTO UserEvents (user_id, event_time, event_id, event_type, status)
VALUES ('U001', '2026-10-30 09:00:00+0000', uuid(), 'login', 'success');

INSERT INTO UserEvents (user_id, event_time, event_id, event_type, status)
VALUES ('U001', '2026-10-30 09:05:00+0000', uuid(), 'failed-login', 'failed');

INSERT INTO UserEvents (user_id, event_time, event_id, event_type, status)
VALUES ('U001', '2026-10-30 09:10:00+0000', uuid(), 'file-upload', 'success');

INSERT INTO UserEvents (user_id, event_time, event_id, event_type, status)
VALUES ('U002', '2026-10-30 10:00:00+0000', uuid(), 'login', 'success');

-- Query events for a particular user and time period
SELECT * FROM UserEvents
WHERE user_id = 'U001'
AND event_time >= '2026-10-30 09:00:00+0000'
AND event_time < '2026-10-30 10:00:00+0000';
