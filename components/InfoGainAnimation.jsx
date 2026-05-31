"use client";
import React, { useState, useEffect } from 'react';

export default function InfoGainAnimation() {
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const totalFrames = 30;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setFrame((prev) => (prev + 1) % totalFrames);
      }, 600); // 1.6 fps for readability
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const paddedFrame = frame.toString().padStart(3, '0');
  
  return (
    <div style={{ margin: "24px 0" }}>
      <div 
        style={{
          borderRadius: "var(--r-2)",
          overflow: "hidden",
          boxShadow: "var(--shadow-card)",
          position: "relative",
          cursor: "pointer",
          border: "1px solid var(--rule)"
        }}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <img
          src={`/research/figures/info_gain/step_${paddedFrame}.png`}
          alt={`Belief update animation step ${frame}`}
          style={{ width: "100%", display: "block" }}
        />
        <div style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          background: "rgba(20, 17, 14, 0.8)",
          color: "#F4EEE2",
          padding: "4px 8px",
          borderRadius: "var(--r-1)",
          fontSize: "10px",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.05em",
          display: "flex",
          gap: "8px",
          alignItems: "center"
        }}>
          <span>{isPlaying ? '⏸ PAUSE' : '▶ PLAY'}</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>STEP {paddedFrame} / 029</span>
        </div>
      </div>
      <p className="t-caption" style={{ marginTop: 8 }}>
        Information gain animation over the first 30 steps of an episode. Click the figure to pause or play.
      </p>
    </div>
  );
}
