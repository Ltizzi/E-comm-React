import React, { useState } from "react";
import { getTrackDuration } from "../../../utils/utils";

const StepBTracks = () => {
  const [track, setTrack] = useState("");
  const [trackDuration, setTrackDuration] = useState("");
  const [tracks, setTracks] = useState([]);
  const [tracksDuration, setTracksDuration] = useState([]);

  function handleEnterPress(e, type, index = null) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "name") {
        setTracks([...tracks, track]);
        setTrack("");
      } else {
        const splited = trackDuration.split(":");
        const minutesInMs = +splited[0] * 60 * 1000;
        const secondsInMs = +splited[1] * 1000;
        const duration = minutesInMs + secondsInMs;
        setTracksDuration([...tracksDuration, duration]);
        setTrackDuration("");
      }
    }
  }

  return (
    <div className="h-full flex flex-col justify-center w-full items-center gap-10 pb-10">
      <fieldset className="fieldset">
        <div>
          <legend className="fieldset-legend">Add a track name:</legend>
          <input
            type="text"
            className="input input-secondary"
            required
            placeholder="Type here and press Enter"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            onKeyDown={(e) => handleEnterPress(e, "name")}
          />
        </div>
      </fieldset>
      <div className="flex flex-col gap-2 justify-center overflow-y-auto h-auto max-h-96 w-full">
        {tracks.map((song, index) => (
          <div className="flex flex-row justify-between align-middle items-center gap-5 border-2 border-secondary">
            <p>
              {index + 1} - {song}
            </p>
            <p>
              {trackDuration[index]
                ? getTrackDuration(tracksDuration[index])
                : ""}
            </p>
            <div>
              <input
                type="text"
                className="input input-secondary rounded-none  input-sm"
                required
                placeholder="Track duration"
                onKeyDown={(e) => handleEnterPress(e, "dur", index)}
                onChange={(e) => setTrackDuration(e.target.value)}
                value={trackDuration}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepBTracks;
