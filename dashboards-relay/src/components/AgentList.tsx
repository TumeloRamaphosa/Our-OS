import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'degraded';
  lastActivity: string;
  messagesProcessed: number;
}

interface AgentListProps {
  relayUrl: string;
}

const AGENTS: Agent[] = [
  { id: 'naledi', name: 'NALEDI', role: 'CMO', status: 'online', lastActivity: 'now', messagesProcessed: 247 },
  { id: 'openclaw', name: 'OPENCLAW', role: 'Strategy', status: 'online', lastActivity: 'now', messagesProcessed: 156 },
  { id: 'cashmoney', name: 'CASHMONEY', role: 'CFO', status: 'online', lastActivity: '2m ago', messagesProcessed: 89 },
  { id: 'adam', name: 'ADAM', role: 'CTO', status: 'online', lastActivity: 'now', messagesProcessed: 203 },
  { id: 'charlie', name: 'CHARLIE', role: 'Voice', status: 'online', lastActivity: '5m ago', messagesProcessed: 64 },
  { id: 'eddie', name: 'EDDIE', role: 'Ads', status: 'online', lastActivity: 'now', messagesProcessed: 127 },
  { id: 'ralf', name: 'RALF', role: 'Loop', status: 'online', lastActivity: 'now', messagesProcessed: 512 },
  { id: 'hermes', name: 'HERMES', role: 'Router', status: 'online', lastActivity: 'now', messagesProcessed: 891 },
  { id: 'katia', name: 'KATIA', role: 'CAO', status: 'online', lastActivity: '1m ago', messagesProcessed: 134 },
];

export function AgentList({ relayUrl }: AgentListProps) {
  const [agents, setAgents] = useState<Agent[]>(AGENTS);

  useEffect(() => {
    const updateAgents = async () => {
      try {
        const res = await axios.get(`${relayUrl}/status`);
        if (res.data.agents) {
          setAgents(res.data.agents);
        }
      } catch (err) {
        // Use default agents
      }
    };

    updateAgents();
    const interval = setInterval(updateAgents, 10000);
    return () => clearInterval(interval);
  }, [relayUrl]);

  const statusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const statusDot = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500 shadow-lg shadow-green-500';
      case 'degraded': return 'bg-yellow-500 shadow-lg shadow-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-obsidian border-2 border-gold rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gold mb-4">AGENT ROSTER (9)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-black/40 border border-gold/20 rounded p-4 hover:border-gold/60 transition">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2.5 h-2.5 rounded-full ${statusDot(agent.status)}`} />
              <div className="font-bold text-gray-100">{agent.name}</div>
            </div>
            <div className="text-xs text-gray-400 mb-2">{agent.role}</div>
            <div className={`text-xs font-mono ${statusColor(agent.status)} mb-2`}>
              {agent.status.toUpperCase()}
            </div>
            <div className="text-xs text-gray-500">
              Last: {agent.lastActivity}
            </div>
            <div className="text-xs text-gold mt-2">
              Processed: {agent.messagesProcessed}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
