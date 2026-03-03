"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

const NoteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();
  const {
    data,
    isLoading,
    isError: error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !data) return <p>Something went wrong.</p>;
  return (
    <main className={css.main}>
      <button className={css.return_button} onClick={() => navigate.back()}>
        {"<--"} Return back
      </button>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    </main>
  );
};

export default NoteDetails;
