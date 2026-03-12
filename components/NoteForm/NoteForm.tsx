"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/clientApi";
import { TAGS } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

const NoteForm = () => {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as TAGS;

    mutation.mutate({ title, content, tag });
    router.back();
  };

  const handleOnChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          defaultValue={draft.title}
          id="title"
          type="text"
          name="title"
          required
          className={css.input}
          onChange={handleOnChange}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          defaultValue={draft.content}
          name="content"
          id="content"
          rows={8}
          className={css.textarea}
          onChange={handleOnChange}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          defaultValue={draft.tag}
          name="tag"
          id="tag"
          required
          className={css.select}
          onChange={handleOnChange}
        >
          {tags.map((tag, index) => (
            <option value={tag} key={index}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
