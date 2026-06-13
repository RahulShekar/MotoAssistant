import { Navigation, Clock, Fuel, Zap, MapPin, CloudRain, AlertTriangle, BookOpen } from "lucide-react";
import { motion } from "motion/react";

interface SummaryScreenProps {
  onJournal: () => void;
  onHome: () => void;
}

const StatBox = ({ icon, label, value, color = "#FFF" }: { icon: React.ReactNode; label: string; value: string; color?: string }) => (
  <div className="bg-[#151515] border border-white/5 rounded-2xl p-4 flex flex-col gap-2">
    <div className="text-zinc-600">{icon}</div>
    <div className="font-black text-2xl tracking-tight" style={{ color }}>{value}</div>
    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{label}</div>
  </div>
);

export function SummaryScreen({ onJournal, onHome }: SummaryScreenProps) {
  return (
    <div className="w-full h-full bg-[#0B0B0B] flex flex-col overflow-y-auto pb-8">
      {/* Hero */}
      <div className="pt-10 px-5 pb-6 border-b border-white/5 mb-5 bg-gradient-to-b from-[#00C853]/5 to-transparent">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#00C853]/10 border border-[#00C853]/30 flex items-center justify-center text-xl">
              🏁
            </div>
            <div>
              <div className="text-[10px] text-[#00C853] font-black uppercase tracking-[0.15em] mb-0.5">Ride Complete</div>
              <div className="text-[28px] font-black text-white tracking-tight leading-none uppercase">LEH REACHED</div>
            </div>
          </div>
          <div className="text-xs text-zinc-500 font-medium">
            Manali → Leh · 10 June 2026
          </div>
          
          {/* Route map snapshot placeholder */}
          <div className="mt-4 rounded-xl overflow-hidden h-28 bg-gradient-to-br from-[#0D1A0D] to-[#111] border border-[#00C853]/20 relative flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 340 100" preserveAspectRatio="none">
              <path d="M 30 85 C 60 70 80 50 110 45 C 140 40 160 55 190 40 C 220 25 240 20 270 15 C 290 12 310 14 320 12" stroke="#00C853" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="30" cy="85" r="4" fill="#00C853" />
              <circle cx="320" cy="12" r="4" fill="#FF6B00" />
              <text x="20" y="97" fill="rgba(255,255,255,0.4)" fontSize="8" fontWeight="bold" fontFamily="monospace">MANALI</text>
              <text x="300" y="24" fill="rgba(255,107,0,0.8)" fontSize="8" fontWeight="bold" fontFamily="monospace">LEH</text>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Stats grid */}
      <div className="px-5 grid grid-cols-2 gap-3 mb-6">
        <StatBox icon={<Navigation size={18} />} label="Distance" value="476 km" color="#FF6B00" />
        <StatBox icon={<Clock size={18} />} label="Ride Time" value="11h 24m" color="#4FC3F7" />
        <StatBox icon={<Fuel size={18} />} label="Fuel Used" value="17 L" color="#FFB300" />
        <StatBox icon={<Zap size={18} />} label="Avg Speed" value="42 km/h" color="#00C853" />
      </div>

      {/* Ride events */}
      <div className="px-5 mb-6">
        <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-3">
          Ride Events
        </div>
        <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5">
          {[
            { icon: <MapPin size={16} />, label: "Stops made", value: "6", color: "#888" },
            { icon: <CloudRain size={16} />, label: "Weather events", value: "1 rain", color: "#4FC3F7" },
            { icon: <AlertTriangle size={16} />, label: "Road alerts", value: "2", color: "#FFB300" },
            { icon: <Fuel size={16} />, label: "Fuel stops", value: "3 stops", color: "#FF6B00" },
          ].map((item, i) => (
            <div key={item.label} className={`flex items-center gap-3 p-4 ${i < 3 ? 'border-b border-white/5' : ''}`}>
              <div style={{ color: item.color }}>{item.icon}</div>
              <div className="flex-1 text-[13px] text-zinc-400 font-medium">{item.label}</div>
              <div className="font-mono text-[13px] font-bold text-zinc-300">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-5 mb-8">
        <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-3">
          Badges Earned
        </div>
        <div className="flex gap-3">
          {[
            { emoji: "🏔️", label: "Pass Conqueror", active: true },
            { emoji: "🛣️", label: "476km Solo", active: true },
            { emoji: "⛽", label: "Fuel Master", active: true },
          ].map((b) => (
            <div key={b.label} className="flex-1 bg-[#151515] border border-[#FF6B00]/20 rounded-2xl p-3 text-center relative overflow-hidden">
              <div className="absolute top-1 left-2 text-[8px] text-[#FF3D00] font-black border border-[#FF3D00]/50 rounded px-1 tracking-wider bg-[#FF3D00]/10">SOS</div>
              <div className="text-3xl mb-1 mt-2">{b.emoji}</div>
              <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="px-5 flex flex-col gap-3 mt-auto">
        <button
          onClick={onJournal}
          className="w-full bg-[#1C1C1E] border border-white/5 rounded-xl py-4 flex items-center justify-center gap-2 text-white font-bold tracking-wide transition-colors"
        >
          <BookOpen size={18} />
          GENERATE JOURNAL
        </button>
        <button
          onClick={onHome}
          className="w-full bg-transparent border border-white/5 rounded-xl py-4 text-zinc-500 font-bold transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
