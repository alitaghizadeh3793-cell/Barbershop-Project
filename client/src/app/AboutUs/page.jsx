// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { barbers } from "@/app/Barber/BarberData";
// import styles from "./page.module.css";

// // ==================== دیتای صفحه ====================
// const STUDIO = {
//   heroImage: "/image-dashboard/photo-1503951914875-452162b0f3f1.avif",
//   storyImage: "/image-content/about-story.jpg",
//   stats: [
//     { value: "۸+", label: "سال تجربه" },
//     { value: "۵۰۰۰+", label: "مشتری راضی" },
//     { value: "۶۰۰+", label: "نوبت در ماه" },
//     { value: "۹۸٪", label: "رضایت مشتریان" },
//   ],
//   values: [
//     {
//       title: "دقت",
//       desc: "هر خط تیغ و هر قیچی حساب‌شده‌ست؛ برای ما جزئیات همون چیزیه که یه اصلاح معمولی رو تبدیل به یه تجربه می‌کنه.",
//     },
//     {
//       title: "میهمان‌نوازی",
//       desc: "از لحظه‌ای که میاید تو، تا لحظه‌ای که با یه چای می‌شینید، حس یه مهمون خونگی رو بهتون می‌دیم، نه یه مشتری.",
//     },
//     {
//       title: "اصالت",
//       desc: "تکنیک‌های سنتی اصلاح رو با ابزار و استانداردهای مدرن ترکیب می‌کنیم؛ نه فقط ترند، بلکه ریشه.",
//     },
//   ],
//   journey: [
//     {
//       no: "۰۱",
//       title: "رزرو آسان",
//       desc: "چند ثانیه‌ای از اپ یا سایت نوبتتون رو انتخاب کنید، بدون تماس و بدون معطلی.",
//     },
//     {
//       no: "۰۲",
//       title: "مشاوره کوتاه",
//       desc: "قبل از شروع، آرایشگر شما چند دقیقه درباره سبک و نیازتون صحبت می‌کنه.",
//     },
//     {
//       no: "۰۳",
//       title: "اجرای دقیق",
//       desc: "با ابزار حرفه‌ای و دستی مطمئن، خدمتی که انتخاب کردید رو با آرامش انجام می‌دیم.",
//     },
//     {
//       no: "۰۴",
//       title: "مراقبت بعد از اصلاح",
//       desc: "راهنمایی نگهداری از استایل جدید، همراه با پیشنهاد محصولات مناسب پوست و موی شما.",
//     },
//   ],
// };

// // آیکون‌های بخش ارزش‌ها (بدون وابستگی بیرونی)
// const ValueIcon = ({ type, ...p }) => {
//   if (type === "precision")
//     return (
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.7"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         {...p}
//       >
//         <circle cx="6" cy="6" r="3" />
//         <circle cx="6" cy="18" r="3" />
//         <line x1="20" y1="4" x2="8.12" y2="15.88" />
//         <line x1="14.47" y1="14.48" x2="20" y2="20" />
//         <line x1="8.12" y1="8.12" x2="12" y2="12" />
//       </svg>
//     );
//   if (type === "hospitality")
//     return (
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.7"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         {...p}
//       >
//         <path d="M18 8h1a4 4 0 010 8h-1" />
//         <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
//         <line x1="6" y1="1" x2="6" y2="4" />
//         <line x1="10" y1="1" x2="10" y2="4" />
//         <line x1="14" y1="1" x2="14" y2="4" />
//       </svg>
//     );
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.7"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       {...p}
//     >
//       <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" />
//     </svg>
//   );
// };

// // هوک کوچیک برای فید ورود موقع اسکرول، قابل استفاده رو چند سکشن
// function useReveal() {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.15 },
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);
//   return [ref, visible];
// }

// function JoinUsModal({ open, onClose }) {
//   useEffect(() => {
//     if (!open) return;
//     document.body.style.overflow = "hidden";
//     const onKey = (e) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", onKey);
//     return () => {
//       document.body.style.overflow = "";
//       document.removeEventListener("keydown", onKey);
//     };
//   }, [open, onClose]);

//   if (!open) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: اتصال به بک‌اند برای ثبت درخواست همکاری، مثلاً:
//     // await fetch("/api/careers", { method: "POST", body: new FormData(e.target) });
//     alert("درخواست شما ثبت شد (نسخه نمایشی).");
//     onClose();
//   };

