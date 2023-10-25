import { useQuery } from "@tanstack/react-query";

export const Documents = () => {
  const query = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const response = await fetch("/api/documents");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <ul>
      {query.data?.map((document) => (
        <li key={document.id}>
          {`$${document.amount} ${document.description}`}
        </li>
      ))}
    </ul>
  );
};
