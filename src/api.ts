export const getDocumentsQuery = () => ({
  queryKey: ["documents"],
  queryFn: async () => {
    const response = await fetch("/api/documents");
    if (!response.ok) {
      throw new Error("Could not connect");
    }
    return response.json();
  },
});

export const getDocumentQuery = (documentId: string) => ({
  queryKey: ["document", documentId],
  queryFn: async () => {
    const response = await fetch(`/api/documents/${documentId}`);
    if (!response.ok) {
      throw new Error("Could not connect");
    }
    return response.json();
  },
});
