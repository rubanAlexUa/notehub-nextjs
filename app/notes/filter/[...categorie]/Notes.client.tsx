"use client";

import css from "./NotesPage.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

import { useFetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  tag: string | undefined;
};

const Notes = ({ tag }: Props) => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess } = useFetchNotes(query, currentPage, tag);

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

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {data?.notes.length != 0 && isSuccess && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleChangePage={handleChangePage}
          />
        )}
        <Link href="/notes/action/create">
          <button className={css.button}>Create note +</button>
        </Link>
      </div>
      {data?.notes.length != 0 && isSuccess && <NoteList notes={data.notes} />}
    </div>
  );
};

export default Notes;
