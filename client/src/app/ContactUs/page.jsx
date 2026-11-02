// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import styles from "@/app/ContactUs/page.module.css";

// // ==================== دیتای تماس ====================
// // این اطلاعات رو با اطلاعات واقعی آرایشگاه‌ خودت جایگزین کن.
// const CONTACT_INFO = {
//   phone: "۰۲۱ - ۸۸۸۸ ۵۵۵۵",
//   whatsapp: "۰۹۱۲ ۰۰۰ ۰۰۰۰",
//   email: "info@velvetbarber.com",
//   address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
//   heroImage: "/image-content/contact-hero.jpg",
// };

// // ساعات کاری هر روز هفته؛ برای وضعیت «باز/بسته» هم از همین استفاده می‌شه.
// const WEEK_HOURS = [
//   { day: "شنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
//   { day: "یکشنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
//   { day: "دوشنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
//   { day: "سه‌شنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
//   { day: "چهارشنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
//   { day: "پنج‌شنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
//   { day: "جمعه", hours: "تعطیل", open: false },
// ];

// // آیکون‌های ساده (بدون وابستگی بیرونی)
// const IconPin = (p) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
//     <path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22z" />
//     <circle cx="12" cy="9.5" r="2.4" />
//   </svg>
// );
// const IconPhone = (p) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" {...p}>
//     <path d="M3 5c0 9 7 16 16 16l3-4-6-3-2 2c-3-1.5-5.5-4-7-7l2-2-3-6-3 4z" />
//   </svg>
// );
// const IconWhatsapp = (p) => (
//   <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 012.166 12C2.167 6.55 6.6 2.116 12.053 2.116c2.64 0 5.122 1.03 6.988 2.898A9.825 9.825 0 0121.934 12c-.003 5.45-4.437 9.884-9.885 9.884" />
//   </svg>
// );
// const IconMail = (p) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
//     <rect x="2" y="5" width="20" height="14" rx="2" />
//     <path d="M3 6l9 7 9-7" />
//   </svg>
// );
// const IconClock = (p) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
//     <circle cx="12" cy="12" r="9" />
//     <path d="M12 7v5l3.5 2" strokeLinecap="round" />
//   </svg>
// );

// // روزهای هفته به ترتیب مقدار بازگشتی Date.getDay() در جاوااسکریپت
// // (۰=یکشنبه ... ۶=شنبه)، برای پیدا کردن اینکه امروز کدوم ردیف از WEEK_HOURS است.
// const JS_DAY_TO_LABEL = [
//   "یکشنبه",
//   "دوشنبه",
//   "سه‌شنبه",
//   "چهارشنبه",
//   "پنج‌شنبه",
//   "جمعه",
//   "شنبه",
// ];

// export default function ContactUs() {
//   // وضعیت باز/بسته بودن رو فقط بعد از mount شدن تو کلاینت محاسبه می‌کنیم
//   // تا مشکل عدم تطابق بین رندر سرور و کلاینت (hydration) پیش نیاد.
//   const [status, setStatus] = useState(null);

//   useEffect(() => {
//     const now = new Date();
//     const todayLabel = JS_DAY_TO_LABEL[now.getDay()];
//     const today = WEEK_HOURS.find((d) => d.day === todayLabel);
//     const hourFraction = now.getHours() + now.getMinutes() / 60;
//     const isOpen = Boolean(today?.open) && hourFraction >= 9 && hourFraction < 21;
//     setStatus({ todayLabel, isOpen });
//   }, []);

//   const infoItems = [
//     { key: "address", label: "آدرس سالن", value: CONTACT_INFO.address, Icon: IconPin },
//     { key: "phone", label: "تلفن ثابت", value: CONTACT_INFO.phone, Icon: IconPhone, href: `tel:${CONTACT_INFO.phone}` },
//     { key: "whatsapp", label: "واتساپ", value: CONTACT_INFO.whatsapp, Icon: IconWhatsapp, href: "https://wa.me/989120000000" },
//     { key: "email", label: "ایمیل", value: CONTACT_INFO.email, Icon: IconMail, href: `mailto:${CONTACT_INFO.email}` },
//   ];

