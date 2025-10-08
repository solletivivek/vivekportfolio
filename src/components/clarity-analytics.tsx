"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityAnalytics() {
  useEffect(() => {
    // Get your project ID from: Clarity project > Settings > Overview
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    
    if (projectId) {
      Clarity.init(projectId);
    } else {
      console.warn("Microsoft Clarity project ID is not set. Please add NEXT_PUBLIC_CLARITY_PROJECT_ID to your environment variables.");
    }
  }, []);

  return null;
}
