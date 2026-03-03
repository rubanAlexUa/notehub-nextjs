import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type Note, type newTodo } from "@/types/note";

const VITE_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

export const fetchNotes = async (query: string, page: number) => {
  const response = await axios.get<FetchNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        search: query,
        page,
        perPage: 12,
      },
      headers: {
        Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const useFetchNotes = (query: string, page: number) => {
  return useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
  });
};

export const fetchNoteById = async (id: string) => {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const createNote = async (newTodo: newTodo) => {
  const response = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes/`,
    newTodo,
    {
      headers: {
        Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};
