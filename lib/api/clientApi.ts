import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { type Note, type newTodo } from "@/types/note";
import type { User } from "@/types/user";
import { nextServer } from "./api";

interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

export const fetchNotes = async (query: string, page: number, tag?: string) => {
  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params: {
      tag,
      search: query,
      page,
      perPage: 12,
    },
  });
  return response.data;
};

export const useFetchNotes = (query: string, page: number, tag?: string) => {
  return useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: keepPreviousData,
  });
};

export const fetchNoteById = async (id: string) => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {});
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {});
  return response.data;
};

export const createNote = async (newTodo: newTodo) => {
  const response = await nextServer.post<Note>(`/notes`, newTodo, {});
  return response.data;
};

export type RegisterRequets = {
  email: string;
  username: string;
  password: string;
};

export const register = async (data: RegisterRequets) => {
  const responce = await nextServer.post<User>("auth/register", data);
  return responce.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const responce = await nextServer.post<User>("/auth/login", data);
  return responce.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout", {});
};

type SessionRequerst = {
  success: boolean;
};

export const checkSession = async () => {
  const responce = await nextServer.get<SessionRequerst>("/auth/session");
  return responce.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const responce = await nextServer.patch<User>("/users/me", {
    username: payload.username,
  });
  return responce.data;
};
