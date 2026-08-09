"use client";

import { useEffect, useState } from "react";
import { RiTimeLine } from "react-icons/ri";

interface WakaTimeStats {
  total_seconds: number;
  human_readable_total: string;
}

const WakaTimeStats = () => {
  const [stats, setStats] = useState<WakaTimeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Usar múltiplos parâmetros para garantir que nunca haja cache
        const timestamp = new Date().getTime();
        const randomId = Math.random().toString(36).substring(7);
        const response = await fetch(
          `/api/wakatime?_=${timestamp}&r=${randomId}&nocache=true`,
          {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
              Pragma: "no-cache",
              Expires: "0",
              "If-None-Match": "*",
              "If-Modified-Since": "0",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching WakaTime stats:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/50 text-sm">
        <RiTimeLine className="text-lg animate-pulse" />
        <span>Carregando...</span>
      </div>
    );
  }

  if (error || !stats) {
    return null; // Não exibe nada em caso de erro
  }

  return (
    <div className="flex items-center gap-2 text-white/50 hover:text-primary transition-all text-sm">
      <RiTimeLine className="text-lg" />
      <span>
        <strong>{stats.human_readable_total}</strong> codificando
      </span>
    </div>
  );
};

export default WakaTimeStats;
