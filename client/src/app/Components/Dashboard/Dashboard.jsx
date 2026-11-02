"use client";

import { useState, useRef, useEffect } from "react";
import style from "@/app/Components/Dashboard/Dashboard.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ================= داده‌های مرتبط با آرایشگاه مردانه =================
const mockServices = [
  {
    id: 1,
    title: "کوتاهی و اصلاح مدرن مو",
    image: "/image-dashboard/photo-1532710093739-9470acff878f.avif",
  },
  {
    id: 2,
    title: "اصلاح و فرم‌دهی تخصصی ریش",
    image: "/image-dashboard/photo-1503951914875-452162b0f3f1.avif",
  },
  {
    id: 3,
    title: "پاکسازی و فشیال تخصصی پوست",
    image: "/image-dashboard/photo-1621605815971-fbc98d665033.avif",
  },
  {
    id: 4,
    title: "پکیج VIP و گریم تخصصی داماد",
    image: "/image-dashboard/photo-1599351431202-1e0f0137899a.avif",
  },
  {
    id: 5,
    title: "کراتینه و احیای حرفه‌ای مو",
    image: "/image-dashboard/photo-1585747860715-2ba37e788b70.avif",
  },
  {
    id: 6,
    title: "رنگ، استایل و استایلینگ مو",
    image: "/image-dashboard/photo-1503951914875-452162b0f3f1.avif",
  },
  {
    id: 7,
    title: "ویتامینه و پروتئین‌تراپی پوست سر",
    image: "/image-dashboard/photo-1517832606299-7ae9b720a186.avif",
  },
];
// =========================================================

