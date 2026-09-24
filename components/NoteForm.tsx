"use client";

import { useState, SubmitEvent } from "react";
import { Note, NoteInput } from "@/lib/types";
import { improveNote } from "@/lib/api";

interface NoteFormProps {
  editingNote: Note | null;
  onSave: (note: NoteInput) => Promise<void>;
  onCancel: () => void;
}

const inputStyle =
  "rounded border border-black/10 bg-transparent px-3 py-2 outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30";

export default function NoteForm({ editingNote, onSave, onCancel }: NoteFormProps) {
  // Prefill existing values in edit mode, otherwise start with an empty form
  const [title, setTitle] = useState(editingNote ? editingNote.title : "");
  const [content, setContent] = useState(editingNote ? editingNote.content : "");
  const [saving, setSaving] = useState(false);
  const [improving, setImproving] = useState(false);
  const [error, setError] = useState("");

  // Improve the content using AI
  async function handleImprove() {
    setImproving(true);
    setError("");
    try {
      const improved = await improveNote(content);
      setContent(improved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to improve note");
    } finally {
      setImproving(false);
    }
  }

  // Save the note 
  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSave({ title, content });
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save note");
    } finally {
      setSaving(false);
    }
  }

  const isEmpty = !title.trim() || !content.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className={inputStyle}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        rows={5}
        className={inputStyle}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={saving || isEmpty}
          className="rounded bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {saving ? "Saving..." : editingNote ? "Update Note" : "Add Note"}
        </button>

        <button
          type="button"
          onClick={handleImprove}
          disabled={improving || !content.trim()}
          className="rounded border border-black/10 px-4 py-2 text-sm disabled:opacity-50 dark:border-white/10"
        >
          {improving ? "Improving..." : "Improve with AI"}
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
