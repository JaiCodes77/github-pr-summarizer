# GitHub PR Summarizer — Backend

A FastAPI backend that listens for GitHub webhook events, fetches pull request diffs, and generates AI-powered summaries using OpenAI GPT-4o (or Anthropic Claude).

## Project Structure

```
backend/
├── main.py                  # FastAPI app entry point + /health route
├── routes/
│   ├── webhooks.py          # POST /webhooks/github — GitHub event ingestion
│   └── summarizer.py        # POST /summarizer/trigger, GET /summarizer/{repo}/{pr}
├── services/
│   ├── github.py            # GitHub REST API calls (diff, metadata, comments)
│   └── llm.py               # OpenAI / Claude summarization
├── models/
│   ├── db.py                # SQLite connection, init, save, fetch helpers
│   └── schemas.py           # Pydantic models for payloads and responses
├── .env.example             # Environment variable template
└── requirements.txt         # Python dependencies
```

## Setup

### 1. Create and activate a virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

```bash
cp .env.example .env
# Edit .env and fill in your GITHUB_TOKEN, OPENAI_API_KEY, and WEBHOOK_SECRET
```

### 4. Run the server

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.  
Interactive docs: `http://localhost:8000/docs`

## Key Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/webhooks/github` | Receive GitHub webhook events |
| `POST` | `/summarizer/trigger` | Manually trigger a PR summary |
| `GET` | `/summarizer/{owner}/{repo}/{pr}` | Fetch a stored summary |

## GitHub Webhook Setup

1. Go to your GitHub repository → **Settings** → **Webhooks** → **Add webhook**
2. Set the Payload URL to `https://<your-domain>/webhooks/github`
3. Content type: `application/json`
4. Set the secret to match `WEBHOOK_SECRET` in your `.env`
5. Select the **Pull requests** event
