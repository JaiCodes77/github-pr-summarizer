"""models/schemas.py — Pydantic models for request/response validation."""

from pydantic import BaseModel
from typing import Optional


class PRWebhookPayload(BaseModel):
    """
    Represents the relevant fields extracted from a GitHub pull_request webhook event.

    GitHub sends a large JSON body; this model captures the parts we care about.
    """

    action: str
    """The webhook action, e.g. 'opened', 'synchronize', 'closed'."""

    pr_number: int
    """The pull-request number within the repository."""

    repo: str
    """Full repository name in 'owner/name' format, e.g. 'facebook/react'."""

    pr_title: str
    """The title of the pull request."""

    sender: str
    """GitHub username of the user who triggered the event."""

    head_sha: str
    """The commit SHA of the PR head — useful for posting commit statuses."""


class SummarizeRequest(BaseModel):
    """
    Request body for the POST /summarizer/trigger endpoint.

    Used for manually triggering a summary outside of the webhook flow.
    """

    repo: str
    """Full repository name in 'owner/name' format."""

    pr_number: int
    """The pull-request number to summarize."""

    pr_title: Optional[str] = ""
    """Optional PR title to pass as context to the LLM."""


class SummaryResponse(BaseModel):
    """
    Response returned by the summarizer endpoints.
    """

    pr_number: int
    """The pull-request number that was summarized."""

    repo: str
    """Full repository name."""

    pr_title: Optional[str] = ""
    """Title of the pull request."""

    summary: str
    """The AI-generated Markdown summary of the PR diff."""

    created_at: Optional[str] = None
    """ISO 8601 timestamp of when the summary was generated (from DB)."""
