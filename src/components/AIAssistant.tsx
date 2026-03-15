import { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Sparkles, X, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { aiService } from '../services/ai.service';
import { useAppStore } from '../store/appStore';
import type { ChatMessage } from '../types';

export default function AIAssistant() {
  const conversationId = useMemo(() => `conv-${Date.now()}`, []);
  const { currentSimulation, addNotification } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your BitNet-powered city planning assistant. I can help you analyze urban patterns, suggest optimizations, and generate city scenarios. How can I help you today?',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [stats, setStats] = useState({ inferenceTime: 0, tokens: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.sendMessage(
        currentInput,
        conversationId,
        currentSimulation?.id
      );

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setStats({
        inferenceTime: response.inferenceTime,
        tokens: response.tokensGenerated,
      });

      await aiService.saveInteractionToDatabase(
        currentInput,
        response,
        currentSimulation?.id,
        conversationId
      );

    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to get AI response',
      });

      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an issue. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([{
      role: 'assistant',
      content: 'Conversation cleared. How can I help you?',
      timestamp: new Date().toISOString(),
    }]);
    aiService.clearConversation(conversationId);
    setStats({ inferenceTime: 0, tokens: 0 });
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 255, 136, 0.4)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Sparkles size={28} color="#000" />
      </button>
    );
  }

  return (
    <div style={{
      position: 'absolute',
      top: isExpanded ? '1rem' : 'auto',
      bottom: isExpanded ? '1rem' : '2rem',
      right: isExpanded ? '1rem' : '2rem',
      width: isExpanded ? 'calc(100% - 2rem)' : '400px',
      height: isExpanded ? 'calc(100% - 2rem)' : '600px',
      background: 'rgba(22, 33, 62, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1rem',
      border: '1px solid rgba(0, 255, 136, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      zIndex: 50,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={24} color="#00ff88" />
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: '#00ff88' }}>
              BitNet AI Assistant
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
              {stats.inferenceTime > 0
                ? `${stats.inferenceTime}ms | ${stats.tokens} tokens`
                : 'Powered by 1.58-bit LLM'}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleClear}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Clear conversation"
          >
            <Trash2 size={18} color="#94a3b8" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              display: 'flex',
              alignItems: 'center'
            }}
            title={isExpanded ? 'Minimize' : 'Maximize'}
          >
            {isExpanded ? <Minimize2 size={18} color="#94a3b8" /> : <Maximize2 size={18} color="#94a3b8" />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Minimize"
          >
            <X size={18} color="#94a3b8" />
          </button>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)'
                : 'rgba(255, 255, 255, 0.05)',
              color: msg.role === 'user' ? '#000' : '#fff',
              fontSize: '0.875rem',
              lineHeight: 1.5
            }}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div style={{
            alignSelf: 'flex-start',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            background: 'rgba(255, 255, 255, 0.05)',
            fontSize: '0.875rem',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(0, 255, 136, 0.3)',
              borderTopColor: '#00ff88',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Analyzing with BitNet...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        gap: '0.75rem'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about city planning..."
          disabled={loading}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
            color: '#fff',
            fontSize: '0.875rem',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            padding: '0.75rem 1rem',
            background: loading || !input.trim() ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s'
          }}
        >
          <Send size={18} color={loading || !input.trim() ? '#666' : '#000'} />
        </button>
      </div>
    </div>
  );
}
