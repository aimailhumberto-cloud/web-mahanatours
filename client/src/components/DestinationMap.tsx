/* Mahana Tours — Interactive Destination Map (Leaflet + OpenStreetMap) */
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

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

interface Destination {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  tourCount: number;
}

// Real coordinates for Chame / Pacific Riviera area
const DESTINATIONS: Destination[] = [
  {
    id: "playa-caracol",
    name: "Playa Caracol",
    lat: 8.6434,
    lng: -79.7077,
    description: "Base de operaciones Mahana. Surf, jet ski, tubing, beach buggies y más.",
    tourCount: 18,
  },
  {
    id: "punta-chame",
    name: "Punta Chame",
    lat: 8.5750,
    lng: -79.7350,
    description: "Capital del kitesurf en el Pacífico. Vientos perfectos de Nov a Mar.",
    tourCount: 8,
  },
  {
    id: "islas-otoque-bona",
    name: "Islas Otoque y Boná",
    lat: 8.6000,
    lng: -79.6000,
    description: "Islas vírgenes del Pacífico. Snorkel, pesca artesanal y playas privadas.",
    tourCount: 3,
  },
  {
    id: "isla-taborcillo",
    name: "Isla Taborcillo",
    lat: 8.6722,
    lng: -79.7442,
    description: "Isla privada con infraestructura. Day pass y manglares.",
    tourCount: 2,
  },
  {
    id: "cerro-chame",
    name: "Cerro Chame",
    lat: 8.6000,
    lng: -79.8167,
    description: "Hiking a 560m sobre el nivel del mar. Amanecer épico sobre el Pacífico.",
    tourCount: 1,
  },
  {
    id: "cascada-filipinas",
    name: "Cascadas de Filipinas",
    lat: 8.6685,
    lng: -80.0387,
    description: "7 cascadas naturales en la selva panameña. Rappel y caminata.",
    tourCount: 2,
  },
  {
    id: "valle-anton",
    name: "El Valle de Antón",
    lat: 8.6008,
    lng: -80.1303,
    description: "Pueblo en un cráter volcánico. Cascadas, aguas termales y biodiversidad.",
    tourCount: 1,
  },
  {
    id: "radisson-riviera",
    name: "Radisson Riviera",
    lat: 8.6430,
    lng: -79.7070,
    description: "Hotel resort frente al mar. Piscina infinita, Vento Beach Club y spa.",
    tourCount: 0,
  },
];

const MAP_CENTER: [number, number] = [8.62, -79.80];
const MAP_ZOOM = 11;

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
                  <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${active === dest.id ? "text-gold" : "text-deep-blue"}`} />
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
