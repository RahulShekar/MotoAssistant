import React, { useState } from "react";
import { ScreenWrapper } from "./ScreenWrapper";
import { FormInput } from "./FormInput";
import { PrimaryButton } from "./PrimaryButton";

interface OTPVerificationScreenProps {
  onVerify: (code: string) => void;
}

export function OTPVerificationScreen({ onVerify }: OTPVerificationScreenProps) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);

  const setDigit = (index: number, value: string) => {
    const d = [...digits];
    d[index] = value.replace(/[^0-9]/g, "").slice(0, 1);
    setDigits(d);
  };

  const code = digits.join("");

  return (
    <ScreenWrapper>
      <h1 className="text-3xl font-bold">Verify Mobile Number</h1>

      <p className="mt-3 text-gray-400">Enter the 4-digit verification code sent to your registered mobile number.</p>

      <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <p className="text-sm text-gray-400">OTP sent to</p>
        <p className="mt-1 text-lg font-semibold">+91 ••••••4321</p>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        {digits.map((d, i) => (
          <input
            key={i}
            value={d}
            onChange={(e) => setDigit(i, e.target.value)}
            maxLength={1}
            className="w-14 h-14 text-center text-xl bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-500"
          />
        ))}
      </div>

      {error ? <div className="text-sm text-red-400 mt-4">{error}</div> : null}

      <div className="mt-6">
        <PrimaryButton onClick={() => { if (code.length < 4) { setError('Enter the 4-digit code'); return; } onVerify(code); }}>{"Verify OTP"}</PrimaryButton>
      </div>

      <button className="w-full mt-4 text-orange-500 font-medium">Resend OTP</button>
    </ScreenWrapper>
  );
}