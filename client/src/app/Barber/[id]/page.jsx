// "use client";


// import { use, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { getBarberById } from "@/app/Barber/BarberData";
// import styles from "./page.module.css";

// export default function BarberDetailPage({ params }) {
//   const { id } = use(params);

//   const barber = getBarberById(id);
//   const [activeImage, setActiveImage] = useState(null);


//   if (!barber) {
//     return (
//       <section dir="rtl" className={styles.notFound}>
//         <h1>آرایشگر پیدا نشد</h1>
//         <p>ممکنه این پروفایل حذف شده باشه یا لینک اشتباه باشه.</p>
//         <Link href="/AboutUs" className={styles.backLink}>
//           بازگشت به تیم ما
//         </Link>
//       </section>
//     );
//   }

//   return (
//     <section dir="rtl" className={styles.page}>
//       {/* ==================== هدر پروفایل ==================== */}
//       <div className={styles.hero}>
//         <Image
//           src={barber.coverImage}
//           alt={`فضای کار ${barber.name}`}
//           fill
//           priority
//           className={styles.heroImage}
//         />
//         <div className={styles.heroOverlay} />

//         <div className={styles.heroContent}>
//           <Link href="/AboutUs" className={styles.backLink}>
//             <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M12.5 4 L6.5 10 L12.5 16" />
//             </svg>
//             بازگشت به تیم
//           </Link>

//           <div className={styles.heroProfile}>
//             <div className={styles.avatarWrap}>
//               <Image src={barber.image} alt={barber.name} fill className={styles.avatar} />
//             </div>
//             <div>
//               <h1 className={styles.name}>{barber.name}</h1>
//               <p className={styles.role}>{barber.role}</p>
//             </div>
//           </div>

//           <div className={styles.heroStats}>
//             <div>
//               <p className={styles.statValue}>{barber.experienceYears}+</p>
//               <p className={styles.statLabel}>سال تجربه</p>
//             </div>
//             <div>
//               <p className={styles.statValue}>{barber.clientsServed}</p>
//               <p className={styles.statLabel}>مشتری راضی</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={styles.container}>
//         <div className={styles.grid}>
//           {/* ==================== ستون اصلی ==================== */}
//           <div className={styles.mainCol}>
//             <div className={styles.card}>
//               <h2 className={styles.cardTitle}>درباره {barber.name}</h2>
//               <p className={styles.bio}>{barber.bio}</p>

