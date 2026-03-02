import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";
export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => fetchNotes("", 1),
    queryKey: ["notes", "", 1],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes />
    </HydrationBoundary>
  );
}
