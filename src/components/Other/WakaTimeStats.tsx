import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WakaTimeStats {
  total_seconds: number;
  human_readable_total: string;
  daily_average: number;
  human_readable_daily_average: string;
}

interface WakaTimeUser {
  created_at: string;
}

interface WakaTimeData {
  stats: WakaTimeStats | null;
  user: WakaTimeUser | null;
}

const WakaTimeStats = () => {
  const [data, setData] = useState<WakaTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar tanto stats quanto user data sem cache - sempre em tempo real
        const timestamp = new Date().getTime();
        const randomId = Math.random().toString(36).substring(7);
        const [statsResponse, userResponse] = await Promise.all([
          fetch(`/api/wakatime?_=${timestamp}&r=${randomId}&nocache=true`, {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
              Pragma: "no-cache",
              Expires: "0",
              "If-None-Match": "*",
              "If-Modified-Since": "0",
            },
            cache: "no-store",
          }),
          fetch(
            `/api/wakatime-user?_=${timestamp}&r=${randomId}&nocache=true`,
            {
              method: "GET",
              headers: {
                "Cache-Control":
                  "no-cache, no-store, must-revalidate, max-age=0",
                Pragma: "no-cache",
                Expires: "0",
                "If-None-Match": "*",
                "If-Modified-Since": "0",
              },
              cache: "no-store",
            }
          ),
        ]);

        const stats = statsResponse.ok ? await statsResponse.json() : null;
        const user = userResponse.ok ? await userResponse.json() : null;

        setData({ stats, user });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        // Fallback para dados mock quando a API falha
        setData({
          stats: {
            total_seconds: 51288, // 14 hrs 8 mins
            human_readable_total: "14 hrs 8 mins",
            daily_average: 25644, // 7 hrs 4 mins
            human_readable_daily_average: "7 hrs 4 mins",
          },
          user: {
            created_at: "2025-06-16T20:41:14Z",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center gap-2 text-sm text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        Loading coding stats...
      </motion.div>
    );
  }

  if (!data?.stats) {
    return null;
  }

  const { stats, user } = data;
  const createdDate = user?.created_at
    ? formatDate(user.created_at)
    : "data não disponível";

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2 text-sm text-white/70 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Linha principal com as informações */}
      <div className="flex flex-wrap items-center justify-center gap-1 text-center">
        <span>WakaTime Created:</span>
        <span className="text-primary font-semibold">{createdDate}</span>
        <span className="mx-2 text-white/40">|</span>
        <span>Total Coding:</span>
        <span className="text-primary font-semibold">
          {stats.human_readable_total}
        </span>
        <span className="mx-2 text-white/40">|</span>
        <span>Daily Average:</span>
        <span className="text-primary font-semibold">
          {stats.human_readable_daily_average}
        </span>
        {error && (
          <span className="text-xs text-yellow-400/60 ml-2">
            (dados estimados)
          </span>
        )}
      </div>

      {/* Powered by WakaTime */}
      <div className="flex items-center gap-1 text-xs text-white/50">
        <span>powered by</span>
        <a
          href="https://wakatime.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors underline"
        >
          WakaTime
        </a>
      </div>
    </motion.div>
  );
};

export default WakaTimeStats;