//               {barber.specialties?.length > 0 && (
//                 <div className={styles.tags}>
//                   {barber.specialties.map((tag) => (
//                     <span key={tag} className={styles.tag}>
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {barber.gallery?.length > 0 && (
//               <div className={styles.card}>
//                 <h2 className={styles.cardTitle}>نمونه کارها</h2>
//                 <div className={styles.gallery}>
//                   {barber.gallery.map((src, i) => (
//                     <button
//                       type="button"
//                       key={src}
//                       className={styles.galleryItem}
//                       onClick={() => setActiveImage(src)}
//                     >
//                       <Image
//                         src={src}
//                         alt={`نمونه کار ${i + 1} ${barber.name}`}
//                         fill
//                         unoptimized
//                         className={styles.galleryImage}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ==================== ستون کناری ==================== */}
//           <div className={styles.sideCol}>
//             <div className={styles.card}>
//               <h2 className={styles.cardTitle}>مدارک و دوره‌ها</h2>
//               <ul className={styles.certList}>
//                 {barber.certificates.map((cert) => (
//                   <li key={cert.title} className={styles.certItem}>
//                     <span className={styles.certIcon}>
//                       <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M12 15l-5.5 3 1.5-6L3 8l6-.5L12 2l3 5.5 6 .5-5 4 1.5 6z" />
//                       </svg>
//                     </span>
//                     <span className={styles.certText}>
//                       <span className={styles.certTitle}>{cert.title}</span>
//                       <span className={styles.certMeta}>
//                         {cert.issuer} · {cert.year}
//                       </span>
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className={styles.bookCard}>
//               <p className={styles.bookText}>
//                 می‌خوای نوبتت رو با {barber.name} هماهنگ کنی؟
//               </p>
//               <button type="button" className={styles.bookBtn}>
//                 رزرو نوبت با {barber.name}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ==================== لایت‌باکس نمونه‌کار ==================== */}
//       {activeImage && (
//         <div className={styles.lightbox} onClick={() => setActiveImage(null)}>
//           <button
//             type="button"
//             className={styles.lightboxClose}
//             onClick={() => setActiveImage(null)}
//             aria-label="بستن"
//           >
//             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
//               <path d="M5 5 L15 15 M15 5 L5 15" />
//             </svg>
//           </button>
//           <div className={styles.lightboxImageWrap} onClick={(e) => e.stopPropagation()}>
//             <Image
//               src={activeImage}
//               alt="نمونه کار بزرگ‌شده"
//               fill
//               unoptimized
//               className={styles.lightboxImage}
//             />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }






"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getBarberById } from "@/app/Barber/BarberData";
import styles from "./page.module.css";

export default function BarberDetailPage({ params }) {
  const { id } = use(params);

  const [barber, setBarber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchBarber = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBarberById(id);

        setBarber(data);
      } catch (err) {
        console.error("Error fetching barber:", err);
        setError("آرایشگر مورد نظر پیدا نشد.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBarber();
    }
  }, [id]);

  // ==================== Loading ====================

  if (loading) {
    return (
      <section dir="rtl" className={styles.notFound}>
        <h1>در حال دریافت اطلاعات...</h1>
        <p>لطفاً چند لحظه صبر کنید.</p>
      </section>
    );
  }

  // ==================== Error ====================

  if (error || !barber) {
    return (
      <section dir="rtl" className={styles.notFound}>
        <h1>آرایشگر پیدا نشد</h1>

        <p>
          ممکنه این پروفایل حذف شده باشه یا لینک اشتباه باشه.
        </p>

        <Link href="/AboutUs" className={styles.backLink}>
          بازگشت به تیم ما
        </Link>
      </section>
    );
  }

  // ==================== Gallery ====================

  const gallery = Array.isArray(barber.gallery)
    ? barber.gallery
    : [];

  const certificates = Array.isArray(barber.certificates)
    ? barber.certificates
    : [];

  // ==================== Page ====================

  return (
    <section dir="rtl" className={styles.page}>

      {/* ==================== Hero ==================== */}

      <div className={styles.hero}>

        <Image
          src={
            barber.coverImage ||
            barber.image ||
            "/image-dashboard/default-barber.jpg"
          }
          alt={`فضای کار ${barber.name}`}
          fill
          priority
          unoptimized
          className={styles.heroImage}
        />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>

          <Link
            href="/AboutUs"
            className={styles.backLink}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.5 4 L6.5 10 L12.5 16" />
            </svg>

            بازگشت به تیم
          </Link>

          {/* Profile */}

          <div className={styles.heroProfile}>

            <div className={styles.avatarWrap}>
              <Image
                src={
                  barber.image ||
                  "/image-dashboard/default-barber.jpg"
                }
                alt={barber.name}
                fill
                unoptimized
                className={styles.avatar}
              />
            </div>

            <div>
              <h1 className={styles.name}>
                {barber.name}
              </h1>

              <p className={styles.role}>
                {barber.role}
              </p>
            </div>

          </div>

          {/* Stats */}

          <div className={styles.heroStats}>

            {barber.experienceYears !== undefined && (
              <div>
                <p className={styles.statValue}>
                  {barber.experienceYears}+
                </p>

                <p className={styles.statLabel}>
                  سال تجربه
                </p>
              </div>
            )}

            {barber.clientsServed && (
              <div>
                <p className={styles.statValue}>
                  {barber.clientsServed}
                </p>

                <p className={styles.statLabel}>
                  مشتری راضی
                </p>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* ==================== Content ==================== */}

      <div className={styles.container}>

        <div className={styles.grid}>

          {/* ==================== Main Column ==================== */}

          <div className={styles.mainCol}>

            {/* About */}

            <div className={styles.card}>

              <h2 className={styles.cardTitle}>
                درباره {barber.name}
              </h2>

              {barber.bio && (
                <p className={styles.bio}>
                  {barber.bio}
                </p>
              )}

              {Array.isArray(barber.specialties) &&
                barber.specialties.length > 0 && (
                  <div className={styles.tags}>
                    {barber.specialties.map((tag) => (
                      <span
                        key={tag}
                        className={styles.tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

            </div>

            {/* Gallery */}

            {gallery.length > 0 && (
              <div className={styles.card}>

                <h2 className={styles.cardTitle}>
                  نمونه کارها
                </h2>

                <div className={styles.gallery}>

                  {gallery.map((src, index) => (
                    <button
                      type="button"
                      key={`${src}-${index}`}
                      className={styles.galleryItem}
                      onClick={() => setActiveImage(src)}
                    >
                      <Image
                        src={src}
                        alt={`نمونه کار ${index + 1} ${barber.name}`}
                        fill
                        unoptimized
                        className={styles.galleryImage}
                      />
                    </button>
                  ))}

                </div>
              </div>
            )}

          </div>

          {/* ==================== Sidebar ==================== */}

          <div className={styles.sideCol}>

            {/* Certificates */}

            {certificates.length > 0 && (
              <div className={styles.card}>

                <h2 className={styles.cardTitle}>
                  مدارک و دوره‌ها
                </h2>

                <ul className={styles.certList}>

                  {certificates.map((cert, index) => (
                    <li
                      key={`${cert.title}-${index}`}
                      className={styles.certItem}
                    >

                      <span className={styles.certIcon}>
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 15l-5.5 3 1.5-6L3 8l6-.5L12 2l3 5.5 6 .5-5 4 1.5 6z" />
                        </svg>
                      </span>

                      <span className={styles.certText}>

                        <span className={styles.certTitle}>
                          {cert.title}
                        </span>

                        <span className={styles.certMeta}>
                          {cert.issuer}
                          {cert.year && ` · ${cert.year}`}
                        </span>

                      </span>

                    </li>
                  ))}

                </ul>

              </div>
            )}

            {/* Booking */}

            <div className={styles.bookCard}>

              <p className={styles.bookText}>
                می‌خوای نوبتت رو با {barber.name} هماهنگ کنی؟
              </p>

              <Link
                href={`/Booking?barber=${barber.id}`}
                className={styles.bookBtn}
              >
                رزرو نوبت با {barber.name}
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* ==================== Lightbox ==================== */}

      {activeImage && (
        <div
          className={styles.lightbox}
          onClick={() => setActiveImage(null)}
        >

          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setActiveImage(null)}
            aria-label="بستن"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M5 5 L15 15 M15 5 L5 15" />
            </svg>
          </button>

          <div
            className={styles.lightboxImageWrap}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt="نمونه کار بزرگ‌شده"
              fill
              unoptimized
              className={styles.lightboxImage}
            />
          </div>

        </div>
      )}

    </section>
  );
}