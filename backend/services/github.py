import os
import requests


GITHUB_API_BASE = "https://api.github.com"


def _get_headers() -> dict:
    """
    Build the HTTP headers required for authenticated GitHub API requests.

    Reads GITHUB_TOKEN from the environment and returns a dict containing:
    - Authorization: Bearer <token>
    - Accept: application/vnd.github.v3+json
    """
    pass


def get_pr_diff(repo: str, pr_number: int) -> str:
    """
    Fetch the unified diff for a pull request.

    Args:
        repo: Full repository name in 'owner/name' format, e.g. 'facebook/react'.
        pr_number: The integer pull-request number.

    Returns:
        A string containing the raw unified diff of all changed files.

    Raises:
        HTTPError: If the GitHub API returns a non-2xx status code.

    Steps:
    - Call GET /repos/{repo}/pulls/{pr_number} with Accept header set to
      'application/vnd.github.v3.diff' to receive the raw diff body.
    - Return the response text directly.
    """
    pass


def post_pr_comment(repo: str, pr_number: int, body: str) -> dict:
    """
    Post a comment on a pull request.

    Args:
        repo: Full repository name in 'owner/name' format.
        pr_number: The integer pull-request number.
        body: The Markdown-formatted comment text to post.

    Returns:
        The JSON response dict from the GitHub API (created comment object).

    Steps:
    - Call POST /repos/{repo}/issues/{pr_number}/comments with a JSON
      payload of {"body": body}.
    - Return the parsed JSON response.
    """
    pass


def get_pr_metadata(repo: str, pr_number: int) -> dict:
    """
    Fetch full PR metadata (title, author, branch, labels, etc.).

    Args:
        repo: Full repository name in 'owner/name' format.
        pr_number: The integer pull-request number.

    Returns:
        A dict with the full GitHub PR object.

    Steps:
    - Call GET /repos/{repo}/pulls/{pr_number}.
    - Return the parsed JSON response.
    """
    pass
