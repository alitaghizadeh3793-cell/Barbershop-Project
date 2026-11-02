"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Package.module.css";
import PackageBookingModal from "./Packagebookingmodal/Packagebookingmodal";

const ScissorsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const CrownIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" />
  </svg>
);

const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
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

const packages = [
  {
    number: "۰۱",
    icon: ScissorsIcon,
    name: "پکیج کلاسیک",
    price: "۲۵۰,۰۰۰",
    unit: "هر جلسه",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    features: [
      "کوتاهی مو با قیچی و ماشین",
      "اصلاح صورت با تیغ سنتی",
      "شستشو و حالت‌دهی نهایی",
    ],
    cta: "انتخاب این پکیج",
    featured: false,
  },
  {
    number: "۰۲",
    icon: CrownIcon,
    name: "پکیج طلایی",
    price: "۴۵۰,۰۰۰",
    unit: "هر جلسه",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    features: [
      "تمام خدمات پکیج کلاسیک",
      "ماسک و مراقبت پوست صورت",
      "ماساژ سر و شانه",
      "پذیرایی VIP با چای و قهوه",
    ],
    cta: "انتخاب پیشنهاد ویژه",
    featured: true,
    ribbon: "محبوب‌ترین",
  },
  {
    number: "۰۳",
    icon: CalendarIcon,
    name: "اشتراک ماهانه VIP",
    price: "۱,۶۰۰,۰۰۰",
    unit: "ماهانه",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
    features: [
      "۴ نوبت کامل در طول ماه",
      "رزرو با اولویت، بدون صف انتظار",
      "۱۵٪ تخفیف روی محصولات مراقبتی",
      "یک جلسه هدیه به‌مناسبت تولد",
    ],
    cta: "شروع اشتراک",
    featured: false,
  },
];

