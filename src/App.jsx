import { useState } from "react";
import { TRACKS } from "./data/tracks";
import TrackView from "./components/TrackView";
import Home from "./components/Home";

const TRACK_LIST = Object.values(TRACKS);

export default function App() {
  const [active, setActive] = useState(null);
  const track = active ? TRACKS[active] : null;

  if (track) {
    return <TrackView track={track} onBack={() => setActive(null)} />;
  }

  return <Home tracks={TRACK_LIST} onSelect={setActive} />;
}