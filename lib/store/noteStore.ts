import { NoteFormValues, TAGS } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: NoteFormValues;
  setDraft: (note: NoteFormValues) => void;
  clearDraft: () => void;
};

const initialDraft = {
  title: "",
  content: "",
  tag: "All" as TAGS,
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
