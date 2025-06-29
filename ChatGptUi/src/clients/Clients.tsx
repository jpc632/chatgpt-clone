import type OpenAI from "openai";
import type { CodeReviewRequest } from "../requestInterfaces/RequestInterfaces";
import type { GitCommitFilePayload } from "../requestInterfaces/RequestInterfaces";
import { API_CONFIG } from "../config/api";

/**
 * Fetches the Git changes from the backend API and returns them as a formatted array.
 *
 * @returns {Promise<GitCommitFilePayload[]>} A promise that resolves to a list of Git commit file payloads.
 * @throws {Error} If the response is not OK or the fetch fails.
 */
export async function fetchGitDiff(): Promise<GitCommitFilePayload[]> {
  const res = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.gitDiff}`);
  if (!res.ok) {
    throw new Error('No staged diff found');
  }
  return res.json();
}

/**
 * Sends the code change to the ReviewerApi and returns an OpenAI response Object.
 *
 * @returns {Promise<OpenAI.Chat.Completions.ChatCompletion>} A promise that resolves to a list of Git commit file payloads.
 * @throws {Error} If the response is not OK or the fetch fails.
 */
export async function getMessageDisplayMessage(request: CodeReviewRequest): Promise<OpenAI.Chat.Completions.ChatCompletion> {

  console.log(request.GptModel)
  const res = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.codeReview}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error('Failed to review code');
  }

  return res.json();
}