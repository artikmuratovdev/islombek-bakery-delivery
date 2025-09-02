import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMapInstance } from "leaflet";
import { Driver } from "../order-map";

interface Props {
  drivers?: Driver[];
  setLocation?: (value: Driver) => void;
  setSelectLocation: React.Dispatch<React.SetStateAction<Driver | null>>;
}
function LocationMarker({
  setLocation,
  setSelectLocation,
}: {
  setLocation?: (value: Driver) => void;
  setSelectLocation: React.Dispatch<React.SetStateAction<Driver | null>>;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(coords);
      e.target.flyTo(coords);

      const driverObj: Driver = {
        user: { _id: "manual-selected" },
        lat: coords[0],
        lng: coords[1],
        rot: 0,
      };

      // 📌 Har ikkisini yangilash
      setLocation?.(driverObj);
      setSelectLocation(driverObj);
    },
  });

  if (!position) return null;

  return (
    <Marker
      position={position}
      icon={L.divIcon({
        html: `<img src="/map-pin.png" style="width:40px;height:40px;object-fit:contain;" />`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: "custom-marker",
      })}
    >
      <Popup>
        Marker at {position[0].toFixed(6)}, {position[1].toFixed(6)}
      </Popup>
    </Marker>
  );
}

function LeafletMap({ drivers, setLocation, setSelectLocation }: Props) {
  const defaultPos: [number, number] = [37.2349, 67.2841];
  const [position, setPosition] = useState<[number, number]>(defaultPos);
  const [rotation, setRotation] = useState(0);
  const [hybridTile, setHybridTile] = useState(false);
  const mapRef = useRef<LeafletMapInstance | null>(null);

  /* 🧮 Memoized average drivers position */
  const driversCenter = useMemo<[number, number] | null>(() => {
    if (!drivers?.length) return null;
    return [
      drivers.reduce((sum, d) => sum + d.lat, 0) / drivers.length,
      drivers.reduce((sum, d) => sum + d.lng, 0) / drivers.length,
    ];
  }, [drivers]);

  /* 📡 GPS tracking */
  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        if (!drivers && setLocation) {
          const newID = crypto.randomUUID();
          const driverId =
            localStorage.getItem("driver") ||
            (localStorage.setItem("driver", newID), newID);

          setLocation({
            lat: coords[0],
            lng: coords[1],
            rot: pos.coords.heading || rotation,
            user: { _id: driverId },
          });
        }

        setPosition(coords);
        setRotation((prev) => pos.coords.heading || prev);
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watcher);
  }, [drivers, setLocation, rotation]);

  /* 🚗 Auto re-center when drivers update */
  useEffect(() => {
    if (driversCenter && mapRef.current) {
      setPosition(driversCenter);
      mapRef.current.flyTo(driversCenter, mapRef.current.getZoom());
    }
  }, [driversCenter]);

  /* 🖼 Driver marker renderer */
  const renderDriverMarker = useCallback(
    (driver: Driver) => (
      <Marker
        key={driver.user._id}
        position={[driver.lat, driver.lng]}
        icon={L.divIcon({
          html: `<img src="/car.png" style="transform:rotate(${driver.rot}deg);width:60px;height:60px;object-fit:contain;" />`,
          iconSize: [60, 60],
          iconAnchor: [30, 60],
          popupAnchor: [0, -60],
          className: "transparent-marker",
        })}
      >
        <Popup>ID: {driver.user._id || "N/A"}</Popup>
      </Marker>
    ),
    []
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "50vh" }}>
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
        whenReady={(map) => (mapRef.current = map.target)}
      >
        <TileLayer
          attribution="&copy; Google Maps"
          url={`https://{s}.google.com/vt/lyrs=${
            hybridTile ? "s,h" : "m"
          }&x={x}&y={y}&z={z}`}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          maxZoom={20}
        />

        {/* 🚗 Drivers */}
        {drivers?.map(renderDriverMarker)}

        {/* 📍 Local user */}
        {!drivers?.length && (
          <Marker
            position={position}
            icon={L.divIcon({
              html: `<img src="/car.png" style="transform:rotate(${rotation}deg);width:60px;height:60px;object-fit:contain;" />`,
              iconSize: [60, 60],
              iconAnchor: [30, 60],
              popupAnchor: [0, -60],
              className: "transparent-marker",
            })}
          >
            <Popup>ID: {localStorage.getItem("driver") || "N/A"}</Popup>
          </Marker>
        )}

        {/* 📍 Manual click marker */}
        {/* 📍 Manual click marker */}
        <LocationMarker
          setLocation={setLocation}
          setSelectLocation={setSelectLocation}
        />
      </MapContainer>

      {/* ✅ Hybrid toggle */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          zIndex: 10000,
          background: "white",
          padding: "8px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="checkbox"
          checked={hybridTile}
          onChange={(e) => {
            setHybridTile(e.target.checked);
            mapRef.current?.invalidateSize();
          }}
          style={{ marginRight: "5px", transform: "scale(1.5)" }}
        />
        <label style={{ fontSize: "14px", fontWeight: "bold", color: "black" }}>
          Hybrid
        </label>
      </div>
    </div>
  );
}

export default LeafletMap;
