import css from "./CerateNotes.module.css";
import NoteForm from "@/components/NoteForm/NoteForm(normalverison)";

const CreateNotes = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNotes;
