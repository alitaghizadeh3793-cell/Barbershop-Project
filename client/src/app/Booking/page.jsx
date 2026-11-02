"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

/* ============================================================
   ==================== دیتای فیک (Mock) =====================
   ============================================================
   همه‌ی این‌ها باید در نهایت از بک‌اند واقعی بیان. جاهایی که باید
   fetch واقعی جایگزین بشه، با TODO مشخص شده.
*/

const BARBERS = [
  { id: "master-rezaei", name: "استاد رضایی", role: "سلمانی ارشد و بنیان‌گذار", image: "/image-dashboard/photo-1503951914875-452162b0f3f1.avif" },
  { id: "master-karimi", name: "استاد کریمی", role: "متخصص اصلاح ریش", image: "/image-dashboard/photo-1517832606299-7ae9b720a186.avif" },
  { id: "master-sadeghi", name: "استاد صادقی", role: "استایلیست مو", image: "/image-dashboard/photo-1532710093739-9470acff878f.avif" },
  { id: "master-nouri", name: "استاد نوری", role: "متخصص رنگ و کراتینه", image: "/image-dashboard/photo-1585747860715-2ba37e788b70.avif" },
];

const SERVICES = [
  { id: "s1", title: "کوتاهی مو کلاسیک", duration: 30, price: 250000 },
  { id: "s2", title: "فید و تیپر مدرن", duration: 40, price: 320000 },
  { id: "s3", title: "اصلاح با تیغ سنتی", duration: 25, price: 150000 },
  { id: "s4", title: "فرم‌دهی و خط ریش", duration: 20, price: 130000 },
  { id: "s5", title: "فشیال تخصصی صورت", duration: 45, price: 380000 },
  { id: "s6", title: "پکیج VIP داماد", duration: 150, price: 1200000 },
];

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 21;

// کلید ذخیره‌سازی سبد رزروها تو localStorage مرورگر
const STORAGE_KEY = "velvet-barber:pending-reservations";

/* ============================================================
   ==================== توابع کمکی ============================
   ============================================================ */

function buildAllTimeSlots() {
  const slots = [];
  for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return slots;
}

// هش ساده و دترمینیستیک؛ همون ورودی همیشه همون خروجی رو می‌ده (برخلاف Math.random خام)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

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

