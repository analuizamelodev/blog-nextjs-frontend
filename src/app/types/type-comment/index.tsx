export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  publicationId: number;
  authorId: number;
  author: {
    id: number;
    name: string;
  };
};