import React, { useRef, useState, useEffect } from "react";
import { useSong } from "../hooks/useSong";
import "./player.scss";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5];

const Player = () => {

  const { song } = useSong();

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (audioRef.current && song?.url) {
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [song]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleLoaded = () => {
    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const forward = () => {
    audioRef.current.currentTime += 10;
  };

  const backward = () => {
    audioRef.current.currentTime -= 10;
  };

  const changeSpeed = (value) => {
    setSpeed(value);
    audioRef.current.playbackRate = value;
  };

  if (!song?.url) {
    return <div className="no-song">No song yet</div>;
  }

  return (
    <div className="player">

      <audio
        ref={audioRef}
        src={song.url}
        onLoadedMetadata={handleLoaded}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="player-info">
        <img src={song.posterUrl} alt={song.title} />
        <h3>{song.title}</h3>
      </div>

      <div className="controls">

        <button onClick={backward}>⏪</button>

        <button className="play" onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button onClick={forward}>⏩</button>

      </div>

      <div className="progress">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
            setCurrentTime(e.target.value);
          }}
        />
      </div>

      <div className="speed">
        {SPEED_OPTIONS.map((s) => (
          <button
            key={s}
            className={s === speed ? "active" : ""}
            onClick={() => changeSpeed(s)}
          >
            {s}x
          </button>
        ))}
      </div>

    </div>
  );
};

export default Player;