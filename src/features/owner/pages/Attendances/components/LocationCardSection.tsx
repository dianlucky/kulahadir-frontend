import { Divider, Text } from "@mantine/core";
import { IconMap2 } from "@tabler/icons-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export const LocationCardSection: React.FC = () => {
  return (
    <section className="bg-white mx-auto max-w-xs w-full shadow-sm rounded-xl z-50 relative p-4 text-slate-700">
      <div className="flex justify-between text-xs items-center mb-2">
        <Text fw={700} c="#654433">
          Lokasi absen
        </Text>
        <IconMap2 className="opacity-80" size={20} />
      </div>
      <Divider size="xs" className="mb-2" />

      <div className="w-full h-64 overflow-hidden rounded-md">
        <MapContainer
          center={[-3.793295021545682, 114.77480115323222]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-3.793295021545682, 114.77480115323222]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};
