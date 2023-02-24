import { 推導函數 } from "../types/pronunciation";

const {
  tupa,
  baxter,
  blankego,
  kyonh,
  zyepheng,
  sliark_peengqvim,
}: {
  tupa: 推導函數;
  baxter: 推導函數;
  blankego: 推導函數;
  kyonh: 推導函數;
  zyepheng: 推導函數;
  sliark_peengqvim: 推導函數;
} = require("qieyun-examples");

const { ayaka_2021 } = require("./ayaka_2021");

const phonological_position = (x: any) => x.最簡描述;

export const getSchema = (schemaID: string) => {
  return {
    tupa,
    baxter,
    blankego,
    kyonh,
    zyepheng,
    sliark_peengqvim,
    ayaka_2021,
    phonological_position,
  }[schemaID];
};
