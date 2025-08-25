import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface Driver {
  user: { _id: string };
  lat: number;
  lng: number;
  rot: number;
}

interface Props {
  drivers?: Driver[];
  setLocation?: (value: Driver) => void;
}

function LeafletMap({ drivers, setLocation }: Props) {
  const [position, setPosition] = useState<[number, number]>(
    drivers?.length
      ? [
          drivers.reduce((a, b) => a + b.lat, 0) / drivers.length,
          drivers.reduce((a, b) => a + b.lng, 0) / drivers.length,
        ]
      : [37.235588485310316, 67.28402941296861] // default
  );
  const [rotation, setRotation] = useState(0);
  const [hybridTile, setHybridTile] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  // 🔹 Faqat oxirgi bosilgan marker
  const [clickedMarker, setClickedMarker] = useState<[number, number] | null>(
    null
  );

  // 📍 GPS location tracking
  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        if (!drivers && setLocation) {
          const newID = crypto.randomUUID();
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            rot: pos.coords.heading || rotation,
            user: {
              _id:
                localStorage.getItem("driver") ||
                (localStorage.setItem("driver", newID), newID),
            },
          });
        }
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setRotation((prev) => pos.coords.heading || prev);
      },
      (err) => {
        console.error("Geolocation error:", err);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [setLocation, drivers, rotation]);

  // 📍 Map click event → faqat oxirgi marker qolsin
  useEffect(() => {
    if (!mapRef.current) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      console.log("📍 Selected location:", { lat, lng });
      setClickedMarker([lat, lng]);
      if (setLocation) {
        setLocation({
          user: { _id: "manual-selected" },
          lat,
          lng,
          rot: 0,
        });
      }
    };

    mapRef.current.on("click", handleMapClick);
    return () => {
      mapRef.current?.off("click", handleMapClick);
    };
  }, [setLocation]);

  return (
    <div style={{ position: "relative", width: "100%", height: "50vh" }}>
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        whenReady={(map) => {
          mapRef.current = map.target;
        }}
      >
        <TileLayer
          attribution="&copy; Google Maps"
          url={`https://{s}.google.com/vt/lyrs=${
            hybridTile ? "s,h" : "m"
          }&x={x}&y={y}&z={z}`}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          maxZoom={20}
        />

        {/* 🚗 Driver markers */}
        {drivers?.length &&
          drivers.map((driver) => (
            <Marker
              key={driver.user._id}
              position={[driver.lat, driver.lng]}
              icon={L.divIcon({
                html: `<img src="/car.png" style="transform: rotate(${driver.rot}deg); width: 60px; height: 60px; object-fit: contain;" />`,
                iconSize: [60, 60],
                iconAnchor: [30, 60],
                popupAnchor: [0, -60],
                className: "transparent-marker",
              })}
            >
              <Popup>ID: {driver.user._id || "N/A"}</Popup>
            </Marker>
          ))}

        {/* 📍 Faqat oxirgi click marker */}
        {clickedMarker && (
          <Marker
            position={clickedMarker}
            icon={L.divIcon({
              html: `<img src="/map-pin.png" style="width: 40px; height: 40px; object-fit: contain;" />`,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
              popupAnchor: [0, -40],
              className: "custom-marker",
            })}
          >
            <Popup>
              Marker at {clickedMarker[0].toFixed(6)},{" "}
              {clickedMarker[1].toFixed(6)}
            </Popup>
          </Marker>
        )}

        {/* 🚘 Agar drivers yo‘q bo‘lsa – local user marker */}
        {!drivers?.length && position && (
          <Marker
            position={position}
            icon={L.divIcon({
              html: `<img src="/car.png" style="transform: rotate(${rotation}deg); width: 60px; height: 60px; object-fit: contain;" />`,
              iconSize: [60, 60],
              iconAnchor: [30, 60],
              popupAnchor: [0, -60],
              className: "transparent-marker",
            })}
          >
            <Popup>ID: {localStorage.getItem("driver") || "N/A"}</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* ✅ Hybrid toggle tashqariga qo'yildi */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          zIndex: 10000,
          background: "white",
          padding: "8px",
          borderRadius: "5px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          pointerEvents: "auto",
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
