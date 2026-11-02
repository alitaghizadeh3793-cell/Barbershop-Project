"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Header.module.css";
import { useAuth } from "@/app/Context/Context";

// =========================
// Icons
// =========================

function IconHome({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconScissors({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

function IconGrid({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function IconInfo({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function IconPhone({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 0 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconUser({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconMenu({ size = 22, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function IconX({ size = 22, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// =========================
// Header
// =========================

export default function Header() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const {
    isLoggedIn,
    authLoading,
  } = useAuth();

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (!e.target.closest("header")) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const navItems = [
    {
      name: "خانه",
      href: "/",
      icon: IconHome,
    },
    {
      name: "خدمات",
      href: "/Services",
      icon: IconScissors,
    },
    {
      name: "نمونه کارها",
      href: "/Portfolio",
      icon: IconGrid,
    },
    {
      name: "درباره ما",
      href: "/AboutUs",
      icon: IconInfo,
    },
    {
      name: "ارتباط با ما",
      href: "/ContactUs",
      icon: IconPhone,
    },
  ];

  const handleNavClick = () => {
    setOpen(false);
  };

  const isActive = (path) =>
    path === "/"
      ? pathname === "/"
      : pathname.startsWith(path);

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* ================= لوگو ================= */}

        <Link
          href="/"
          onClick={handleNavClick}
          className={styles.logoWrap}
        >
          <div className={styles.logoBox}>
            <div className={styles.logoBg} />
            <div className={styles.logoInner}>V</div>
          </div>

          <div className={styles.logoText}>
            VELVET
            <span className={styles.logoHighlight}>
              BARBER
            </span>
          </div>
        </Link>

        {/* ================= منوی دسکتاپ ================= */}

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`${styles.navLink} ${
                  active ? styles.navLinkActive : ""
                }`}
              >
                <Icon
                  size={15}
                  className={
                    active
                      ? styles.navIconActive
                      : styles.navIcon
                  }
                />

                <span>{item.name}</span>

                {active && (
                  <span className={styles.activeBar} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ================= اکشن‌های دسکتاپ ================= */}

        <div className={styles.actions}>

          {/* تا وقتی وضعیت احراز هویت مشخص نشده */}
          {!authLoading && (
            <>
              {isLoggedIn ? (
                <Link
                  href="/PanelUser"
                  onClick={handleNavClick}
                  className={styles.loginButtonDesktop}
                  aria-label="پنل کاربری"
                  title="پنل کاربری"
                >
                  <IconUser size={18} />
                  <span>پنل کاربری</span>
                </Link>
              ) : (
                <Link
                  href="/Login"
                  onClick={handleNavClick}
                  className={styles.loginButtonDesktop}
                >
                  <IconUser size={16} />
                  <span>ورود / ثبت نام</span>
                </Link>
              )}
            </>
          )}

          <Link
            onClick={handleNavClick}
            href="/Booking"
            className={styles.bookButtonDesktop}
          >
            رزرو نوبت آنلاین
          </Link>
        </div>

        {/* ================= دکمه منوی موبایل ================= */}

        <div className={styles.mobileActions}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className={styles.iconBtn}
            aria-label="منوی سایت"
          >
            {open ? (
              <IconX size={22} />
            ) : (
              <IconMenu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* ================= پنل منوی موبایل ================= */}

      <div
        className={`${styles.mobileMenuPanel} ${
          open
            ? styles.mobileMenuPanelOpen
            : styles.mobileMenuPanelClosed
        }`}
      >
        <div className={styles.mobileMenuInner}>

          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`${styles.mobileNavLink} ${
                  active
                    ? styles.mobileNavLinkActive
                    : ""
                }`}
              >
                <Icon
                  size={17}
                  className={
                    active
                      ? styles.mobileNavIconActive
                      : styles.mobileNavIcon
                  }
                />

                <span className={styles.mobileNavText}>
                  {item.name}
                </span>

                {active && (
                  <span className={styles.mobileNavDot} />
                )}
              </Link>
            );
          })}

          {/* ================= دکمه‌های موبایل ================= */}

          <div className={styles.mobileButtonsContainer}>

            {!authLoading && (
              <>
                {isLoggedIn ? (
                  <Link
                    href="/PanelUser"
                    onClick={handleNavClick}
                    className={styles.mobileLoginButton}
                  >
                    <IconUser size={18} />
                    <span>پنل کاربری</span>
                  </Link>
                ) : (
                  <Link
                    href="/Login"
                    onClick={handleNavClick}
                    className={styles.mobileLoginButton}
                  >
                    <IconUser size={18} />
                    <span>ورود / ثبت نام</span>
                  </Link>
                )}
              </>
            )}

            <Link
              onClick={handleNavClick}
              href="/Booking"
              className={styles.mobileBookButton}
            >
              رزرو نوبت آنلاین
            </Link>

          </div>
        </div>
      </div>

      {/* ================= Overlay موبایل ================= */}

      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}