"use client";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

interface MatchScoreCardProps {
  score: number;
}

export default function MatchScoreCard({
  score,
}: MatchScoreCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="text-center text-xl font-semibold text-white">
        🎯 Match Score
      </h2>

      <div className="mx-auto mt-8 h-48 w-48">

        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: "#ffffff",
            pathColor:
              score >= 80
                ? "#22c55e"
                : score >= 60
                ? "#f59e0b"
                : "#ef4444",
            trailColor: "#27272a",
            textSize: "18px",
          })}
        />

      </div>

      <p className="mt-6 text-center text-lg text-zinc-300">

        {score >= 90
          ? "Outstanding Match 🚀"
          : score >= 80
          ? "Excellent Match 🎉"
          : score >= 70
          ? "Very Good Match 👍"
          : score >= 50
          ? "Fair Match"
          : "Needs Improvement"}

      </p>

    </div>
  );
}