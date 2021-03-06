import React, { useState, useEffect } from "react";

import * as Qieyun from "qieyun";

import styles from "./Flashcard.module.css";

import { PronunciationData, Settings } from "../../types/pronunciation";

import { promiseDataSmall, promiseDataLarge } from "../../api/data";

const Flashcard = ({
  settings,
  setSettings,
}: {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lines, setLines] = useState<{
    line1: React.ReactElement;
    line2: React.ReactElement;
  }>({
    line1: <></>,
    line2: <></>,
  });
  const [pronunciationDataSmall, setPronunciationDataSmall] =
    useState<PronunciationData>();
  const [pronunciationDataLarge, setPronunciationDataLarge] =
    useState<PronunciationData>();
  const [isInitialised, setIsInitialised] = useState<boolean>(false);

  const createRomanisationElements = (pronunciation: string) => {
    return <>{pronunciation.split(" ").map(createRomanisationElement)}</>;
  };

  const createRomanisationElement = (
    singlePronunciation: string,
    index: number
  ) => {
    const 音韻地位 = Qieyun.音韻地位.from編碼(singlePronunciation);
    const romanisation = settings.推導方案(音韻地位);
    return (
      <span
        className={
          音韻地位.屬於("上聲")
            ? styles.toneX
            : 音韻地位.屬於("去聲")
            ? styles.toneH
            : undefined
        }
        key={index}
      >
        {romanisation}
      </span>
    );
  };

  const refreshBoard = () => {
    if (pronunciationDataSmall && pronunciationDataLarge) {
      const pronunciationData = settings.shouldUseLargePronunciationData
        ? pronunciationDataLarge
        : pronunciationDataSmall;
      const { length: dataLen } = pronunciationData;
      const idx = Math.floor(Math.random() * dataLen);
      const [pronunciation, word] = pronunciationData[idx];

      const elementPronunciation = (
        <p
          lang="ltc-Latn"
          className={
            settings.shouldRotatePronunciation
              ? styles.rotate + " " + styles.pronunciation
              : styles.pronunciation
          }
        >
          {createRomanisationElements(pronunciation)}
        </p>
      );
      const elementWord = (
        <p lang="ltc-Hant" className={styles.word}>
          {word}
        </p>
      );
      const elementLine2Placeholder = (
        <p lang="ltc-Hant" className={styles.emptyLine2Placeholder}>
          {settings.isWordOnLine1 ? "p" : "佔"}
        </p>
      );

      const contentLine1 = settings.isWordOnLine1
        ? elementWord
        : elementPronunciation;
      const contentLine2 = settings.isWordOnLine1
        ? elementPronunciation
        : elementWord;

      setLines((prev) => ({
        ...prev,
        line1: contentLine1,
        line2: elementLine2Placeholder,
      }));

      window.setTimeout(() => {
        setLines((prev) => ({ ...prev, line2: contentLine2 }));
      }, settings.speedLine2);
    }
  };

  useEffect(() => {
    (async () => {
      const [pronunciationDataSmall, pronunciationDataLarge] =
        await Promise.all([promiseDataSmall, promiseDataLarge]);
      setPronunciationDataSmall(pronunciationDataSmall);
      setPronunciationDataLarge(pronunciationDataLarge);
      setIsInitialised(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!settings.isPaused) {
      const boardEvent = window.setInterval(refreshBoard, settings.speedLine1);
      return () => {
        window.clearInterval(boardEvent);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialised, settings]);

  return (
    <div
      className={
        settings.chineseCharacterFontStyle === "serif"
          ? "chineseCharacterUseSerif " + styles.displayArea
          : settings.chineseCharacterFontStyle === "cursive"
          ? "chineseCharacterUseCursive " + styles.displayArea
          : styles.displayArea
      }
    >
      {lines.line1}
      {lines.line2}
    </div>
  );
};

export default Flashcard;
