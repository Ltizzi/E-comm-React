import React, { useEffect, useState } from "react";
import { getShorterString, getTrackDuration } from "../../../utils/utils";

const StepBTracks = ({ prod, addTracksDuration, handleInputChange }) => {
  const [track, setTrack] = useState("");

  const [tracks, setTracks] = useState([]);
  const [tracksDuration, setTracksDuration] = useState([]);
  const [durationToEdit, setDurationToEdit] = useState(null);

  function handleEnterPress(e, type, index = null) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "name") {
        const newTracks = [...tracks, track];
        setTracks(newTracks);
        setTrack("");
        handleInputChange("tracklist", newTracks);
      } else {
        const splited = e.target.value.split(":");
        const minutesInMs = +splited[0] * 60 * 1000;
        const secondsInMs = +splited[1] * 1000;
        const duration = minutesInMs + secondsInMs;
        let updatedDurations;
        if (durationToEdit == index) {
          updatedDurations = tracksDuration.map((td, i) => {
            if (i == index) {
              return duration;
            }
            return td;
          });
        } else {
          updatedDurations = [...(tracksDuration || []), duration];
        }
        setTracksDuration(updatedDurations);
        addTracksDuration(updatedDurations);
        setDurationToEdit(null);
        // setTrackDuration("");
        e.target.value = "";
      }
    }
  }

  function enableInput(index) {
    if (tracksDuration[index]) {
      setDurationToEdit(index);
    }
  }

  useEffect(() => {
    if (prod && prod.tracklist && prod.tracklist.length > 0) {
      setTracks(prod.tracklist || []);
      setTracksDuration(prod.extra.trackDuration || []);
    }
  }, [prod]);

  return (
    <div className="h-full flex flex-col justify-center w-full items-center gap-5 pb-10">
      <fieldset className="fieldset">
        <div>
          <legend className="fieldset-legend">Add a track name:</legend>
          <input
            type="text"
            className="input input-secondary w-96"
            required
            placeholder="Type here and press Enter"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            onKeyDown={(e) => handleEnterPress(e, "name")}
          />
        </div>
      </fieldset>
      <div className="text-xs text-start flex flex-col gap-0.5 ">
        <p>Press enter to correctly add track's duration and name</p>
        <p>Click on track's duration to update it</p>
      </div>

      <div className="flex flex-col gap-2 justify-center overflow-y-auto h-auto max-h-96 w-full">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Track name</th>
                <th>Duration</th>
                <th>Enter duration</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((song, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{getShorterString(song, 25)}</td>
                  <td
                    className={`${
                      tracksDuration[index] ? "hover:cursor-pointer" : ""
                    }`}
                    onClick={() => enableInput(index)}
                  >
                    <div
                      className="tooltip size-full tooltip-bottom tooltip-info"
                      data-tip="Click to edit"
                    >
                      {tracksDuration[index]
                        ? getTrackDuration(tracksDuration[index])
                        : ""}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input input-secondary rounded-none  input-sm"
                      required
                      placeholder="Track duration"
                      onKeyDown={(e) => handleEnterPress(e, "dur", index)}
                      // onChange={(e) => setTrackDuration(e.target.value)}
                      // value={trackDuration}
                      disabled={
                        tracksDuration[index] > 0 && durationToEdit != index
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* {tracks.map((song, index) => (
          <div className="flex flex-row justify-between align-middle items-center gap-5 border-2 border-secondary">
            <p>
              {index + 1} - {song}
            </p>
            <p></p>
            <div></div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default StepBTracks;
