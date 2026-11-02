// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import { barbers } from "@/app/Barber/BarberData";
// import styles from "@/app/Components/Package/Packagebookingmodal/Packagebookingmodal.module.css";

// const WORK_START_HOUR = 9;
// const WORK_END_HOUR = 21;

// function buildAllTimeSlots() {
//   const slots = [];
//   for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
//     slots.push(`${String(hour).padStart(2, "0")}:00`);
//     slots.push(`${String(hour).padStart(2, "0")}:30`);
//   }
//   return slots;
// }

// function simpleHash(str) {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = (hash << 5) - hash + str.charCodeAt(i);
//     hash |= 0;
//   }
//   return Math.abs(hash);
// }

// function buildNextDays(count = 7) {
//   const days = [];
//   for (let i = 0; i < count; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() + i);
//     days.push(date);
//   }
//   return days;
// }

// function dateKey(date) {
//   return date.toISOString().slice(0, 10);
// }

// function formatDayLabel(date) {
//   return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
//     weekday: "short",
//     day: "numeric",
//     month: "short",
//   }).format(date);
// }

// // TODO: جایگزین واقعیش یه fetch به بک‌انده:
// // const res = await fetch(`/api/barbers/${barberId}/availability?date=${dateStr}`);
// function fetchAvailability(barberId, dateStr) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const result = buildAllTimeSlots().map((time) => {
//         const seed = simpleHash(`${barberId}-${dateStr}-${time}`);
//         return { time, available: seed % 4 !== 0 };
//       });
//       resolve(result);
//     }, 500);
//   });
// }

// export default function PackageBookingModal({ pkg, onClose }) {
//   const [selectedBarber, setSelectedBarber] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);

//   const [slots, setSlots] = useState([]);
//   const [loadingSlots, setLoadingSlots] = useState(false);

//   const [submitting, setSubmitting] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);

//   const days = useMemo(() => buildNextDays(7), []);

//   // قفل کردن اسکرول پشت صفحه + بستن با کلید Escape، تا وقتی پاپ‌آپ بازه
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     const onKeyDown = (e) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", onKeyDown);
//     return () => {
//       document.body.style.overflow = "";
//       document.removeEventListener("keydown", onKeyDown);
//     };
//   }, [onClose]);

//   // گرفتن ساعت‌های آزاد هر بار آرایشگر یا تاریخ عوض بشه
//   useEffect(() => {
//     if (!selectedBarber || !selectedDate) return;
//     let cancelled = false;
//     setLoadingSlots(true);
//     fetchAvailability(selectedBarber.id, dateKey(selectedDate)).then((result) => {
//       if (!cancelled) {
//         setSlots(result);
//         setLoadingSlots(false);
//       }
//     });
//     return () => {
//       cancelled = true;
//     };
//   }, [selectedBarber, selectedDate]);

//   const handlePickBarber = (barber) => {
//     setSelectedBarber(barber);
//     setSelectedDate(days[0]);
//     setSelectedTime(null);
//   };

//   const handlePickDate = (date) => {
//     setSelectedDate(date);
//     setSelectedTime(null);
//   };

//   const handleConfirm = async () => {
//     if (!selectedBarber || !selectedDate || !selectedTime) return;
//     setSubmitting(true);

//     // TODO: اینجا باید درخواست واقعی ثبت رزرو به بک‌اند زده بشه، مثلاً:
//     // await fetch("/api/bookings", {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify({
//     //     packageName: pkg.name,
//     //     barberId: selectedBarber.id,
//     //     date: dateKey(selectedDate),
//     //     time: selectedTime,
//     //   }),
//     // });

//     await new Promise((resolve) => setTimeout(resolve, 800)); // تأخیر مصنوعی

//     setSubmitting(false);
//     setConfirmed(true);
//   };

//   return (
//     <div className={styles.overlay} onClick={onClose}>
//       <div
//         className={styles.modal}
//         role="dialog"
//         aria-modal="true"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="بستن">
//           <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
//             <path d="M5 5 L15 15 M15 5 L5 15" />
//           </svg>
//         </button>

