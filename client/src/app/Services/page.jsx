// "use client";

// import Image from "next/image";
// import styles from "./page.module.css";

// // ==================== آیکون‌ها ====================
// const IconScissors = (p) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
//     <circle cx="6" cy="6" r="3" />
//     <circle cx="6" cy="18" r="3" />
//     <line x1="20" y1="4" x2="8.12" y2="15.88" />
//     <line x1="14.47" y1="14.48" x2="20" y2="20" />
//     <line x1="8.12" y1="8.12" x2="12" y2="12" />
//   </svg>
// );
// const IconBeard = (p) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
//     <path d="M5 4c0 5 0 9 2 12 1.5 2 3 3 5 3s3.5-1 5-3c2-3 2-7 2-12" />
//     <path d="M8 4v3M16 4v3" />
//   </svg>
// );
// const IconFacial = (p) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
//     <circle cx="12" cy="12" r="4" />
//     <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
//   </svg>
// );
// const IconCrown = (p) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
//     <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" />
//   </svg>
// );

// const HERO_IMAGE = "/image-services/services-hero.jpg";

// // محتوای هر بخش. عکس‌ها رو با عکس‌های واقعی سالن جایگزین کن.
// const CATEGORIES = [
//   {
//     number: "۰۱",
//     icon: IconScissors,
//     title: "مو",
//     image: "/image-services/category-hair.jpg",
//     desc: "از کوتاهی‌های کلاسیک تا فیدهای امروزی و رنگ‌های تخصصی؛ هر مدل با ابزار حرفه‌ای و ذوق شخصی اجرا می‌شه.",
//     tags: "کوتاهی کلاسیک · فید و تیپر · رنگ و مش · کراتینه",
//   },
//   {
//     number: "۰۲",
//     icon: IconBeard,
//     title: "ریش",
//     image: "/image-services/category-beard.jpg",
//     desc: "فرم‌دهی دقیق، اصلاح با تیغ سنتی و رنگ تخصصی — چون یه ریش خوب فقط کوتاه‌کردن نیست، معماریه.",
//     tags: "اصلاح سنتی · فرم‌دهی · رنگ ریش",
//   },
//   {
//     number: "۰۳",
//     icon: IconFacial,
//     title: "پوست و مراقبت",
//     image: "/image-services/category-skin.jpg",
//     desc: "پاکسازی، فشیال و ماسک‌های تخصصی برای پوستی که بعد از هر جلسه شاداب‌تر از قبل به نظر می‌رسه.",
//     tags: "فشیال · پاکسازی · ماسک احیا",
//   },
//   {
//     number: "۰۴",
//     icon: IconCrown,
//     title: "پکیج‌های ویژه",
//     image: "/image-services/category-vip.jpg",
//     desc: "برای مناسبت‌های خاص و کسایی که فقط بهترین رو می‌خوان — پکیج داماد و اشتراک ماهانه VIP، با اولویت کامل در برنامه‌ریزی.",
//     tags: "پکیج داماد · اشتراک ماهانه VIP",
//   },
// ];

// export default function Services() {
//   return (
//     <section dir="rtl" className={styles.page}>
//       {/* ==================== هیرو ==================== */}
//       <div className={styles.hero}>
//         <Image src={HERO_IMAGE} alt="فضای آرایشگاه ولوت بار" fill priority className={styles.heroImage} />
//         <div className={styles.heroOverlay} />
//         <div className={styles.heroContent}>
//           <span className={styles.eyebrow}>OUR SERVICES</span>
//           <h1 className={styles.title}>خدمات ولوت بار</h1>
//           <span className={styles.divider} />
//           <p className={styles.subtitle}>
//             چهار دنیای متفاوت از مراقبت مردانه؛ هرکدوم با فلسفه و دقت خودش.
//           </p>
//         </div>
//       </div>

//       {/* ==================== ردیف‌های معرفی، به‌صورت زیگزاگ ==================== */}
//       <div className={styles.list}>
//         {CATEGORIES.map((cat, i) => {
//           const Icon = cat.icon;
//           const reversed = i % 2 === 1;
//           return (
//             <div
//               key={cat.title}
//               className={`${styles.row} ${reversed ? styles.rowReversed : ""}`}
//             >
//               <div className={styles.rowImageWrap}>
//                 <Image src={cat.image} alt={cat.title} fill unoptimized className={styles.rowImage} />
//               </div>

