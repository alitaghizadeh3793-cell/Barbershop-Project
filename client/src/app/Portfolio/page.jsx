"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// ==================== دیتای نمونه‌کارها ====================
// هر آیتم یه عکس "قبل" و "بعد" داره. اینا رو با عکس‌های واقعی مشتری‌هات
// (با اجازه خودشون) جایگزین کن.
const CATEGORIES = [
  { id: "all", label: "همه" },
  { id: "hair", label: "کوتاهی مو" },
  { id: "beard", label: "اصلاح ریش" },
  { id: "color", label: "رنگ و استایل" },
  { id: "combo", label: "ترکیبی" },
];

const WORKS = [
  {
    id: 1,
    category: "hair",
    style: "فید تمیز و مینیمال",
    barber: "استاد صادقی",
    before: "/image-dashboard/photo-1503951914875-452162b0f3f1.avif",
    after: "/image-dashboard/photo-1517832606299-7ae9b720a186.avif",
  },
  {
    id: 2,
    category: "beard",
    style: "فرم‌دهی ریش باکسی",
    barber: "استاد کریمی",
    before: "/image-dashboard/photo-1532710093739-9470acff878f.avif",
    after: "/image-dashboard/photo-1585747860715-2ba37e788b70.avif",
  },
  {
    id: 3,
    category: "combo",
    style: "کوتاهی + اصلاح کامل",
    barber: "استاد رضایی",
    before: "/image-dashboard/photo-1599351431202-1e0f0137899a.avif",
    after: "/image-dashboard/photo-1621605815971-fbc98d665033.avif",
  },
  {
    id: 4,
    category: "color",
    style: "مش خاکستری روشن",
    barber: "استاد نوری",
    before: "/image-portfolio/4-before.jpg",
    after: "/image-portfolio/4-after.jpg",
  },
  {
    id: 5,
    category: "hair",
    style: "پومپادور کلاسیک",
    barber: "استاد صادقی",
    before: "/image-portfolio/5-before.jpg",
    after: "/image-portfolio/5-after.jpg",
  },
  {
    id: 6,
    category: "beard",
    style: "اصلاح کامل با تیغ سنتی",
    barber: "استاد رضایی",
    before: "/image-portfolio/6-before.jpg",
    after: "/image-portfolio/6-after.jpg",
  },
];

