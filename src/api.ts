import axios from "axios";
import { Document } from "./types";

export const api = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDocumentsQuery = () => ({
  queryKey: ["documents"],
  queryFn: async () => {
    const { data } = await api.get<Document[]>("documents");
    return data;
  },
});

export const getDocumentQuery = (documentId: string) => ({
  queryKey: ["document", documentId],
  queryFn: async () => {
    const { data } = await api.get<Document>(`documents/${documentId}`);
    return data;
  },
});