function generateReservationId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `res-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* ============================================================
   ============ شبیه‌سازی درخواست به بک‌اند برای زمان‌های آزاد ============
   ============================================================
   جایگزین واقعیش:
   async function fetchAvailability(barberId, dateStr) {
     const res = await fetch(`/api/barbers/${barberId}/availability?date=${dateStr}`);
     return res.json();
   }
*/
function fetchAvailability(barberId, dateStr) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allSlots = buildAllTimeSlots();
      const result = allSlots.map((time) => {
        const seed = simpleHash(`${barberId}-${dateStr}-${time}`);
        const isBooked = seed % 4 === 0;
        return { time, available: !isBooked };
      });
      resolve(result);
    }, 600);
  });
}

const formatPrice = (n) => n.toLocaleString("fa-IR");

/* ============================================================
   ============ آیکون‌های بخش «پیشنهادهای آماده» ============
   ============================================================ */

const ScissorsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);
const CrownIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" />
  </svg>
);
const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="16" y1="3" x2="16" y2="7" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const CheckIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 10.5l4 4L16 6" />
  </svg>
);
const ClockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

/* ============================================================
   ==================== دیتای فیک (Mock) =====================
   ============================================================
   این‌ها همون پکیج‌هایی هستن که تو صفحه‌ی خدمات نشون داده می‌شن، با این
   فرق که اینجا آرایشگر، روز و ساعتش از قبل توسط ادمین ست شده. کاربر اگه
   این ترکیب رو دوست داشت، دیگه لازم نیست مرحله‌به‌مرحله بره بالا و
   خودش آرایشگر/تاریخ/ساعت رو انتخاب کنه؛ با یه کلیک مستقیم به سبدش
   اضافه می‌شه. dayOffset یعنی «چند روز از امروز» (۰ = امروز، ۱ = فردا و...).
*/
const QUICK_PACKAGES = [
  {
    id: "pkg-classic",
    number: "۰۱",
    icon: ScissorsIcon,
    name: "پکیج کلاسیک",
    price: 250000,
    unit: "هر جلسه",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    features: ["کوتاهی مو با قیچی و ماشین", "اصلاح صورت با تیغ سنتی", "شستشو و حالت‌دهی نهایی"],
    barberId: "master-karimi",
    dayOffset: 0,
    time: "11:00",
    featured: false,
  },
  {
    id: "pkg-golden",
    number: "۰۲",
    icon: CrownIcon,
    name: "پکیج طلایی",
    price: 450000,
    unit: "هر جلسه",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    features: ["تمام خدمات پکیج کلاسیک", "ماسک و مراقبت پوست صورت", "ماساژ سر و شانه", "پذیرایی VIP با چای و قهوه"],
    barberId: "master-rezaei",
    dayOffset: 1,
    time: "16:30",
    featured: true,
    ribbon: "محبوب‌ترین",
  },
  {
    id: "pkg-vip-monthly",
    number: "۰۳",
    icon: CalendarIcon,
    name: "اشتراک ماهانه VIP",
    price: 1600000,
    unit: "ماهانه",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
    features: ["۴ نوبت کامل در طول ماه", "رزرو با اولویت، بدون صف انتظار", "۱۵٪ تخفیف روی محصولات مراقبتی", "یک جلسه هدیه به‌مناسبت تولد"],
    barberId: "master-sadeghi",
    dayOffset: 2,
    time: "10:00",
    featured: false,
  },
];

/* ============================================================
   ==================== کامپوننت اصلی ==========================
   ============================================================ */

export default function Booking() {
  const [step, setStep] = useState(1);

  // انتخاب‌های در حال ساخت (رزروی که کاربر الان داره می‌سازه)
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // سبد رزروهایی که کاربر تا الان اضافه کرده (می‌تونه چندتا باشه)
  const [reservations, setReservations] = useState([]);
  const [hydrated, setHydrated] = useState(false); // برای جلوگیری از overwrite شدن localStorage قبل از خوندنش

  const [submittingAll, setSubmittingAll] = useState(false);
  const [allConfirmed, setAllConfirmed] = useState(false);

  const days = useMemo(() => buildNextDays(7), []);

  // ---------- خوندن سبد رزرو ذخیره‌شده از localStorage، فقط یه بار موقع mount ----------
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setReservations(JSON.parse(raw));
    } catch {
      // اگه دیتای ذخیره‌شده خراب بود، نادیده‌ش می‌گیریم و از صفر شروع می‌کنیم
    }
    setHydrated(true);
  }, []);

  // ---------- هر بار سبد رزرو عوض شد، تو localStorage ذخیره‌ش کن ----------
  useEffect(() => {
    if (!hydrated) return; // تا وقتی خوندن اولیه تموم نشده، چیزی رو ننویس
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  }, [reservations, hydrated]);

  // ---------- گرفتن ساعت‌های آزاد از «بک‌اند» با هر تغییر آرایشگر/تاریخ ----------
  // نکته مهم: این افکت دیگه selectedTime رو خودش null نمی‌کنه؛ چون همین
  // افکت موقع «ویرایشِ» یه رزرو از سبد هم اجرا می‌شه (چون آرایشگر/تاریخ
  // دوباره ست می‌شن) و اگه اینجا زمان رو پاک می‌کرد، زمانِ بازیابی‌شده از
  // سبد از بین می‌رفت و دکمه‌ی «افزودن به سبد» دیگه کار نمی‌کرد. پاک کردن
  // زمان الان فقط تو خودِ هندلرهای انتخاب دستی کاربر (handlePickBarber و
  // handlePickDate) انجام می‌شه، نه اینجا.
  useEffect(() => {
    if (!selectedBarber || !selectedDate) return;

    let cancelled = false;
    setLoadingSlots(true);

    fetchAvailability(selectedBarber.id, dateKey(selectedDate)).then((result) => {
      if (!cancelled) {
        setSlots(result);
        setLoadingSlots(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [selectedBarber, selectedDate]);

  const totalCartPrice = useMemo(
    () => reservations.reduce((sum, r) => sum + r.price, 0),
    [reservations]
  );

  /* ============================================================
     ==================== هندلرهای مراحل ==========================
     ============================================================ */

  const handlePickBarber = (barber) => {
    setSelectedBarber(barber);
    setSelectedDate(days[0]);
    setSelectedTime(null); // آرایشگر جدید یعنی زمان قبلی دیگه معتبر نیست
    setStep(2);
  };

  const handlePickDate = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // روز عوض شد، پس زمان انتخابی قبلی رو پاک می‌کنیم
  };
  const handlePickTime = (time) => setSelectedTime(time);
  const handlePickService = (service) => setSelectedService(service);

  const goToServiceStep = () => {
    if (selectedTime) setStep(3);
  };

  // برگشت به مرحله قبل (استفاده می‌شه تو دکمه‌ی برگشتِ بالای هر پنل)
  const goBackOneStep = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  // پاک کردن کامل انتخاب فعلی (بدون افزودن به سبد) و شروع دوباره از مرحله ۱
  const clearCurrentSelection = () => {
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedService(null);
    setSlots([]);
    setStep(1);
  };

  // افزودن رزرو فعلی به سبد + ریست کردن فرم برای اینکه کاربر بتونه رزرو بعدی رو بسازه
  const addCurrentToCartAndStartNew = () => {
    if (!selectedBarber || !selectedDate || !selectedTime || !selectedService) return;

    const newReservation = {
      id: generateReservationId(),
      barberId: selectedBarber.id,
      barberName: selectedBarber.name,
      barberImage: selectedBarber.image,
      dateKey: dateKey(selectedDate),
      dateLabel: formatDayLabel(selectedDate),
      time: selectedTime,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      price: selectedService.price,
    };

    setReservations((prev) => [...prev, newReservation]);
    clearCurrentSelection();
  };

  // حذف یه رزرو خاص از سبد
  const removeReservation = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  // پاک کردن کل سبد
  const clearAllReservations = () => {
    setReservations([]);
  };

  // بارگذاری یه رزروِ داخل سبد تو فرم برای ویرایش (و حذفش از سبد تا دوباره اضافه بشه)
  const editReservation = (item) => {
    const barber = BARBERS.find((b) => b.id === item.barberId) ?? null;
    const service = SERVICES.find((s) => s.id === item.serviceId) ?? null;

    setSelectedBarber(barber);
    setSelectedDate(new Date(item.dateKey));
    setSelectedTime(item.time);
    setSelectedService(service);
    removeReservation(item.id);
    setStep(3);
  };

  // ثبت نهایی همه‌ی رزروهای داخل سبد (این همون جاییه که باید به بک‌اند واقعی وصل بشه)
  const handleSubmitAll = async () => {
    if (reservations.length === 0) return;
    setSubmittingAll(true);

    // TODO: اینجا باید همه‌ی آیتم‌های reservations به بک‌اند ارسال بشن، مثلاً:
    // await fetch("/api/bookings/bulk", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ reservations }),
    // });

    await new Promise((resolve) => setTimeout(resolve, 900));

    setSubmittingAll(false);
    setAllConfirmed(true);
    setReservations([]); // بعد از ثبت موفق، سبد (و localStorage) پاک می‌شه
  };

  const startOver = () => {
    setAllConfirmed(false);
    clearCurrentSelection();
  };

  // افزودن مستقیم یکی از پیشنهادهای آماده به سبد، بدون رفتن به مراحل بالا.
  // آرایشگر/تاریخ/ساعتش از قبل تو خود QUICK_PACKAGES مشخص شده.
  const addQuickPackageToCart = (pkg) => {
    const barber = BARBERS.find((b) => b.id === pkg.barberId);
    const date = days[pkg.dayOffset];
    if (!barber || !date) return;

    const newReservation = {
      id: generateReservationId(),
      barberId: barber.id,
      barberName: barber.name,
      barberImage: barber.image,
      dateKey: dateKey(date),
      dateLabel: formatDayLabel(date),
      time: pkg.time,
      serviceId: pkg.id,
      serviceTitle: pkg.name,
      price: pkg.price,
    };

    setReservations((prev) => [...prev, newReservation]);
  };

  /* ============================================================
     ==================== صفحه‌ی موفقیت نهایی ======================
     ============================================================ */
  if (allConfirmed) {
    return (
      <section dir="rtl" className={styles.page}>
        <div className={styles.successBox}>
          <span className={styles.successIcon}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          <h2>همه‌ی رزروهاتون ثبت شد!</h2>
          <p>پیامک تأیید برای هرکدوم از نوبت‌ها براتون ارسال می‌شه.</p>
          <button type="button" className={styles.primaryBtn} onClick={startOver}>
            ثبت رزرو جدید
          </button>
        </div>
      </section>
    );
  }

  return (
    <section dir="rtl" className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>BOOK AN APPOINTMENT</span>
          <h1 className={styles.title}>رزرو نوبت</h1>
          <p className={styles.subtitle}>
            آرایشگر، تاریخ، ساعت و سرویس مورد نظرتون رو انتخاب کنید — می‌تونید
            چندتا نوبت مختلف هم پشت سر هم ثبت کنید.
          </p>
        </div>

        {/* ==================== نشانگر مراحل ==================== */}
        <div className={styles.stepper}>
          {[
            { no: 1, label: "انتخاب آرایشگر" },
            { no: 2, label: "تاریخ و ساعت" },
            { no: 3, label: "انتخاب سرویس" },
          ].map((s, i, arr) => (
            <div key={s.no} className={styles.stepItemWrap}>
              <button
                type="button"
                className={`${styles.stepItem} ${step === s.no ? styles.stepActive : ""} ${
                  step > s.no ? styles.stepDone : ""
                }`}
                onClick={() => {
                  if (s.no < step) setStep(s.no);
                }}
                disabled={s.no > step}
              >
                <span className={styles.stepCircle}>
                  {step > s.no ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    s.no
                  )}
                </span>
                <span className={styles.stepLabel}>{s.label}</span>
              </button>
              {i < arr.length - 1 && <span className={styles.stepLine} />}
            </div>
          ))}
        </div>

        {/* ==================== مرحله ۱: انتخاب آرایشگر ==================== */}
        {step === 1 && (
          <div className={styles.stepPanel}>
            <div className={styles.barberGrid}>
              {BARBERS.map((barber) => (
                <button
                  key={barber.id}
                  type="button"
                  className={styles.barberCard}
                  onClick={() => handlePickBarber(barber)}
                >
                  <div className={styles.barberImageWrap}>
                    <Image src={barber.image} alt={barber.name} fill className={styles.barberImage} />
                  </div>
                  <p className={styles.barberName}>{barber.name}</p>
                  <p className={styles.barberRole}>{barber.role}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ==================== مرحله ۲: انتخاب تاریخ و ساعت ==================== */}
        {step === 2 && selectedBarber && (
          <div className={styles.stepPanel}>
            <button type="button" className={styles.backBtn} onClick={goBackOneStep}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.5 4 L13.5 10 L7.5 16" />
              </svg>
              بازگشت به انتخاب آرایشگر
            </button>

            <div className={styles.selectedBarberBar}>
              <div className={styles.selectedBarberAvatar}>
                <Image src={selectedBarber.image} alt={selectedBarber.name} fill className={styles.barberImage} />
              </div>
              <div>
                <p className={styles.selectedBarberName}>{selectedBarber.name}</p>
                <p className={styles.selectedBarberRole}>{selectedBarber.role}</p>
              </div>
            </div>

            <div className={styles.daysRow}>
              {days.map((date) => {
                const isActive = selectedDate && dateKey(date) === dateKey(selectedDate);
                return (
                  <button
                    key={dateKey(date)}
                    type="button"
                    className={`${styles.dayChip} ${isActive ? styles.dayChipActive : ""}`}
                    onClick={() => handlePickDate(date)}
                  >
                    {formatDayLabel(date)}
                  </button>
                );
              })}
            </div>

            <div className={styles.timesWrap}>
              {loadingSlots ? (
                <div className={styles.loadingRow}>
                  <span className={styles.spinner} />
                  در حال دریافت ساعت‌های خالی از سرور...
                </div>
              ) : (
                <div className={styles.timesGrid}>
                  {slots.map(({ time, available }) => (
                    <button
                      key={time}
                      type="button"
                      disabled={!available}
                      className={`${styles.timeSlot} ${
                        selectedTime === time ? styles.timeSlotActive : ""
                      } ${!available ? styles.timeSlotDisabled : ""}`}
                      onClick={() => handlePickTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className={styles.primaryBtn}
              disabled={!selectedTime}
              onClick={goToServiceStep}
            >
              ادامه و انتخاب سرویس
            </button>
          </div>
        )}

        {/* ==================== مرحله ۳: انتخاب سرویس ==================== */}
        {step === 3 && (
          <div className={styles.stepPanel}>
            <button type="button" className={styles.backBtn} onClick={goBackOneStep}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.5 4 L13.5 10 L7.5 16" />
              </svg>
              بازگشت به تاریخ و ساعت
            </button>

            <div className={styles.serviceGrid}>
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className={`${styles.serviceCard} ${
                    selectedService?.id === service.id ? styles.serviceCardActive : ""
                  }`}
                  onClick={() => handlePickService(service)}
                >
                  <div>
                    <p className={styles.serviceTitle}>{service.title}</p>
                    <p className={styles.serviceDuration}>{service.duration} دقیقه</p>
                  </div>
                  <span className={styles.servicePrice}>
                    {formatPrice(service.price)}
                    <span> تومان</span>
                  </span>
                </button>
              ))}
            </div>

            {selectedService && (
              <div className={styles.summaryCard}>
                <h3>خلاصه این رزرو</h3>
                <ul>
                  <li>
                    <span>آرایشگر</span>
                    <span>{selectedBarber?.name}</span>
                  </li>
                  <li>
                    <span>تاریخ</span>
                    <span>{formatDayLabel(selectedDate)}</span>
                  </li>
                  <li>
                    <span>ساعت</span>
                    <span>{selectedTime}</span>
                  </li>
                  <li>
                    <span>سرویس</span>
                    <span>{selectedService.title}</span>
                  </li>
                  <li className={styles.summaryTotal}>
                    <span>مبلغ این نوبت</span>
                    <span>{formatPrice(selectedService.price)} تومان</span>
                  </li>
                </ul>

                <div className={styles.summaryActions}>
                  <button type="button" className={styles.ghostBtn} onClick={clearCurrentSelection}>
                    پاک کردن این انتخاب
                  </button>
                  <button type="button" className={styles.primaryBtn} onClick={addCurrentToCartAndStartNew}>
                    افزودن به سبد و رزرو یه نوبت دیگه
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== سبد رزروهای در حال انتظار ==================== */}
        {reservations.length > 0 && (
          <div className={styles.cart}>
            <div className={styles.cartHeader}>
              <h3>
                سبد رزروهای شما
                <span className={styles.cartCount}>{reservations.length}</span>
              </h3>
              <button type="button" className={styles.clearAllBtn} onClick={clearAllReservations}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h12M8 6V4.5c0-.6.4-1 1-1h2c.6 0 1 .4 1 1V6m-7 0 .6 9.4c.05.9.8 1.6 1.7 1.6h5.4c.9 0 1.65-.7 1.7-1.6L15 6" />
                </svg>
                پاک کردن همه
              </button>
            </div>

            <div className={styles.cartList}>
              {reservations.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.cartItemAvatar}>
                    <Image src={item.barberImage} alt={item.barberName} fill className={styles.barberImage} />
                  </div>
                  <div className={styles.cartItemInfo}>
                    <p className={styles.cartItemService}>{item.serviceTitle}</p>
                    <p className={styles.cartItemMeta}>
                      {item.barberName} · {item.dateLabel} · ساعت {item.time}
                    </p>
                  </div>
                  <div className={styles.cartItemActions}>
                    <span className={styles.cartItemPrice}>{formatPrice(item.price)} تومان</span>
                    <button
                      type="button"
                      className={styles.iconGhostBtn}
                      onClick={() => editReservation(item)}
                      aria-label="ویرایش این رزرو"
                    >
                      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                        <path d="M13.5 3.5 L16.5 6.5 L7 16 L3.5 16.5 L4 13 Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className={styles.iconGhostBtnDanger}
                      onClick={() => removeReservation(item.id)}
                      aria-label="حذف این رزرو"
                    >
                      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M5 5 L15 15 M15 5 L5 15" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <span>مجموع {reservations.length} رزرو</span>
                <span>{formatPrice(totalCartPrice)} تومان</span>
              </div>
              <button
                type="button"
                className={styles.primaryBtn}
                disabled={submittingAll}
                onClick={handleSubmitAll}
              >
                {submittingAll ? "در حال ثبت..." : "تأیید نهایی همه رزروها"}
              </button>
            </div>
          </div>
        )}

        {/* ==================== پیشنهادهای آماده (رزرو یک‌کلیکی) ==================== */}
        <div className={styles.quickSection}>
          <div className={styles.quickHeader}>
            <h3>پیشنهادهای آماده</h3>
            <p>
              اگه عجله دارید، همین ترکیب‌های از‌قبل‌آماده (با آرایشگر، تاریخ و
              ساعت مشخص) رو انتخاب کنید — دیگه لازم نیست مرحله‌به‌مرحله بالا
              برید.
            </p>
          </div>

          <div className={styles.quickGrid}>
            {QUICK_PACKAGES.map((pkg) => {
              const Icon = pkg.icon;
              const barber = BARBERS.find((b) => b.id === pkg.barberId);
              const date = days[pkg.dayOffset];
              return (
                <div key={pkg.id} className={styles.quickCard}>
                  {pkg.ribbon && (
                    <span className={styles.quickRibbon}>{pkg.ribbon}</span>
                  )}

                  <div className={styles.quickImageWrap}>
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      unoptimized
                      className={styles.quickImage}
                    />
                    <div className={styles.quickImageOverlay} />
                    <span className={styles.quickTimeBadge}>
                      <ClockIcon width={12} height={12} />
                      ساعت {pkg.time}
                    </span>
                    <span className={styles.quickIcon}>
                      <Icon width={19} height={19} />
                    </span>
                  </div>

                  <div className={styles.quickBody}>
                    <h4 className={styles.quickName}>{pkg.name}</h4>

                    {barber && date && (
                      <p className={styles.quickMeta}>
                        با {barber.name} · {formatDayLabel(date)}
                      </p>
                    )}

                    <div className={styles.quickFooter}>
                      <span className={styles.quickPrice}>
                        {formatPrice(pkg.price)}
                        <span className={styles.quickCurrency}>تومان</span>
                      </span>
                      <button
                        type="button"
                        className={styles.quickBtn}
                        onClick={() => addQuickPackageToCart(pkg)}
                      >
                        انتخاب
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


















// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import styles from "./page.module.css";
// import { api, MEDIA_URL } from "../config";

// const STORAGE_KEY = "velvet-barber:pending-reservations";

// /* ============================================================
//    Helpers
// ============================================================ */

// const formatPrice = (price) => {
//   if (price === null || price === undefined) return "-";
//   return Number(price).toLocaleString("fa-IR");
// };

// /**
//  * تبدیل تاریخ میلادی JS به تاریخ شمسی مورد نیاز Backend
//  * مثال:
//  * 2026-08-23 -> 1405-06-01
//  */
// const toJalaliDate = (date) => {
//   const formatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   });

//   const parts = formatter.formatToParts(date);

//   const year = parts.find((p) => p.type === "year")?.value;
//   const month = parts.find((p) => p.type === "month")?.value;
//   const day = parts.find((p) => p.type === "day")?.value;

//   return `${year}-${month}-${day}`;
// };

// /**
//  * نمایش تاریخ برای کاربر
//  */
// const formatDayLabel = (date) => {
//   if (!date) return "";

//   return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
//     weekday: "short",
//     day: "numeric",
//     month: "short",
//   }).format(date);
// };

// /**
//  * ساخت 7 روز آینده
//  */
// const buildNextDays = (count = 7) => {
//   const days = [];

//   for (let i = 0; i < count; i++) {
//     const date = new Date();

//     date.setHours(12, 0, 0, 0);
//     date.setDate(date.getDate() + i);

//     days.push(date);
//   }

//   return days;
// };

// /**
//  * مقایسه دو تاریخ
//  */
// const sameDay = (date1, date2) => {
//   if (!date1 || !date2) return false;

//   return toJalaliDate(date1) === toJalaliDate(date2);
// };

// /**
//  * تبدیل خطاهای API به متن قابل نمایش
//  */
// const getApiErrorMessage = (error) => {
//   const data = error?.response?.data;

//   if (!data) {
//     return "ارتباط با سرور برقرار نشد. دوباره تلاش کنید.";
//   }

//   if (typeof data === "string") {
//     return data;
//   }

//   if (data.detail) {
//     return data.detail;
//   }

//   if (data.message) {
//     return data.message;
//   }

//   if (data.times_available) {
//     return "این ساعت دیگر آزاد نیست. لطفاً یک ساعت دیگر انتخاب کنید.";
//   }

//   const firstError = Object.values(data)[0];

//   if (Array.isArray(firstError)) {
//     return firstError[0];
//   }

//   if (typeof firstError === "string") {
//     return firstError;
//   }

//   return "عملیات انجام نشد. اطلاعات واردشده را بررسی کنید.";
// };

// /**
//  * چون API لیست‌ها pagination دارد،
//  * این تابع results را از پاسخ API استخراج می‌کند.
//  */
// const getListData = (response) => {
//   if (Array.isArray(response?.data)) {
//     return response.data;
//   }

//   return response?.data?.results || [];
// };

// /**
//  * ساخت ساعت‌های نیم‌ساعتی بین start و end
//  */
// const buildSlotsFromShifts = (shifts) => {
//   const result = [];

//   shifts.forEach((shift) => {
//     if (!shift?.start_time || !shift?.end_time) return;

//     const [startHour, startMinute] = shift.start_time.split(":").map(Number);

//     const [endHour, endMinute] = shift.end_time.split(":").map(Number);

//     let current = startHour * 60 + startMinute;
//     const end = endHour * 60 + endMinute;

//     while (current < end) {
//       const hour = Math.floor(current / 60);
//       const minute = current % 60;

//       const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
//         2,
//         "0",
//       )}`;

