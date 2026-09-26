import React, { useState } from 'react';
import { RelayStatus } from '../components/RelayStatus';
import { AgentList } from '../components/AgentList';
import { MessageInbox } from '../components/MessageInbox';

const RELAY_URL = process.env.NEXT_PUBLIC_RELAY_URL || 'http://localhost:5555';

export default function Dashboard() {
  const [view, setView] = useState<'overview' | 'agents' | 'messages'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#1a0a2e] text-gray-100 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#C9A84C] mb-2">⚡ NEXUS RELAY</h1>
            <p className="text-gray-400">Bitfury Operations Command Centre</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Relay Endpoint</div>
            <div className="font-mono text-xs text-[#C9A84C]">{RELAY_URL}</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-8">
          {(['overview', 'agents', 'messages'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded transition font-bold ${
                view === v
                  ? 'bg-[#C9A84C] text-[#0A0A0A]'
                  : 'bg-[#C9A84C]/20 text-[#C9A84C] hover:bg-[#C9A84C]/30'
              }`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {view === 'overview' && (
          <>
            <RelayStatus relayUrl={RELAY_URL} />
            <AgentList relayUrl={RELAY_URL} />
            <MessageInbox relayUrl={RELAY_URL} />
          </>
        )}

        {view === 'agents' && (
          <>
            <h2 className="text-2xl font-bold text-[#C9A84C] mb-6">Agent Management</h2>
            <AgentList relayUrl={RELAY_URL} />
          </>
        )}

        {view === 'messages' && (
          <>
            <h2 className="text-2xl font-bold text-[#C9A84C] mb-6">Message Queue</h2>
            <MessageInbox relayUrl={RELAY_URL} />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#C9A84C]/20 text-center text-xs text-gray-500">
        <div>Studex NEXUS Relay Dashboard v1.0</div>
        <div className="mt-2">Rwanda DC · Cape Town DC · Bitfury Operations</div>
      </div>
    </div>
  );
}