//               <div className={styles.rowText}>
//                 <span className={styles.rowNumber}>{cat.number}</span>
//                 <span className={styles.rowIcon}>
//                   <Icon width={22} height={22} />
//                 </span>
//                 <h2>{cat.title}</h2>
//                 <p>{cat.desc}</p>
//                 <span className={styles.rowTags}>{cat.tags}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }






"use client";

import Image from "next/image";
import styles from "./page.module.css";

// ==================== آیکون‌ها ====================
const IconScissors = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);
const IconBeard = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 4c0 5 0 9 2 12 1.5 2 3 3 5 3s3.5-1 5-3c2-3 2-7 2-12" />
    <path d="M8 4v3M16 4v3" />
  </svg>
);
const IconFacial = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
  </svg>
);
const IconCrown = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" />
  </svg>
);
const IconTarget = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
const IconTool = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4L14.7 6.3z" />
  </svg>
);
const IconAperture = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M14.31 8l3.46 4-3.46 4M9.69 8 6.23 12l3.46 4M12 2.5v3M12 18.5v3" />
  </svg>
);
const IconCheck = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const HERO_IMAGE = "/image-dashboard/photo-1503951914875-452162b0f3f1.avif";
const BRAND = "ولوت بار";
const MARQUEE_TEXT = `${BRAND} — تجربه‌ی مراقبت مردانه — دست‌ساز و دقیق — از ۱۳۹۸ — `;

// سه اصل کاری سالن — یک ردیف معرفی کوتاه زیر هیرو
const PILLARS = [
  {
    icon: IconTarget,
    title: "دقت در جزئیات",
    desc: "هر خط، هر زاویه، با چشمی که چیزی رو از قلم نمی‌ندازه.",
  },
  {
    icon: IconTool,
    title: "ابزار حرفه‌ای",
    desc: "تجهیزات اورجینال و به‌روز، برای نتیجه‌ای که دووم داره.",
  },
  {
    icon: IconAperture,
    title: "فضای اختصاصی",
    desc: "محیطی آروم و شخصی؛ وقتی که فقط برای خودته.",
  },
];

// محتوای هر بخش. عکس‌ها رو با عکس‌های واقعی سالن جایگزین کن.
const CATEGORIES = [
  {
    number: "۰۱",
    icon: IconScissors,
    title: "مو",
    image: "/image-dashboard/photo-1585747860715-2ba37e788b70.avif",
    desc: "از کوتاهی‌های کلاسیک تا فیدهای امروزی و رنگ‌های تخصصی؛ هر مدل با ابزار حرفه‌ای و ذوق شخصی اجرا می‌شه.",
    tags: ["کوتاهی کلاسیک", "فید و تیپر", "رنگ و مش", "کراتینه"],
  },
  {
    number: "۰۲",
    icon: IconBeard,
    title: "ریش",
    image: "/image-dashboard/photo-1532710093739-9470acff878f.avif",
    desc: "فرم‌دهی دقیق، اصلاح با تیغ سنتی و رنگ تخصصی — چون یه ریش خوب فقط کوتاه‌کردن نیست، معماریه.",
    tags: ["اصلاح سنتی", "فرم‌دهی", "رنگ ریش"],
  },
  {
    number: "۰۳",
    icon: IconFacial,
    title: "پوست و مراقبت",
    image: "/image-dashboard/photo-1599351431202-1e0f0137899a.avif",
    desc: "پاکسازی، فشیال و ماسک‌های تخصصی برای پوستی که بعد از هر جلسه شاداب‌تر از قبل به نظر می‌رسه.",
    tags: ["فشیال", "پاکسازی", "ماسک احیا"],
  },
  {
    number: "۰۴",
    icon: IconCrown,
    title: "پکیج‌های ویژه",
    image: "/image-dashboard/photo-1621605815971-fbc98d665033.avif",
    desc: "برایمناسبت‌های خاص و کسایی که فقط بهترین رو می‌خوان — پکیج‌های کامل، با اولویت در طراحی ظاهر و توجه اختصاصی.",
    tags: ["پکیج داماد", "اشتراک ماهانه VIP"],
    featured: true,
    badge: "محبوب‌ترین",
    features: [
      "کوتاهی مو + اصلاح ریش کامل",
      "فشیال اختصاصی و ماسک احیا",
      "پذیرایی و فضای اختصاصی",
      "اولویت با آرایشگر ارشد سالن",
    ],
  },
];

