"use client";

import { useState, SubmitEvent } from "react";
import { Note, NoteInput } from "@/lib/types";
import { improveNote } from "@/lib/api";

interface NoteFormProps {
  editingNote: Note | null;
  onSave: (note: NoteInput) => Promise<void>;
  onCancel: () => void;
}

// The parent remounts this component with a fresh `key` whenever
// `editingNote` changes, so these initial values only need to run once
// per note instead of being re-synced with an effect.
export default function NoteForm({ editingNote, onSave, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState(editingNote?.title ?? "");
  const [content, setContent] = useState(editingNote?.content ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [error, setError] = useState("");

  const handleImprove = async () => {
    if (!content.trim()) return;
    setIsImproving(true);
    setError("");
    try {
      setContent(await improveNote(content));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to improve note");
    } finally {
      setIsImproving(false);
    }
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      await onSave({ title, content });
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="rounded border border-black/10 bg-transparent px-3 py-2 outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        rows={5}
        className="rounded border border-black/10 bg-transparent px-3 py-2 outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={isSaving || !title.trim() || !content.trim()}
          className="rounded bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {isSaving ? "Saving..." : editingNote ? "Update Note" : "Add Note"}
        </button>

        <button
          type="button"
          onClick={handleImprove}
          disabled={isImproving || !content.trim()}
          className="rounded border border-black/10 px-4 py-2 text-sm disabled:opacity-50 dark:border-white/10"
        >
          {isImproving ? "Improving..." : "Improve with AI"}
        </button>

        {editingNote && (
          <button
            type="button"
            onClick={onCancel}
            className="px-2 py-2 text-sm underline underline-offset-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
