"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Content.module.css";

// ۳ عکس باکیفیت برای پس‌زمینه کل بخش
const images = [
  "/image-dashboard/photo-1503951914875-452162b0f3f1.avif",
  "/image-dashboard/photo-1517832606299-7ae9b720a186.avif",
  "/image-dashboard/photo-1532710093739-9470acff878f.avif",
];

export default function Content() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 5000); // تغییر عکس هر ۵ ثانیه
    return () => clearInterval(interval);
  }, []);

  return (
    <section dir="rtl" className={styles.hero}>
      {/* اسلایدشو پس‌زمینه */}
      <div className={styles.slides}>
        {images.map((src, index) => (
          <div
            key={src}
            className={`${styles.slide} ${
              index === currentIdx ? styles.slideActive : ""
            }`}
          >
            <Image
              src={src}
              alt="فضای آرایشگاه مردانه"
              fill
              priority
              unoptimized /* برای جلوگیری از خطای دامین عکس در نکست جی‌اس */
              className={styles.slideImage}
            />
          </div>
        ))}

        {/* گرادینت‌های تیره روی عکس با تم جدید */}
        <div className={styles.overlayHorizontal} />
        <div className={styles.overlayVertical} />
      </div>

      {/* درخشش نرم متناسب با تم جدید */}
      <div className={styles.glow} />

      {/* محتوای اصلی هیرو */}
      <div className={styles.content}>
        <span className={styles.eyebrow}>MEN&apos;S BARBERSHOP</span>

        <h1 className={styles.heading}>
          <span className={styles.headingLine1}>تجربه‌ای برای</span>
          <span className={styles.headingLine2}>مردان امروزی</span>
          <span className={styles.headingAccent}>
            اصلاح مدرن، خدمات لوکس
          </span>
        </h1>

        <p className={styles.description}>
          در ولوت بار، هر نوبت یعنی توجه به جزئیات؛ از اصلاح دقیق تا مراقبت
          کامل، تجربه‌ای که فقط برای شما طراحی شده.
        </p>

        <div className={styles.actions}>
          <Link href="/Booking" className={styles.btnPrimary}>
            ثبت رزرو
          </Link>
          <Link href="/Services" className={styles.btnOutline}>
            خدمات ما
          </Link>
        </div>
      </div>

      {/* برچسب‌های گوشه پایین */}
      <div className={styles.bottomLeftLabel}>VELVET BARBER — 2026</div>
      <div className={styles.bottomRightLabel}>MODERN · CLASSIC · CLEAN</div>

      {/* وینیت نرم */}
      <div className={styles.vignette} />
    </section>
  );
}