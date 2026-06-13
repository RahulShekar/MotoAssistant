import React, { useState, useEffect, useRef } from "react";
import { searchPlaces, getPlaceDetails } from "../../services/api";

interface LocationData {
  name: string;
  placeId: string;
  latitude: number;
  longitude: number;
}

interface PlaceAutocompleteProps {
  label: string;
  placeholder?: string;
  value: string;
  onSelect: (val: string, data?: LocationData) => void;
}

export function PlaceAutocomplete({ label, placeholder, value, onSelect }: PlaceAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputValue.length < 3 || inputValue === value) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchPlaces(inputValue);
        setSuggestions(results);
        setOpen(results.length > 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue, value]);

  const handleSelect = async (place: any) => {
    setInputValue(place.text);
    setOpen(false);
    onSelect(place.text);

    try {
      const details = await getPlaceDetails(place.placeId);
      // Callback with the full enriched payload
      onSelect(place.text, {
        name: details.name || place.text,
        placeId: details.placeId,
        latitude: details.latitude,
        longitude: details.longitude,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "390px", margin: "0 auto", position: "relative" }} ref={ref}>
      {label && (
        <div style={{
          fontSize: "11px",
          color: "#888",
          marginBottom: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 600
        }}>
          {label}
        </div>
      )}
      <input
        type="text"
        style={{
           width: "100%",
           padding: "12px 14px",
           background: "#1A1A1A",
           border: "1px solid rgba(255,255,255,0.1)",
           borderRadius: "10px",
           color: "#FFFFFF",
           fontFamily: "var(--font-body)",
           fontSize: "14px",
           outline: "none",
           boxSizing: "border-box"
        }}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onSelect(e.target.value);
        }}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true);
        }}
      />
      {open && (
        <div style={{
          position: "absolute",
          zIndex: 9999,
          top: "100%",
          marginTop: "4px",
          width: "100%",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "#1A1A1A",
          padding: "4px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.8)"
        }}>
          {loading && suggestions.length === 0 ? (
            <div style={{ padding: "12px", fontSize: "12px", color: "#888", textAlign: "center" }}>Loading...</div>
          ) : (
            <ul style={{ maxHeight: "240px", overflowY: "auto", margin: 0, padding: 0, listStyle: "none" }}>
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "#CCC",
                    cursor: "pointer",
                    borderRadius: "6px",
                    marginBottom: "2px",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = "#222";
                    (e.target as HTMLElement).style.color = "#FFF";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = "transparent";
                    (e.target as HTMLElement).style.color = "#CCC";
                  }}
                  onClick={() => handleSelect(s)}
                >
                  {s.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
