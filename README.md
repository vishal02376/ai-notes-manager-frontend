# AI-Powered Notes Manager - Frontend

A Next.js (React) UI for creating, viewing, editing and deleting notes, with an **Improve with AI** button that rewrites a note to be clearer, more professional and grammatically correct.

The frontend talks to the Express/MongoDB backend in the `backend/` folder.

## Technologies Used

- Next.js 16 (App Router) with React 19 (functional components and hooks)
- TypeScript
- Tailwind CSS v4
- Fetch API for HTTP calls

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page: holds state, calls the API
│   └── globals.css
├── components/
│   ├── NoteForm.tsx      # Create/Edit form + "Improve with AI" button
│   ├── NoteList.tsx      # Renders the list of notes
│   └── NoteCard.tsx      # A single note (Edit / Delete)
├── lib/
│   ├── api.ts            # All backend API calls
│   └── types.ts          # Note and NoteInput types
└── .env.local            # Environment variables (not committed)
```

## Setup

Prerequisites: Node.js 20+ and the backend running (see `backend/README.md`).

```bash
cd frontend
npm install
```

## Environment Variables

Create a `.env.local` file in the `frontend/` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend server (host and port only, without `/web/api`) |

Restart the dev server after changing this value.

## Run the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # run ESLint
```

## Features

- Create, view, edit and delete notes
- Title and content are required
- **Improve with AI** button rewrites the note text using the backend AI endpoint. The improved text is placed in the form and is only saved when you click Add/Update Note
- Each note shows its Created date, or its Updated date once it has been edited
- Loading and error messages

## Note

In development, React Strict Mode runs effects twice, so the notes request may appear twice in the Network tab. This does not happen in a production build.
