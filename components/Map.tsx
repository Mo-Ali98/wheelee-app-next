"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

// Dynamic imports for react-leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface HotspotMapProps {
  coordinates: [number, number][];
}

const HotspotMap: React.FC<HotspotMapProps> = ({ coordinates }) => {
  const [isClient, setIsClient] = useState(false);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // Ensure this code runs on the client side only
    setIsClient(true);

    // Create the custom icon only on the client
    const icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    setCustomIcon(icon);
  }, []);

  if (!isClient || !customIcon) {
    // Don't render the map until we are sure we are on the client side and have the custom icon ready
    return null;
  }

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <MapContainer
        center={[51.5074, -0.1276]}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates.map((coord, index) => (
          <Marker key={index} position={[coord[1], coord[0]]} icon={customIcon}>
            <Popup>Hotspot {index + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HotspotMap;
