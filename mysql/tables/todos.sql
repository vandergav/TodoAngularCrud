CREATE TABLE todos
(
    id varchar(36) NOT NULL,
    title text NOT NULL,
    complete tinyint(1) NOT NULL DEFAULT 0
);
