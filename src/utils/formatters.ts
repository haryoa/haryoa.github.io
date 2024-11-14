// src/utils/formatters.ts
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(date);
};

export const formatAuthors = (
  authors: string[],
  yourName: string = "Haryo"
) => {
  return authors
    .map((author) => (author === yourName ? `**${author}**` : author))
    .join(", ");
};
