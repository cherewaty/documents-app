import axios from "axios";
import { Document } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

export const useUpdateDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (document: Partial<Document>) => {
      return api.put(`documents/${document.id}`, document);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["document"] });
    },
  });
};

export const useCreateDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (document: Partial<Document>) => {
      return api.post(`documents`, document);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
