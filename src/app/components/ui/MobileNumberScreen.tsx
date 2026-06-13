import React, { useState } from "react";
import { ScreenWrapper } from "./ScreenWrapper";
import { FormSelect } from "./FormSelect";
import { FormInput } from "./FormInput";
import { PrimaryButton } from "./PrimaryButton";
import { isPhoneNumber } from "../../utils/validation";

interface MobileNumberScreenProps {
  onSendOTP: (phone: string) => void;
}

export function MobileNumberScreen({ onSendOTP }: MobileNumberScreenProps) {
  const [country, setCountry] = useState("+91");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSend = () => {
    setError(null);
    const full = `${country}${phone.replace(/\D/g, "")}`;
    if (!isPhoneNumber(full)) {
      setError("Enter a valid phone number");
      return;
    }

    onSendOTP(full);
  };

  return (
    <ScreenWrapper>
      <h1 className="text-3xl font-bold">Verify Your Mobile Number</h1>

      <p className="mt-3 text-gray-400">Before your expedition begins, let's verify your mobile number so Moto can keep you connected and safe throughout your journey.</p>

      <div className="mt-6 space-y-4">
        <FormSelect label="Country" value={country} onChange={(e) => setCountry((e.target as HTMLSelectElement).value)}>
          <option value="+91">🇮🇳 India (+91)</option>
          <option value="+1">🇺🇸 United States (+1)</option>
          <option value="+44">🇬🇧 United Kingdom (+44)</option>
          <option value="+61">🇦🇺 Australia (+61)</option>
          <option value="+1">🇨🇦 Canada (+1)</option>
        </FormSelect>

        <FormInput label="Mobile Number" placeholder="9876543210" value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} />

        {error ? <div className="text-sm text-red-400">{error}</div> : null}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-gray-400">
          We will send a 4-digit OTP to verify your mobile number. Standard SMS charges may apply.
        </div>

        <PrimaryButton onClick={handleSend}>Send OTP</PrimaryButton>
      </div>
    </ScreenWrapper>
  );
}