//   // ارسال فرم تماس (فعلاً فقط UI؛ جای اتصال به بک‌اند واقعی رو با TODO مشخص کردم)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: اینجا باید درخواست واقعی به بک‌اند برای ثبت پیام زده بشه، مثلاً:
//     // await fetch("/api/contact", { method: "POST", body: new FormData(e.target) });
//     alert("پیام شما ثبت شد (نسخه نمایشی — هنوز به بک‌اند وصل نیست).");
//   };

//   const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//     CONTACT_INFO.address
//   )}`;

//   return (
//     <section dir="rtl" className={styles.page}>
//       {/* ==================== هیرو ==================== */}
//       <div className={styles.hero}>
//         <Image
//           src={CONTACT_INFO.heroImage}
//           alt="فضای داخلی آرایشگاه"
//           fill
//           priority
//           className={styles.heroImage}
//         />
//         <div className={styles.heroOverlay} />

//         <div className={styles.heroContent}>
//           <span className={styles.eyebrow}>CONTACT</span>
//           <h1 className={styles.heroTitle}>
//             <span className={styles.heroTitleLight}>همیشه یک صندلی</span>
//             <span className={styles.heroTitleBold}>برای شما آماده‌ست</span>
//           </h1>
//           <p className={styles.heroDesc}>
//             سوالی دارید یا می‌خواید نوبت بگیرید؟ فرم پایین رو پر کنید یا
//             مستقیم تماس بگیرید — تیم ولوت بار همیشه پاسخگوعه.
//           </p>

//           {status && (
//             <div className={styles.statusBadge}>
//               <span
//                 className={`${styles.statusDot} ${
//                   status.isOpen ? styles.statusDotOpen : styles.statusDotClosed
//                 }`}
//               />
//               <span>
//                 {status.isOpen ? "هم‌اکنون باز است" : "در حال حاضر بسته است"}
//                 {" · "}
//                 امروز {status.todayLabel}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className={styles.container}>
//         {/* ==================== فرم + اطلاعات تماس ==================== */}
//         <div className={styles.grid}>
//           {/* فرم تماس */}
//           <form className={styles.formCard} onSubmit={handleSubmit}>
//             <h2 className={styles.formTitle}>برای ما پیام بگذارید</h2>
//             <p className={styles.formSubtitle}>
//               در کمتر از یک روز کاری پاسخ می‌دیم.
//             </p>

//             <div className={styles.formRow}>
//               <div className={styles.field}>
//                 <label htmlFor="name">نام و نام‌خانوادگی</label>
//                 <input id="name" name="name" type="text" placeholder="مثلاً: علی محمدی" required />
//               </div>
//               <div className={styles.field}>
//                 <label htmlFor="phone">شماره تماس</label>
//                 <input id="phone" name="phone" type="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" required />
//               </div>
//             </div>

//             <div className={styles.field}>
//               <label htmlFor="service">موضوع پیام</label>
//               <select id="service" name="service" defaultValue="">
//                 <option value="" disabled>
//                   انتخاب کنید
//                 </option>
//                 <option value="reservation">هماهنگی برای رزرو نوبت</option>
//                 <option value="vip">پکیج VIP و مناسبت‌ها</option>
//                 <option value="complaint">انتقاد یا پیشنهاد</option>
//                 <option value="other">سایر موارد</option>
//               </select>
//             </div>

//             <div className={styles.field}>
//               <label htmlFor="message">پیام شما</label>
//               <textarea id="message" name="message" rows={4} placeholder="پیامتون رو اینجا بنویسید..." required />
//             </div>

//             <button type="submit" className={styles.submitBtn}>
//               ارسال پیام
//             </button>
//           </form>

