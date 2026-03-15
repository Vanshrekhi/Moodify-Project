import React, { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import { useSong } from "../../home/hooks/useSong";
import "./FaceExpression.scss";
import Player from "../../home/components/Player";

export default function FaceExpression() {
  const { handleGetSong } = useSong();

  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

const handleDetect = async () => {
  const mood = await detect({
    landmarkerRef,
    videoRef,
    setExpression,
  });

  console.log("MOOD DETECTED:", mood);   // ADD THIS

  if (mood) {
    handleGetSong({ mood });
  }
};

  return (
    <div className="face-container">
      <h1 className="title">AI Mood Detector</h1>

      <div className="camera-card">
        <video ref={videoRef} autoPlay playsInline className="camera" />

        <div className="expression-box">
          <h2 className="expression-text">{expression}</h2>

          <button className="button detect-btn" onClick={handleDetect}>
            Detect Expression
          </button>
        </div>
      </div>
      <Player />
    </div>
  );
}
