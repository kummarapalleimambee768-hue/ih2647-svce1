import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { askPregnancyAssistant, AIResponse } from '../services/aiService';
import {
  Bot,
  Send,
  Trash2,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  User,
  Heart,
  PhoneCall,
  Info
} from 'lucide-react';
import { EmergencyModal } from '../components/EmergencyModal';
import { LocalizedCopy } from '../components/LocalizedCopy';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isEmergency?: boolean;
  emergencyActions?: string[];
  citation?: string;
  timestamp: string;
}

export const AssistantPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { currentUser, currentPregnancy, aiApiKey, aiProvider } = useApp();

  const currentWeek = currentPregnancy?.currentWeek || 12;
  const currentTrimester = currentPregnancy?.currentTrimester || 1;

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello ${currentUser?.fullName?.split(' ')[0] || 'there'}! 🌸 I am your Mom Journey AI Assistant.
You are currently in **Week ${currentWeek} (Trimester ${currentTrimester})**.

How may I support your wellness today? You can ask about trimester nutrition, managing symptoms, or safe movements.`,
      citation: 'WHO & ACOG Guidelines for Supportive Maternal Education',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const suggestedQuestions = [
    'What foods help maintain a balanced diet in my current trimester?',
    'What physical changes are typical around this week?',
    'What questions should I ask at my next antenatal appointment?',
    'How can I naturally soothe morning nausea and fatigue?',
    'What gentle exercises are recommended right now?',
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const response: AIResponse = await askPregnancyAssistant(
        textToSend,
        {
          week: currentWeek,
          trimester: currentTrimester,
          language: i18n.language || 'en',
          dietaryPreferences: currentPregnancy?.dietaryPreferences,
          existingConditions: currentUser?.existingConditions,
          allergies: currentUser?.allergies,
        },
        {
          apiKey: aiApiKey,
          provider: aiProvider,
        }
      );

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.content,
        isEmergency: response.isEmergencyAlert,
        emergencyActions: response.emergencyActions,
        citation: response.clinicalCitation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);

      if (response.isEmergencyAlert) {
        setEmergencyModalOpen(true);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'assistant',
          text: 'I encountered an error accessing educational knowledge. Please check your network connection.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'assistant',
        text: `Conversation cleared. I am ready to answer your prenatal questions for Week ${currentWeek}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return <LocalizedCopy>{((
    <div className="h-[calc(100vh-130px)] flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden animate-fadeIn">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-100 bg-cream-50/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-bloom-500 to-lavender-500 flex items-center justify-center text-white shadow-md shadow-bloom-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900 text-sm font-display">
                {t('assistant.title')}
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                Clinical Safety Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Week {currentWeek} Context • Grounded in ACOG & WHO Prenatal Guidance
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 max-w-2xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-bloom-500 text-white'
                  : 'bg-lavender-100 text-lavender-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-bloom-500 text-white rounded-tr-none'
                  : msg.isEmergency
                  ? 'bg-red-50 border-2 border-red-300 text-red-950 rounded-tl-none shadow-md'
                  : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Emergency Action Protocol Card */}
              {msg.emergencyActions && msg.emergencyActions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-red-200 space-y-2">
                  <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider block">
                    Immediate Action Steps:
                  </span>
                  <ul className="text-xs text-red-900 space-y-1 list-disc list-inside">
                    {msg.emergencyActions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setEmergencyModalOpen(true)}
                    className="mt-2 w-full py-2 bg-red-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Open Emergency SOS Dialers</span>
                  </button>
                </div>
              )}

              {msg.citation && (
                <div className="mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-bloom-500" />
                  <span>{msg.citation}</span>
                </div>
              )}

              <span
                className={`block text-[9px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-lavender-100 text-lavender-700 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-bloom-500 animate-spin" />
              <span>Checking prenatal clinical guidelines...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Inquiries Carousel */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto flex items-center gap-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
          Suggested:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="flex-shrink-0 px-3 py-1 rounded-full bg-white hover:bg-bloom-50 border border-slate-200 hover:border-bloom-300 text-[11px] font-medium text-slate-700 hover:text-bloom-700 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('assistant.placeholder')}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3 rounded-2xl bg-gradient-to-r from-bloom-500 to-bloom-600 hover:from-bloom-600 hover:to-bloom-700 text-white shadow-md shadow-bloom-500/20 disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
          <Info className="w-3 h-3 text-slate-400" />
          <span>{t('assistant.disclaimer')}</span>
        </p>
      </div>

      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />
    </div>
  ))}</LocalizedCopy>;
};
