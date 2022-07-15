import { PronunciationData } from "../types/pronunciation";

const fetchData = async (path: string) => {
  const response = await fetch(process.env.PUBLIC_URL + path);
  const data = await response.text();
  return data
    .trimEnd()
    .split("\n")
    .map((line) => line.split("\t")) as PronunciationData;
};

export const promiseDataSmall = fetchData("/data/data_small.tsv");
export const promiseDataLarge = fetchData("/data/data_large.tsv");
