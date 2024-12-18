import { DATA } from "./MOCK_DATA";

export const fetchConfig = () => {
  return new Promise((resolve, reject) => {
    resolve({ data: DATA });
  });
};
