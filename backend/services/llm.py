"""services/llm.py — LLM API calls for summarizing PR diffs."""

import os
from openai import OpenAI


def _get_client() -> OpenAI:
    """
    Initialise and return an OpenAI client using OPENAI_API_KEY from env.

    Returns:
        A configured openai.OpenAI instance.
    """
    pass


def summarize_diff(diff: str, pr_title: str = "") -> str:
    """
    Send a PR diff to the LLM and return a structured summary.

    Args:
        diff: The raw unified diff string obtained from the GitHub API.
        pr_title: Optional PR title to provide additional context to the model.

    Returns:
        A Markdown-formatted string summarising the changes. The summary
        should include: a one-sentence overview, a bulleted list of key
        changes, the likely impact, and any potential concerns.

    Steps:
    - Build a system prompt instructing the model to act as a senior
      code reviewer summarising a pull request diff.
    - Build a user message containing the PR title (if provided) and
      the first N characters of the diff (truncate to stay within token
      limits, e.g. 12 000 chars).
    - Call client.chat.completions.create() with model 'gpt-4o' (or
      read the model name from the LLM_MODEL env var), temperature 0.3,
      and max_tokens 512.
    - Extract and return the text from choices[0].message.content.
    """
    pass


def summarize_diff_with_claude(diff: str, pr_title: str = "") -> str:
    """
    Alternative summarizer using Anthropic Claude (claude-3-5-sonnet).

    Args:
        diff: The raw unified diff string.
        pr_title: Optional PR title for additional context.

    Returns:
        A Markdown-formatted summary string (same structure as summarize_diff).

    Steps:
    - Import anthropic and initialise the client with ANTHROPIC_API_KEY.
    - Build the message payload following the Anthropic Messages API format.
    - Call client.messages.create() and return the text from
      response.content[0].text.
    """
    pass
