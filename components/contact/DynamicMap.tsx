"use client";

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.Icon.Default as any;
delete defaultIcon.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const DynamicMap = () => {
  return (
    <MapContainer
      center={[52.40638067098603, 16.925392509732852]}
      zoom={15}
      className="h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[52.40638067098603, 16.925392509732852]}>
        <Popup>Radosna 22, 12-345 Poznan, Poland</Popup>
      </Marker>
    </MapContainer>
  );
};

export default DynamicMap;