//   return (
//     <div className={styles.modalOverlay} onClick={onClose}>
//       <div
//         className={styles.modalCard}
//         onClick={(e) => e.stopPropagation()}
//         role="dialog"
//         aria-modal="true"
//       >
//         <button
//           type="button"
//           className={styles.modalClose}
//           onClick={onClose}
//           aria-label="بستن"
//         >
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 20 20"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//           >
//             <path d="M5 5 L15 15 M15 5 L5 15" />
//           </svg>
//         </button>
//         <h3 className={styles.modalTitle}>به تیم ولوت بار بپیوندید</h3>
//         <p className={styles.modalDesc}>
//           اگه آرایشگر حرفه‌ای هستید یا می‌خواید عضو تیم پذیرش ما بشید، فرم زیر
//           رو پر کنید.
//         </p>
//         <form onSubmit={handleSubmit} className={styles.modalForm}>
//           <input
//             name="name"
//             type="text"
//             placeholder="نام و نام‌خانوادگی"
//             required
//           />
//           <input name="phone" type="tel" placeholder="شماره تماس" required />
//           <select name="position" defaultValue="">
//             <option value="" disabled>
//               موقعیت مورد نظر
//             </option>
//             <option value="barber">آرایشگر</option>
//             <option value="reception">پذیرش و رزرو</option>
//             <option value="other">سایر</option>
//           </select>
//           <textarea
//             name="message"
//             rows={3}
//             placeholder="کمی درباره تجربه خودتون بنویسید..."
//           />
//           <button type="submit" className={styles.modalSubmit}>
//             ارسال درخواست
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default function AboutUs() {
//   const [showJoinModal, setShowJoinModal] = useState(false);

//   const [storyRef, storyVisible] = useReveal();
//   const [journeyRef, journeyVisible] = useReveal();
//   const [teamRef, teamVisible] = useReveal();

//   return (
//     <section dir="rtl" className={styles.page}>
//       {/* ==================== هیرو ==================== */}
//       <div className={styles.hero}>
//         <Image
//           src={STUDIO.heroImage}
//           alt="داخل آرایشگاه ولوت بار"
//           fill
//           priority
//           className={styles.heroImage}
//         />
//         <div className={styles.heroOverlay} />
//         <div className={styles.heroContent}>
//           <span className={styles.eyebrow}>ABOUT US</span>
//           <h1 className={styles.heroTitle}>
//             جایی که هر{" "}
//             <span className={styles.heroTitleBold}>اصلاح یک مراسمه</span>
//           </h1>
//           <p className={styles.heroDesc}>
//             بیش از ۸ سال است که با دقت، صبوری و احترام به سلیقه هر مشتری،
//             ظاهرتون رو می‌سازیم؛ نه فقط کوتاه می‌کنیم.
//           </p>
//         </div>
//       </div>

//       {/* ==================== داستان + آمار ==================== */}
//       <div
//         ref={storyRef}
//         className={`${styles.storySection} ${storyVisible ? styles.revealed : ""}`}
//       >
//         <div className={styles.dotBg} />
//         <div className={styles.storyGrid}>
//           <div className={styles.storyText}>
//             <span className={styles.eyebrowDark}>OUR STORY</span>
//             <h2 className={styles.storyTitle}>
//               از یه صندلی کوچیک، به یه <span>خانواده</span> رسیدیم
//             </h2>
//             <p className={styles.storyDesc}>
//               ولوت بار با یه صندلی و یه رویا شروع شد: اصلاحی که فقط ظاهر رو عوض
//               نکنه، حس خوب هم بده. امروز تیمی از آرایشگرهای متخصص، فضایی گرم و
//               استانداردهایی که هیچ‌وقت باهاش شوخی نمی‌کنیم، همون رویا رو هر روز
//               برای صدها مشتری زنده می‌کنیم.
//             </p>

//             <div className={styles.statsGrid}>
//               {STUDIO.stats.map((s) => (
//                 <div key={s.label} className={styles.statCard}>
//                   <p className={styles.statValue}>{s.value}</p>
//                   <p className={styles.statLabel}>{s.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className={styles.storyImageWrap}>
//             <Image
//               src={STUDIO.storyImage}
//               alt="فضای کار ولوت بار"
//               fill
//               className={styles.storyImage}
//             />
//             <div className={styles.storyImageOverlay} />
//             <div className={styles.storyImageCaption}>
//               <p>سالن اصلی ولوت بار</p>
//               <span>تهران ۱۴۰۴</span>
//             </div>
//           </div>
//         </div>

//         {/* ---------- ارزش‌های ما ---------- */}
//         <div className={styles.valuesGrid}>
//           <div className={styles.valueCard}>
//             <span className={styles.valueIcon}>
//               <ValueIcon type="precision" width={22} height={22} />
//             </span>
//             <h4>{STUDIO.values[0].title}</h4>
//             <p>{STUDIO.values[0].desc}</p>
//           </div>
//           <div className={styles.valueCard}>
//             <span className={styles.valueIcon}>
//               <ValueIcon type="hospitality" width={22} height={22} />
//             </span>
//             <h4>{STUDIO.values[1].title}</h4>
//             <p>{STUDIO.values[1].desc}</p>
//           </div>
//           <div className={styles.valueCard}>
//             <span className={styles.valueIcon}>
//               <ValueIcon type="authenticity" width={22} height={22} />
//             </span>
//             <h4>{STUDIO.values[2].title}</h4>
//             <p>{STUDIO.values[2].desc}</p>
//           </div>
//         </div>
//       </div>

//       {/* ==================== مسیر مشتری (بخش روشن) ==================== */}
//       <div
//         ref={journeyRef}
//         className={`${styles.journeySection} ${journeyVisible ? styles.revealed : ""}`}
//       >
//         <div className={styles.journeyHeader}>
//           <div>
//             <span className={styles.eyebrowLight}>OUR JOURNEY</span>
//             <h3 className={styles.journeyTitle}>
//               از رزرو تا <span>لبخند آخر کار</span>
//             </h3>
//           </div>
//           <p className={styles.journeySubtitle}>
//             یه مسیر ساده و شفاف، طراحی شده تا دقیقاً بدونید تو هر نوبت چه اتفاقی
//             می‌افته.
//           </p>
//         </div>

//         <div className={styles.journeyGrid}>
//           {STUDIO.journey.map((step) => (
//             <div key={step.no} className={styles.journeyStep}>
//               <span className={styles.journeyNo}>{step.no}</span>
//               <div className={styles.journeyLine} />
//               <h4>{step.title}</h4>
//               <p>{step.desc}</p>
//             </div>
//           ))}
//         </div>

//         {/* ---------- تیم ما ---------- */}
//         <div
//           ref={teamRef}
//           className={`${styles.teamSection} ${teamVisible ? styles.revealed : ""}`}
//         >
//           <span className={styles.eyebrowLight}>OUR TEAM</span>
//           <h3 className={styles.journeyTitle}>
//             آدم‌های پشت <span>هر اصلاح</span>
//           </h3>

//           <div className={styles.teamGrid}>
//             {barbers.map((member) => (
//               <Link
//                 href={`/Barber/${member.id}`}
//                 key={member.id}
//                 className={styles.teamCard}
//               >
//                 <div className={styles.teamImageWrapper}>
//                   <Image
//                     src={member.image}
//                     alt={member.name}
//                     fill
//                     className={styles.teamImage}
//                   />
//                 </div>
//                 <div className={styles.teamOverlay} />

//                 {/* دکمه اطلاعات بیشتر */}
//                 <div className={styles.teamMoreBtn}>
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M5 12h14" />
//                     <path d="M12 5l7 7-7 7" />
//                   </svg>
//                   اطلاعات بیشتر
//                 </div>

//                 <div className={styles.teamInfo}>
//                   <p className={styles.teamName}>{member.name}</p>
//                   <p className={styles.teamRole}>{member.role}</p>
//                 </div>
//               </Link>
//             ))}

//             <button
//               type="button"
//               className={styles.joinCard}
//               onClick={() => setShowJoinModal(true)}
//             >
//               <span className={styles.joinGlow} />
//               <span className={styles.joinPlus}>
//                 <svg
//                   viewBox="0 0 24 24"
//                   width="22"
//                   height="22"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.8"
//                   strokeLinecap="round"
//                 >
//                   <path d="M12 5v14M5 12h14" />
//                 </svg>
//               </span>
//               <p className={styles.joinTitle}>
//                 نفر بعدی <span>شما</span> باشید
//               </p>
//               <p className={styles.joinDesc}>به تیم ولوت بار بپیوندید</p>
//             </button>
//           </div>
//         </div>
//       </div>

//       <JoinUsModal
//         open={showJoinModal}
//         onClose={() => setShowJoinModal(false)}
//       />
//     </section>
//   );
// }





"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  getBarbers,
  getMediaUrl,
} from "@/app/Barber/BarberData";

