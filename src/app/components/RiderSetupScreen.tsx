import { useState } from "react";
import { ChevronRight, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ScreenWrapper } from "./ui/ScreenWrapper";
import { useJourney } from "../context/JourneyContext";
import { createRider as apiCreateRider } from "../services/riderApi";

interface RiderSetupScreenProps {
  onComplete: () => void;
}

const bikeModels = [
  "Royal Enfield Himalayan",
  "Royal Enfield Classic 350",
  "KTM 390 Adventure",
  "KTM 250 Adventure",
  "BMW F 850 GS",
  "BMW R 1250 GS",
  "Yamaha MT-15",
  "Hero Xpulse 200",
  "Honda CB500X",
  "Honda CB350",
  "Other",
];

const countries = [
  { code: "+91", label: "India" },
  { code: "+1", label: "US/Canada" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "Australia" },
  { code: "+971", label: "UAE" },
  { code: "+65", label: "Singapore" },
];

export function RiderSetupScreen({ onComplete }: RiderSetupScreenProps) {
  const [name, setName] = useState("");
  const [bike, setBike] = useState("");
  const [tank, setTank] = useState("");
  const [mileage, setMileage] = useState("");
  
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setCurrentRider } = useJourney();

  const canProceed = name && bike && tank && mileage && isVerified;

  const inputClass = "w-full bg-[#1A1A1C] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF6B00]/50 focus:bg-[#2A2A2D] transition-colors";
  const labelClass = "block text-[10px] text-zinc-500 font-semibold tracking-wider uppercase mb-1.5";
  const selectClass = `${inputClass} appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSIjODg4IiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTE5IDlsLTcgNy03LTciLz48L3N2Zz4=')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em] pr-10`;

  const handleSendOtp = () => {
    if (mobile.length < 5) return;
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") { // Mock OTP check
      setIsVerified(true);
      setIsOtpSent(false);
    } else {
      alert("Invalid OTP. Try 1234");
    }
  };

  return (
    <ScreenWrapper>
      <div className="w-full max-w-md mx-auto flex flex-col min-h-full pb-8">
        <div className="pt-8 pb-4">
          <div className="text-3xl font-black uppercase tracking-tight text-white mb-2">GEAR UP</div>
          <div className="text-sm text-zinc-400">Create your rider profile for the journey</div>
        </div>

        <div className="h-px w-full bg-zinc-800/50 mb-6" />

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-5 flex-1">
          <div>
            <label className={labelClass}>Rider Name</label>
            <input className={inputClass} placeholder="e.g. Arjun Singh" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className={labelClass}>Contact Number</label>
            <div className="flex gap-2">
              <select 
                className={`${selectClass} w-1/3`}
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={isVerified}
              >
                {countries.map(c => <option key={c.code} value={c.code}>{c.label} ({c.code})</option>)}
              </select>
              <input 
                className={`${inputClass} flex-1`} 
                type="tel" 
                placeholder="Mobile number" 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)} 
                disabled={isVerified}
              />
            </div>
            {!isVerified && (
               <button 
                onClick={handleSendOtp}
                disabled={mobile.length < 5}
                className="mt-3 w-full bg-[#1C1C1E] text-white hover:bg-[#2C2C2E] py-3 rounded-xl text-sm font-bold uppercase disabled:opacity-50"
              >
                Send OTP
              </button>
            )}
            {isVerified && (
              <div className="mt-2 text-xs font-semibold text-[#00C853] flex items-center gap-1 uppercase tracking-wider">
                <CheckCircle2 size={14} /> Number Verified
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Motorcycle Model</label>
            <select className={selectClass} value={bike} onChange={(e) => setBike(e.target.value)}>
              <option value="" disabled>Select Motorcycle</option>
              {bikeModels.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tank Capacity</label>
              <select className={selectClass} value={tank} onChange={(e) => setTank(e.target.value)}>
                <option value="" disabled>Litres</option>
                {Array.from({ length: 16 }, (_, i) => i + 5).map(n => <option key={n} value={n}>{n} L</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Mileage</label>
              <select className={selectClass} value={mileage} onChange={(e) => setMileage(e.target.value)}>
                <option value="" disabled>km/L</option>
                {["10-15", "15-20", "20-25", "25-30", "30-35", "35-40", "40-45", "45-50"].map(m => <option key={m} value={m.split("-")[0]}>{m} km/L</option>)}
              </select>
            </div>
          </div>
        </motion.div>

        {error ? <div className="mt-4 text-sm text-red-400">{error}</div> : null}

        <div className="mt-8">
          <button
            onClick={async () => {
              if (!canProceed) return;
              setError(null);
              setLoading(true);
              try {
                const payload = {
                  name,
                  bike,
                  tankCapacity: Number(tank),
                  mileage: Number(mileage),
                  bloodGroup: "Unknown",
                  experience: "Unknown",
                  emergencyContact: `${countryCode} ${mobile}`,
                };

                const created = await apiCreateRider(payload);
                setCurrentRider({ id: created.id, ...payload, createdAt: created.createdAt || new Date().toISOString() });
                onComplete();
              } catch (err: any) {
                setError(err?.message || "Failed to create rider");
              } finally {
                setLoading(false);
              }
            }}
            disabled={!canProceed || loading}
            className={`w-full py-4 px-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              canProceed ? "bg-[#FF6B00] text-white hover:bg-[#FF8533]" : "bg-[#1C1C1E]/50 text-zinc-600 cursor-not-allowed"
            }`}
          >
            {loading ? "Gearing Up…" : "GEAR UP YOUR RIDE"}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* OTP Modal Mock */}
      <AnimatePresence>
        {isOtpSent && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="bg-[#151515] border border-white/10 rounded-2xl p-6 w-full max-w-sm relative"
            >
              <button onClick={() => setIsOtpSent(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold mb-2">Verify Number</h3>
              <p className="text-zinc-400 text-sm mb-6">Enter the OTP sent to {countryCode} {mobile}</p>
              
              <input 
                className={inputClass + " text-center tracking-[1em] text-2xl font-bold py-4"} 
                type="text" 
                maxLength={4} 
                placeholder="----" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
              />
              <p className="text-zinc-500 text-xs mt-2 text-center">Use 1234 for testing</p>

              <button 
                onClick={handleVerifyOtp}
                className="mt-6 w-full bg-[#FF6B00] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider"
              >
                Verify
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
}
