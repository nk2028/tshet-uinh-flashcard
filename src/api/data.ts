import { PronunciationData } from "../types/pronunciation";

export const fetchData = async () => {
  const response = await fetch("/data/data.tsv");
  const data = await response.text();
  return data
    .trimEnd()
    .split("\n")
    .map((line) => line.split("\t")) as PronunciationData;
};
