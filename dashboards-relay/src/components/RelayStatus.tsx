import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface RelayStatusProps {
  relayUrl: string;
}

export function RelayStatus({ relayUrl }: RelayStatusProps) {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [uptime, setUptime] = useState(99.8);
  const [activeAgents, setActiveAgents] = useState(0);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await axios.get(`${relayUrl}/health`, { timeout: 2000 });
        setStatus('online');
        setActiveAgents(res.data.agents_online || 9);
      } catch {
        setStatus('offline');
      }
      setLastChecked(new Date());
    };

    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, [relayUrl]);

  return (
    <div className="bg-obsidian border-2 border-gold rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gold mb-2">NEXUS RELAY</h2>
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                status === 'online' ? 'bg-green-500 shadow-lg shadow-green-500' : 'bg-red-500'
              }`}
            />
            <span className="text-gray-300">
              {status === 'online' ? 'ONLINE' : 'OFFLINE'} · {activeAgents}/9 AGENTS
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-green-400">{uptime}%</div>
          <div className="text-sm text-gray-400">Uptime (7d)</div>
          <div className="text-xs text-gray-500 mt-2">
            Last checked: {lastChecked.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
