"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/Components/Section/Section.module.css";

const stats = [
  { num: 12,  suffix: "+", label: "سال تجربه" },
  { num: 250, suffix: "+", label: "پروژه انجام‌شده" },
  { num: 50,  suffix: "K+", label: "دنبال‌کننده" },
  { num: 18,  suffix: "",  label: "کارکنان" },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatItem({ num, suffix, label, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(num, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.statItem} ${visible ? styles.visible : styles.hidden}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={styles.numberBox}>
        <span className={`${styles.corner} ${styles.topRight}`} />
        <span className={`${styles.corner} ${styles.topLeft}`} />
        <span className={`${styles.corner} ${styles.bottomRight}`} />
        <span className={`${styles.corner} ${styles.bottomLeft}`} />
        <p className={styles.numberText}>
          {count}{suffix}
        </p>
      </div>

      <p className={styles.labelText}>
        {label}
      </p>
    </div>
  );
}

export default function Section() {
  return (
    <section
      dir="rtl"
      className={styles.section}
      style={{
        backgroundImage: "url('/image/Service-Floor1.webp')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <StatItem
              key={s.label}
              num={s.num}
              suffix={s.suffix}
              label={s.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}