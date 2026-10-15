import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
  X,
  HeartHandshake,
  Hospital,
  Edit3,
  Save,
  User,
  Volume2,
  VolumeX,
  Send,
  MapPin,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface EmergencyContactsData {
  doctorName: string;
  doctorPhone: string;
  doctorHospital: string;
  hospitalName: string;
  hospitalPhone: string;
  partnerName: string;
  partnerPhone: string;
  notes: string;
}

const DEFAULT_CONTACTS: EmergencyContactsData = {
  doctorName: 'Dr. Sunita Sharma (OB/GYN)',
  doctorPhone: '+919876543210',
  doctorHospital: 'Apollo Cradle Maternity Hospital',
  hospitalName: 'Apollo Cradle 24x7 Maternity Emergency',
  hospitalPhone: '+914023607777',
  partnerName: 'Rahul (Husband / Primary Contact)',
  partnerPhone: '+919123456789',
  notes: 'Blood Group O+, G2P1, 24 Weeks Gestation'
};

const STORAGE_KEY = 'mom_journey_emergency_contacts';

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<EmergencyContactsData>(DEFAULT_CONTACTS);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EmergencyContactsData>(DEFAULT_CONTACTS);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSirenPlaying, setIsSirenPlaying] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const sirenIntervalRef = useRef<any>(null);

  // Load persisted contacts on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setContacts(parsed);
        setEditForm(parsed);
      }
    } catch (e) {
      console.warn('Could not load saved emergency contacts', e);
    }

    // Try fetching coordinates for SOS location
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
        },
        () => {
          setUserLocation(null);
        },
        { timeout: 5000 }
      );
    }
  }, [isOpen]);

  // Handle siren audio toggle
  const toggleSiren = () => {
    if (isSirenPlaying) {
      stopSiren();
    } else {
      startSiren();
    }
  };

  const startSiren = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(750, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.35, ctx.currentTime);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      oscillatorRef.current = osc;

      let high = false;
      sirenIntervalRef.current = setInterval(() => {
        if (oscillatorRef.current && audioCtxRef.current) {
          const now = audioCtxRef.current.currentTime;
          oscillatorRef.current.frequency.cancelScheduledValues(now);
          oscillatorRef.current.frequency.linearRampToValueAtTime(high ? 600 : 1100, now + 0.3);
          high = !high;
        }
      }, 350);

      setIsSirenPlaying(true);
    } catch (err) {
      console.warn('Siren audio error:', err);
    }
  };

  const stopSiren = () => {
    if (sirenIntervalRef.current) {
      clearInterval(sirenIntervalRef.current);
      sirenIntervalRef.current = null;
    }
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setIsSirenPlaying(false);
  };

  // Clean up siren on close
  useEffect(() => {
    return () => {
      stopSiren();
    };
  }, []);

  const handleSaveContacts = (e: React.FormEvent) => {
    e.preventDefault();
    setContacts(editForm);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(editForm));
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetDefaults = () => {
    setEditForm(DEFAULT_CONTACTS);
    setContacts(DEFAULT_CONTACTS);
    localStorage.removeItem(STORAGE_KEY);
    setIsEditing(false);
  };

  const cleanPhone = (num: string) => num.replace(/[^0-9+]/g, '');

  const buildSosSmsUri = (phone: string) => {
    const locText = userLocation ? ` My GPS: https://maps.google.com/?q=${userLocation}` : '';
    const body = encodeURIComponent(
      `URGENT SOS FROM MOM JOURNEY AI: I am an expecting mother experiencing an acute emergency/pain. Please call me back immediately or send help!${locText}`
    );
    return `sms:${cleanPhone(phone)}?body=${body}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border-2 border-red-300 relative overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top warning ribbon */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

        {/* Modal Header */}
        <div className="flex items-start justify-between mt-2 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shadow-inner flex-shrink-0 animate-pulse">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-red-950 font-display">
                  {t('emergency.title', 'Emergency SOS & Care Protocol')}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                  24/7 Rapid Help
                </span>
              </div>
              <p className="text-xs text-red-600 font-medium">
                Immediate Clinical Assistance & Direct Doctor Contact
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSiren();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
          {/* Warning Banner */}
          <div className="bg-red-50/90 rounded-2xl p-3.5 border border-red-200">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-red-900 leading-relaxed font-semibold">
                  {t(
                    'emergency.alert',
                    'If you experience acute bleeding, continuous fluid leakage, severe abdominal cramps, or sudden lack of baby movement, contact your doctor or ambulance immediately.'
                  )}
                </p>
                {userLocation && (
                  <p className="mt-1 text-[11px] text-red-700 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>Your device GPS: {userLocation} (ready to share in SOS SMS)</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Siren & Alarm Feature */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${isSirenPlaying ? 'bg-red-600 text-white animate-bounce' : 'bg-red-100 text-red-600'}`}>
                {isSirenPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {isSirenPlaying ? 'LOUD EMERGENCY SIREN SOUNDING' : 'Household Alert Siren'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {isSirenPlaying ? 'Sounding alert to alert anyone nearby' : 'Sound loud buzzer to alert family or attendants in your home'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleSiren}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isSirenPlaying
                  ? 'bg-slate-900 text-white hover:bg-black'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20'
              }`}
            >
              {isSirenPlaying ? 'Stop Siren' : 'Sound Siren'}
            </button>
          </div>

          {/* Section: Your Registered Doctor & Contacts */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-bloom-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {t('emergency.doctorContacts', 'Your Doctor & Emergency Contacts')}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {saveSuccess && (
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 animate-fadeIn">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-2.5 py-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-[11px] font-bold text-slate-700 flex items-center gap-1 transition-colors"
                >
                  <Edit3 className="w-3 h-3 text-slate-500" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit Numbers'}</span>
                </button>
              </div>
            </div>

            {/* Editing Form */}
            {isEditing ? (
              <form onSubmit={handleSaveContacts} className="space-y-3 pt-2 border-t border-slate-200">
                <p className="text-[11px] text-slate-600">
                  Update your specific doctor, maternity clinic desk, and family emergency contact:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Doctor Name & Speciality</label>
                    <input
                      type="text"
                      required
                      value={editForm.doctorName}
                      onChange={(e) => setEditForm({ ...editForm, doctorName: e.target.value })}
                      placeholder="e.g. Dr. Sunita Sharma (OB/GYN)"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Doctor Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={editForm.doctorPhone}
                      onChange={(e) => setEditForm({ ...editForm, doctorPhone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Hospital Name / Ward</label>
                    <input
                      type="text"
                      required
                      value={editForm.hospitalName}
                      onChange={(e) => setEditForm({ ...editForm, hospitalName: e.target.value })}
                      placeholder="e.g. Apollo Cradle 24x7 ER"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Hospital Emergency Desk Phone</label>
                    <input
                      type="tel"
                      required
                      value={editForm.hospitalPhone}
                      onChange={(e) => setEditForm({ ...editForm, hospitalPhone: e.target.value })}
                      placeholder="e.g. +91 40 2360 7777"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Partner / Family Name</label>
                    <input
                      type="text"
                      required
                      value={editForm.partnerName}
                      onChange={(e) => setEditForm({ ...editForm, partnerName: e.target.value })}
                      placeholder="e.g. Rahul (Husband)"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Partner / Family Phone</label>
                    <input
                      type="tel"
                      required
                      value={editForm.partnerPhone}
                      onChange={(e) => setEditForm({ ...editForm, partnerPhone: e.target.value })}
                      placeholder="e.g. +91 91234 56789"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Medical Notes / Blood Group / Weeks</label>
                  <input
                    type="text"
                    value={editForm.notes}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    placeholder="e.g. Blood O+, Rh Negative, 24 Weeks Gestation"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Defaults</span>
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Contact Numbers</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Display Contacts with 1-Click Dial and SOS SMS */
              <div className="space-y-2.5">
                {/* Doctor Contact Card */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:border-red-300 transition-colors">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-red-600 tracking-wider block">
                      Personal Obstetrician / Doctor
                    </span>
                    <p className="text-xs font-bold text-slate-900">{contacts.doctorName}</p>
                    <p className="text-[11px] text-slate-600 font-mono font-medium">{contacts.doctorPhone}</p>
                  </div>
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <a
                      href={`tel:${cleanPhone(contacts.doctorPhone)}`}
                      className="flex-1 sm:flex-initial px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Doctor</span>
                    </a>
                    <a
                      href={buildSosSmsUri(contacts.doctorPhone)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                      title="Send Emergency SOS SMS with location"
                    >
                      <Send className="w-3 h-3 text-red-600" />
                      <span>SOS SMS</span>
                    </a>
                  </div>
                </div>

                {/* Hospital Desk Card */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:border-red-300 transition-colors">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-rose-600 tracking-wider block">
                      Maternity Emergency Ward
                    </span>
                    <p className="text-xs font-bold text-slate-900">{contacts.hospitalName}</p>
                    <p className="text-[11px] text-slate-600 font-mono font-medium">{contacts.hospitalPhone}</p>
                  </div>
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <a
                      href={`tel:${cleanPhone(contacts.hospitalPhone)}`}
                      className="flex-1 sm:flex-initial px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Hospital</span>
                    </a>
                    <a
                      href="https://www.google.com/maps/search/maternity+hospital+emergency+near+me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                    >
                      <Hospital className="w-3 h-3 text-slate-600" />
                      <span>Map</span>
                    </a>
                  </div>
                </div>

                {/* Partner / Family Card */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:border-red-300 transition-colors">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block">
                      Primary Family / Partner
                    </span>
                    <p className="text-xs font-bold text-slate-900">{contacts.partnerName}</p>
                    <p className="text-[11px] text-slate-600 font-mono font-medium">{contacts.partnerPhone}</p>
                  </div>
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <a
                      href={`tel:${cleanPhone(contacts.partnerPhone)}`}
                      className="flex-1 sm:flex-initial px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Family</span>
                    </a>
                    <a
                      href={buildSosSmsUri(contacts.partnerPhone)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                    >
                      <Send className="w-3 h-3 text-slate-600" />
                      <span>SMS</span>
                    </a>
                  </div>
                </div>

                {contacts.notes && (
                  <div className="px-3 py-2 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-medium">
                    <span className="font-bold">Medical Notes: </span>
                    {contacts.notes}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* National Ambulance Direct Dial 108 / 112 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href="tel:108"
              className="flex items-center justify-center gap-2.5 py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-bold rounded-2xl shadow-lg shadow-red-700/25 transition-all transform active:scale-95 text-xs sm:text-sm"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Call Ambulance (108 / 112)</span>
            </a>
            <a
              href="https://www.google.com/maps/search/maternity+hospital+emergency+near+me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl shadow-md transition-all transform active:scale-95 text-xs sm:text-sm"
            >
              <Hospital className="w-4 h-4" />
              <span>Find Nearest Maternity ER</span>
            </a>
          </div>

          {/* Red Flags List */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-700">
            <p className="text-[11px] font-bold text-red-950 uppercase tracking-wider mb-1.5">
              Critical Red Flags Requiring Immediate ER Evaluation:
            </p>
            <ul className="text-[11px] space-y-1 list-disc list-inside text-slate-700">
              <li>Heavy vaginal bleeding or passage of blood clots</li>
              <li>Sudden severe continuous abdominal or shoulder pain</li>
              <li>Continuous gush or trickling of clear or greenish fluid</li>
              <li>Sudden severe headache with vision changes or spots</li>
              <li>Significant reduction or sudden cessation of fetal movements</li>
            </ul>
          </div>
        </div>

        {/* Footer Medical disclaimer */}
        <div className="text-center pt-3 border-t border-slate-100 mt-2">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-bloom-500" />
            <span>{t('emergency.safeDisclaimer', 'Mom Journey AI emergency contacts are stored securely on your device for immediate offline access.')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

