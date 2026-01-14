"use client";

import { useState, useEffect, useSyncExternalStore } from 'react';
import { toast } from 'sonner';

interface QueueItem {
  id: string;
  type: string;
  payload: unknown;
  timestamp: number;
}

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true;
}

export function useOfflineQueue() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [queue, setQueue] = useState<QueueItem[]>([]);

  useEffect(() => {
    // Load queue on mount
    const load = async () => {
        try {
            const stored = localStorage.getItem('offline_queue');
            if (stored) {
                setQueue(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load offline queue", e);
        }
    };
    void load();
  }, []);

  useEffect(() => {
    if (isOnline) {
       const process = async () => {
          const stored = localStorage.getItem('offline_queue');
          if (!stored) return;
          const currentQueue: QueueItem[] = JSON.parse(stored);
          if (currentQueue.length > 0) {
             toast.success("Back online. Processing queue...");
             // Simulate processing
             for (const item of currentQueue) {
                 console.log(`Processing ${item.type}`, item.payload);
             }
             setQueue([]);
             localStorage.removeItem('offline_queue');
             toast.success(`Synced ${currentQueue.length} items`);
          }
       };
       void process();
    }
  }, [isOnline]);

  useEffect(() => {
      const handleOffline = () => {
          toast.warning("You are offline. Changes will be synced when connection is restored.");
      };

      window.addEventListener('offline', handleOffline);
      
      return () => {
          window.removeEventListener('offline', handleOffline);
      };
  }, []);

  const addToQueue = (type: string, payload: unknown) => {
    const item: QueueItem = {
        id: crypto.randomUUID(),
        type,
        payload,
        timestamp: Date.now()
    };
    setQueue(prev => {
        const newQueue = [...prev, item];
        localStorage.setItem('offline_queue', JSON.stringify(newQueue));
        return newQueue;
    });
    toast.info("Action queued (offline mode)");
  };

  return { isOnline, queue, addToQueue };
}
