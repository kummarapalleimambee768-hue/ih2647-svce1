import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Sparkles,
  Activity,
  Heart,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  Settings2,
  UserCheck
} from 'lucide-react';
import {
  processVoiceCommand,
  speakText,
  triggerFileDownload,
  VoiceCommandResult,
  VOICE_PERSONAS,
  VoicePersonaId,
  getStoredVoicePersona,
  setStoredVoicePersona,
  getSpeechRecognitionLang
} from '../services/voiceAssistant';
import { LocalizedCopy } from './LocalizedCopy';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { loginAsDemoSister } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [lastResult, setLastResult] = useState<VoiceCommandResult | null>(null);
  const [currentPersona, setCurrentPersona] = useState<VoicePersonaId>(getStoredVoicePersona());
  const [showPersonaSettings, setShowPersonaSettings] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition synchronized with active language
  useEffect(() => {
    if (typeof window !== 'undefined' && isOpen) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = getSpeechRecognitionLang(i18n.language);

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcriptText = event.results[current][0].transcript;
          setTranscript(transcriptText);

          if (event.results[current].isFinal) {
            handleExecuteCommand(transcriptText);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setSpeechSupported(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [isOpen, i18n.language]);

  const handleSelectPersona = (id: VoicePersonaId) => {
    setCurrentPersona(id);
    setStoredVoicePersona(id);
    const persona = VOICE_PERSONAS[id];
    speakText(`Voice changed to ${persona.name}. Hello, how can I support your pregnancy today?`, {
      personaId: id,
      lang: i18n.language
    });
  };

  const handleTestVoice = (id: VoicePersonaId) => {
    const persona = VOICE_PERSONAS[id];
    speakText(`This is ${persona.name}. Ready to assist you with prenatal exercises, nutrition safety, and wellness tips.`, {
      personaId: id,
      lang: i18n.language
    });
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      try {
        recognitionRef.current.lang = getSpeechRecognitionLang(i18n.language);
        recognitionRef.current.start();
      } catch (e) {
        console.error('Failed to start speech recognition', e);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    }
  };

  const handleExecuteCommand = (commandText: string) => {
    stopListening();
    const result = processVoiceCommand(commandText, i18n.language);
    setLastResult(result);

    // Speak response with chosen persona unless muted
    if (!voiceMuted) {
      speakText(result.spokenResponse, {
        personaId: currentPersona,
        lang: i18n.language
      });
    }

    // Execute actions
    if (result.action === 'LOGIN_USER' && result.sisterId) {
      loginAsDemoSister(result.sisterId);
      setTimeout(() => {
        navigate('/dashboard');
        onClose();
      }, 1500);
    } else if (result.action === 'NAVIGATE_EXERCISES') {
      const targetUrl = result.targetTrimester
        ? `/exercise?trimester=${result.targetTrimester}`
        : '/exercise';
      setTimeout(() => {
        navigate(targetUrl);
        onClose();
      }, 1600);
    } else if (result.action === 'NAVIGATE_DASHBOARD') {
      setTimeout(() => {
        navigate('/dashboard');
        onClose();
      }, 1200);
    } else if (result.action === 'NAVIGATE_NUTRITION') {
      setTimeout(() => {
        navigate('/nutrition');
        onClose();
      }, 1200);
    } else if (result.action === 'NAVIGATE_ASSISTANT') {
      setTimeout(() => {
        navigate('/assistant');
        onClose();
      }, 1200);
    }
  };


  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    setTranscript(textInput);
    handleExecuteCommand(textInput);
    setTextInput('');
  };

  const getLanguageLabel = (code: string) => {
    const c = code.split('-')[0];
    switch (c) {
      case 'hi': return 'हिन्दी (Hindi)';
      case 'te': return 'తెలుగు (Telugu)';
      case 'ta': return 'தமிழ் (Tamil)';
      case 'kn': return 'ಕನ್ನಡ (Kannada)';
      default: return 'English (India)';
    }
  };

  const sampleCommands = [
    'Log in as Ananya',
    'Log in as Priya',
    'Open safe exercises.',
    'Show second trimester exercises.',
    'Tell me the benefits of prenatal yoga.',
    'Read the safety tips.',
    'Go back to the dashboard.',
    'Download the safe exercise guide.',
    'अनन्या लॉगिन',
    'एक्सरसाइज खोलो',
  ];

  if (!isOpen) return null;

  return <LocalizedCopy>{((
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-bloom-100 relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-bloom-500 via-rose-500 to-lavender-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-bloom-500 to-lavender-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base font-display">
                  {t('voice.title', 'AI Voice Assistant')}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-bloom-100 text-bloom-800 text-[10px] font-bold">
                  {VOICE_PERSONAS[currentPersona].badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Listening in: <strong className="text-bloom-700">{getLanguageLabel(i18n.language)}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowPersonaSettings(!showPersonaSettings)}
              className={`p-2 rounded-xl transition-colors ${showPersonaSettings ? 'bg-bloom-100 text-bloom-700' : 'text-slate-500 hover:bg-slate-100'}`}
              title="Change AI Voice Persona"
            >
              <Settings2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setVoiceMuted(!voiceMuted);
                if (!voiceMuted && typeof window !== 'undefined') {
                  window.speechSynthesis?.cancel();
                }
              }}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
              title={voiceMuted ? 'Unmute voice answers' : 'Mute voice answers'}
            >
              {voiceMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-bloom-600" />}
            </button>
            <button
              onClick={() => {
                stopListening();
                if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Change AI Voice Persona Tray (collapsible or toggleable) */}
        {showPersonaSettings && (
          <div className="mt-3 p-3.5 bg-bloom-50/80 rounded-2xl border border-bloom-200 animate-fadeIn space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-bloom-950 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-bloom-600" />
                Select AI Voice Persona
              </span>
              <span className="text-[11px] text-bloom-700 font-medium">Tap to change voice</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(VOICE_PERSONAS) as VoicePersonaId[]).map((key) => {
                const persona = VOICE_PERSONAS[key];
                const isSelected = currentPersona === key;
                return (
                  <div
                    key={key}
                    onClick={() => handleSelectPersona(key)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-bloom-500 shadow-sm ring-2 ring-bloom-500/20'
                        : 'bg-white/60 hover:bg-white border-bloom-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">{persona.name}</span>
                      <span className="text-[10px] font-bold text-bloom-600">{persona.badge}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mb-1.5">{persona.role}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestVoice(key);
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-bloom-700 hover:text-bloom-900 bg-bloom-100/60 hover:bg-bloom-100 px-2 py-0.5 rounded-lg transition-colors"
                    >
                      <Play className="w-2.5 h-2.5 fill-bloom-700" />
                      <span>Test Voice</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="py-3 space-y-3.5 overflow-y-auto flex-1">
          {/* Main Microphone Button */}
          <div className="flex flex-col items-center justify-center py-3">
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform active:scale-95 ${
                isListening
                  ? 'bg-rose-500 animate-pulse ring-8 ring-rose-200'
                  : 'bg-gradient-to-tr from-bloom-500 to-bloom-600 hover:from-bloom-600 hover:to-bloom-700 hover:scale-105'
              }`}
            >
              {isListening ? <Mic className="w-9 h-9" /> : <Mic className="w-8 h-8" />}
            </button>

            <p className="mt-3 text-xs font-semibold text-slate-700">
              {isListening
                ? `Listening in ${getLanguageLabel(i18n.language)}...`
                : speechSupported
                ? `Tap to speak (${getLanguageLabel(i18n.language)})`
                : 'Microphone not supported in this browser'}
            </p>

            {transcript && (
              <div className="mt-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium max-w-sm text-center">
                "{transcript}"
              </div>
            )}
          </div>

          {/* Quick Voice Persona Bar */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-600 font-medium text-[11px]">
              Active Voice: <strong className="text-slate-900">{VOICE_PERSONAS[currentPersona].name}</strong>
            </span>
            <button
              type="button"
              onClick={() => handleTestVoice(currentPersona)}
              className="text-bloom-600 hover:text-bloom-800 text-[11px] font-bold flex items-center gap-1"
            >
              <Play className="w-3 h-3 fill-bloom-600" />
              <span>Preview Voice</span>
            </button>
          </div>

          {/* Assistant's Response Card */}
          {lastResult && (
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 text-xs text-slate-800 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-bloom-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>{VOICE_PERSONAS[currentPersona].name} Responded:</span>
              </div>
              <p className="leading-relaxed">{lastResult.spokenResponse}</p>

              {/* Sister profile match notification */}
              {lastResult.sisterName && (
                <div className="p-2 bg-bloom-100/70 rounded-xl text-bloom-900 font-semibold flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-bloom-700" />
                  <span>Logging into: {lastResult.sisterName}</span>
                </div>
              )}

              {/* Benefits list display if triggered */}
              {lastResult.benefits && (
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-700 font-medium pt-1 border-t border-cream-200">
                  {lastResult.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

              {/* Safety tips display if triggered */}
              {lastResult.safetyTips && (
                <div className="mt-2 space-y-1.5 pt-2 border-t border-cream-200 text-slate-700">
                  {lastResult.safetyTips.map((tip) => (
                    <div key={tip.id} className="p-2 bg-white rounded-xl border border-cream-200">
                      <span className="font-bold text-slate-900 block">{tip.icon} {tip.title}:</span>
                      <span className="text-[11px] text-slate-600">{tip.shortDescription}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* Sample Spoken Commands */}
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-lavender-600" />
              <span>Try speaking or clicking these commands:</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sampleCommands.map((cmd, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setTranscript(cmd);
                    handleExecuteCommand(cmd);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-bloom-50 hover:text-bloom-700 border border-slate-200 text-[11px] font-medium text-slate-700 transition-colors text-left"
                >
                  "{cmd}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Text Fallback Input Footer */}
        <div className="pt-3 border-t border-slate-100">
          <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Or type command: e.g. Log in as Ananya or open exercises"
              className="flex-1 px-3.5 py-2 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500"
            />
            <button
              type="submit"
              disabled={!textInput.trim()}
              className="p-2.5 rounded-2xl bg-bloom-500 hover:bg-bloom-600 text-white shadow-sm disabled:opacity-40 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  ))}</LocalizedCopy>;
};
