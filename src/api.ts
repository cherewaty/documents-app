import axios from "axios";
import { Document, Role } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const api = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDocumentsByRoleQuery = (role?: Role) => ({
  queryKey: ["documents", role],
  queryFn: async () => {
    const { data } = await api.get<Document[]>("documents-by-role", {
      params: { role },
    });
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
