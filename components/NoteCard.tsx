"use client";

import { Note } from "@/lib/types";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-black/10 p-4 dark:border-white/10">
      <h3 className="font-semibold">{note.title}</h3>
      <p className="whitespace-pre-wrap text-sm text-zinc-600 dark:text-zinc-400">
        {note.content}
      </p>
      <p className="text-xs text-zinc-400">
        {note.updatedDate !== note.createdDate
          ? `Updated ${new Date(note.updatedDate).toLocaleString()}`
          : `Created ${new Date(note.createdDate).toLocaleString()}`}
      </p>
      <div className="flex gap-3 text-sm">
        <button onClick={() => onEdit(note)} className="underline underline-offset-2">
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="text-red-600 underline underline-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
