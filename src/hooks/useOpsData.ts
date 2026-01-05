
"use client";

import { useState, useEffect } from "react";

export type AvailabilityStatus = "Available" | "Limited" | "Booked";

export interface OpsData {
  userLocation: string;
  availability: {
    status: AvailabilityStatus;
    nextSlot: string;
    canComeToday: boolean;
  };
  activeZones: {
    name: string;
    status: "Active" | "Queue" | "Covered" | "Expanding";
    activeJobs: number;
    coordinates?: { x: number; y: number }; // For map positioning if needed
  }[];
  weather: {
    temp: number;
    condition: string;
    impact: string;
  };
  recentActivity: {
    id: string;
    timestamp: string;
    action: string;
    location: string;
  }[];
}

const CITIES = ["Destin", "Fort Walton Beach", "Niceville", "Miramar Beach", "Santa Rosa Beach"];
const SERVICES = ["TV Mounting", "Furniture Assembly", "Drywall Repair", "Painting", "Junk Removal"];

export function useOpsData() {
  const [data, setData] = useState<OpsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetch
    const initData: OpsData = {
      userLocation: "Fort Walton Beach", // Default/Detected
      availability: {
        status: "Available",
        nextSlot: "Today, 2:30 PM",
        canComeToday: true,
      },
      activeZones: [
        { name: "Fort Walton Beach", status: "Active", activeJobs: 8 },
        { name: "Destin", status: "Active", activeJobs: 12 },
        { name: "Niceville", status: "Covered", activeJobs: 4 },
        { name: "30A", status: "Expanding", activeJobs: 2 },
      ],
      weather: {
        temp: 82,
        condition: "Clear",
        impact: "None",
      },
      recentActivity: [
        { id: "1", timestamp: "10:42 AM", action: "TV Mounting completed", location: "Destin" },
        { id: "2", timestamp: "10:15 AM", action: "Furniture Assembly", location: "FWB" },
      ],
    };

    // Simulate network delay
    const timer = setTimeout(() => {
      setData(initData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates for ticker and jobs
  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      // Add new activity
      const newActivity = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: `${SERVICES[Math.floor(Math.random() * SERVICES.length)]} completed`,
        location: CITIES[Math.floor(Math.random() * CITIES.length)],
      };

      setData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          recentActivity: [newActivity, ...prev.recentActivity.slice(0, 4)],
          activeZones: prev.activeZones.map(zone => ({
            ...zone,
            activeJobs: zone.activeJobs + (Math.random() > 0.7 ? 1 : Math.random() > 0.8 ? -1 : 0) // Random fluctuation
          }))
        };
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [data]);

  return { data, loading };
}
