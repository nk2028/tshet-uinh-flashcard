import React, { useState } from "react";

import Flashcard from "./components/Flashcard/Flashcard";
import ControlPanel from "./components/ControlPanel/ControlPanel";

import { Settings } from "./types/pronunciation";

function App() {
  const [settings, setSettings] = useState<Settings>({
    isPaused: true,
    isWordOnLine1: false,
    shouldRotatePronunciation: true,
    speedLine1: 2000,
    speedLine2: 500,
    schemaID: "tupa",
  });

  return (
    <div>
      <Flashcard settings={settings} setSettings={setSettings} />
      <ControlPanel settings={settings} setSettings={setSettings} />
    </div>
  );
}

export default App;