//       result.push({
//         time,
//         available: true,
//         shiftId: shift.id,
//       });

//       current += 30;
//     }
//   });

//   return result;
// };

// /* ============================================================
//    Icons
// ============================================================ */

// const CheckIcon = (props) => (
//   <svg
//     viewBox="0 0 20 20"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.4"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M4 10.5l4 4L16 6" />
//   </svg>
// );

// const ClockIcon = (props) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.7"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <circle cx="12" cy="12" r="9" />
//     <path d="M12 7v5l3.5 2" />
//   </svg>
// );

// /* ============================================================
//    Booking
// ============================================================ */

// export default function Booking() {
//   const [step, setStep] = useState(1);

//   /* -------------------- API Data -------------------- */

//   const [barbers, setBarbers] = useState([]);
//   const [services, setServices] = useState([]);
//   const [packages, setPackages] = useState([]);

//   const [loadingBarbers, setLoadingBarbers] = useState(true);
//   const [loadingServices, setLoadingServices] = useState(false);

//   /* -------------------- Current Selection -------------------- */

//   const [selectedBarber, setSelectedBarber] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedOffering, setSelectedOffering] = useState(null);

//   /*
//     selectedOffering:
//     {
//       type: "service" | "package",
//       data: {...}
//     }
//   */

//   /* -------------------- Calendar -------------------- */

