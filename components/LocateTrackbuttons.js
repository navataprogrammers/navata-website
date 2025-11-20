"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import "../styles/LocateTrackButtons.css";

const LocateTrackButtons = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Hide buttons  on the homepage
  if (pathname === "/") return null;

  return (
    <div className="floating-buttons-container">
      <button
        className="floating-btn locate-btn"
        onClick={() => router.push("/branch-locator")}
      >
        Locate
      </button>
      <button
        className="floating-btn track-btn"
        onClick={() => router.push("/track-consignment")}
      >
        Track
      </button>
    </div>
  );
};

export default LocateTrackButtons;