//         {confirmed ? (
//           /* ==================== پیام موفقیت ==================== */
//           <div className={styles.successState}>
//             <span className={styles.successIcon}>
//               <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M20 6L9 17l-5-5" />
//               </svg>
//             </span>
//             <h3>رزرو شما ثبت شد!</h3>
//             <p>
//               «{pkg.name}» با {selectedBarber?.name}، {formatDayLabel(selectedDate)} ساعت{" "}
//               {selectedTime} براتون رزرو شد.
//             </p>
//             <button type="button" className={styles.primaryBtn} onClick={onClose}>
//               بستن
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* ==================== هدر پکیج ==================== */}
//             <div className={styles.pkgHeader}>
//               <h2>رزرو {pkg.name}</h2>
//               <span className={styles.pkgPrice}>
//                 {pkg.price} <small>تومان / {pkg.unit}</small>
//               </span>
//             </div>

//             {/* ==================== انتخاب آرایشگر ==================== */}
//             <p className={styles.sectionLabel}>آرایشگر رو انتخاب کنید</p>
//             <div className={styles.barberRow}>
//               {barbers.map((barber) => (
//                 <button
//                   key={barber.id}
//                   type="button"
//                   className={`${styles.barberChip} ${
//                     selectedBarber?.id === barber.id ? styles.barberChipActive : ""
//                   }`}
//                   onClick={() => handlePickBarber(barber)}
//                 >
//                   <span className={styles.barberAvatar}>
//                     <Image src={barber.image} alt={barber.name} fill className={styles.barberImg} />
//                   </span>
//                   {barber.name}
//                 </button>
//               ))}
//             </div>

//             {/* ==================== تاریخ و ساعت ==================== */}
//             {selectedBarber && (
//               <>
//                 <p className={styles.sectionLabel}>تاریخ رو انتخاب کنید</p>
//                 <div className={styles.daysRow}>
//                   {days.map((date) => {
//                     const isActive = selectedDate && dateKey(date) === dateKey(selectedDate);
//                     return (
//                       <button
//                         key={dateKey(date)}
//                         type="button"
//                         className={`${styles.dayChip} ${isActive ? styles.dayChipActive : ""}`}
//                         onClick={() => handlePickDate(date)}
//                       >
//                         {formatDayLabel(date)}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <p className={styles.sectionLabel}>ساعت رو انتخاب کنید</p>
//                 {loadingSlots ? (
//                   <div className={styles.loadingRow}>
//                     <span className={styles.spinner} />
//                     در حال بررسی ساعت‌های خالی...
//                   </div>
//                 ) : (
//                   <div className={styles.timesGrid}>
//                     {slots.map(({ time, available }) => (
//                       <button
//                         key={time}
//                         type="button"
//                         disabled={!available}
//                         className={`${styles.timeSlot} ${
//                           selectedTime === time ? styles.timeSlotActive : ""
//                         } ${!available ? styles.timeSlotDisabled : ""}`}
//                         onClick={() => setSelectedTime(time)}
//                       >
//                         {time}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}

//             {/* ==================== خلاصه و تأیید ==================== */}
//             {selectedTime && (
//               <div className={styles.summaryBox}>
//                 <span>
//                   {pkg.name} · {selectedBarber?.name} · {formatDayLabel(selectedDate)} · ساعت{" "}
//                   {selectedTime}
//                 </span>
//               </div>
//             )}

//             <button
//               type="button"
//               className={styles.primaryBtn}
//               disabled={!selectedTime || submitting}
//               onClick={handleConfirm}
//             >
//               {submitting ? "در حال ثبت..." : "رزرو نهایی"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }












"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "@/app/Components/Package/Packagebookingmodal/Packagebookingmodal.module.css";

import { api } from "@/app/config";
import { MEDIA_URL } from "@/app/config";
import { useAuth } from "@/app/Context/Context";

