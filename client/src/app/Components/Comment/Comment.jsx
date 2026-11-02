"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Comment.module.css";

// آیکون ستاره برای امتیازها
const StarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// آیکون نقل‌قول (Quote) برای زیبایی کارت‌ها
const QuoteIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
  </svg>
);

// دیتای فیک نظرات مشتریان
const testimonials = [
  {
    id: 1,
    name: "سهیل احمدی",
    role: "طراح محصول",
    comment: "به جرات می‌تونم بگم بهترین تجربه‌ی اصلاحی بود که تو تهران داشتم. برخورد پرسنل، کیفیت کار و فضای سالن فوق‌العاده لوکس و حرفه‌ایه.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop", 
  },
  {
    id: 2,
    name: "آریا راد",
    role: "مدیر مارکتینگ",
    comment: "پکیج طلایی رو گرفتم و ماساژ و پاکسازی پوستش خستگی کل هفته رو از تنم درآورد. سیستم رزرو آنلاینشون هم خیلی راحت و دقیقه.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "نیما شریفی",
    role: "معمار و طراح داخلی",
    comment: "علاوه بر کیفیت بی‌نظیر کار، طراحی داخلی و فضاسازی سالن خیلی چشم‌نوازه. معلومه روی تک‌تک جزئیات وقت گذاشتن.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "کاوه سلطانی",
    role: "موزیسین",
    comment: "اشتراک ماهانه VIP گرفتم و راحت بدون معطلی هر هفته میرم. تخفیف محصولات و برخورد محترمانه‌شون عالیه.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "بهنام کریمی",
    role: "برنامه‌نویس ارشد",
    comment: "دقت عمل باربر در اصلاح ریش و مدل موی سر بی‌نظیر بود. پیشنهاد می‌کنم حتماً پکیج‌های ویژه‌شون رو امتحان کنید.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
  },
];

export default function Comment() {
  const [isPaused, setIsPaused] = useState(false);

  // برای ایجاد اسکرول بی‌نهایت و نرم، آرایه را تکرار می‌کنیم
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className={styles.section} dir="rtl">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>CLIENT REVIEWS</span>
          <h2 className={styles.title}>نظرات مشتریان عزیز</h2>
          <span className={styles.divider} />
          <p className={styles.subtitle}>
            داستان رضایت افرادی که ولوت بار را برای استایل و مراقبت خود انتخاب کرده‌اند.
          </p>
        </div>
      </div>

      {/* کانتینر متحرک اسلایدر */}
      <div 
        className={styles.marqueeContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`${styles.marqueeTrack} ${isPaused ? styles.paused : ""}`}>
          {duplicatedTestimonials.map((item, index) => (
            <div key={`${item.id}-${index}`} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.userInfo}>
                  <div className={styles.avatarWrapper}>
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      unoptimized
                      className={styles.avatar}
                    />
                  </div>
                  <div>
                    <h3 className={styles.userName}>{item.name}</h3>
                    <span className={styles.userRole}>{item.role}</span>
                  </div>
                </div>
                <QuoteIcon className={styles.quoteIcon} />
              </div>

              <p className={styles.comment}>&ldquo;{item.comment}&rdquo;</p>

              <div className={styles.cardFooter}>
                <div className={styles.stars}>
                  {[...Array(item.rating)].map((_, i) => (
                    <StarIcon key={i} width={16} height={16} className={styles.star} />
                  ))}
                </div>
                <span className={styles.verifiedBadge}>مشتری تایید شده</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



















// "use client";

// import { useEffect, useState } from "react";
// import styles from "./Comment.module.css";
// import { api } from "@/app/config";

// // آیکون ستاره
// const StarIcon = (props) => (
//   <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
//     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//   </svg>
// );

// // آیکون نقل‌قول
// const QuoteIcon = (props) => (
//   <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//     <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
//   </svg>
// );

// export default function Comment() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [isPaused, setIsPaused] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await api.get("/api/v1/public/reviews");

//         const reviews = Array.isArray(response.data)
//           ? response.data
//           : response.data?.results || [];

//         setTestimonials(reviews);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   const duplicatedTestimonials = [
//     ...testimonials,
//     ...testimonials,
//   ];

//   return (
//     <section className={styles.section} dir="rtl">
//       <div className={styles.inner}>
//         <div className={styles.header}>
//           <span className={styles.eyebrow}>CLIENT REVIEWS</span>

//           <h2 className={styles.title}>
//             نظرات مشتریان عزیز
//           </h2>

//           <span className={styles.divider} />

//           <p className={styles.subtitle}>
//             داستان رضایت افرادی که ولوت بار را برای استایل و مراقبت
//             خود انتخاب کرده‌اند.
//           </p>
//         </div>
//       </div>

//       {loading ? (
//         <div className={styles.loading}>
//           در حال دریافت نظرات...
//         </div>
//       ) : testimonials.length === 0 ? (
//         <div className={styles.loading}>
//           هنوز نظری ثبت نشده است.
//         </div>
//       ) : (
//         <div
//           className={styles.marqueeContainer}
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           <div
//             className={`${styles.marqueeTrack} ${
//               isPaused ? styles.paused : ""
//             }`}
//           >
//             {duplicatedTestimonials.map((item, index) => (
//               <div
//                 key={`${item.id}-${index}`}
//                 className={styles.card}
//               >
//                 <div className={styles.cardHeader}>
//                   <div className={styles.userInfo}>
//                     <div className={styles.avatarWrapper}>
//                       <div className={styles.avatarFallback}>
//                         {item.user_name?.charAt(0) || "م"}
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className={styles.userName}>
//                         {item.user_name || "مشتری"}
//                       </h3>

//                       <span className={styles.userRole}>
//                         مشتری سالن
//                       </span>
//                     </div>
//                   </div>

//                   <QuoteIcon className={styles.quoteIcon} />
//                 </div>

//                 <p className={styles.comment}>
//                   &ldquo;{item.comment}&rdquo;
//                 </p>

//                 <div className={styles.cardFooter}>
//                   <div className={styles.stars}>
//                     {[...Array(item.rating || 0)].map((_, i) => (
//                       <StarIcon
//                         key={i}
//                         width={16}
//                         height={16}
//                         className={styles.star}
//                       />
//                     ))}
//                   </div>

//                   <span className={styles.verifiedBadge}>
//                     مشتری تایید شده
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
