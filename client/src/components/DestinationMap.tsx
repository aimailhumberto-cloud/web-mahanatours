/* Mahana Tours — Interactive Destination Map (Leaflet + OpenStreetMap) */
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";

// Fix Leaflet default icon issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom gold marker
const goldIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Destinations with coordinates and tour info
export interface Destination {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  tourCount: number;
  tourIds: string[];
  icon: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "playa-caracol",
    name: "Playa Caracol",
    lat: 8.5617,
    lng: -79.7023,
    description: "Base de operaciones Mahana. Surf, jet ski, tubing, beach buggies y más.",
    tourCount: 18,
    tourIds: ["surf-101", "surf-foundation", "jet-ski-1h", "tubing-1h", "mulita-30"],
    icon: "🏖️",
  },
  {
    id: "punta-chame",
    name: "Punta Chame",
    lat: 8.5485,
    lng: -79.7296,
    description: "Capital del kitesurf en el Pacífico. Vientos perfectos de Nov a Mar.",
    tourCount: 8,
    tourIds: ["kite-surf-clase", "kite-surf-pack", "wing-foil"],
    icon: "🪁",
  },
  {
    id: "islas-otoque-bona",
    name: "Islas Otoque y Boná",
    lat: 8.4710,
    lng: -79.5467,
    description: "Islas vírgenes del Pacífico. Snorkel, pesca artesanal y playas privadas.",
    tourCount: 3,
    tourIds: ["isla-otoque-bona", "pesca-otoque-bona", "avistamiento-ballenas"],
    icon: "🏝️",
  },
  {
    id: "isla-taborcillo",
    name: "Isla Taborcillo",
    lat: 8.4898,
    lng: -79.5752,
    description: "Isla privada con infraestructura. Day pass y manglares.",
    tourCount: 2,
    tourIds: ["day-pass-taborcillo", "manglares-taborcillo"],
    icon: "🌴",
  },
  {
    id: "cerro-chame",
    name: "Cerro Chame",
    lat: 8.5750,
    lng: -79.6800,
    description: "Hiking a 560m sobre el nivel del mar. Amanecer épico sobre el Pacífico.",
    tourCount: 1,
    tourIds: ["hiking-cerro-chame"],
    icon: "⛰️",
  },
  {
    id: "cascada-filipinas",
    name: "Cascadas de Filipinas",
    lat: 8.6200,
    lng: -79.8100,
    description: "7 cascadas naturales en la selva panameña. Rappel y caminata.",
    tourCount: 2,
    tourIds: ["tour-7-cascadas", "rappel-filipinas"],
    icon: "🌊",
  },
  {
    id: "valle-anton",
    name: "El Valle de Antón",
    lat: 8.6035,
    lng: -80.1264,
    description: "Pueblo en un cráter volcánico. Cascadas, aguas termales y biodiversidad.",
    tourCount: 1,
    tourIds: ["valle-de-anton"],
    icon: "🌋",
  },
  {
    id: "radisson-riviera",
    name: "Radisson Riviera",
    lat: 8.5605,
    lng: -79.7005,
    description: "Hotel resort frente al mar. Piscina infinita, Vento Beach Club y spa.",
    tourCount: 0,
    tourIds: [],
    icon: "🏨",
  },
];

// Center on Chame area
const MAP_CENTER: [number, number] = [8.54, -79.68];
const MAP_ZOOM = 11;

// Fly to destination
function FlyToDestination({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, 14, { duration: 1 });
  }, [target, map]);
  return null;
}

export default function DestinationMap() {
  const [active, setActive] = useState<string | null>(null);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);

  const handleClick = (dest: Destination) => {
    setActive(dest.id);
    setFlyTarget([dest.lat, dest.lng]);
  };

  const resetView = () => {
    setActive(null);
    setFlyTarget(null);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-gold-dark text-sm font-semibold uppercase tracking-[0.2em]">
            Nuestros Destinos
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-deep-blue mt-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Mapa de Aventuras
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Todos los destinos a menos de 2 horas de Ciudad de Panamá. Haz clic en un punto para descubrir las experiencias disponibles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Destination list */}
          <div className="space-y-2 order-2 lg:order-1 max-h-[500px] overflow-y-auto pr-2">
            {DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                onClick={() => handleClick(dest)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  active === dest.id
                    ? "bg-deep-blue text-white border-deep-blue shadow-lg"
                    : "bg-sand border-sand-dark hover:border-gold hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{dest.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-bold text-sm ${
                        active === dest.id ? "text-gold" : "text-deep-blue"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {dest.name}
                    </h4>
                    <p
                      className={`text-xs mt-1 line-clamp-2 ${
                        active === dest.id ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {dest.description}
                    </p>
                    {dest.tourCount > 0 && (
                      <span
                        className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                          active === dest.id
                            ? "bg-gold/20 text-gold"
                            : "bg-gold/10 text-gold-dark"
                        }`}
                      >
                        {dest.tourCount} tours
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-2 order-1 lg:order-2 rounded-xl overflow-hidden border border-sand-dark shadow-sm h-[400px] lg:h-[500px]">
            <MapContainer
              center={MAP_CENTER}
              zoom={MAP_ZOOM}
              scrollWheelZoom={false}
              className="w-full h-full z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FlyToDestination target={flyTarget} />
              {DESTINATIONS.map((dest) => (
                <Marker
                  key={dest.id}
                  position={[dest.lat, dest.lng]}
                  icon={goldIcon}
                  eventHandlers={{
                    click: () => handleClick(dest),
                  }}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <p className="text-lg mb-1">{dest.icon}</p>
                      <h3 className="font-bold text-deep-blue text-sm">{dest.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{dest.description}</p>
                      {dest.tourCount > 0 && (
                        <p className="text-xs font-semibold text-amber-700 mt-2">
                          {dest.tourCount} tours disponibles →
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
