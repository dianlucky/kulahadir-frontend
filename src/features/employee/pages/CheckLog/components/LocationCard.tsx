import { Divider } from "@mantine/core";
import { IconMap2 } from "@tabler/icons-react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import markerImage from "/images/marker.png";
import { Icon } from "leaflet";
// import L from "leaflet";

interface LocationCardProps {
  long?: number;
  lat?: number;
}

const ChangeView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 15); // Zoom level 15
  }, [center, map]);

  return null;
};

export const LocationCard: React.FC<LocationCardProps> = ({ long, lat }) => {
  const defaultPosition: [number, number] = [
    -3.793295021545682, 114.77480115323222,
  ];
  const position: [number, number] =
    lat && long ? [lat, long] : defaultPosition;

  // const customMarkerIcon = L.icon({
  //   iconUrl: markerIconUrl,
  //   iconSize: [32, 32],
  //   iconAnchor: [16, 32],
  //   popupAnchor: [0, -32],
  // });
  return (
    <section className="bg-white mx-auto max-w-sm w-full -mt-10 shadow-lg rounded-xl z-50 relative p-4 text-slate-700">
      <div className="flex justify-between text-xs items-center mb-2">
        <span className="text-base font-bold text-brown">Lokasi</span>
        <IconMap2 className="opacity-80" size={20} />
      </div>
      <Divider size="xs" className="mb-2" />

      <div className="w-full h-64 overflow-hidden rounded-md">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            icon={
              new Icon({
                iconUrl: markerImage,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
              })
            }
          >
            <Popup>Lokasi anda.</Popup>
          </Marker>
          <ChangeView center={position} />
        </MapContainer>
      </div>
    </section>
  );
};
