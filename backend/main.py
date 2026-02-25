"""
main.py — FastAPI application entry point.

Start the server with:
    uvicorn main:app --reload
"""

from fastapi import FastAPI
from routes import webhooks, summarizer

app = FastAPI(
    title="GitHub PR Summarizer API",
    description="Receives GitHub webhooks and generates AI-powered PR summaries.",
    version="0.1.0",
)

# ── Routers ────────────────────────────────────────────────────────────────
app.include_router(webhooks.router, prefix="/webhooks", tags=["Webhooks"])
app.include_router(summarizer.router, prefix="/summarizer", tags=["Summarizer"])


# ── Health check ───────────────────────────────────────────────────────────
@app.get("/health", tags=["Health"])
def health_check():
    """Return a simple status object confirming the API is running."""
    return {"status": "ok", "version": "0.1.0"}
