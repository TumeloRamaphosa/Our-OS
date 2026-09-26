import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  timestamp: string;
  status: 'pending' | 'processed' | 'error';
}

interface MessageInboxProps {
  relayUrl: string;
}

export function MessageInbox({ relayUrl }: MessageInboxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'processed' | 'error'>('all');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${relayUrl}/inbox`);
        const msgs = res.data.messages || [];
        setMessages(msgs.slice(0, 20)); // Latest 20
      } catch (err) {
        console.warn('Inbox fetch failed');
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [relayUrl]);

  const filtered = filter === 'all' ? messages : messages.filter((m) => m.status === filter);

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'processed': return 'text-green-400 bg-green-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400';
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'processed': return '✅';
      case 'error': return '❌';
      default: return '•';
    }
  };

  return (
    <div className="bg-obsidian border-2 border-gold rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gold">MESSAGE INBOX</h2>
        <div className="flex gap-2">
          {(['all', 'pending', 'processed', 'error'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded transition ${
                filter === f
                  ? 'bg-gold text-obsidian font-bold'
                  : 'bg-gold/20 text-gold hover:bg-gold/30'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No messages</div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              className={`border border-gold/30 rounded p-3 text-xs font-mono ${statusColor(msg.status)}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold">
                  {statusIcon(msg.status)} {msg.from} → {msg.to}
                </span>
                <span className="text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="text-gray-300 truncate">{msg.text}</div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gold/20 text-xs text-gray-400">
        <span>Total: {messages.length} messages</span>
        <span className="ml-4">Pending: {messages.filter((m) => m.status === 'pending').length}</span>
        <span className="ml-4">Processed: {messages.filter((m) => m.status === 'processed').length}</span>
        <span className="ml-4">Errors: {messages.filter((m) => m.status === 'error').length}</span>
      </div>
    </div>
  );
}