export default function Services() {
  return (
    <section dir="rtl" className={styles.page}>
      {/* ==================== نوار متن متحرک بالا ==================== */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>{MARQUEE_TEXT.repeat(4)}</span>
          <span>{MARQUEE_TEXT.repeat(4)}</span>
        </div>
      </div>

      {/* ==================== هیرو ==================== */}
      <div className={styles.hero}>
        <Image src={HERO_IMAGE} alt="فضای آرایشگاه ولوت بار" fill priority className={styles.heroImage} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroGrain} aria-hidden="true" />

        <span className={styles.heroGhostNumber} aria-hidden="true">VB</span>

        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>OUR SERVICES</span>
          <h1 className={styles.title}>
            خدمات
            <br />
            <span className={styles.titleOutline}>ولوت بار</span>
          </h1>
          <span className={styles.divider} />
          <p className={styles.subtitle}>
            چهار دنیای متفاوت از مراقبت مردانه؛ هرکدوم با فلسفه و دقت خودش.
          </p>
        </div>

        <div className={styles.heroScrollHint} aria-hidden="true">
          <span />
        </div>
      </div>

      {/* ==================== سه اصل کاری ==================== */}
      <div className={styles.pillars}>
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className={styles.pillar}>
              {i !== 0 && <span className={styles.pillarRule} aria-hidden="true" />}
              <Icon width={26} height={26} className={styles.pillarIcon} />
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* ==================== ردیف‌های معرفی، به‌صورت زیگزاگ ==================== */}
      <div className={styles.list}>
        {CATEGORIES.map((cat, i) => {
          const Icon = cat.icon;
          const reversed = i % 2 === 1;
          return (
            <div
              key={cat.title}
              className={`${styles.row} ${reversed ? styles.rowReversed : ""} ${
                cat.featured ? styles.rowFeatured : ""
              }`}
            >
              <span className={styles.rowGhostNumber} aria-hidden="true">
                {cat.number}
              </span>

              <div className={styles.rowImageWrap}>
                {cat.badge && <span className={styles.rowBadge}>{cat.badge}</span>}
                <div className={styles.rowFrameMark} aria-hidden="true" />
                <Image src={cat.image} alt={cat.title} fill unoptimized className={styles.rowImage} />
              </div>

              <div className={styles.rowText}>
                <span className={styles.rowNumber}>{cat.number}</span>
                <span className={styles.rowIcon}>
                  <Icon width={22} height={22} />
                </span>
                <h2>{cat.title}</h2>
                <p>{cat.desc}</p>

                {cat.features && (
                  <ul className={styles.featureList}>
                    {cat.features.map((f) => (
                      <li key={f}>
                        <IconCheck width={14} height={14} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.rowTags}>
                  {cat.tags.map((t) => (
                    <span key={t} className={styles.tagChip}>
                      {t}
                    </span>))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================== امضای پایانی ==================== */}
      <div className={styles.closing}>
        <div className={styles.seal}>
          <svg viewBox="0 0 200 200" className={styles.sealSvg}>
            <defs>
              <path id="sealCircle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
            </defs>
            <circle cx="100" cy="100" r="96" className={styles.sealRing} />
            <circle cx="100" cy="100" r="60" className={styles.sealRingInner} />
            <text className={styles.sealText}>
              <textPath href="#sealCircle" startOffset="0%">
                • ولوت بار • مراقبت مردانه • از ۱۳۹۸ • ولوت بار • مراقبت مردانه • از ۱۳۹۸
              </textPath>
            </text>
          </svg>
          <span className={styles.sealCenter}>VB</span>
        </div>
        <p className={styles.closingText}>
          هر جلسه، یک تجربه‌ست؛ نه فقط یک سرویس.
        </p>
      </div>

      {/* ==================== نوار متن متحرک پایین ==================== */}
      <div className={`${styles.marquee} ${styles.marqueeBottom}`} aria-hidden="true">
        <div className={styles.marqueeTrackReverse}>
          <span>{MARQUEE_TEXT.repeat(4)}</span>
          <span>{MARQUEE_TEXT.repeat(4)}</span>
        </div>
      </div>
    </section>
  );
}