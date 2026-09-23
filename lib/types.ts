export interface Note {
  _id: string;
  title: string;
  content: string;
  createdDate: string;
  updatedDate: string;
}

export interface NoteInput {
  title: string;
  content: string;
}
