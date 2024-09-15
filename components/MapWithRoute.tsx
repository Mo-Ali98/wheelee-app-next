"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import { generateRandomCoordinatesInLondon } from "@/utils/utils";

import LocationCard from "./Locations";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

const HotspotMapRoute: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    setIsClient(true);
    setCoordinates(generateRandomCoordinatesInLondon(10)); // Generate 10 random points

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
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Driver Activity Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2 flex-1">
          <div style={{ width: "70%", height: "500px" }}>
            <MapContainer
              center={[51.5074, -0.1276]} // Approximate center of London
              zoom={10} // Adjust zoom level to fit the whole city
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {coordinates.map((coord, index) => (
                <Marker
                  key={index}
                  position={[coord[0], coord[1]]}
                  icon={customIcon}
                />
              ))}
              {/* Draw a route using Polyline */}
              <Polyline positions={coordinates} color="blue" />
            </MapContainer>
          </div>
          <div className="flex flex-col gap-2 w-[30%]">
            <p className="flex flex-row gap-1 text-lg">
              <MapPin className="h-6 w-6" />
              Locations
            </p>

            {coordinates.slice(0, 4).map((coord, index) => (
              <LocationCard
                key={index}
                lat={coord[0]}
                lng={coord[1]}
                index={index}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotspotMapRoute;