//   const [availableDays, setAvailableDays] = useState([]);
//   const [dayShifts, setDayShifts] = useState([]);
//   const [slots, setSlots] = useState([]);

//   const [loadingDays, setLoadingDays] = useState(false);
//   const [loadingSlots, setLoadingSlots] = useState(false);

//   /* -------------------- Cart -------------------- */

//   const [reservations, setReservations] = useState([]);
//   const [hydrated, setHydrated] = useState(false);

//   const [submittingAll, setSubmittingAll] = useState(false);
//   const [allConfirmed, setAllConfirmed] = useState(false);

//   /* -------------------- UI -------------------- */

//   const [error, setError] = useState("");

//   const days = useMemo(() => buildNextDays(7), []);

//   /* ============================================================
//      1. Load initial data
//   ============================================================ */

//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoadingBarbers(true);
//       setLoadingServices(true);
//       setError("");

//       try {
//         const [barbersResponse, servicesResponse, packagesResponse] =
//           await Promise.all([
//             api.get("/api/v1/public/barbers/"),
//             api.get("/api/v1/public/services/"),
//             api.get("/api/v1/public/packages/"),
//           ]);

//         setBarbers(getListData(barbersResponse));
//         setServices(getListData(servicesResponse));
//         setPackages(getListData(packagesResponse));
//       } catch (err) {
//         console.error("Booking initial data error:", err);

