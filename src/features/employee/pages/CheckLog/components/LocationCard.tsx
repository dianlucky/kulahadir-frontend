import { Divider, Image, Text } from "@mantine/core";
import { IconMap2, IconMapPin } from "@tabler/icons-react";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export const LocationCard: React.FC = () => {
  return (
    <section className="bg-white mx-auto max-w-xs w-full -mt-10 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
      <div className="flex justify-between text-xs items-center p-2">
        <span className="text-base font-bold text-blue-700">Lokasi</span>
        <IconMap2 className="opacity-80" size={20} />
      </div>
      <Divider size={"xs"} />
      <div className="w-full pb-2">
        <MapContainer
          // key={location.loaded ? "loaded" : "notLoaded"}
          style={{ height: "33vh" }}
          center={[51.505, -0.09]}
          // center={[-3.753033208345266, 114.76683450763974]}
          zoom={15}
          scrollWheelZoom={true}
        >   
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};
