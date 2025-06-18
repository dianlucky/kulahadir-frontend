import { useEffect, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

// LOKASI KULAKITA
const ATTENDANCE_LAT = -3.7931785830447957;
const ATTENDANCE_LNG = 114.77492278802839;


// // LOKASI RUMAH
// const ATTENDANCE_LAT = -3.7666287056605525;
// const ATTENDANCE_LNG = 114.75752145767268;
const ATTENDANCE_RADIUS_METERS = 200000; // normalnya 150


function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dLon))) /
      2;
  return R * 2 * Math.asin(Math.sqrt(a)) * 1000;
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
        // Cek platform
        const platform = (window as any).Capacitor?.getPlatform
          ? (window as any).Capacitor.getPlatform()
          : "web";

        if (platform === "web") {
          // Browser Web
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
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
                setStatusLocation(distance <= ATTENDANCE_RADIUS_METERS);
              },
              (error) => {
                console.error("Gagal mengambil lokasi di browser:", error);
                setStatusLocation(false);
              }
            );
          } else {
            console.error("Geolocation tidak didukung di browser");
            setStatusLocation(false);
          }
        } else {
          // Native Android/iOS via Capacitor
          const permission = await Geolocation.requestPermissions();
          console.log("Permission response:", permission);

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
          setStatusLocation(distance <= ATTENDANCE_RADIUS_METERS);
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