//         setError(getApiErrorMessage(err));
//       } finally {
//         setLoadingBarbers(false);
//         setLoadingServices(false);
//       }
//     };

//     loadInitialData();
//   }, []);

//   /* ============================================================
//      2. Load localStorage cart
//   ============================================================ */

//   useEffect(() => {
//     try {
//       const raw = window.localStorage.getItem(STORAGE_KEY);

//       if (raw) {
//         const parsed = JSON.parse(raw);

//         if (Array.isArray(parsed)) {
//           setReservations(parsed);
//         }
//       }
//     } catch (err) {
//       console.error("LocalStorage error:", err);
//     }

//     setHydrated(true);
//   }, []);

//   /* ============================================================
//      3. Save cart
//   ============================================================ */

//   useEffect(() => {
//     if (!hydrated) return;

//     window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
//   }, [reservations, hydrated]);

//   /* ============================================================
//      4. Load available days for selected barber
//   ============================================================ */

//   const loadAvailableDays = async (barberId) => {
//     if (!barberId) return;

//     setLoadingDays(true);
//     setAvailableDays([]);
//     setDayShifts([]);
//     setSlots([]);
//     setSelectedDate(null);
//     setSelectedTime(null);
//     setError("");

//     try {
//       const response = await api.get(
//         `/api/v1/public/calendar/days/?barber=${barberId}`,
//       );

//       const data = response.data?.days || [];

//       setAvailableDays(data);
//     } catch (err) {
//       console.error("Calendar days error:", err);

//       setError(getApiErrorMessage(err));
//     } finally {
//       setLoadingDays(false);
//     }
//   };

//   /* ============================================================
//      5. Load shifts + availability for selected date
//   ============================================================ */

//   const loadDayAvailability = async (barberId, date) => {
//     if (!barberId || !date) return;

//     const jalaliDate = toJalaliDate(date);

//     setLoadingSlots(true);
//     setSelectedTime(null);
//     setDayShifts([]);
//     setSlots([]);
//     setError("");

//     try {
//       /*
//         این درخواست مشخص می‌کند چه شیفت‌هایی در آن روز وجود دارد.
//         از این endpoint برای پیدا کردن shift.id استفاده می‌کنیم،
//         چون هنگام ثبت رزرو backend به shift نیاز دارد.
//       */
//       const shiftsResponse = await api.get(
//         `/api/v1/public/calendar/day-shifts/?barber=${barberId}&date=${jalaliDate}`,
//       );

//       const shifts = shiftsResponse.data?.shifts || [];

//       setDayShifts(shifts);

//       /*
//         این endpoint ساعت‌های قابل رزرو را می‌دهد.
//         مستندات backend این endpoint را برای availability تعریف کرده.
//       */
//       const availabilityResponse = await api.get(
//         `/api/v1/public/stylist/${barberId}/availability/`,
//       );

//       const availabilityData = availabilityResponse.data;

//       let availableTimes = [];

//       if (Array.isArray(availabilityData)) {
//         const selectedDay = availabilityData.find(
//           (item) => item.date === jalaliDate,
//         );

//         availableTimes = selectedDay?.times || [];
//       }

//       /*
//         اگر availability ساعت‌ها را برگرداند،
//         آن‌ها را با shift مربوطه ترکیب می‌کنیم.
//       */
//       const slotsWithShift = availableTimes.map((time) => {
//         const [hour, minute] = time.split(":").map(Number);

//         const timeInMinutes = hour * 60 + minute;

//         const matchingShift = shifts.find((shift) => {
//           const [startHour, startMinute] = shift.start_time
//             .split(":")
//             .map(Number);

//           const [endHour, endMinute] = shift.end_time.split(":").map(Number);

//           const start = startHour * 60 + startMinute;
//           const end = endHour * 60 + endMinute;

//           return timeInMinutes >= start && timeInMinutes < end;
//         });

//         return {
//           time: time.slice(0, 5),
//           available: Boolean(matchingShift),
//           shiftId: matchingShift?.id || null,
//         };
//       });

//       /*
//         اگر availability خالی بود ولی shift وجود داشت،
//         از خود shiftها ساعت‌ها را می‌سازیم.
//       */
//       if (slotsWithShift.length === 0 && shifts.length > 0) {
//         setSlots(buildSlotsFromShifts(shifts));
//       } else {
//         setSlots(slotsWithShift);
//       }
//     } catch (err) {
//       console.error("Availability error:", err);

//       setError(getApiErrorMessage(err));
//     } finally {
//       setLoadingSlots(false);
//     }
//   };

//   /* ============================================================
//      6. Select barber
//   ============================================================ */

//   const handlePickBarber = async (barber) => {
//     setSelectedBarber(barber);
//     setSelectedDate(null);
//     setSelectedTime(null);
//     setSelectedOffering(null);

//     setStep(2);

//     await loadAvailableDays(barber.id);
//   };

//   /* ============================================================
//      7. Select date
//   ============================================================ */

//   const handlePickDate = async (date) => {
//     if (!selectedBarber) return;

//     setSelectedDate(date);

//     await loadDayAvailability(selectedBarber.id, date);
//   };

//   /* ============================================================
//      8. Select time
//   ============================================================ */

//   const handlePickTime = (slot) => {
//     if (!slot?.available || !slot?.shiftId) return;

