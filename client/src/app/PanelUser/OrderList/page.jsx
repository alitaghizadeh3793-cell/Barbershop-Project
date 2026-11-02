// "use client";

// import styles from "./page.module.css";

// export default function OrdersList() {
//   const reservations = [
//     {
//       id: 1,
//       service: "کوتاهی مو کلاسیک",
//       barber: "استاد رضایی",
//       date: "۱۴۰۴/۰۵/۱۲",
//       time: "۱۶:۳۰",
//       price: "۱۸۰,۰۰۰ تومان",
//       status: "تایید شده",
//     },
//     {
//       id: 2,
//       service: "اصلاح صورت با تیغ",
//       barber: "استاد کریمی",
//       date: "۱۴۰۴/۰۵/۱۸",
//       time: "۱۱:۰۰",
//       price: "۱۲۰,۰۰۰ تومان",
//       status: "در انتظار تایید",
//     },
//     {
//       id: 3,
//       service: "کوتاهی مو + اصلاح ریش",
//       barber: "استاد صادقی",
//       date: "۱۴۰۴/۰۴/۲۹",
//       time: "۱۸:۰۰",
//       price: "۲۵۰,۰۰۰ تومان",
//       status: "لغو شده",
//     },
//     {
//       id: 4,
//       service: "رنگ و مش مو",
//       barber: "استاد رضایی",
//       date: "۱۴۰۴/۰۶/۰۲",
//       time: "۱۰:۳۰",
//       price: "۴۵۰,۰۰۰ تومان",
//       status: "تایید شده",
//     },
//   ];

//   const badgeClassFor = (status) => {
//     if (status === "تایید شده") return styles.badgeConfirmed;
//     if (status === "در انتظار تایید") return styles.badgePending;
//     return styles.badgeCancelled;
//   };

//   const handleCancel = (id) => {
//     console.log("درخواست لغو نوبت با آیدی:", id);
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.header}>
//         <div className={styles.headerText}>
//           <h2 className={styles.title}>رزروهای من</h2>
//           <p className={styles.subtitle}>
//             لیست نوبت‌های ثبت‌شده شما در آرایشگاه
//           </p>
//         </div>
//         <div className={styles.totalBadge}>
//           {reservations.length} نوبت
//         </div>
//       </div>

//       <div className={styles.list}>
//         {reservations.map((item) => (
//           <div
//             key={item.id}
//             className={`${styles.card} ${
//               item.status === "لغو شده" ? styles.cardCancelled : ""
//             }`}
//           >
//             {/* بخش بالایی کارت: عنوان سرویس و وضعیت */}
//             <div className={styles.cardHeader}>
//               <div className={styles.serviceInfo}>
//                 <span className={styles.serviceName}>{item.service}</span>
//                 <span className={styles.barberName}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.userIcon}>
//                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="12" cy="7" r="4"></circle>
//                   </svg>
//                   توسط {item.barber}
//                 </span>
//               </div>
//               <span className={`${styles.badge} ${badgeClassFor(item.status)}`}>
//                 {item.status}
//               </span>
//             </div>

//             {/* بخش میانی کارت: اطلاعات زمان و قیمت */}
//             <div className={styles.cardBody}>
//               <div className={styles.metaItem}>
//                 <div className={styles.metaIconWrapper}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.metaIcon}>
//                     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                     <line x1="16" y1="2" x2="16" y2="6"></line>
//                     <line x1="8" y1="2" x2="8" y2="6"></line>
//                     <line x1="3" y1="10" x2="21" y2="10"></line>
//                   </svg>
//                 </div>
//                 <div className={styles.metaContent}>
//                   <span className={styles.metaLabel}>تاریخ</span>
//                   <span className={styles.metaValue}>{item.date}</span>
//                 </div>
//               </div>

//               <div className={styles.metaItem}>
//                 <div className={styles.metaIconWrapper}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.metaIcon}>
//                     <circle cx="12" cy="12" r="10"></circle>
//                     <polyline points="12 6 12 12 16 14"></polyline>
//                   </svg>
//                 </div>
//                 <div className={styles.metaContent}>
//                   <span className={styles.metaLabel}>ساعت</span>
//                   <span className={styles.metaValue}>{item.time}</span>
//                 </div>
//               </div>

