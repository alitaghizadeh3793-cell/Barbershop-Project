"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const topGridRef = useRef(null);
  const [gridRevealed, setGridRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const quickLinks = [
    { name: "خانه", href: "/" },
    { name: "خدمات", href: "/Services" },
    { name: "متخصصین ما", href: "/Barbers" },
    { name: "درباره ما", href: "/AboutUs" },
    { name: "ارتباط با ما", href: "/ContactUs" },
  ];

  const services = [
    { name: "کوتاهی و اصلاح مدرن مو", href: "/Services/1" },
    { name: "اصلاح و فرم‌دهی تخصصی ریش", href: "/Services/2" },
    { name: "پاکسازی و فشیال تخصصی پوست", href: "/Services/3" },
    { name: "پکیج VIP و گریم تخصصی داماد", href: "/Services/4" },
    { name: "کراتینه و احیای حرفه‌ای مو", href: "/Services/5" },
  ];

  // آیکون‌های شبکه‌های اجتماعی (همون SVGهای اصلی، بدون تغییر شکل)
  const socialLinks = [
    {
      href: "https://instagram.com",
      brand: "#e4405f",
      brandRgb: "228, 64, 95",
      icon: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      href: "https://telegram.org",
      brand: "#26a5e4",
      brandRgb: "38, 165, 228",
      icon: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      href: "https://whatsapp.com",
      brand: "#25d366",
      brandRgb: "37, 211, 102",
      icon: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      href: "https://linkedin.com",
      brand: "#0a66c2",
      brandRgb: "10, 102, 194",
      icon: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  // انیمیشن ورودی ساده هنگام رسیدن به دید (بدون وابستگی به framer-motion)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (topGridRef.current) observer.observe(topGridRef.current);
    return () => observer.disconnect();
  }, []);

  // دکمه برگشت به بالا با کمی تأخیر ظاهر می‌شه
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <footer className={styles.footer} dir="rtl">
      {/* المان‌های تزئینی پس‌زمینه */}
      <div className={styles.decor} aria-hidden="true">
        <span className={styles.blobTop} />
        <span className={styles.blobBottom} />
        <span className={styles.blobSide} />
        <span className={styles.dotGrid} />
      </div>

      {/* واترمارک */}
      <p className={styles.watermark}>VELVET BARBER</p>

      <div className={styles.container}>
        {/* ── بخش بالایی فوتر ── */}
        <div
          ref={topGridRef}
          className={`${styles.topGrid} ${
            gridRevealed ? styles.topGridRevealed : ""
          }`}
        >
          {/* ستون درباره */}
          <div className={`${styles.col} ${styles.colAbout}`}>
            <Link href="/" className={styles.logoLink}>
              <div className={styles.logoBox}>
                <div className={styles.logoBg} />
                <div className={styles.logoInner}>V</div>
              </div>
              <div className={styles.logoText}>
                VELVET<span className={styles.logoHighlight}>BARBER</span>
              </div>
            </Link>

            <p className={styles.aboutText}>
              آرایشگاه مردانه‌ای با بیش از ۸ سال تجربه در اصلاح، پیرایش و
              مراقبت تخصصی؛ جایی که هر نوبت با دقت و سلیقه برای شما طراحی
              می‌شود.
            </p>

            <div className={styles.socialRow}>
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  style={{
                    "--brand": social.brand,
                    "--brand-rgb": social.brandRgb,
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ستون لینک‌های سریع */}
          <div className={`${styles.col} ${styles.colQuick}`}>
            <h4 className={styles.colTitle}>
              لینک‌های <span className={styles.colTitleAccent}>سریع</span>
            </h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={styles.linkItem}>
                    <span>{link.name}</span>
                    <span className={styles.linkDot} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون خدمات */}
          <div className={`${styles.col} ${styles.colServices}`}>
            <h4 className={styles.colTitle}>
              <span className={styles.colTitleAccent}>خدمات</span> ما
            </h4>
            <ul className={styles.linkList}>
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className={styles.linkItem}>
                    <span>{service.name}</span>
                    <span className={styles.linkDot} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون اطلاعات تماس */}
          <div className={`${styles.col} ${styles.colContact}`}>
            <h4 className={styles.colTitle}>
              اطلاعات <span className={styles.colTitleAccent}>تماس</span>
            </h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
                <svg className={styles.contactIcon} width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </li>
              <li className={styles.contactItem}>
                <a href="tel:+982188885555">۰۲۱ - ۸۸۸۸ ۵۵۵۵</a>
                <svg className={styles.contactIcon} width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </li>
              <li className={styles.contactItem}>
                <a href="mailto:info@velvetbarber.com">info@velvetbarber.com</a>
                <svg className={styles.contactIcon} width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </li>
              <li className={styles.contactItem}>
                <span>شنبه تا پنج‌شنبه، ۹:۰۰ الی ۲۱:۰۰</span>
                <svg className={styles.contactIcon} width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </li>
            </ul>
          </div>
        </div>

        {/* ── بخش پایینی فوتر ── */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear}{" "}
            <span className={styles.copyrightHighlight}>VELVET BARBER</span> —
            تمامی حقوق محفوظ است
          </p>

          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>
              حریم خصوصی
            </Link>
            <Link href="/terms" className={styles.legalLink}>
              قوانین و مقررات
            </Link>
            <Link href="/sitemap" className={styles.legalLink}>
              نقشه سایت
            </Link>
          </div>

          <div className={styles.decorLine} />
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`${styles.backToTop} ${
            mounted ? styles.backToTopVisible : ""
          }`}
          aria-label="برگشت به بالا"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}