export default function ServicesSlider() {
  const [items, setItems] = useState(mockServices);

  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    currentX.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    currentX.current = e.clientX;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    const diff = currentX.current - startX.current;
    const threshold = 50;

    if (Math.abs(diff) < threshold) return;

    if (diff < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const [visible, setVisible] = useState(6);
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisible(2);
      else if (window.innerWidth < 1024) setVisible(4);
      else setVisible(5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const actualVisible = Math.min(visible, items.length);
  const extendedItems = [...items, ...items.slice(0, actualVisible)];

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (index <= 0) return;
    setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (index === items.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 400);
    }
  }, [index, items.length]);

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  }, [isTransitioning]);

  const cardsWidth = 100 / actualVisible;
  const translateValue = `translateX(${index * cardsWidth}%)`;

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (items.length === 0) {
    return (
      <div className={style.box}>
        <h2 className={style.errorTitle}>خدماتی یافت نشد</h2>
        <p className={style.errorDesc}>
          متأسفانه در حال حاضر خدماتی برای نمایش وجود ندارد.
        </p>
      </div>
    );
  }

  return (
    <section className={style.sliderContainer} dir="rtl">
      <div className={style.header}>
        <h2 className={style.sectionTitle}>خدمات تخصصی سالن ما</h2>
      </div>

      <div className={style.sliderShell}>
        <button
          className={`${style.navBtn} ${style.nextBtn}`}
          onClick={nextSlide}
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>

        <div className={style.sliderWrapper}>
          <div
            ref={containerRef}
            className={style.cardsContainer}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              transform: translateValue,
              transition: isTransitioning ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            }}
          >
            {extendedItems.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className={style.cardWrapper}
                style={{ flex: `0 0 ${100 / actualVisible}%` }}
              >
                <button
                  type="button"
                  className={style.productCard}
                  onClick={() => router.push(`/Services/${item.id}`)}
                >
                  <Image
                    unoptimized
                    src={item.image}
                    alt={item.title}
                    fill
                    className={style.productImage}
                  />
                  <div className={style.overlay}>
                    <h3 className={style.productTitle}>{item.title}</h3>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${style.navBtn} ${style.prevBtn}`}
          onClick={prevSlide}
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
















// "use client";

// import { useState, useRef, useEffect } from "react";
// import style from "@/app/Components/Dashboard/Dashboard.module.css";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { api } from "@/app/config";

// export default function ServicesSlider() {
//   const [items, setItems] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const startX = useRef(0);
//   const currentX = useRef(0);
//   const isDragging = useRef(false);

//   const [visible, setVisible] = useState(6);
//   const [index, setIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(true);

//   const router = useRouter();

//   // ================= دریافت سرویس‌ها از بک‌اند =================
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await api.get("/api/v1/public/services");

//         const services = Array.isArray(response.data)
//           ? response.data
//           : response.data?.results || [];

//         setItems(services);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   // ================= Responsive =================
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setVisible(2);
//       } else if (window.innerWidth < 1024) {
//         setVisible(4);
//       } else {
//         setVisible(5);
//       }
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // ================= Slider =================

//   const actualVisible = Math.min(visible, items.length);

//   const extendedItems =
//     items.length > 0
//       ? [...items, ...items.slice(0, actualVisible)]
//       : [];

//   const nextSlide = () => {
//     if (items.length <= actualVisible) return;

//     setIndex((prev) => prev + 1);
//   };

//   const prevSlide = () => {
//     if (index <= 0) return;

//     setIndex((prev) => prev - 1);
//   };

//   // ================= Swipe =================

//   const handlePointerDown = (e) => {
//     isDragging.current = true;
//     startX.current = e.clientX;
//     currentX.current = e.clientX;
//   };

//   const handlePointerMove = (e) => {
//     if (!isDragging.current) return;

//     currentX.current = e.clientX;
//   };

//   const handlePointerUp = () => {
//     if (!isDragging.current) return;

//     isDragging.current = false;

//     const diff = currentX.current - startX.current;
//     const threshold = 50;

//     if (Math.abs(diff) < threshold) return;

//     if (diff < 0) {
//       nextSlide();
//     } else {
//       prevSlide();
//     }
//   };

//   // ================= Infinite Slider =================

//   useEffect(() => {
//     if (items.length === 0) return;

//     if (index === items.length) {
//       const timeout = setTimeout(() => {
//         setIsTransitioning(false);
//         setIndex(0);
//       }, 400);

//       return () => clearTimeout(timeout);
//     }
//   }, [index, items.length]);

//   useEffect(() => {
//     if (!isTransitioning) {
//       requestAnimationFrame(() => {
//         setIsTransitioning(true);
//       });
//     }
//   }, [isTransitioning]);

//   // ================= Auto Slide =================

//   useEffect(() => {
//     if (items.length <= actualVisible) return;

//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [items.length, actualVisible]);

//   // ================= Loading =================

//   if (loading) {
//     return (
//       <div className={style.box}>
//         <h2 className={style.errorTitle}>
//           در حال دریافت خدمات...
//         </h2>
//       </div>
//     );
//   }

//   // ================= Empty =================

//   if (items.length === 0) {
//     return (
//       <div className={style.box}>
//         <h2 className={style.errorTitle}>
//           خدماتی یافت نشد
//         </h2>

//         <p className={style.errorDesc}>
//           متأسفانه در حال حاضر خدماتی برای نمایش وجود ندارد.
//         </p>
//       </div>
//     );
//   }

//   const cardsWidth = 100 / actualVisible;

//   const translateValue = `translateX(${index * cardsWidth}%)`;

//   return (
//     <section className={style.sliderContainer} dir="rtl">
//       <div className={style.header}>
//         <h2 className={style.sectionTitle}>
//           خدمات تخصصی سالن ما
//         </h2>
//       </div>

//       <div className={style.sliderShell}>
//         {/* Next */}
//         <button
//           className={`${style.navBtn} ${style.nextBtn}`}
//           onClick={nextSlide}
//           aria-label="Next"
//           type="button"
//         >
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="m15 18-6-6 6-6" />
//           </svg>
//         </button>

//         <div className={style.sliderWrapper}>
//           <div
//             className={style.cardsContainer}
//             onPointerDown={handlePointerDown}
//             onPointerMove={handlePointerMove}
//             onPointerUp={handlePointerUp}
//             onPointerLeave={handlePointerUp}
//             onPointerCancel={handlePointerUp}
//             style={{
//               transform: translateValue,
//               transition: isTransitioning
//                 ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
//                 : "none",
//             }}
//           >
//             {extendedItems.map((item, i) => (
//               <div
//                 key={`${item.id}-${i}`}
//                 className={style.cardWrapper}
//                 style={{
//                   flex: `0 0 ${100 / actualVisible}%`,
//                 }}
//               >
//                 <button
//                   type="button"
//                   className={style.productCard}
//                   onClick={() => router.push("/booking")}
//                 >
//                   <Image
//                     unoptimized
//                     src={
//                       item.image ||
//                       "/image-dashboard/photo-1532710093739-9470acff878f.avif"
//                     }
//                     alt={item.title}
//                     fill
//                     className={style.productImage}
//                   />

//                   <div className={style.overlay}>
//                     <h3 className={style.productTitle}>
//                       {item.title}
//                     </h3>
//                   </div>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Previous */}
//         <button
//           className={`${style.navBtn} ${style.prevBtn}`}
//           onClick={prevSlide}
//           aria-label="Previous"
//           type="button"
//         >
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="m9 18 6-6-6-6" />
//           </svg>
//         </button>
//       </div>
//     </section>
//   );
// }