//               <div className={styles.metaItem}>
//                 <div className={styles.metaIconWrapper}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.metaIcon}>
//                     <line x1="12" y1="1" x2="12" y2="23"></line>
//                     <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//                   </svg>
//                 </div>
//                 <div className={styles.metaContent}>
//                   <span className={styles.metaLabel}>هزینه</span>
//                   <span className={styles.metaValueHighlight}>{item.price}</span>
//                 </div>
//               </div>
//             </div>

//             {/* بخش پایینی کارت: دکمه لغو */}
//             {item.status !== "لغو شده" && (
//               <div className={styles.cardFooter}>
//                 <button
//                   type="button"
//                   className={styles.cancelBtn}
//                   onClick={() => handleCancel(item.id)}
//                 >
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
//                     <circle cx="12" cy="12" r="10"></circle>
//                     <line x1="15" y1="9" x2="9" y2="15"></line>
//                     <line x1="9" y1="9" x2="15" y2="15"></line>
//                   </svg>
//                   لغو نوبت
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

import { api } from "@/app/config";
import { useAuth } from "@/app/Context/Context";

export default function OrdersList() {
  const { setNotif } = useAuth();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // دریافت رزروهای کاربر
  // GET /api/v1/customer/reservations
  // =========================

  useEffect(() => {
    const getReservations = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/api/v1/customer/reservations"
        );

        // طبق مستندات، این endpoint مستقیماً آرایه برمی‌گرداند.
        const data = Array.isArray(response.data)
          ? response.data
          : [];

        setReservations(data);
      } catch (error) {
        console.error(
          "Get customer reservations error:",
          error
        );

        // اگر توکن منقضی/نامعتبر شده باشد
        if (error?.response?.status === 401) {
          setNotif?.({
            id: Date.now(),
            message: "نشست شما منقضی شده است. لطفاً دوباره وارد شوید.",
            type: "error",
          });

          return;
        }

        setReservations([]);

        setNotif?.({
          id: Date.now(),
          message: "خطا در دریافت رزروهای شما",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    getReservations();
  }, [setNotif]);

  // =========================
  // تبدیل وضعیت واقعی API
  // =========================

  const getStatus = (item) => {
    if (item?.is_canceled) {
      return "لغو شده";
    }

    return "تایید شده";
  };

  // =========================
  // کلاس وضعیت
  // =========================

  const badgeClassFor = (status) => {
    if (status === "تایید شده") {
      return styles.badgeConfirmed;
    }

    if (status === "در انتظار تایید") {
      return styles.badgePending;
    }

    return styles.badgeCancelled;
  };

  // =========================
  // فرمت قیمت
  // =========================

  const formatPrice = (price) => {
    if (
      price === null ||
      price === undefined ||
      price === ""
    ) {
      return "—";
    }

    const number = Number(price);

    if (Number.isNaN(number)) {
      return `${price} تومان`;
    }

    return `${number.toLocaleString("fa-IR")} تومان`;
  };

  // =========================
  // فرمت تاریخ
  // =========================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    // طبق مستندات تاریخ جلالی است:
    // YYYY-MM-DD
    //
    // برای نمایش فارسی، فقط جداکننده را تغییر می‌دهیم.
    return String(date)
      .split("-")
      .map((part) => part.trim())
      .join("/");
  };

  // =========================
  // فرمت ساعت
  // =========================

  const formatTime = (time) => {
    if (!time) {
      return "—";
    }

    // 10:30:00 -> 10:30
    return String(time).slice(0, 5);
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>
              پیگیری نوبت‌ها
            </span>

            <h2 className={styles.title}>
              رزروهای من
            </h2>

            <p className={styles.subtitle}>
              در حال دریافت نوبت‌های شما...
            </p>
          </div>

          <div className={styles.totalBadge}>
            ...
          </div>
        </div>

        <div className={styles.list}>
          <div
            style={{
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            در حال دریافت رزروها...
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Render
  // =========================

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <span className={styles.eyebrow}>
            پیگیری نوبت‌ها
          </span>

          <h2 className={styles.title}>
            رزروهای من
          </h2>

          <p className={styles.subtitle}>
            لیست نوبت‌های ثبت‌شده شما در آرایشگاه
          </p>
        </div>

        <div className={styles.totalBadge}>
          {reservations.length} نوبت
        </div>
      </div>

      {/* =========================
          Empty State
      ========================= */}

      {reservations.length === 0 ? (
        <div
          className={styles.list}
          style={{
            minHeight: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
            }}
          >
            <h3
              style={{
                marginBottom: "10px",
              }}
            >
              هنوز رزروی ندارید
            </h3>

            <p>
              نوبت‌های رزرو شده شما در این بخش نمایش داده می‌شوند.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.list}>
          {reservations.map((item) => {
            const status = getStatus(item);

            return (
              <div
                key={item.id}
                className={`${styles.card} ${
                  item.is_canceled
                    ? styles.cardCancelled
                    : ""
                }`}
              >
                {/* =========================
                    Header
                ========================= */}

                <div className={styles.cardHeader}>
                  <div className={styles.serviceInfo}>
                    <span className={styles.serviceName}>
                      {item.service_title || "خدمت"}
                    </span>

                    <span className={styles.barberName}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.userIcon}
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle
                          cx="12"
                          cy="7"
                          r="4"
                        />
                      </svg>

                      توسط{" "}
                      {item.barber_name || "آرایشگر"}
                    </span>
                  </div>

                  <span
                    className={`${styles.badge} ${badgeClassFor(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </div>

                {/* =========================
                    Body
                ========================= */}

                <div className={styles.cardBody}>
                  {/* تاریخ */}

                  <div className={styles.metaItem}>
                    <div className={styles.metaIconWrapper}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.metaIcon}
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line
                          x1="16"
                          y1="2"
                          x2="16"
                          y2="6"
                        />
                        <line
                          x1="8"
                          y1="2"
                          x2="8"
                          y2="6"
                        />
                        <line
                          x1="3"
                          y1="10"
                          x2="21"
                          y2="10"
                        />
                      </svg>
                    </div>

                    <div className={styles.metaContent}>
                      <span className={styles.metaLabel}>
                        تاریخ
                      </span>

                      <span className={styles.metaValue}>
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>

                  {/* ساعت */}

                  <div className={styles.metaItem}>
                    <div className={styles.metaIconWrapper}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.metaIcon}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                        />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>

                    <div className={styles.metaContent}>
                      <span className={styles.metaLabel}>
                        ساعت
                      </span>

                      <span className={styles.metaValue}>
                        {formatTime(item.time)}
                      </span>
                    </div>
                  </div>

                  {/* هزینه */}

                  <div className={styles.metaItem}>
                    <div className={styles.metaIconWrapper}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.metaIcon}
                      >
                        <line
                          x1="12"
                          y1="1"
                          x2="12"
                          y2="23"
                        />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>

                    <div className={styles.metaContent}>
                      <span className={styles.metaLabel}>
                        هزینه
                      </span>

                      <span
                        className={
                          styles.metaValueHighlight
                        }
                      >
                        {formatPrice(
                          item.price_at_booking
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* =========================
                    Footer
                    فعلاً لغو را به API وصل نمی‌کنیم
                    چون endpoint مشتری برای لغو
                    در مستندات تعریف نشده.
                ========================= */}

                {!item.is_canceled && (
                  <div className={styles.cardFooter}>
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      disabled
                      title="لغو رزرو از طریق API مشتری در مستندات تعریف نشده است"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="16"
                        height="16"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                        />

                        <line
                          x1="15"
                          y1="9"
                          x2="9"
                          y2="15"
                        />

                        <line
                          x1="9"
                          y1="9"
                          x2="15"
                          y2="15"
                        />
                      </svg>

                      لغو نوبت
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
