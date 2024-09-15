import { Footprints, MapPinCheck, Navigation } from "lucide-react";
import React, { useEffect, useState } from "react";

import { fetchNearbyPlaces, type SimplifiedAddress } from "@/utils/utils";

interface LocationCardProps {
  lat: number;
  lng: number;
  index: number;
}

const LocationCard: React.FC<LocationCardProps> = ({ lat, lng, index }) => {
  const [location, setLocation] = useState<SimplifiedAddress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      try {
        const data = await fetchNearbyPlaces(lat, lng);
        setLocation(data);
      } catch (error) {
        console.error("Error fetching nearby places:", error);
        setLocation({ neighbourhood: "", suburb: "", city: "" });
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [lat, lng]);

  if (loading) {
    return (
      <div key={index} className="border rounded-lg p-4 space-y-2">
        <div className="h-6 bg-slate-100 rounded animate-pulse" />
        <div className="space-y-1">
          {["Neighborhood", "Suburb", "City"].map((_item, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-slate-100 rounded animate-pulse" />
              <div className="flex-1 space-y-1">
                <div className="h-4 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (
    !location ||
    (location.neighbourhood === "" &&
      location.suburb === "" &&
      location.city === "")
  ) {
    return null; // Do not render if no valid data
  }

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h3 className="font-semibold text-lg">{location.neighbourhood ?? ""}</h3>
      <div className="space-y-1 text-sm">
        {location.suburb && (
          <div className="flex items-center text-muted-foreground">
            <Footprints className="h-4 w-4 mr-2" />
            <span className="ml-2">{location.suburb}</span>
          </div>
        )}
        {location.city && (
          <div className="flex items-center text-muted-foreground">
            <MapPinCheck className="h-4 w-4 mr-2" />
            <span className="ml-2">{location.city}</span>
          </div>
        )}
        {location.state_district && (
          <div className="flex items-center text-muted-foreground">
            <Navigation className="h-4 w-4 mr-2" />
            <span className="ml-2">{location.state_district}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