//           {/* اطلاعات تماس + ساعات کاری */}
//           <div className={styles.sideCol}>
//             <div className={styles.infoList}>
//               {infoItems.map(({ key, label, value, Icon, href }) => {
//                 const Wrapper = href ? "a" : "div";
//                 return (
//                   <Wrapper
//                     key={key}
//                     className={styles.infoRow}
//                     {...(href
//                       ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" }
//                       : {})}
//                   >
//                     <span className={styles.infoIcon}>
//                       <Icon width={19} height={19} />
//                     </span>
//                     <span className={styles.infoText}>
//                       <span className={styles.infoLabel}>{label}</span>
//                       <span className={styles.infoValue}>{value}</span>
//                     </span>
//                   </Wrapper>
//                 );
//               })}
//             </div>

//             <div className={styles.hoursCard}>
//               <h3 className={styles.hoursTitle}>
//                 <IconClock width={17} height={17} />
//                 <span>ساعات کاری</span>
//               </h3>
//               <ul className={styles.hoursList}>
//                 {WEEK_HOURS.map((d) => (
//                   <li
//                     key={d.day}
//                     className={`${styles.hoursRow} ${
//                       status?.todayLabel === d.day ? styles.hoursRowToday : ""
//                     }`}
//                   >
//                     <span>{d.day}</span>
//                     <span className={d.open ? "" : styles.hoursClosed}>
//                       {d.hours}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* ==================== نقشه ==================== */}
//         <div className={styles.mapCard}>
//           <div className={styles.mapInfo}>
//             <span className={styles.mapEyebrow}>مسیر رسیدن</span>
//             <h3 className={styles.mapTitle}>{CONTACT_INFO.address}</h3>
//             <a
//               href={mapsHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={styles.mapLink}
//             >
//               مسیریابی در گوگل‌مپ
//               <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M4 10h12M11 5l5 5-5 5" />
//               </svg>
//             </a>
//           </div>
//           <div className={styles.mapVisual}>
//             <span className={styles.mapPin}>
//               <IconPin width={26} height={26} />
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/app/ContactUs/page.module.css";
import { api } from "@/app/config";
import { useAuth } from "@/app/Context/Context";
import NeshanMap from "@/app/ContactUs/NeshanMap/NeshanMap";

// ==================== دیتای تماس ====================
// این اطلاعات رو با اطلاعات واقعی آرایشگاه‌ خودت جایگزین کن.
const CONTACT_INFO = {
  phone: "۰۲۱ - ۸۸۸۸ ۵۵۵۵",
  whatsapp: "۰۹۱۲ ۰۰۰ ۰۰۰۰",
  email: "info@velvetbarber.com",
  address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
  heroImage: "/image-content/contact-hero.jpg",
};

// ساعات کاری هر روز هفته؛ برای وضعیت «باز/بسته» هم از همین استفاده می‌شه.
const WEEK_HOURS = [
  { day: "شنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
  { day: "یکشنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
  { day: "دوشنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
  { day: "سه‌شنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
  { day: "چهارشنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
  { day: "پنج‌شنبه", hours: "۹:۰۰ - ۲۱:۰۰", open: true },
  { day: "جمعه", hours: "تعطیل", open: false },
];

// آیکون‌های ساده (بدون وابستگی بیرونی)
const IconPin = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    {...p}
  >
    <path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22z" />
    <circle cx="12" cy="9.5" r="2.4" />
  </svg>
);

const IconPhone = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinejoin="round"
    {...p}
  >
    <path d="M3 5c0 9 7 16 16 16l3-4-6-3-2 2c-3-1.5-5.5-4-7-7l2-2-3-6-3 4z" />
  </svg>
);

const IconWhatsapp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 012.166 12C2.167 6.55 6.6 2.116 12.053 2.116c2.64 0 5.122 1.03 6.988 2.898A9.825 9.825 0 0121.934 12c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const IconMail = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    {...p}
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M3 6l9 7 9-7" />
  </svg>
);

const IconClock = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    {...p}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" strokeLinecap="round" />
  </svg>
);

// روزهای هفته به ترتیب مقدار بازگشتی Date.getDay() در جاوااسکریپت
// (۰=یکشنبه ... ۶=شنبه)، برای پیدا کردن اینکه امروز کدوم ردیف از WEEK_HOURS است.
const JS_DAY_TO_LABEL = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];

