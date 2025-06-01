import { useEffect, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { Icon } from "leaflet";

// Koordinat lokasi absensi (misalnya kantor)
const ATTENDANCE_LAT = -3.7933913731117777;
const ATTENDANCE_LNG = 114.77477969973577;
const ATTENDANCE_RADIUS_METERS = 120;

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius bumi dalam km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dLon))) /
      2;
  return R * 2 * Math.asin(Math.sqrt(a)) * 1000; // Return dalam meter
}

export const useGeoLocation = () => {
  const [statusLocation, setStatusLocation] = useState(false);
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distanceToOffice, setDistanceToOffice] = useState<number | null>(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserCoords({ lat, lng });

        const distance = calculateDistance(
          lat,
          lng,
          ATTENDANCE_LAT,
          ATTENDANCE_LNG
        );
        setDistanceToOffice(distance);

        if (distance <= ATTENDANCE_RADIUS_METERS) {
          setStatusLocation(true);
        } else {
          setStatusLocation(false);
        }
      } catch (error) {
        console.error("Gagal mengambil lokasi:", error);
        setStatusLocation(false);
      }
    };

    getCurrentLocation();
  }, []);

  return { statusLocation, userCoords, distanceToOffice };
};