// ==================== کارت مقایسه قبل/بعد ====================
function BeforeAfterCard({ work }) {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const [percent, setPercent] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);

  const updateFromClientX = (clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(96, Math.max(4, ratio)));
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    setHasInteracted(true);
    updateFromClientX(e.clientX);
    containerRef.current?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    updateFromClientX(e.clientX);
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  return (
    <div className={styles.card}>
      <div
        ref={containerRef}
        className={styles.compareBox}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerLeave={stopDragging}
        onPointerCancel={stopDragging}
      >
        {/* عکس «قبل» — کل کادر رو پر می‌کنه */}
        <Image
          src={work.before}
          alt={`قبل از ${work.style}`}
          fill
          unoptimized
          draggable={false}
          className={styles.compareImage}
        />

        {/* عکس «بعد» — با clip-path فقط تا خط اسلایدر نمایش داده می‌شه */}
        <div
          className={styles.afterWrap}
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        >
          <Image
            src={work.after}
            alt={`بعد از ${work.style}`}
            fill
            unoptimized
            draggable={false}
            className={styles.compareImage}
          />
        </div>

        <span className={`${styles.tag} ${styles.tagBefore}`}>قبل</span>
        <span className={`${styles.tag} ${styles.tagAfter}`}>بعد</span>

        {/* خط و دستگیره اسلایدر */}
        <div className={styles.sliderLine} style={{ left: `${percent}%` }}>
          <span className={styles.sliderHandle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 5l-6 7 6 7M16 5l6 7-6 7" />
            </svg>
          </span>
        </div>

        {!hasInteracted && (
          <span className={styles.dragHint}>بکشید برای مقایسه</span>
        )}
      </div>

      <div className={styles.cardInfo}>
        <p className={styles.styleName}>{work.style}</p>
        <p className={styles.barberName}>{work.barber}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? WORKS
        : WORKS.filter((w) => w.category === activeCategory),
    [activeCategory]
  );

  return (
    <section dir="rtl" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>OUR WORK</span>
          <h2 className={styles.title}>نمونه کارهای ما</h2>
          <span className={styles.divider} />
          <p className={styles.subtitle}>
            به‌جای هزار تا کلمه، بذار خود تغییرات حرف بزنن — خط وسط هر عکس رو
            بکشید و فاصله «قبل» تا «بعد» رو خودتون ببینید.
          </p>
        </div>

        <div className={styles.chips}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`${styles.chip} ${
                activeCategory === cat.id ? styles.chipActive : ""
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.grid} key={activeCategory}>
          {filtered.map((work, i) => (
            <div
              key={work.id}
              className={styles.cardWrap}
              style={{ animationDelay: `${Math.min(i, 6) * 0.06}s` }}
            >
              <BeforeAfterCard work={work} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
















// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import styles from "./page.module.css";
// import { api, MEDIA_URL } from "@/app/config";
// import { useAuth } from "@/app/Context/Context";

// // ================= کارت قبل و بعد =================

// function BeforeAfterCard({ work }) {
//   const containerRef = useRef(null);
//   const isDragging = useRef(false);

//   const [percent, setPercent] = useState(50);
//   const [hasInteracted, setHasInteracted] = useState(false);

//   const updateFromClientX = (clientX) => {
//     const rect = containerRef.current?.getBoundingClientRect();

//     if (!rect) return;

//     const ratio = ((clientX - rect.left) / rect.width) * 100;

//     setPercent(Math.min(96, Math.max(4, ratio)));
//   };

//   const handlePointerDown = (e) => {
//     isDragging.current = true;
//     setHasInteracted(true);

//     updateFromClientX(e.clientX);

//     containerRef.current?.setPointerCapture?.(e.pointerId);
//   };

//   const handlePointerMove = (e) => {
//     if (!isDragging.current) return;

//     updateFromClientX(e.clientX);
//   };

//   const stopDragging = (e) => {
//     isDragging.current = false;

//     try {
//       if (e?.pointerId !== undefined) {
//         containerRef.current?.releasePointerCapture?.(e.pointerId);
//       }
//     } catch {
//       // چیزی لازم نیست
//     }
//   };

//   const beforeImage = work.before_image
//     ? `${MEDIA_URL}${work.before_image}`
//     : "/image/default.jpg";

//   const afterImage = work.after_image
//     ? `${MEDIA_URL}${work.after_image}`
//     : "/image/default.jpg";

//   return (
//     <div className={styles.card}>
//       <div
//         ref={containerRef}
//         className={styles.compareBox}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={stopDragging}
//         onPointerLeave={stopDragging}
//         onPointerCancel={stopDragging}
//       >
//         {/* تصویر قبل */}
//         <Image
//           src={beforeImage}
//           alt={`نمونه کار ${work.style || ""}`}
//           fill
//           unoptimized
//           className={styles.compareImage}
//         />

//         {/* تصویر بعد */}
//         <div
//           className={styles.afterWrap}
//           style={{
//             clipPath: `inset(0 ${100 - percent}% 0 0)`,
//           }}
//         >
//           <Image
//             src={afterImage}
//             alt={`نتیجه ${work.style || ""}`}
//             fill
//             unoptimized
//             className={styles.compareImage}
//           />
//         </div>

//         {/* برچسب‌ها */}
//         <span className={`${styles.tag} ${styles.tagBefore}`}>قبل</span>

//         <span className={`${styles.tag} ${styles.tagAfter}`}>بعد</span>

//         {/* خط مقایسه */}
//         <div
//           className={styles.sliderLine}
//           style={{
//             left: `${percent}%`,
//           }}
//         >
//           <span className={styles.sliderHandle}>
//             <svg
//               width="14"
//               height="14"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="M8 5l-6 7 6 7M16 5l6 7-6 7" />
//             </svg>
//           </span>
//         </div>

//         {!hasInteracted && (
//           <span className={styles.dragHint}>بکشید برای مقایسه</span>
//         )}
//       </div>

//       <div className={styles.cardInfo}>
//         {/* style از بک‌اند */}
//         <p className={styles.styleName}>{work.style || "نمونه کار"}</p>

//         {/* اطلاعات آرایشگر */}
//         <p className={styles.barberName}>
//           {typeof work.barber === "object"
//             ? work.barber?.name || work.barber?.full_name || "آرایشگر"
//             : work.barber
//               ? `آرایشگر ${work.barber}`
//               : "آرایشگر"}
//         </p>
//       </div>
//     </div>
//   );
// }

// // ================= صفحه اصلی =================

// export default function Portfolio() {
//   const { setNotif } = useAuth();

//   const [works, setWorks] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [activeCategory, setActiveCategory] = useState("all");

//   const [loading, setLoading] = useState(true);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);

//   // ================= دریافت دسته‌بندی‌ها =================

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         setCategoriesLoading(true);

//         const response = await api.get("/api/v1/public/gallery-categories/");

//         const data = Array.isArray(response.data)
//           ? response.data
//           : response.data?.results || [];

//         setCategories(data);
//       } catch (error) {
//         console.error("Gallery categories error:", error);

//         setNotif?.({
//           id: Date.now(),
//           message: "خطا در دریافت دسته‌بندی نمونه کارها",
//           type: "error",
//         });
//       } finally {
//         setCategoriesLoading(false);
//       }
//     };

//     getCategories();
//   }, [setNotif]);

//   // ================= دریافت نمونه‌کارها =================

//   useEffect(() => {
//     const getWorks = async () => {
//       try {
//         setLoading(true);

//         let url = "/api/v1/public/gallery/";

//         if (activeCategory !== "all") {
//           url += `?category=${activeCategory}`;
//         }

//         const response = await api.get(url);

//         const data = Array.isArray(response.data)
//           ? response.data
//           : response.data?.results || [];

//         setWorks(data);
//       } catch (error) {
//         console.error("Gallery works error:", error);

//         setWorks([]);

//         setNotif?.({
//           id: Date.now(),
//           message: "خطا در دریافت نمونه کارها",
//           type: "error",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     getWorks();
//   }, [activeCategory, setNotif]);

//   // ================= تغییر دسته‌بندی =================

//   const handleCategoryChange = (categoryId) => {
//     setActiveCategory(categoryId);
//   };

//   return (
//     <section dir="rtl" className={styles.section}>
//       <div className={styles.inner}>
//         {/* ================= Header ================= */}

//         <div className={styles.header}>
//           <span className={styles.eyebrow}>OUR WORK</span>

//           <h2 className={styles.title}>نمونه کارهای ما</h2>

//           <span className={styles.divider} />

//           <p className={styles.subtitle}>
//             بهترین نمونه کارهای انجام شده توسط آرایشگران ما
//           </p>
//         </div>

//         {/* ================= دسته‌بندی‌ها ================= */}

//         <div className={styles.chips}>
//           <button
//             type="button"
//             className={`${styles.chip} ${
//               activeCategory === "all" ? styles.chipActive : ""
//             }`}
//             onClick={() => handleCategoryChange("all")}
//             disabled={loading}
//           >
//             همه
//           </button>

//           {!categoriesLoading &&
//             categories.map((cat) => (
//               <button
//                 type="button"
//                 key={cat.id}
//                 className={`${styles.chip} ${
//                   activeCategory === cat.id ? styles.chipActive : ""
//                 }`}
//                 onClick={() => handleCategoryChange(cat.id)}
//                 disabled={loading}
//               >
//                 {cat.name}
//               </button>
//             ))}
//         </div>

//         {/* ================= Loading ================= */}

//         {loading && (
//           <div className={styles.empty}>
//             <p>در حال دریافت نمونه کارها...</p>
//           </div>
//         )}

//         {/* ================= Empty ================= */}

//         {!loading && works.length === 0 && (
//           <div className={styles.empty}>
//             <p>در این دسته‌بندی نمونه کاری برای نمایش وجود ندارد.</p>
//           </div>
//         )}

//         {/* ================= Gallery ================= */}

//         {!loading && works.length > 0 && (
//           <div className={styles.grid}>
//             {works.map((work) => (
//               <div key={work.id} className={styles.cardWrap}>
//                 <BeforeAfterCard work={work} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