import { api } from "@/app/config";
import styles from "./page.module.css";

// ==================== دیتای ثابت خود صفحه ====================

const STUDIO = {
  heroImage: "/image-dashboard/photo-1503951914875-452162b0f3f1.avif",
  storyImage: "/image-content/about-story.jpg",

  stats: [
    { value: "۸+", label: "سال تجربه" },
    { value: "۵۰۰۰+", label: "مشتری راضی" },
    { value: "۶۰۰+", label: "نوبت در ماه" },
    { value: "۹۸٪", label: "رضایت مشتریان" },
  ],

  values: [
    {
      title: "دقت",
      desc: "هر خط تیغ و هر قیچی حساب‌شده‌ست؛ برای ما جزئیات همون چیزیه که یه اصلاح معمولی رو تبدیل به یه تجربه می‌کنه.",
    },
    {
      title: "میهمان‌نوازی",
      desc: "از لحظه‌ای که میاید تو، تا لحظه‌ای که با یه چای می‌شینید، حس یه مهمون خونگی رو بهتون می‌دیم، نه یه مشتری.",
    },
    {
      title: "اصالت",
      desc: "تکنیک‌های سنتی اصلاح رو با ابزار و استانداردهای مدرن ترکیب می‌کنیم؛ نه فقط ترند، بلکه ریشه.",
    },
  ],

  journey: [
    {
      no: "۰۱",
      title: "رزرو آسان",
      desc: "چند ثانیه‌ای از اپ یا سایت نوبتتون رو انتخاب کنید، بدون تماس و بدون معطلی.",
    },
    {
      no: "۰۲",
      title: "مشاوره کوتاه",
      desc: "قبل از شروع، آرایشگر شما چند دقیقه درباره سبک و نیازتون صحبت می‌کنه.",
    },
    {
      no: "۰۳",
      title: "اجرای دقیق",
      desc: "با ابزار حرفه‌ای و دستی مطمئن، خدمتی که انتخاب کردید رو با آرامش انجام می‌دیم.",
    },
    {
      no: "۰۴",
      title: "مراقبت بعد از اصلاح",
      desc: "راهنمایی نگهداری از استایل جدید، همراه با پیشنهاد محصولات مناسب پوست و موی شما.",
    },
  ],
};

