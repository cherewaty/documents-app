import axios from "axios";
import { Document, DocumentType, Role } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const REFETCH_INTERVAL = 60000;
const CEO_TIMEOUT = 60000;

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
  refetchInterval: REFETCH_INTERVAL,
});

export const getDocumentQuery = (documentId: string) => ({
  queryKey: ["document", documentId],
  queryFn: async () => {
    const { data } = await api.get<Document>(`documents/${documentId}`);
    return data;
  },
  refetchInterval: REFETCH_INTERVAL,
});

export const useUpdateDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (document: Partial<Document>) => {
      const response = await api.put(`documents/${document.id}`, document);

      // IMPLEMENTATION SHORTCUT: should happen on the server
      if (response.data.reviewer === Role.CEO) {
        setTimeout(async () => {
          const latest = await api.get(`documents/${response.data.id}`);
          if (latest.data.reviewer === Role.CEO) {
            await api.put(`documents/${response.data.id}`, {
              ...latest.data,
              reviewer: Role.MANAGER,
            });
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            queryClient.invalidateQueries({ queryKey: ["document"] });
          }
        }, CEO_TIMEOUT);
      }

      return response;
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
    mutationFn: async (document: Partial<Document>) => {
      // IMPLEMENTATION SHORTCUT: should happen on the server
      let reviewer = Role.MANAGER;
      if (
        document.type === DocumentType.REQUISITION &&
        document.amount &&
        document.amount > 1000
      ) {
        reviewer = Role.CEO;
      }

      const response = await api.post(`documents`, { ...document, reviewer });

      // IMPLEMENTATION SHORTCUT: should happen on the server
      if (response.data.reviewer === Role.CEO) {
        setTimeout(async () => {
          const latest = await api.get(`documents/${response.data.id}`);
          if (latest.data.reviewer === Role.CEO) {
            await api.put(`documents/${response.data.id}`, {
              ...latest.data,
              reviewer: Role.MANAGER,
            });
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            queryClient.invalidateQueries({ queryKey: ["document"] });
          }
        }, CEO_TIMEOUT);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
