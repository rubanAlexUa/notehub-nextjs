import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notehub | Page Not Found",
  description: `The page you are looking for does not exist on Notehub.
  Please check the URL or return to the home page to manage your notes.`,
  openGraph: {
    title: "404 Error - Missing Page",
    description: `We couldn't find the page you requested. Return to Notehub to manage your notes.`,
    url: "https://notehub.com/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Page is not found",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};
export default NotFound;
