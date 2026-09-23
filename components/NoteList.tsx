"use client";

import { Note } from "@/lib/types";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return <p className="text-sm text-zinc-500">No notes yet. Create your first one above.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
