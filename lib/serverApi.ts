import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";

interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

export const fetchServerNotes = async (
  query: string,
  page: number,
  tag?: string
) => {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params: {
      tag,
      search: query,
      page,
      perPage: 12,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchServerNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

type SessionRequerst = {
  session: boolean;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const responce = await nextServer.get<SessionRequerst>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return responce;
};

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
