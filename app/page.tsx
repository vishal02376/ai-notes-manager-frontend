"use client";

import { useEffect, useState } from "react";
import { Note, NoteInput } from "@/lib/types";
import { getNotes, createNote, updateNote, deleteNote } from "@/lib/api";
import NoteForm from "@/components/NoteForm";
import NoteList from "@/components/NoteList";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetches all notes from the backend
  async function loadNotes() {
    try {
      const data = await getNotes();
      setNotes(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load notes");
    } finally {
      setLoading(false);
    }
  }

  // Load notes once when the page opens
  useEffect(() => {
    
    loadNotes();
  }, []);

  // On form submit: update in edit mode, otherwise create a new note
  async function handleSave(note: NoteInput) {
    if (editingNote) {
      await updateNote(editingNote._id, note);
      setEditingNote(null);
    } else {
      await createNote(note);
    }
    await loadNotes();
  }

  async function handleDelete(id: string) {
    await deleteNote(id);
    await loadNotes();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold">AI-Powered Notes Manager</h1>

      
      <NoteForm
        key={editingNote ? editingNote._id : "new"}
        editingNote={editingNote}
        onSave={handleSave}
        onCancel={() => setEditingNote(null)}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="text-sm text-zinc-500">Loading notes...</p>
      ) : (
        <NoteList notes={notes} onEdit={setEditingNote} onDelete={handleDelete} />
      )}
    </div>
  );
}