// ==================== آیکون ارزش‌ها ====================

const ValueIcon = ({ type, ...p }) => {
  if (type === "precision") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...p}
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    );
  }

  if (type === "hospitality") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...p}
      >
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" />
    </svg>
  );
};

// ==================== Reveal ====================

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

// ==================== مودال همکاری ====================

function JoinUsModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;

    const formData = new FormData(form);

    const name = formData.get("name");
    const phone = formData.get("phone");
    const position = formData.get("position");
    const message = formData.get("message");

    try {
      setLoading(true);

      /**
       * طبق API Docs:
       *
       * POST /api/v1/careers/
       *
       * اگر endpoint بک‌اند شما بدون /v1 بود،
       * فقط همین مسیر را تغییر بده.
       */

      await api.post("/api/v1/careers/", {
        name,
        phone,
        position,
        message,
      });

      alert("درخواست همکاری شما با موفقیت ارسال شد.");

      form.reset();
      onClose();
    } catch (error) {
      console.error("Career form error:", error);

      alert(
        error?.response?.data?.detail ||
          error?.response?.data?.message ||
          "ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="بستن"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M5 5 L15 15 M15 5 L5 15" />
          </svg>
        </button>

        <h3 className={styles.modalTitle}>
          به تیم ولوت بار بپیوندید
        </h3>

        <p className={styles.modalDesc}>
          اگه آرایشگر حرفه‌ای هستید یا می‌خواید عضو تیم پذیرش ما بشید،
          فرم زیر رو پر کنید.
        </p>

        <form
          onSubmit={handleSubmit}
          className={styles.modalForm}
        >
          <input
            name="name"
            type="text"
            placeholder="نام و نام‌خانوادگی"
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="شماره تماس"
            required
          />

          <select
            name="position"
            defaultValue=""
            required
          >
            <option value="" disabled>
              موقعیت مورد نظر
            </option>

            <option value="barber">
              آرایشگر
            </option>

            <option value="reception">
              پذیرش و رزرو
            </option>

            <option value="other">
              سایر
            </option>
          </select>

          <textarea
            name="message"
            rows={3}
            placeholder="کمی درباره تجربه خودتون بنویسید..."
          />

          <button
            type="submit"
            className={styles.modalSubmit}
            disabled={loading}
          >
            {loading
              ? "در حال ارسال..."
              : "ارسال درخواست"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==================== صفحه درباره ما ====================

export default function AboutUs() {
  const [showJoinModal, setShowJoinModal] = useState(false);

  const [barbers, setBarbers] = useState([]);
  const [loadingBarbers, setLoadingBarbers] = useState(true);
  const [barbersError, setBarbersError] = useState("");

  const [storyRef, storyVisible] = useReveal();
  const [journeyRef, journeyVisible] = useReveal();
  const [teamRef, teamVisible] = useReveal();

  // ==================== دریافت آرایشگران ====================

  useEffect(() => {
    let cancelled = false;

    const loadBarbers = async () => {
      try {
        setLoadingBarbers(true);
        setBarbersError("");

        const data = await getBarbers();

        if (!cancelled) {
          setBarbers(data);
        }
      } catch (error) {
        console.error("Get barbers error:", error);

        if (!cancelled) {
          setBarbers([]);
          setBarbersError(
            error?.response?.data?.detail ||
              "دریافت اطلاعات آرایشگران انجام نشد.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingBarbers(false);
        }
      }
    };

    loadBarbers();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      dir="rtl"
      className={styles.page}
    >
      {/* ==================== هیرو ==================== */}

      <div className={styles.hero}>
        <Image
          src={STUDIO.heroImage}
          alt="داخل آرایشگاه ولوت بار"
          fill
          priority
          className={styles.heroImage}
        />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            ABOUT US
          </span>

          <h1 className={styles.heroTitle}>
            جایی که هر{" "}
            <span className={styles.heroTitleBold}>
              اصلاح یک مراسمه
            </span>
          </h1>

          <p className={styles.heroDesc}>
            بیش از ۸ سال است که با دقت، صبوری و احترام
            به سلیقه هر مشتری، ظاهرتون رو می‌سازیم؛ نه فقط
            کوتاه می‌کنیم.
          </p>
        </div>
      </div>

      {/* ==================== داستان + آمار ==================== */}

      <div
        ref={storyRef}
        className={`${styles.storySection} ${
          storyVisible ? styles.revealed : ""
        }`}
      >
        <div className={styles.dotBg} />

        <div className={styles.storyGrid}>
          <div className={styles.storyText}>
            <span className={styles.eyebrowDark}>
              OUR STORY
            </span>

            <h2 className={styles.storyTitle}>
              از یه صندلی کوچیک، به یه{" "}
              <span>خانواده</span> رسیدیم
            </h2>

            <p className={styles.storyDesc}>
              ولوت بار با یه صندلی و یه رویا شروع شد:
              اصلاحی که فقط ظاهر رو عوض نکنه، حس خوب هم
              بده. امروز تیمی از آرایشگرهای متخصص،
              فضایی گرم و استانداردهایی که هیچ‌وقت باهاش
              شوخی نمی‌کنیم، همون رویا رو هر روز برای صدها
              مشتری زنده می‌کنیم.
            </p>

            <div className={styles.statsGrid}>
              {STUDIO.stats.map((s) => (
                <div
                  key={s.label}
                  className={styles.statCard}
                >
                  <p className={styles.statValue}>
                    {s.value}
                  </p>

                  <p className={styles.statLabel}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.storyImageWrap}>
            <Image
              src={STUDIO.storyImage}
              alt="فضای کار ولوت بار"
              fill
              className={styles.storyImage}
            />

            <div className={styles.storyImageOverlay} />

            <div className={styles.storyImageCaption}>
              <p>سالن اصلی ولوت بار</p>
              <span>تهران ۱۴۰۴</span>
            </div>
          </div>
        </div>

        {/* ==================== ارزش‌های ما ==================== */}

        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <ValueIcon
                type="precision"
                width={22}
                height={22}
              />
            </span>

            <h4>{STUDIO.values[0].title}</h4>
            <p>{STUDIO.values[0].desc}</p>
          </div>

          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <ValueIcon
                type="hospitality"
                width={22}
                height={22}
              />
            </span>

            <h4>{STUDIO.values[1].title}</h4>
            <p>{STUDIO.values[1].desc}</p>
          </div>

          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <ValueIcon
                type="authenticity"
                width={22}
                height={22}
              />
            </span>

            <h4>{STUDIO.values[2].title}</h4>
            <p>{STUDIO.values[2].desc}</p>
          </div>
        </div>
      </div>

      {/* ==================== مسیر مشتری ==================== */}

      <div
        ref={journeyRef}
        className={`${styles.journeySection} ${
          journeyVisible ? styles.revealed : ""
        }`}
      >
        <div className={styles.journeyHeader}>
          <div>
            <span className={styles.eyebrowLight}>
              OUR JOURNEY
            </span>

            <h3 className={styles.journeyTitle}>
              از رزرو تا{" "}
              <span>لبخند آخر کار</span>
            </h3>
          </div>

          <p className={styles.journeySubtitle}>
            یه مسیر ساده و شفاف، طراحی شده تا دقیقاً بدونید
            تو هر نوبت چه اتفاقی می‌افته.
          </p>
        </div>

        <div className={styles.journeyGrid}>
          {STUDIO.journey.map((step) => (
            <div
              key={step.no}
              className={styles.journeyStep}
            >
              <span className={styles.journeyNo}>
                {step.no}
              </span>

              <div className={styles.journeyLine} />

              <h4>{step.title}</h4>

              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* ==================== تیم ما ==================== */}

        <div
          ref={teamRef}
          className={`${styles.teamSection} ${
            teamVisible ? styles.revealed : ""
          }`}
        >
          <span className={styles.eyebrowLight}>
            OUR TEAM
          </span>

          <h3 className={styles.journeyTitle}>
            آدم‌های پشت{" "}
            <span>هر اصلاح</span>
          </h3>

          {loadingBarbers && (
            <div className={styles.teamGrid}>
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={styles.teamCard}
                  style={{
                    minHeight: "320px",
                  }}
                />
              ))}
            </div>
          )}

          {!loadingBarbers && barbersError && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
              }}
            >
              <p>{barbersError}</p>
            </div>
          )}

          {!loadingBarbers &&
            !barbersError &&
            barbers.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                }}
              >
                <p>
                  در حال حاضر اطلاعاتی برای نمایش وجود ندارد.
                </p>
              </div>
            )}

          {!loadingBarbers &&
            !barbersError &&
            barbers.length > 0 && (
              <div className={styles.teamGrid}>
                {barbers.map((member) => (
                  <Link
                    href={`/Barber/${member.id}`}
                    key={member.id}
                    className={styles.teamCard}
                  >
                    <div
                      className={styles.teamImageWrapper}
                    >
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          unoptimized
                          className={styles.teamImage}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "48px",
                          }}
                        >
                          {member.name?.charAt(0) || "؟"}
                        </div>
                      )}
                    </div>

                    <div className={styles.teamOverlay} />

                    <div className={styles.teamMoreBtn}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>

                      اطلاعات بیشتر
                    </div>

                    <div className={styles.teamInfo}>
                      <p className={styles.teamName}>
                        {member.name}
                      </p>

                      <p className={styles.teamRole}>
                        {member.role}
                      </p>
                    </div>
                  </Link>
                ))}

                {/* کارت عضویت */}

                <button
                  type="button"
                  className={styles.joinCard}
                  onClick={() => setShowJoinModal(true)}
                >
                  <span className={styles.joinGlow} />

                  <span className={styles.joinPlus}>
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>

                  <p className={styles.joinTitle}>
                    نفر بعدی{" "}
                    <span>شما</span> باشید
                  </p>

                  <p className={styles.joinDesc}>
                    به تیم ولوت بار بپیوندید
                  </p>
                </button>
              </div>
            )}
        </div>
      </div>

      <JoinUsModal
        open={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />
    </section>
  );
}