import { Note, NoteInput } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const body: ApiResponse<T> = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Something went wrong");
  }

  return body.data;
}

export async function getNotes(): Promise<Note[]> {
  const res = await fetch(`${API_BASE_URL}/notes`);
  return handleResponse<Note[]>(res);
}

export async function createNote(note: NoteInput): Promise<Note> {
  const res = await fetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return handleResponse<Note>(res);
}

export async function updateNote(id: string, note: NoteInput): Promise<Note> {
  const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return handleResponse<Note>(res);
}

export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  await handleResponse<Record<string, never>>(res);
}

export async function improveNote(content: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/ai/improve-note`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const data = await handleResponse<{ improvedContent: string }>(res);
  return data.improvedContent;
}
