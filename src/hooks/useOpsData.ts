import { useState, useEffect } from 'react';

export interface OpsData {
  userLocation: string;
  availability: {
    status: string;
    nextSlot: string;
    canComeToday: boolean;
  };
  weather: {
    temp: number;
    condition: string;
  };
  activeZones: {
    name: string;
    status: string;
    load?: number;
    activeJobs: number;
  }[];
  recentActivity: {
    id: string;
    timestamp: string;
    action: string;
    location: string;
  }[];
}

export function useOpsData() {
  const [data, setData] = useState<OpsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOps() {
      try {
        const res = await fetch('/api/ops-data');
        if (res.ok) {
            const json = await res.json();
            setData(json);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchOps();
  }, []);

  return { data, loading };
}