export default function Package() {
  // پکیجی که الان پاپ‌آپ رزروش بازه؛ null یعنی هیچ پاپ‌آپی باز نیست
  const [activePackage, setActivePackage] = useState(null);

  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>LUXURY PACKAGES</span>
          <h2 className={styles.title}>پکیج‌های ویژه</h2>
          <span className={styles.divider} />
          <p className={styles.subtitle}>
            برای هر نیاز و بودجه‌ای، خدماتی خاص طراحی شده تا بهترین تجربه‌ی
            اصلاح و مراقبت را در فضایی آرامش‌بخش تجربه کنید.
          </p>
        </div>

        <div className={styles.grid}>
          {packages.map((pkg) => {
            const Icon = pkg.icon;

            return (
              <div key={pkg.name} className={styles.cardWrapper}>
                <div className={`${styles.card} ${pkg.featured ? styles.cardFeatured : ''}`}>
                  <span className={styles.watermark}>{pkg.number}</span>

                  {pkg.ribbon && (
                    <span className={styles.ribbon}>{pkg.ribbon}</span>
                  )}

                  <div className={styles.cardTop}>
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      unoptimized
                      className={styles.cardImage}
                    />
                    <div className={styles.imageOverlay} />
                  </div>

                  <span className={styles.iconBox}>
                    <Icon width={28} height={28} />
                  </span>

                  <div className={styles.cardBottom}>
                    <h3 className={styles.packageName}>{pkg.name}</h3>

                    <div className={styles.priceContainer}>
                      <span className={styles.price}>{pkg.price}</span>
                      <span className={styles.priceUnit}>
                        تومان / {pkg.unit}
                      </span>
                    </div>

                    <ul className={styles.featureList}>
                      {pkg.features.map((feature) => (
                        <li key={feature} className={styles.featureItem}>
                          <span className={styles.checkCircle}>
                            <CheckIcon width={12} height={12} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className={
                        pkg.featured
                          ? styles.ctaButtonPrimary
                          : styles.ctaButton
                      }
                      onClick={() => setActivePackage(pkg)}
                    >
                      {pkg.cta}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* پاپ‌آپ رزرو: فقط وقتی یه پکیج انتخاب شده باشه نمایش داده می‌شه */}
      {activePackage && (
        <PackageBookingModal
          pkg={activePackage}
          onClose={() => setActivePackage(null)}
        />
      )}
    </section>
  );
}













// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import styles from "./Package.module.css";
// import PackageBookingModal from "./Packagebookingmodal/Packagebookingmodal";

// import { api } from "@/app/config";
// import { MEDIA_URL } from "@/app/config";
// import { useAuth } from "@/app/Context/Context";

// const ScissorsIcon = (props) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <circle cx="6" cy="6" r="3" />
//     <circle cx="6" cy="18" r="3" />
//     <line x1="20" y1="4" x2="8.12" y2="15.88" />
//     <line x1="14.47" y1="14.48" x2="20" y2="20" />
//     <line x1="8.12" y1="8.12" x2="12" y2="12" />
//   </svg>
// );

// const CrownIcon = (props) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" />
//   </svg>
// );

// const CalendarIcon = (props) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <rect x="3" y="5" width="18" height="16" rx="2" />
//     <line x1="16" y1="3" x2="16" y2="7" />
//     <line x1="8" y1="3" x2="8" y2="7" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );

// const icons = [ScissorsIcon, CrownIcon, CalendarIcon];

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

// export default function Package() {
//   const { setNotif } = useAuth();

//   const [packages, setPackages] = useState([]);

//   const [activePackage, setActivePackage] = useState(null);

//   useEffect(() => {
//   const fetchPackages = async () => {
//     try {
//       const response = await api.get("/api/v1/public/packages");

//       const packageList = Array.isArray(response.data)
//         ? response.data
//         : response.data?.results || [];

//       setPackages(packageList);
//     } catch (error) {
//       console.error("Error fetching packages:", error);
//       setPackages([]);
//     }
//   };

//   fetchPackages();
// }, []);

//   return (
//     <section className={styles.section} dir="rtl">
//       <div className={styles.inner}>
//         <div className={styles.header}>
//           <span className={styles.eyebrow}>LUXURY PACKAGES</span>

//           <h2 className={styles.title}>پکیج‌های ویژه</h2>

//           <span className={styles.divider} />

//           <p className={styles.subtitle}>
//             برای هر نیاز و بودجه‌ای، خدماتی خاص طراحی شده تا بهترین تجربه‌ی
//             اصلاح و مراقبت را تجربه کنید.
//           </p>
//         </div>

//         <div className={styles.grid}>
//           {packages.map((pkg, index) => {
//             const Icon = icons[index % icons.length];

//             return (
//               <div key={pkg.id} className={styles.cardWrapper}>
//                 <div
//                   className={`${styles.card}
// ${pkg.featured ? styles.cardFeatured : ""}
// `}
//                 >
//                   <span className={styles.watermark}>0{index + 1}</span>

//                   {pkg.ribbon && (
//                     <span className={styles.ribbon}>{pkg.ribbon}</span>
//                   )}

//                   <div className={styles.cardTop}>
//                     <Image
//                       src={
//                         pkg.image
//                           ? `${MEDIA_URL}${pkg.image}`
//                           : "/image/default.jpg"
//                       }
//                       alt={pkg.name}
//                       fill
//                       className={styles.cardImage}
//                     />

//                     <div className={styles.imageOverlay} />
//                   </div>

//                   <span className={styles.iconBox}>
//                     <Icon width={28} height={28} />
//                   </span>

//                   <div className={styles.cardBottom}>
//                     <h3 className={styles.packageName}>{pkg.name}</h3>

//                     <div className={styles.priceContainer}>
//                       <span className={styles.price}>{pkg.price}</span>

//                       <span className={styles.priceUnit}>
//                         تومان / {pkg.unit}
//                       </span>
//                     </div>

//                     <ul className={styles.featureList}>
//                       {pkg.features?.map((feature) => (
//                         <li key={feature} className={styles.featureItem}>
//                           <span className={styles.checkCircle}>
//                             <CheckIcon width={12} height={12} />
//                           </span>

//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     <button
//                       type="button"
//                       className={
//                         pkg.featured
//                           ? styles.ctaButtonPrimary
//                           : styles.ctaButton
//                       }
//                       onClick={() => setActivePackage(pkg)}
//                     >
//                       انتخاب این پکیج
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {activePackage && (
//         <PackageBookingModal
//           pkg={activePackage}
//           onClose={() => setActivePackage(null)}
//         />
//       )}
//     </section>
//   );
// }
