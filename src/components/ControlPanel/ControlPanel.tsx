import React from "react";

import styles from "./ControlPanel.module.css";

import { Settings } from "../../types/pronunciation";

const ControlPanel = ({
  settings,
  setSettings,
}: {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}) => {
  const handleChangeSchema = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({ ...prev, schemaID: event.target.value }));
  };

  const handleChangePaused = () => {
    setSettings((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const handleChangeSpeedLine1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings((prev) => ({
      ...prev,
      speedLine1: parseInt(event.target.value),
    }));
  };

  const handleChangeSpeedLine2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSpeedLine2 = parseInt(event.target.value);
    setSettings((prev) => ({
      ...prev,
      speedLine2: Math.min(newSpeedLine2, settings.speedLine1),
    }));
  };

  const handleChangeDisplayMode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings((prev) => ({
      ...prev,
      isWordOnLine1: event.target.value === "詞上音下",
    }));
  };

  const handleChangeShouldRotatePronunciation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings((prev) => ({
      ...prev,
      shouldRotatePronunciation: event.target.checked,
    }));
  };

  return (
    <div className={styles.controlPanel}>
      <p>
        <input
          type="button"
          value={settings.isPaused ? "繼續" : "暫停"}
          onClick={handleChangePaused}
        />
      </p>
      <p>
        <select
          lang="zh-HK"
          name="推導方案"
          id="推導方案"
          onChange={handleChangeSchema}
        >
          <option value="tupa">切韻拼音</option>
          <option value="baxter">白一平轉寫</option>
          <option value="blankego">有女羅馬字</option>
          <option value="kyonh">古韻羅馬字</option>
          <option value="zyepheng">隋拼</option>
          <option value="sliark_peengqvim">Sliark 拼音</option>
          <option value="ayaka_2021">字體測試</option>
          {React.createElement("x-comment", {
            text: "Ayaka 2021 Romanisation is still in its early stages. Labeled as 字體測試 (font test) to prevent inadvertent use.",
          })}
        </select>
      </p>
      <p>
        <label>
          SpeedLine1:{" "}
          <input
            type="number"
            min="0"
            step="100"
            value={settings.speedLine1}
            onChange={handleChangeSpeedLine1}
          />
        </label>
      </p>
      <p>
        <label>
          SpeedLine2:{" "}
          <input
            type="number"
            min="0"
            max={settings.speedLine1}
            step="100"
            value={settings.speedLine2}
            onChange={handleChangeSpeedLine2}
          />
        </label>
      </p>

      <fieldset>
        <legend>顯示模式</legend>
        <p>
          <label>
            <input
              type="radio"
              value="音上詞下"
              checked={settings.isWordOnLine1 === false}
              onChange={handleChangeDisplayMode}
            />
            音上詞下
          </label>
          <label>
            <input
              type="radio"
              value="詞上音下"
              checked={settings.isWordOnLine1 === true}
              onChange={handleChangeDisplayMode}
            />
            詞上音下
          </label>
        </p>
      </fieldset>

      <p>
        <label>
          <input
            type="checkbox"
            checked={settings.shouldRotatePronunciation}
            onChange={handleChangeShouldRotatePronunciation}
          />
          旋轉拼音
        </label>
      </p>
    </div>
  );
};

export default ControlPanel;
