import React, { useState } from "react";

import Flashcard from "./components/Flashcard/Flashcard";
import ControlPanel from "./components/ControlPanel/ControlPanel";

import { Settings } from "./types/pronunciation";
import { getSchema } from "./api/schema";

function App() {
  const [settings, setSettings] = useState<Settings>({
    isPaused: false,
    isWordOnLine1: false,
    shouldRotatePronunciation: true,
    shouldUseLargePronunciationData: false,
    speedLine1: 2000,
    speedLine2: 500,
    chineseCharacterFontStyle: "sans-serif",
    推導方案: getSchema("tupa"),
  });

  return (
    <div>
      <Flashcard settings={settings} setSettings={setSettings} />
      <ControlPanel settings={settings} setSettings={setSettings} />
    </div>
  );
}

export default App;
