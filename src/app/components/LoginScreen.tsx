import { motion } from "motion/react";
import { ScreenWrapper } from "./ui/ScreenWrapper";
import { PrimaryButton } from "./ui/PrimaryButton";
import { SecondaryButton } from "./ui/SecondaryButton";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <ScreenWrapper>
      <div className="pt-8 pb-4 px-2 flex flex-col min-h-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10 mt-4">
          <div className="text-[2.5rem] font-black tracking-tight leading-none">MOTO<span className="text-[#FF6B00]">OS</span></div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-[0.15em] mt-2 font-medium">AI Expedition Companion</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mb-8">
          <div className="text-[2rem] font-black leading-[1.1] uppercase tracking-tight">START YOUR<br />EXPEDITION</div>
          <div className="text-sm text-zinc-400 mt-4 max-w-[260px] leading-relaxed">Your intelligent riding companion for every road ahead.</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-3 mt-auto mb-10">
          <button onClick={onLogin} className="w-full bg-[#FF6B00] text-white rounded-xl py-4 px-4 font-black text-sm uppercase tracking-wider mt-2 shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:bg-[#FF8533] transition-colors">
            GET STARTED
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-center text-xs text-zinc-500 pb-2">
          <div className="font-semibold text-zinc-400 mb-3">"Your expedition begins here."</div>
          <div className="text-[10px] text-zinc-600">By continuing you agree to our Terms & Privacy Policy</div>
          <div className="text-[10px] text-zinc-700 tracking-[0.2em] font-black uppercase mt-6">MOTOOS · LOGIN</div>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}
