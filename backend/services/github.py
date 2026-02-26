import os
import requests


GITHUB_API_BASE = "https://api.github.com"


def _get_headers() -> dict:
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        raise ValueError("GITHUB_TOKEN not found in environment variables")
    return {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json",
    }


def get_pr_diff(repo: str, pr_number: int) -> str:
    url = f"{GITHUB_API_BASE}/repos/{repo}/pulls/{pr_number}"
    headers = _get_headers()
    headers["Accept"] = "application/vnd.github.v3.diff"
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.text



def post_pr_comment(repo: str, pr_number: int, body: str) -> dict:
    url = f"{GITHUB_API_BASE}/repos/{repo}/issues/{pr_number}/comments"
    response = requests.post(url, headers=_get_headers(), json={"body": body})
    response.raise_for_status()
    return response.json()
    


def get_pr_metadata(repo: str, pr_number: int) -> dict:
    url = f"{GITHUB_API_BASE}/repos/{repo}/pulls/{pr_number}"
    response = requests.get(url, headers=_get_headers())
    response.raise_for_status()
    return response.json()
