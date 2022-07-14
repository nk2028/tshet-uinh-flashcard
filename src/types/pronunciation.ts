import * as Qieyun from "qieyun";

export type PronunciationData = [[string, string]];
export type 推導函數 = (
  音韻地位: Qieyun.推導方案.音韻地位,
  字頭?: string
) => string;

export interface Settings {
  isPaused: boolean;
  isWordOnLine1: boolean;
  shouldRotatePronunciation: boolean;
  speedLine1: number;
  speedLine2: number;
  schemaID: string;
  推導方案?: 推導函數;
}
