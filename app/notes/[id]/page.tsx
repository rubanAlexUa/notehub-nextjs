import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetails from "@/app/notes/[id]/NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: `Notehub | Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Notehub | Note: ${note.title}`,
      description: note.content.slice(0, 30),
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: `Notehub | Note: ${note.title}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
};

export default Page;
