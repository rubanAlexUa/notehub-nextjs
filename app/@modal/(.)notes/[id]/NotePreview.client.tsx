"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";

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

  const close = () => {
    navigate.back();
  };

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !data) return <p>Something went wrong.</p>;
  return (
    <Modal handleClose={close}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={() => navigate.back()}>
          Back
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NoteDetails;
