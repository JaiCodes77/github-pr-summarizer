"""models/db.py — SQLite database setup and connection helper."""

import sqlite3
import os

DB_PATH = os.getenv("DB_PATH", "pr_summarizer.db")


def get_connection() -> sqlite3.Connection:
    """
    Open and return a SQLite connection to the local database file.

    Returns:
        A sqlite3.Connection with row_factory set to sqlite3.Row so that
        rows can be accessed by column name.

    Note:
        Callers are responsible for closing the connection (or using it
        as a context manager).
    """
    pass


def init_db() -> None:
    """
    Create all required tables if they do not already exist.

    Tables:
        summaries (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            repo        TEXT NOT NULL,
            pr_number   INTEGER NOT NULL,
            pr_title    TEXT,
            summary     TEXT NOT NULL,
            created_at  TEXT DEFAULT CURRENT_TIMESTAMP
        )

    Steps:
    - Call get_connection() to open a connection.
    - Execute the CREATE TABLE IF NOT EXISTS statement above.
    - Commit and close the connection.
    """
    pass


def save_summary(repo: str, pr_number: int, pr_title: str, summary: str) -> int:
    """
    Insert a new summary record and return the new row id.

    Args:
        repo: Full repository name, e.g. 'facebook/react'.
        pr_number: The pull-request number.
        pr_title: The PR title (may be empty string).
        summary: The AI-generated summary text.

    Returns:
        The integer rowid of the newly inserted record.
    """
    pass


def fetch_summary(repo: str, pr_number: int) -> dict | None:
    """
    Retrieve the most recent summary for a given repo and PR number.

    Args:
        repo: Full repository name.
        pr_number: The pull-request number.

    Returns:
        A dict with keys: id, repo, pr_number, pr_title, summary, created_at.
        Returns None if no matching record exists.
    """
    pass
