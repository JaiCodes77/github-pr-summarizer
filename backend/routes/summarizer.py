"""routes/summarizer.py — Endpoints for triggering and retrieving PR summaries."""

from fastapi import APIRouter
from models.schemas import SummarizeRequest, SummaryResponse

router = APIRouter()


@router.post("/trigger", response_model=SummaryResponse)
async def trigger_summary(payload: SummarizeRequest):
    """
    Manually trigger an AI summary for a given PR.

    Responsibilities:
    - Accept a JSON body with repo (owner/name) and pr_number.
    - Call services.github.get_pr_diff() to fetch the unified diff.
    - Call services.llm.summarize_diff() with the diff text.
    - Persist the summary to SQLite via models.db.
    - Return a SummaryResponse containing the pr_number, repo,
      and the generated summary text.
    """
    pass


@router.get("/{repo_owner}/{repo_name}/{pr_number}", response_model=SummaryResponse)
async def get_summary(repo_owner: str, repo_name: str, pr_number: int):
    """
    Retrieve a previously generated summary for a PR from the database.

    Responsibilities:
    - Query SQLite for an existing summary matching the repo and PR number.
    - Return 404 if no summary exists yet.
    - Return the stored SummaryResponse if found.
    """
    pass
