import { apiClient } from "../libs/api";

export const getAllComments = async () => {
  const response = await apiClient.get("/comment");
  return response.data;
};

export const createComment = async (
  content: string,
  publicationId: number
) => {
  const response = await apiClient.post("/comment", {
    content,
    publicationId,
  });

  return response.data;
};

export const deleteByIdComment = async (id: number) => {
  await apiClient.delete(`/comment/${id}`);
};