"use client";

import Link from "next/link";
import { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const VIDEO_SRC = "/reference-loader-video.mp4";

function VideoReferenceContent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const searchParams = useSearchParams();
  const tParam = searchParams.get("t");
  const seekTime = tParam != null ? Number(tParam) : NaN;
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoadedMetadata = () => {
      setDuration(v.duration);
      if (Number.isFinite(seekTime) && seekTime >= 0) {
        v.currentTime = Math.min(seekTime, v.duration);
        setCurrentTime(v.currentTime);
      }
    };
    const onTimeUpdate = () => setCurrentTime(v.currentTime);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, [seekTime]);

  const seek = (t: number) => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = Math.max(0, Math.min(t, duration || 0));
      setCurrentTime(v.currentTime);
    }
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play(); else v.pause();
  };

  const format = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, "0")}`;

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="mb-4">
        <Link href="/experiments" className="text-sm text-[var(--muted)] hover:text-foreground">
          ← Experiments
        </Link>
      </div>
      <h1 className="text-xl font-semibold mb-4">Reference video (LinkedIn)</h1>
      <div className="max-w-2xl space-y-4">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="w-full rounded-lg border border-[var(--muted)]/30 bg-black"
          controls
          playsInline
        />
        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={toggle}
            className="px-3 py-1.5 rounded border border-[var(--muted)]/50 text-sm hover:bg-[var(--muted)]/10"
          >
            {playing ? "Pause" : "Play"}
          </button>
          <span className="text-sm text-[var(--muted)]">
            {format(currentTime)} / {format(duration)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1 min-w-[120px]"
          />
        </div>
      </div>
    </div>
  );
}

export default function VideoReferencePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background p-6">Loading…</div>}>
      <VideoReferenceContent />
    </Suspense>
  );
}
