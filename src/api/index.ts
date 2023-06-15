import axios from "axios";

export enum URL_LIST {
  GET_BOOKS_LIST_URL = "https://openlibrary.org/subjects/",
  GET_BOOK_PREVIEW = "https://openlibrary.org/works/",
}

export const getListOfBooksBySubject = async (subject: string) => {
  const res = await axios(
    `${URL_LIST.GET_BOOKS_LIST_URL}${subject.toLowerCase()}.json?details=true`
  );
  return res.data;
};

export const getBookPreview = async (id: string) => {
  const res = await axios(`${URL_LIST.GET_BOOK_PREVIEW}${id}.json`);
  return res.data;
}
