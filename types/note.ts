export type TAGS = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updateAt: string;
  tag: TAGS;
}

export interface newTodo {
  title: string;
  content?: string;
  tag: TAGS;
}