export default function ContactUs() {
  const { setNotif } = useAuth();

  // وضعیت باز/بسته بودن رو فقط بعد از mount شدن تو کلاینت محاسبه می‌کنیم
  // تا مشکل عدم تطابق بین رندر سرور و کلاینت (hydration) پیش نیاد.
  const [status, setStatus] = useState(null);

  // وضعیت ارسال فرم
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const now = new Date();
    const todayLabel = JS_DAY_TO_LABEL[now.getDay()];
    const today = WEEK_HOURS.find((d) => d.day === todayLabel);
    const hourFraction = now.getHours() + now.getMinutes() / 60;
    const isOpen =
      Boolean(today?.open) && hourFraction >= 9 && hourFraction < 21;

    setStatus({ todayLabel, isOpen });
  }, []);

  const infoItems = [
    {
      key: "address",
      label: "آدرس سالن",
      value: CONTACT_INFO.address,
      Icon: IconPin,
    },
    {
      key: "phone",
      label: "تلفن ثابت",
      value: CONTACT_INFO.phone,
      Icon: IconPhone,
      href: `tel:${CONTACT_INFO.phone}`,
    },
    {
      key: "whatsapp",
      label: "واتساپ",
      value: CONTACT_INFO.whatsapp,
      Icon: IconWhatsapp,
      href: "https://wa.me/989120000000",
    },
    {
      key: "email",
      label: "ایمیل",
      value: CONTACT_INFO.email,
      Icon: IconMail,
      href: `mailto:${CONTACT_INFO.email}`,
    },
  ];

  // ============================================================
  // ارسال فرم تماس به بک‌اند
  // POST /api/v1/contact/
  // ============================================================
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (submitting) return;

  const form = e.currentTarget;

  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const subject = form.elements.subject.value;
  const message = form.elements.message.value.trim();

  const phoneRegex = /^09\d{9}$/;

  if (!name) {
    setNotif({
      id: Date.now(),
      message: "لطفاً نام و نام‌خانوادگی را وارد کنید",
      type: "error",
    });
    return;
  }

  if (!phoneRegex.test(phone)) {
    setNotif({
      id: Date.now(),
      message: "شماره تماس معتبر نمی باشد",
      type: "error",
    });
    return;
  }

  if (!subject) {
    setNotif({
      id: Date.now(),
      message: "لطفاً موضوع پیام را انتخاب کنید",
      type: "error",
    });
    return;
  }

  if (!message) {
    setNotif({
      id: Date.now(),
      message: "لطفاً متن پیام را وارد کنید",
      type: "error",
    });
    return;
  }

  try {
    setSubmitting(true);

    await api.post("/api/v1/contact/", {
      name,
      phone,
      subject,
      message,
    });

    setNotif({
      id: Date.now(),
      message: "پیام شما با موفقیت ارسال شد",
      type: "success",
    });

    form.reset();
  } catch (error) {
    console.error("Contact form error:", error);

    const backendMessage =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      error?.response?.data?.error;

    setNotif({
      id: Date.now(),
      message:
        backendMessage || "ارسال پیام انجام نشد، لطفاً دوباره تلاش کنید",
      type: "error",
    });
  } finally {
    setSubmitting(false);
  }
};

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    CONTACT_INFO.address,
  )}`;

  return (
    <section dir="rtl" className={styles.page}>
      {/* ==================== هیرو ==================== */}
      <div className={styles.hero}>
        <Image
          src={CONTACT_INFO.heroImage}
          alt="فضای داخلی آرایشگاه"
          fill
          priority
          className={styles.heroImage}
        />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>CONTACT</span>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLight}>همیشه یک صندلی</span>

            <span className={styles.heroTitleBold}>برای شما آماده‌ست</span>
          </h1>

          <p className={styles.heroDesc}>
            سوالی دارید یا می‌خواید نوبت بگیرید؟ فرم پایین رو پر کنید یا مستقیم
            تماس بگیرید — تیم ولوت بار همیشه پاسخگوعه.
          </p>

          {status && (
            <div className={styles.statusBadge}>
              <span
                className={`${styles.statusDot} ${
                  status.isOpen ? styles.statusDotOpen : styles.statusDotClosed
                }`}
              />

              <span>
                {status.isOpen ? "هم‌اکنون باز است" : "در حال حاضر بسته است"}
                {" · "}
                امروز {status.todayLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.container}>
        {/* ==================== فرم + اطلاعات تماس ==================== */}
        <div className={styles.grid}>
          {/* فرم تماس */}
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <h2 className={styles.formTitle}>برای ما پیام بگذارید</h2>

            <p className={styles.formSubtitle}>
              در کمتر از یک روز کاری پاسخ می‌دیم.
            </p>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="name">نام و نام‌خانوادگی</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="مثلاً: علی محمدی"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone">شماره تماس</label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="subject">موضوع پیام</label>

              <select id="subject" name="subject" defaultValue="">
                <option value="" disabled>
                  انتخاب کنید
                </option>

                <option value="reservation">هماهنگی برای رزرو نوبت</option>

                <option value="vip">پکیج VIP و مناسبت‌ها</option>

                <option value="complaint">انتقاد یا پیشنهاد</option>

                <option value="other">سایر موارد</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="message">پیام شما</label>

              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="پیامتون رو اینجا بنویسید..."
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={submitting}
            >
              {submitting ? "در حال ارسال..." : "ارسال پیام"}
            </button>
          </form>

          {/* اطلاعات تماس + ساعات کاری */}
          <div className={styles.sideCol}>
            <div className={styles.infoList}>
              {infoItems.map(({ key, label, value, Icon, href }) => {
                const Wrapper = href ? "a" : "div";

                return (
                  <Wrapper
                    key={key}
                    className={styles.infoRow}
                    {...(href
                      ? {
                          href,
                          target: href.startsWith("http")
                            ? "_blank"
                            : undefined,
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    <span className={styles.infoIcon}>
                      <Icon width={19} height={19} />
                    </span>

                    <span className={styles.infoText}>
                      <span className={styles.infoLabel}>{label}</span>

                      <span className={styles.infoValue}>{value}</span>
                    </span>
                  </Wrapper>
                );
              })}
            </div>

            <div className={styles.hoursCard}>
              <h3 className={styles.hoursTitle}>
                <IconClock width={17} height={17} />
                <span>ساعات کاری</span>
              </h3>

              <ul className={styles.hoursList}>
                {WEEK_HOURS.map((d) => (
                  <li
                    key={d.day}
                    className={`${styles.hoursRow} ${
                      status?.todayLabel === d.day ? styles.hoursRowToday : ""
                    }`}
                  >
                    <span>{d.day}</span>

                    <span className={d.open ? "" : styles.hoursClosed}>
                      {d.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ==================== نقشه ==================== */}
        <div className={styles.mapCard}>
          <div className={styles.mapInfo}>
            <span className={styles.mapEyebrow}>مسیر رسیدن</span>

            <h3 className={styles.mapTitle}>{CONTACT_INFO.address}</h3>

            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              مسیریابی در گوگل‌مپ
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </a>
          </div>

          <div className={styles.mapVisual}>
            <NeshanMap />
          </div>
        </div>
      </div>
    </section>
  );
}
