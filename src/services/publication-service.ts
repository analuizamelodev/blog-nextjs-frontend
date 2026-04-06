import { apiClient } from "../libs/api";


export const getPublications = async () => {
  const response = await apiClient.get("/publication");
  return response.data;
};

export const createPublication = async (title: string, content: string) => {
  const response = await apiClient.post("/publication", {
    title,
    content,
  });
  return response.data;
};

export const updateByIdPublication = async (id: number, title: string, content: string) => {
  const response = await apiClient.put(`/publication/${id}`, {
    title,
    content,
  });
  return response.data; 
};

export const deleteByIdPublication = async (id: number) => {
  await apiClient.delete(`/publication/${id}`);
};