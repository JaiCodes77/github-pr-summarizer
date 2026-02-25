"""routes/webhooks.py — GitHub webhook ingestion."""

from fastapi import APIRouter, Request, Header, HTTPException
from models.schemas import PRWebhookPayload

router = APIRouter()


@router.post("/github")
async def receive_github_webhook(
    request: Request,
    x_hub_signature_256: str = Header(None),
):
    """
    Receive a raw GitHub webhook POST request.

    Responsibilities:
    - Read the raw request body and verify the HMAC-SHA256 signature
      using WEBHOOK_SECRET from the environment (to confirm the request
      is genuinely from GitHub).
    - Parse the JSON body and check the event type header
      (X-GitHub-Event). Only process 'pull_request' events.
    - For 'pull_request' events with action 'opened' or 'synchronize',
      extract the repo name, PR number, and sender, then hand off to
      the summarizer service.
    - Return 200 OK for all accepted events; return 400 for invalid
      signatures or unsupported event types.
    """
    pass


@router.get("/ping")
def ping():
    """Simple liveness check for the webhook router."""
    return {"message": "webhook router alive"}