//     setSelectedTime(slot.time);

//     setError("");
//   };

//   /* ============================================================
//      9. Select service/package
//   ============================================================ */

//   const handlePickService = (service) => {
//     setSelectedOffering({
//       type: "service",
//       data: service,
//     });

//     setError("");
//   };

//   const handlePickPackage = (pkg) => {
//     setSelectedOffering({
//       type: "package",
//       data: pkg,
//     });

//     setError("");
//   };

//   /* ============================================================
//      10. Navigation
//   ============================================================ */

//   const goToServiceStep = () => {
//     if (!selectedTime) return;

//     setStep(3);
//   };

//   const goBackOneStep = () => {
//     setStep((current) => Math.max(1, current - 1));
//   };

//   const clearCurrentSelection = () => {
//     setSelectedBarber(null);
//     setSelectedDate(null);
//     setSelectedTime(null);
//     setSelectedOffering(null);

//     setAvailableDays([]);
//     setDayShifts([]);
//     setSlots([]);

//     setStep(1);
//     setError("");
//   };

//   /* ============================================================
//      11. Add current booking to cart
//   ============================================================ */

//   const addCurrentToCartAndStartNew = () => {
//     if (
//       !selectedBarber ||
//       !selectedDate ||
//       !selectedTime ||
//       !selectedOffering
//     ) {
//       setError("لطفاً تمام اطلاعات رزرو را انتخاب کنید.");
//       return;
//     }

//     const selectedSlot = slots.find((slot) => slot.time === selectedTime);

//     if (!selectedSlot?.shiftId) {
//       setError(
//         "شیفت مربوط به این ساعت پیدا نشد. لطفاً دوباره ساعت را انتخاب کنید.",
//       );

//       return;
//     }

//     const offering = selectedOffering.data;

//     const newReservation = {
//       id:
//         typeof crypto !== "undefined" && crypto.randomUUID
//           ? crypto.randomUUID()
//           : `reservation-${Date.now()}`,

//       barberId: selectedBarber.id,
//       barberName: selectedBarber.full_name || selectedBarber.name || "آرایشگر",

//       barberImage: selectedBarber.image
//         ? selectedBarber.image.startsWith("http")
//           ? selectedBarber.image
//           : `${MEDIA_URL}${selectedBarber.image}`
//         : "",

//       date: toJalaliDate(selectedDate),
//       dateLabel: formatDayLabel(selectedDate),

//       time: selectedTime,

//       shiftId: selectedSlot.shiftId,

//       offeringType: selectedOffering.type,

//       serviceId: selectedOffering.type === "service" ? offering.id : null,

//       packageId: selectedOffering.type === "package" ? offering.id : null,

//       title: offering.title || offering.name || "رزرو",

//       price:
//         selectedOffering.type === "service" ? offering.price : offering.price,
//     };

//     setReservations((prev) => [...prev, newReservation]);

//     clearCurrentSelection();
//   };

//   /* ============================================================
//      12. Remove reservation
//   ============================================================ */

//   const removeReservation = (id) => {
//     setReservations((prev) => prev.filter((item) => item.id !== id));
//   };

//   /* ============================================================
//      13. Clear all reservations
//   ============================================================ */

//   const clearAllReservations = () => {
//     setReservations([]);
//   };

//   /* ============================================================
//      14. Edit reservation
//   ============================================================ */

//   const editReservation = async (item) => {
//     const barber =
//       barbers.find((b) => Number(b.id) === Number(item.barberId)) || null;

//     if (!barber) {
//       setError("آرایشگر این رزرو دیگر در دسترس نیست.");
//       return;
//     }

//     setSelectedBarber(barber);

//     const reservationDate = new Date();

//     /*
//       item.date شمسی است.
//       برای پیدا کردن تاریخ متناظر از days استفاده می‌کنیم.
//     */
//     const matchingDate = days.find((date) => toJalaliDate(date) === item.date);

//     if (!matchingDate) {
//       setError("تاریخ این رزرو در بازه فعلی قابل ویرایش نیست.");

//       return;
//     }

//     setSelectedDate(matchingDate);

//     await loadAvailableDays(barber.id);

//     /*
//       بعد از load شدن availability دوباره زمان را
//       پیدا می‌کنیم.
//     */
//     setTimeout(() => {
//       setSelectedTime(item.time);
//     }, 0);

//     if (item.offeringType === "package") {
//       const pkg = packages.find((p) => Number(p.id) === Number(item.packageId));

//       if (pkg) {
//         setSelectedOffering({
//           type: "package",
//           data: pkg,
//         });
//       }
//     } else {
//       const service = services.find(
//         (s) => Number(s.id) === Number(item.serviceId),
//       );

//       if (service) {
//         setSelectedOffering({
//           type: "service",
//           data: service,
//         });
//       }
//     }

//     removeReservation(item.id);

//     setStep(3);
//   };

//   /* ============================================================
//      15. Final submit
//   ============================================================ */

//   const handleSubmitAll = async () => {
//     if (reservations.length === 0) {
//       setError("هیچ رزروی برای ثبت وجود ندارد.");
//       return;
//     }

//     setSubmittingAll(true);
//     setError("");

//     try {
//       const createdReservations = [];

//       /*
//         Backend فعلاً endpoint bulk ندارد.
//         بنابراین هر رزرو را جداگانه POST می‌کنیم.
//       */
//       for (const reservation of reservations) {
//         const body = {
//           barber: reservation.barberId,
//           shift: reservation.shiftId,
//           time: reservation.time,

//           ...(reservation.offeringType === "service"
//             ? {
//                 service: reservation.serviceId,
//               }
//             : {
//                 package: reservation.packageId,
//               }),
//         };

//         /*
//           اگر کاربر مهمان باشد:
//           طبق مستندات backend این endpoint بدون login
//           هم قابل استفاده است.

//           اگر بعداً بخواهی اطلاعات مشتری مهمان ارسال شود،
//           اینجا می‌توانیم name_customer و customer_phone
//           را هم اضافه کنیم.
//         */

//         const response = await api.post("/api/v1/public/reservations/", body);

//         createdReservations.push(response.data);
//       }

//       console.log("Created reservations:", createdReservations);

//       setReservations([]);
//       setAllConfirmed(true);
//     } catch (err) {
//       console.error("Reservation submit error:", err);

//       /*
//         اگر یکی از رزروها به دلیل پر شدن ساعت 400 بدهد،
//         اینجا خطای backend به کاربر نمایش داده می‌شود.
//       */
//       setError(getApiErrorMessage(err));
//     } finally {
//       setSubmittingAll(false);
//     }
//   };

//   /* ============================================================
//      Total
//   ============================================================ */

//   const totalCartPrice = useMemo(() => {
//     return reservations.reduce((sum, item) => sum + Number(item.price || 0), 0);
//   }, [reservations]);

//   /* ============================================================
//      Success
//   ============================================================ */

