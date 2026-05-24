"use client";

import { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  slug: string;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ slug }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrent(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
  }

  function changeSpeed(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = Number(e.target.value);
    setSpeed(val);
    if (audioRef.current) audioRef.current.playbackRate = val;
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      className="flex items-center gap-3 font-mono text-xs py-2 px-3 mb-6"
      style={{
        background: "#0f0f1a",
        border: "1px solid #00f5ff40",
        boxShadow: "0 0 8px #00f5ff15",
      }}
    >
      <audio ref={audioRef} src={`/audio/${slug}.mp3`} preload="metadata" />

      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        aria-label={playing ? "Pause" : "Play"}
        style={{ color: "#00f5ff", textShadow: "0 0 8px #00f5ff" }}
        className="shrink-0 w-5 text-center hover:opacity-80 transition-opacity"
      >
        {playing ? "⏸" : "▶"}
      </button>

      {/* Progress bar */}
      <div className="flex-1 flex items-center gap-2">
        <span style={{ color: "#7878a0" }}>{formatTime(current)}</span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={current}
          onChange={seek}
          aria-label="Seek"
          className="flex-1 h-px cursor-pointer"
          style={{
            accentColor: "#00f5ff",
            background: `linear-gradient(90deg, #00f5ff ${progress}%, #1a1a2e ${progress}%)`,
          }}
        />
        <span style={{ color: "#7878a0" }}>{formatTime(duration)}</span>
      </div>

      {/* Speed */}
      <select
        value={speed}
        onChange={changeSpeed}
        aria-label="Playback speed"
        style={{
          background: "#0a0a0f",
          color: "#7878a0",
          border: "1px solid #1a1a2e",
          fontSize: "0.7rem",
          padding: "1px 4px",
        }}
      >
        <option value={0.75}>0.75×</option>
        <option value={1}>1×</option>
        <option value={1.25}>1.25×</option>
        <option value={1.5}>1.5×</option>
      </select>
    </div>
  );
}
