import { useState } from "react";
import { Phone, MapPin, Wrench, X, AlertOctagon } from "lucide-react";
import { motion } from "motion/react";

interface EmergencyScreenProps {
  onClose: () => void;
}

export function EmergencyScreen({ onClose }: EmergencyScreenProps) {
  const [sosActivated, setSosActivated] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleSOS = () => {
    if (!sosActivated) {
      setSosActivated(true);
      let c = 3;
      const t = setInterval(() => {
        c -= 1;
        setCountdown(c);
        if (c <= 0) clearInterval(t);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[95] flex flex-col pt-12 px-5 pb-8 overflow-y-auto"
      style={{
        background: sosActivated ? "rgba(255,61,0,0.06)" : "#0B0B0B",
        transition: "background 0.5s",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-12 right-5 bg-[#1A1A1A] border-none rounded-full p-2 cursor-pointer text-zinc-500 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>

      {/* Header */}
      <div className="mb-8 pr-10">
        <div className="text-[10px] text-[#FF3D00] tracking-[0.2em] uppercase font-black mb-1.5">
          Emergency Mode
        </div>
        <div className="text-3xl font-black text-white tracking-tight leading-none">
          NEED HELP?
        </div>
        <div className="text-[12px] text-zinc-500 mt-2">
          <span className="text-[#FF3D00]">📍</span> Near Keylong, Himachal Pradesh · 3,120m altitude
        </div>
      </div>

      {/* SOS Button */}
      <div className="flex justify-center mb-10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSOS}
          className="relative flex flex-col items-center justify-center cursor-pointer rounded-full"
          style={{
            width: 160,
            height: 160,
            background: sosActivated ? "#FF3D00" : "#1A0A05",
            border: `2px solid ${sosActivated ? "#FF3D00" : "#FF3D00"}`,
          }}
        >
          {sosActivated && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -inset-4 rounded-full border-2 border-[#FF3D00]/40"
            />
          )}
          <AlertOctagon size={44} color={sosActivated ? "#FFFFFF" : "#FF3D00"} strokeWidth={1.5} />
          <span
            className={`font-black text-2xl tracking-widest mt-2 ${sosActivated ? "text-white" : "text-[#FF3D00]"}`}
          >
            SOS
          </span>
          {sosActivated && countdown > 0 && (
            <span className="font-mono text-xs text-white/60 mt-1">
              Calling in {countdown}s
            </span>
          )}
        </motion.button>
      </div>

      {sosActivated && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FF3D00]/10 border border-[#FF3D00]/25 rounded-xl px-4 py-3 mb-5 text-center"
        >
          <div className="text-[12px] text-[#FF3D00] font-semibold">
            📍 Live location shared with Priya Singh (+91 98765 43210)
          </div>
          <div className="text-[11px] text-zinc-400 mt-1.5">
            Emergency services alerted · GPS: 32.0784° N, 77.1734° E
          </div>
        </motion.div>
      )}

      {/* Emergency actions */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-0.5">
          Emergency Actions
        </div>

        {[
          {
            icon: <Phone size={20} strokeWidth={2} />,
            title: "Call Emergency Contact",
            sub: "Priya Singh · +91 98765 43210",
            color: "#4FC3F7",
            bg: "#0A151A",
            border: "#152A33",
          },
          {
            icon: <MapPin size={20} strokeWidth={2} />,
            title: "Nearest Hospital",
            sub: "Keylong District Hospital · 2.3 km",
            color: "#00C853",
            bg: "#051A0A",
            border: "#0A3314",
          },
          {
            icon: <Wrench size={20} strokeWidth={2} />,
            title: "Nearest Mechanic",
            sub: "Rajesh Motors · 800 m ahead",
            color: "#FFB300",
            bg: "#1A1505",
            border: "#332A0A",
          },
        ].map((item) => (
          <button
            key={item.title}
            className="rounded-2xl p-3.5 flex items-center gap-4 text-left transition-colors cursor-pointer"
            style={{ background: item.bg, border: `1px solid ${item.border}` }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ color: item.color }}>
              {item.icon}
            </div>
            <div>
              <div className="text-[15px] font-bold text-white tracking-tight">{item.title}</div>
              <div className="font-mono text-[10px] text-zinc-500 mt-0.5">{item.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Medical info */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-4 mt-auto">
        <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-3">
          Medical Info (for responders)
        </div>
        <div className="flex gap-6">
          {[
            { label: "Blood", value: "B+" },
            { label: "Allergies", value: "None" },
            { label: "Rider", value: "Arjun Singh" },
          ].map((m) => (
            <div key={m.label}>
              <div className="font-black text-sm text-[#FF3D00]">{m.value}</div>
              <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