//   if (allConfirmed) {
//     return (
//       <section dir="rtl" className={styles.page}>
//         <div className={styles.successBox}>
//           <span className={styles.successIcon}>
//             <CheckIcon width={30} height={30} />
//           </span>

//           <h2>همه‌ی رزروهاتون ثبت شد!</h2>

//           <p>رزرو شما با موفقیت در سیستم ثبت شد.</p>

//           <button
//             type="button"
//             className={styles.primaryBtn}
//             onClick={() => {
//               setAllConfirmed(false);
//               clearCurrentSelection();
//             }}
//           >
//             ثبت رزرو جدید
//           </button>
//         </div>
//       </section>
//     );
//   }

//     /* ============================================================
//      Empty Barbers
//   ============================================================ */

//   if (!loadingBarbers && barbers.length === 0) {
//     return (
//       <section dir="rtl" className={styles.page}>
//         <div className={styles.inner}>
//           <div className={styles.emptyBarbers}>
//             <div className={styles.emptyBarbersIcon}>
//               ✂
//             </div>

//             <span className={styles.emptyBarbersEyebrow}>
//               BOOK AN APPOINTMENT
//             </span>

//             <h1 className={styles.emptyBarbersTitle}>
//               آرایشگری یافت نشد
//             </h1>

//             <p className={styles.emptyBarbersText}>
//               در حال حاضر هیچ آرایشگری برای رزرو نوبت وجود ندارد.
//             </p>

//             <button
//               type="button"
//               className={styles.emptyBarbersBack}
//               onClick={() => window.history.back()}
//             >
//               <span>←</span>
//               بازگشت
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   /* ============================================================
//      Render
//   ============================================================ */

//   return (
//     <section dir="rtl" className={styles.page}>
//       <div className={styles.inner}>
//         {/* Header */}

//         <div className={styles.header}>
//           <span className={styles.eyebrow}>BOOK AN APPOINTMENT</span>

//           <h1 className={styles.title}>رزرو نوبت</h1>

//           <p className={styles.subtitle}>
//             آرایشگر، تاریخ، ساعت و سرویس مورد نظرتون رو انتخاب کنید.
//           </p>
//         </div>

//         {/* Error */}

//         {error && (
//           <div className={styles.errorBox}>
//             {error}

//             <button type="button" onClick={() => setError("")}>
//               ×
//             </button>
//           </div>
//         )}

//         {/* Step indicator */}

//         <div className={styles.steps}>
//           <div
//             className={`${styles.step} ${step >= 1 ? styles.stepActive : ""}`}
//           >
//             <span>۱</span>
//             <p>آرایشگر</p>
//           </div>

//           <div
//             className={`${styles.stepLine} ${
//               step >= 2 ? styles.stepLineActive : ""
//             }`}
//           />

//           <div
//             className={`${styles.step} ${step >= 2 ? styles.stepActive : ""}`}
//           >
//             <span>۲</span>
//             <p>تاریخ و ساعت</p>
//           </div>

//           <div
//             className={`${styles.stepLine} ${
//               step >= 3 ? styles.stepLineActive : ""
//             }`}
//           />

//           <div
//             className={`${styles.step} ${step >= 3 ? styles.stepActive : ""}`}
//           >
//             <span>۳</span>
//             <p>سرویس</p>
//           </div>
//         </div>

//         {/* =====================================================
//             STEP 1
//         ===================================================== */}

//         {step === 1 && (
//           <div className={styles.stepPanel}>
//             <div className={styles.sectionHeader}>
//               <span className={styles.sectionNumber}>۰۱</span>

//               <div>
//                 <p className={styles.sectionLabel}>آرایشگر رو انتخاب کنید</p>

//                 <span className={styles.sectionDescription}>
//                   متخصص مورد نظرتون رو انتخاب کنید.
//                 </span>
//               </div>
//             </div>

//             {loadingBarbers ? (
//               <div className={styles.loadingRow}>
//                 <span className={styles.spinner} />
//                 در حال دریافت آرایشگرها...
//               </div>
//             ) : barbers.length === 0 ? (
//               <div className={styles.emptyBox}>
//                 آرایشگری برای رزرو وجود ندارد.
//               </div>
//             ) : (
//               <div className={styles.barberRow}>
//                 {barbers.map((barber) => {
//                   const image = barber.image
//                     ? barber.image.startsWith("http")
//                       ? barber.image
//                       : `${MEDIA_URL}${barber.image}`
//                     : null;

//                   return (
//                     <button
//                       key={barber.id}
//                       type="button"
//                       className={`${styles.barberChip} ${
//                         selectedBarber?.id === barber.id
//                           ? styles.barberChipActive
//                           : ""
//                       }`}
//                       onClick={() => handlePickBarber(barber)}
//                     >
//                       <span className={styles.barberAvatar}>
//                         {image ? (
//                           <Image
//                             src={image}
//                             alt={barber.full_name || barber.name || "آرایشگر"}
//                             fill
//                             unoptimized
//                             className={styles.barberImg}
//                           />
//                         ) : (
//                           <span>
//                             {(barber.full_name || barber.name || "آ")[0]}
//                           </span>
//                         )}
//                       </span>

//                       <span>{barber.full_name || barber.name}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         )}

//         {/* =====================================================
//             STEP 2
//         ===================================================== */}

//         {step === 2 && (
//           <div className={styles.stepPanel}>
//             <button
//               type="button"
//               className={styles.backBtn}
//               onClick={() => setStep(1)}
//             >
//               بازگشت به انتخاب آرایشگر
//             </button>

//             {/* Selected barber */}

//             {selectedBarber && (
//               <div className={styles.selectedBarber}>
//                 <span>آرایشگر انتخاب‌شده:</span>

//                 <strong>
//                   {selectedBarber.full_name || selectedBarber.name}
//                 </strong>
//               </div>
//             )}

//             {/* Dates */}

//             <p className={styles.sectionLabel}>تاریخ رو انتخاب کنید</p>

//             {loadingDays ? (
//               <div className={styles.loadingRow}>
//                 <span className={styles.spinner} />
//                 در حال بررسی روزهای قابل رزرو...
//               </div>
//             ) : (
//               <div className={styles.daysRow}>
//                 {days.map((date) => {
//                   const jalaliDate = toJalaliDate(date);

//                   const backendDay = availableDays.find(
//                     (item) => item.date === jalaliDate,
//                   );

//                   const available = Boolean(backendDay);

//                   const active = sameDay(selectedDate, date);

//                   return (
//                     <button
//                       key={jalaliDate}
//                       type="button"
//                       disabled={!available}
//                       className={`${styles.dayChip} ${
//                         active ? styles.dayChipActive : ""
//                       } ${!available ? styles.dayChipDisabled : ""}`}
//                       onClick={() => handlePickDate(date)}
//                     >
//                       {formatDayLabel(date)}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Times */}

//             {selectedDate && (
//               <>
//                 <p className={styles.sectionLabel}>ساعت رو انتخاب کنید</p>