function buildNextDays(count = 7) {
  const days = [];

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push(date);
  }

  return days;
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function formatDayLabel(date) {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export default function PackageBookingModal({ pkg, onClose }) {
  const { setNotif } = useAuth();

  const [barbers, setBarbers] = useState([]);

  const [selectedBarber, setSelectedBarber] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedTime, setSelectedTime] = useState(null);

  const [slots, setSlots] = useState([]);

  const [loadingSlots, setLoadingSlots] = useState(false);

  const [loadingBarbers, setLoadingBarbers] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => buildNextDays(7), []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";

      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // گرفتن آرایشگرها

  useEffect(() => {
    const getBarbers = async () => {
      try {
        setLoadingBarbers(true);

        const response = await api.get("/api/barbers/");

        setBarbers(response.data);
      } catch (error) {
        setNotif({
          id: Date.now(),
          message: "خطا در دریافت لیست آرایشگرها",
          type: "error",
        });
      } finally {
        setLoadingBarbers(false);
      }
    };

    getBarbers();
  }, []);

  // گرفتن ساعت های آزاد

  useEffect(() => {
    if (!selectedBarber || !selectedDate) return;

    const getSlots = async () => {
      try {
        setLoadingSlots(true);

        const response = await api.get(
          `/api/bookings/availability/?barber_id=${selectedBarber.id}&date=${dateKey(selectedDate)}`,
        );

        setSlots(response.data);
      } catch (error) {
        setNotif({
          id: Date.now(),

          message: "خطا در دریافت ساعت های آزاد",

          type: "error",
        });
      } finally {
        setLoadingSlots(false);
      }
    };

    getSlots();
  }, [selectedBarber, selectedDate]);

  const handlePickBarber = (barber) => {
    setSelectedBarber(barber);

    setSelectedDate(days[0]);

    setSelectedTime(null);
  };

  const handlePickDate = (date) => {
    setSelectedDate(date);

    setSelectedTime(null);
  };

  const handleConfirm = async () => {
    if (!selectedBarber || !selectedDate || !selectedTime) return;

    try {
      setSubmitting(true);

      await api.post("/api/bookings/", {
        package_id: pkg.id,

        barber_id: selectedBarber.id,

        date: dateKey(selectedDate),

        time: selectedTime,
      });

      setNotif({
        id: Date.now(),

        message: "رزرو شما با موفقیت ثبت شد",

        type: "success",
      });

      setConfirmed(true);
    } catch (error) {
      setNotif({
        id: Date.now(),

        message: error.response?.data?.message || "خطا در ثبت رزرو",

        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </button>

        {confirmed ? (
          <div className={styles.successState}>
            <h3>رزرو شما ثبت شد!</h3>

            <p>
              {pkg.name}
              با
              {selectedBarber?.name}،{formatDayLabel(selectedDate)}
              ساعت
              {selectedTime}
              رزرو شد.
            </p>

            <button className={styles.primaryBtn} onClick={onClose}>
              بستن
            </button>
          </div>
        ) : (
          <>
            <div className={styles.pkgHeader}>
              <h2>رزرو {pkg.name}</h2>

              <span className={styles.pkgPrice}>
                {pkg.price}

                <small>تومان / {pkg.unit}</small>
              </span>
            </div>

            <p className={styles.sectionLabel}>آرایشگر رو انتخاب کنید</p>

            <div className={styles.barberRow}>
              {loadingBarbers ? (
                <p>در حال دریافت...</p>
              ) : (
                barbers.map((barber) => (
                  <button
                    key={barber.id}
                    type="button"
                    className={`${styles.barberChip}

${selectedBarber?.id === barber.id ? styles.barberChipActive : ""}`}
                    onClick={() => handlePickBarber(barber)}
                  >
                    <span className={styles.barberAvatar}>
                      <Image
                        src={`${MEDIA_URL}${barber.image}`}
                        alt={barber.name}
                        fill
                        className={styles.barberImg}
                      />
                    </span>

                    {barber.name}
                  </button>
                ))
              )}
            </div>

            {selectedBarber && (
              <>
                <p className={styles.sectionLabel}>تاریخ رو انتخاب کنید</p>

                <div className={styles.daysRow}>
                  {days.map((date) => (
                    <button
                      key={dateKey(date)}
                      type="button"
                      className={`${styles.dayChip}

${
  selectedDate && dateKey(selectedDate) === dateKey(date)
    ? styles.dayChipActive
    : ""
}`}
                      onClick={() => handlePickDate(date)}
                    >
                      {formatDayLabel(date)}
                    </button>
                  ))}
                </div>

                <p className={styles.sectionLabel}>ساعت رو انتخاب کنید</p>

                {loadingSlots ? (
                  <div className={styles.loadingRow}>
                    در حال بررسی ساعت‌ها...
                  </div>
                ) : (
                  <div className={styles.timesGrid}>
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        type="button"
                        className={`${styles.timeSlot}

${selectedTime === slot.time ? styles.timeSlotActive : ""}

${!slot.available ? styles.timeSlotDisabled : ""}`}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {selectedTime && (
              <div className={styles.summaryBox}>
                {pkg.name}·{selectedBarber.name}·{formatDayLabel(selectedDate)}·
                {selectedTime}
              </div>
            )}

            <button
              type="button"
              className={styles.primaryBtn}
              disabled={!selectedTime || submitting}
              onClick={handleConfirm}
            >
              {submitting ? "در حال ثبت..." : "رزرو نهایی"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
