import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchServerNotes } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ categorie: string[] }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { categorie } = await params;
  const tag = categorie[0] == "all" ? undefined : categorie[0];

  return {
    title: `Notehub | ${tag == undefined ? "All" : `filter: ${tag}`}`,
    description: tag,
    openGraph: {
      title: `Notehub | ${tag == undefined ? "All" : `filter: ${tag}`}`,
      description: `${
        tag == undefined
          ? "Browsing your saved notes"
          : `Browsing your saved notes filtered by ${tag}`
      }.
      Stay organized and find exactly what you need on Notehub.`,
      url: `${
        tag == undefined
          ? "https://notehub.com/notes"
          : `https://notehub.com/notes/filter/${tag}`
      }`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: `Notehub | ${tag == undefined ? "All" : `filter: ${tag}`}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

const Page = async ({ params }: Props) => {
  const { categorie } = await params;
  const tag = categorie[0] == "all" ? undefined : categorie[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => fetchServerNotes("", 1, tag),
    queryKey: ["notes", "", 1],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
};

export default Page;
