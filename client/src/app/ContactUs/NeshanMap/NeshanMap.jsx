"use client";

import { useEffect, useRef } from "react";
import styles from "./NeshanMap.module.css";

export default function NeshanMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const initMap = async () => {
      if (!mapContainerRef.current || mapRef.current) return;

      const mapboxgl = await import("@neshan-maps-platform/mapbox-gl");

      if (!mounted || !mapContainerRef.current) return;

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,

        // فعلاً مقصد نمونه
        center: [51.338097, 35.699739],

        zoom: 14,

        mapKey: process.env.NEXT_PUBLIC_NESHAN_MAP_KEY,

        mapType: "dreamy",

        poi: true,

        traffic: false,
      });

      mapRef.current = map;
    };

    initMap();

    return () => {
      mounted = false;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className={styles.map} />;
}