//                 {loadingSlots ? (
//                   <div className={styles.loadingRow}>
//                     <span className={styles.spinner} />
//                     در حال بررسی ساعت‌های خالی...
//                   </div>
//                 ) : slots.length === 0 ? (
//                   <div className={styles.emptyBox}>
//                     برای این روز ساعتی برای رزرو وجود ندارد.
//                   </div>
//                 ) : (
//                   <div className={styles.timesGrid}>
//                     {slots.map((slot) => (
//                       <button
//                         key={`${slot.time}-${slot.shiftId}`}
//                         type="button"
//                         disabled={!slot.available || !slot.shiftId}
//                         className={`${styles.timeSlot} ${
//                           selectedTime === slot.time
//                             ? styles.timeSlotActive
//                             : ""
//                         } ${!slot.available ? styles.timeSlotDisabled : ""}`}
//                         onClick={() => handlePickTime(slot)}
//                       >
//                         {slot.time}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}

//             <button
//               type="button"
//               className={styles.primaryBtn}
//               disabled={!selectedTime}
//               onClick={goToServiceStep}
//             >
//               ادامه و انتخاب سرویس
//             </button>
//           </div>
//         )}

//         {/* =====================================================
//             STEP 3
//         ===================================================== */}

//         {step === 3 && (
//           <div className={styles.stepPanel}>
//             <button
//               type="button"
//               className={styles.backBtn}
//               onClick={goBackOneStep}
//             >
//               بازگشت به تاریخ و ساعت
//             </button>

//             {/* Services */}

//             <div className={styles.serviceSection}>
//               <p className={styles.sectionLabel}>
//                 سرویس مورد نظرتون رو انتخاب کنید
//               </p>

//               {loadingServices ? (
//                 <div className={styles.loadingRow}>
//                   <span className={styles.spinner} />
//                   در حال دریافت سرویس‌ها...
//                 </div>
//               ) : services.length === 0 ? (
//                 <div className={styles.emptyBox}>
//                   سرویسی برای رزرو وجود ندارد.
//                 </div>
//               ) : (
//                 <div className={styles.serviceGrid}>
//                   {services.map((service) => (
//                     <button
//                       key={`service-${service.id}`}
//                       type="button"
//                       className={`${styles.serviceCard} ${
//                         selectedOffering?.type === "service" &&
//                         selectedOffering?.data?.id === service.id
//                           ? styles.serviceCardActive
//                           : ""
//                       }`}
//                       onClick={() => handlePickService(service)}
//                     >
//                       <div>
//                         <p className={styles.serviceTitle}>{service.title}</p>

//                         <p className={styles.serviceDuration}>
//                           {service.duration} دقیقه
//                         </p>
//                       </div>

//                       <span className={styles.servicePrice}>
//                         {formatPrice(service.price)}

//                         <span> تومان</span>
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Packages */}

//             {packages.length > 0 && (
//               <div className={styles.serviceSection}>
//                 <p className={styles.sectionLabel}>
//                   یا یکی از پکیج‌ها رو انتخاب کنید
//                 </p>

//                 <div className={styles.serviceGrid}>
//                   {packages.map((pkg) => (
//                     <button
//                       key={`package-${pkg.id}`}
//                       type="button"
//                       className={`${styles.serviceCard} ${
//                         selectedOffering?.type === "package" &&
//                         selectedOffering?.data?.id === pkg.id
//                           ? styles.serviceCardActive
//                           : ""
//                       }`}
//                       onClick={() => handlePickPackage(pkg)}
//                     >
//                       <div>
//                         <p className={styles.serviceTitle}>{pkg.title}</p>

//                         <p className={styles.serviceDuration}>
//                           {pkg.duration ? `${pkg.duration} دقیقه` : "پکیج ویژه"}
//                         </p>
//                       </div>

//                       <span className={styles.servicePrice}>
//                         {formatPrice(pkg.price)}

//                         <span> تومان</span>
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Summary */}

//             {selectedOffering && (
//               <div className={styles.summaryCard}>
//                 <h3>خلاصه این رزرو</h3>

//                 <ul>
//                   <li>
//                     <span>آرایشگر</span>

//                     <span>
//                       {selectedBarber?.full_name || selectedBarber?.name}
//                     </span>
//                   </li>

//                   <li>
//                     <span>تاریخ</span>

//                     <span>{formatDayLabel(selectedDate)}</span>
//                   </li>

//                   <li>
//                     <span>ساعت</span>

//                     <span>{selectedTime}</span>
//                   </li>

//                   <li>
//                     <span>
//                       {selectedOffering.type === "package" ? "پکیج" : "سرویس"}
//                     </span>

//                     <span>
//                       {selectedOffering.data?.title ||
//                         selectedOffering.data?.name}
//                     </span>
//                   </li>

//                   <li className={styles.summaryTotal}>
//                     <span>مبلغ این نوبت</span>

//                     <span>
//                       {formatPrice(selectedOffering.data?.price)} تومان
//                     </span>
//                   </li>
//                 </ul>

//                 <div className={styles.summaryActions}>
//                   <button
//                     type="button"
//                     className={styles.ghostBtn}
//                     onClick={clearCurrentSelection}
//                   >
//                     پاک کردن این انتخاب
//                   </button>

//                   <button
//                     type="button"
//                     className={styles.primaryBtn}
//                     onClick={addCurrentToCartAndStartNew}
//                   >
//                     افزودن به سبد رزرو
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* =====================================================
//             Reservation Cart
//         ===================================================== */}

//         {reservations.length > 0 && (
//           <div className={styles.cartSection}>
//             <div className={styles.cartHeader}>
//               <div>
//                 <p className={styles.sectionLabel}>رزروهای شما</p>

//                 <span>{reservations.length} نوبت</span>
//               </div>

//               <button
//                 type="button"
//                 className={styles.clearCartBtn}
//                 onClick={clearAllReservations}
//               >
//                 پاک کردن همه
//               </button>
//             </div>

//             <div className={styles.cartList}>
//               {reservations.map((reservation) => (
//                 <div key={reservation.id} className={styles.cartItem}>
//                   <div>
//                     <strong>{reservation.title}</strong>

//                     <span>{reservation.barberName}</span>

//                     <span>
//                       {reservation.dateLabel} · {reservation.time}
//                     </span>
//                   </div>

//                   <div>
//                     <strong>{formatPrice(reservation.price)} تومان</strong>

//                     <div>
//                       <button
//                         type="button"
//                         onClick={() => editReservation(reservation)}
//                       >
//                         ویرایش
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => removeReservation(reservation.id)}
//                       >
//                         حذف
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className={styles.cartFooter}>
//               <div>
//                 <span>مبلغ کل</span>

//                 <strong>{formatPrice(totalCartPrice)} تومان</strong>
//               </div>

//               <button
//                 type="button"
//                 className={styles.primaryBtn}
//                 disabled={submittingAll}
//                 onClick={handleSubmitAll}
//               >
//                 {submittingAll ? "در حال ثبت رزرو..." : "ثبت نهایی رزروها"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
