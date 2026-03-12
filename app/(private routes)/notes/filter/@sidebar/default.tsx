import Link from "next/link";
import css from "./SidebarNotes.module.css";

const SidebarNotes = () => {
  const tags: string[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((tag, index) => (
        <li className={css.menuItem} key={index}>
          <a href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
