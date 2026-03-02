"use client";

import css from "./NotesPage.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { useFetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components//Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function Notes() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openedModal, setOpenedModal] = useState(false);

  const { data, isSuccess } = useFetchNotes(query, currentPage);

  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value.trim());
      setCurrentPage(1);
    },
    1000
  );

  const handleChangePage = (selected: number) => {
    setCurrentPage(selected + 1);
  };

  const handleClose = () => {
    setOpenedModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {data?.notes.length != 0 && isSuccess && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleChangePage={handleChangePage}
          />
        )}
        <button className={css.button} onClick={() => setOpenedModal(true)}>
          Create note +
        </button>
      </header>
      {data?.notes.length != 0 && isSuccess && <NoteList notes={data.notes} />}
      {openedModal && (
        <Modal handleClose={handleClose}>
          <NoteForm handleClose={handleClose} />
        </Modal>
      )}
    </div>
  );
}
