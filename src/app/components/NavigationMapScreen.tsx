import { useJourney } from "../context/JourneyContext";
import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Polyline, Marker } from "@react-google-maps/api";
import { Mic, Navigation, Fuel, Clock, Thermometer, AlertTriangle, X } from "lucide-react";
import { motion } from "motion/react";

interface NavigationMapScreenProps {
  onAskMoto: () => void;
  onAlert: () => void;
  onEmergency: () => void;
}

const libraries: any[] = ["geometry"];

interface POI {
  placeId: string;
  name: string;
  latitude: number;
  longitude: number;
  types: string[];
}

export function NavigationMapScreen({ onAskMoto, onAlert, onEmergency }: NavigationMapScreenProps) {
  const { journeyData, currentRider } = useJourney();
  const [speed, setSpeed] = useState(48);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  
  const [fuelStations, setFuelStations] = useState<POI[]>([]);
  const [serviceCenters, setServiceCenters] = useState<POI[]>([]);
  const [emergencyPlaces, setEmergencyPlaces] = useState<POI[]>([]);
  const [insightIndex, setInsightIndex] = useState(0);
  
  const route = journeyData?.route;
  const weather = journeyData?.weather;
  const fuelPlan = journeyData?.fuelPlan;
  
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const path = useMemo(() => {
    if (!route?.polyline || !isLoaded || !window.google) return [];
    try {
      return window.google.maps.geometry.encoding.decodePath(route.polyline);
    } catch (e) {
      return [];
    }
  }, [route?.polyline, isLoaded]);

  // Geolocation tracking
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setSpeed(Math.round((position.coords.speed || 0) * 3.6));
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Set initial location from route
  useEffect(() => {
    if (!currentLocation && path.length > 0) {
      setCurrentLocation({ lat: path[0].lat(), lng: path[0].lng() });
    }
  }, [path, currentLocation]);

  // Fetch POIs
  useEffect(() => {
    if (!currentLocation) return;
    const fetchPOIs = async () => {
      try {
        const [fuelRes, serviceRes, emergencyRes] = await Promise.all([
          fetch(`http://localhost:3001/navigation/fuel-stations?lat=${currentLocation.lat}&lng=${currentLocation.lng}&radius=10000`),
          fetch(`http://localhost:3001/navigation/service-centers?lat=${currentLocation.lat}&lng=${currentLocation.lng}&brand=${currentRider?.bike || ""}&radius=20000`),
          fetch(`http://localhost:3001/navigation/emergency?lat=${currentLocation.lat}&lng=${currentLocation.lng}&radius=15000`)
        ]);
        
        if (fuelRes.ok) setFuelStations((await fuelRes.json()).places || []);
        if (serviceRes.ok) setServiceCenters((await serviceRes.json()).places || []);
        if (emergencyRes.ok) setEmergencyPlaces((await emergencyRes.json()).places || []);
      } catch (error) {
        console.error("Failed to fetch POIs", error);
      }
    };

    fetchPOIs();
    const intervalId = setInterval(fetchPOIs, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [currentLocation?.lat, currentLocation?.lng, currentRider?.bike]);

  // Insights rotation
  const insights = useMemo(() => {
    return [
      journeyData?.weatherRisk === "HIGH" ? "Severe weather expected ahead. Ride with caution." : "Weather conditions look clear for the next hour.",
      `Next fuel stop recommended in ${Math.max(10, Math.floor((fuelPlan?.fuelStopsNeeded || 0) * 50))} km.`,
      serviceCenters.length > 0 ? `Nearest ${currentRider?.bike || "Service"} center is ${serviceCenters[0].name}.` : "Monitoring nearby service centers.",
      emergencyPlaces.length > 0 ? `Emergency services available nearby: ${emergencyPlaces[0].name}.` : "MotoOS active monitoring."
    ];
  }, [journeyData, serviceCenters, emergencyPlaces, fuelPlan, currentRider]);

  useEffect(() => {
    const interval = setInterval(() => setInsightIndex((prev) => (prev + 1) % insights.length), 8000);
    return () => clearInterval(interval);
  }, [insights.length]);

  const calcEta = () => {
    if (!route?.durationHours) return "6:42 PM";
    const d = new Date();
    d.setMinutes(d.getMinutes() + Math.floor(route.durationHours * 60));
    return d.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' });
  };

  const mapCenter = currentLocation || (path.length > 0 ? path[Math.floor(path.length / 2)] : { lat: 32.2396, lng: 77.1887 });

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-[#0D1A0D] flex items-center justify-center text-zinc-500 font-mono text-sm">
        INITIALIZING SATELLITES...
      </div>
    );
  }

  return (
      <div className="relative w-full h-full bg-[#0B0B0B] overflow-hidden flex flex-col">
      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-12 pb-4 px-4 pointer-events-none">
        <div className="flex items-start justify-between">
          <div className="pointer-events-auto">
            <button className="flex items-center gap-1.5 bg-[#151515] border border-white/10 rounded-full px-3 py-1.5 mb-3 text-zinc-300 text-[11px] font-semibold">
              <X size={14} /> End Ride
            </button>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-[28px] leading-none text-white tracking-tight">{route?.distanceKm ?? 187}</span>
              <span className="text-zinc-500 text-sm font-semibold">km</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1">ETA {calcEta()}</div>
          </div>

          <div className="flex flex-col items-center bg-[#1C1C1E] border border-white/5 rounded-2xl px-5 py-2.5 mt-[-8px] pointer-events-auto shadow-2xl">
            <div className="text-[32px] font-bold text-[#FF6B00] leading-none tracking-tighter">{speed}</div>
            <div className="text-[10px] text-zinc-500 font-bold tracking-wider mt-1">KM/H</div>
          </div>

          <div className="flex flex-col items-end pointer-events-auto">
            <div className="flex items-center gap-1.5 bg-[#00C853]/10 border border-[#00C853]/30 rounded-full px-2.5 py-1 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
              <span className="text-[10px] text-[#00C853] font-bold tracking-wider uppercase">LIVE</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-medium mt-1 uppercase max-w-[100px] truncate text-right">
              {route?.routeName || "NH-3 Manali-Leh"}
            </div>
          </div>
        </div>
      </div>

      {/* Map fills map area */}
      <div className="absolute inset-0 top-0 bottom-[140px]">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={mapCenter}
          zoom={13}
          options={{
            disableDefaultUI: true,
            styles: [
              { elementType: "geometry", stylers: [{ color: "#0B0F0B" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#3A5A3A" }] },
              { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#5A7A5A" }] },
              { featureType: "road", elementType: "geometry", stylers: [{ color: "#142214" }] },
              { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#1C331C" }] },
              { featureType: "water", elementType: "geometry", stylers: [{ color: "#050805" }] },
            ],
          }}
        >
          {path.length > 0 && (
            <>
              {/* Fake completed path (green) */}
              <Polyline path={path.slice(0, Math.floor(path.length / 2))} options={{ strokeColor: "#00C853", strokeOpacity: 1, strokeWeight: 8 }} />
              {/* Fake upcoming path (orange dashed) */}
              <Polyline path={path.slice(Math.floor(path.length / 2))} options={{ strokeColor: "#FF6B00", strokeOpacity: 1, strokeWeight: 8 }} />
            </>
          )}
          
          {currentLocation && (
            <Marker 
              position={currentLocation} 
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: "#FFF",
                fillOpacity: 1,
                strokeColor: "#00C853",
                strokeWeight: 4,
                scale: 8,
              }} 
            />
          )}

          {fuelStations.map((poi) => (
             <Marker 
               key={poi.placeId} 
               position={{ lat: poi.latitude, lng: poi.longitude }}
               icon={{
                 path: window.google.maps.SymbolPath.CIRCLE,
                 fillColor: "#FFB300",
                 fillOpacity: 1,
                 strokeColor: "#000",
                 strokeWeight: 2,
                 scale: 6,
               }}
             />
          ))}

          {emergencyPlaces.map((poi) => (
             <Marker 
               key={poi.placeId} 
               position={{ lat: poi.latitude, lng: poi.longitude }}
               icon={{
                 path: window.google.maps.SymbolPath.CIRCLE,
                 fillColor: "#FF3D00",
                 fillOpacity: 1,
                 strokeColor: "#000",
                 strokeWeight: 2,
                 scale: 6,
               }}
             />
          ))}
        </GoogleMap>
      </div>

      {/* Map Legend */}
      <div className="absolute top-[140px] right-4 z-15 flex flex-col gap-2">
        {[
          { color: "#FF6B00", label: "+ Hospital" },
          { color: "#4FC3F7", label: "☕ Rest" },
          { color: "#FF3D00", label: "! Alert" },
        ].map((item) => (
          <div key={item.label} className="bg-[#151515]/90 border border-white/5 rounded-full px-3 py-1.5 flex items-center gap-2 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] text-zinc-400 font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Alert tap */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onAlert}
        className="absolute top-[140px] left-4 z-15 bg-[#FF3D00]/10 border border-[#FF3D00]/30 rounded-xl px-3 py-2 flex items-center gap-2 backdrop-blur-md"
      >
        <AlertTriangle size={14} color="#FF3D00" />
        <span className="text-[11px] font-bold text-[#FF3D00] uppercase tracking-wider">
          Rain Ahead
        </span>
      </motion.button>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0B0B0B] rounded-t-3xl p-5 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        
        {/* Navigation Info */}
        <div className="bg-[#1C1C1E] rounded-2xl p-4 mb-5 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col items-center justify-between">
              <Navigation size={24} color="#FF6B00" className="rotate-45" />
              <button onClick={onEmergency} className="mt-2 bg-[#FF3D00]/10 border border-[#FF3D00]/30 rounded-lg px-2.5 py-1 text-[9px] font-bold text-[#FF3D00] uppercase tracking-wider">
                SOS
              </button>
            </div>
            <div>
              <div className="text-[17px] font-bold text-white tracking-tight">Keep on {route?.primaryHighway || "NH-3"}</div>
              <div className="text-[12px] text-zinc-500 mt-0.5">towards Keylong · 18 km</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#FF3D00]">
            <Fuel size={14} />
            <span className="font-bold text-[13px]">18km</span>
          </div>
        </div>

        {/* Bottom Metrics & Moto FAB */}
        <div className="flex justify-between items-center px-1">
          <div className="flex gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Fuel size={14} color="#FFB300" />
                <span className="font-bold text-sm text-white">72%</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Fuel</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Thermometer size={14} color="#4FC3F7" />
                <span className="font-bold text-sm text-white">{weather?.temperature ?? "21"}°C</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Temp</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Clock size={14} color="#A78BFA" />
                <span className="font-bold text-sm text-white">{route?.durationHours ? `${route.durationHours}:12` : "4:12"}</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Riding</span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onAskMoto}
            className="w-[60px] h-[60px] rounded-full bg-[#FF6B00] shadow-[0_4px_20px_rgba(255,107,0,0.4)] flex flex-col items-center justify-center gap-0.5"
          >
            <Mic size={20} color="#FFF" />
            <span className="text-[9px] font-black text-white tracking-widest uppercase">MOTO</span>
          </motion.button>
        </div>
      </div>
      </div>
  );
}
