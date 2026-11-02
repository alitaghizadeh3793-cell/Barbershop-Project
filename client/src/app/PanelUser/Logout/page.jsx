// "use client";

// import { useState } from "react";
// import styles from "./page.module.css";

// export default function Logout() {
//   const [showModal, setShowModal] = useState(false);

//   // ==================== خروج از حساب (فعلاً بدون منطق واقعی) ====================
//   // این تابع فعلاً فقط مودال رو می‌بنده تا ظاهر و رفتار صفحه مشخص باشه.
//   // وقتی Context و بک‌اند رو وصل کردی، این تابع باید شبیه این بشه:
//   //
//   //   const { logout, setIsLoggedIn, setNotif } = useAuth();
//   //   const router = useRouter();
//   //
//   //   const handleLogout = async () => {
//   //     try {
//   //       await api.get("/api/auth/logout/");
//   //       logout();
//   //       setIsLoggedIn(false);
//   //       router.replace("/");
//   //       setNotif({ id: Date.now(), message: "با موفقیت از حساب خود خارج شدید", type: "success" });
//   //     } catch (err) {
//   //       setNotif({ id: Date.now(), message: "خطا در خروج، لطفا دوباره امتحان کنید", type: "error" });
//   //     }
//   //   };
//   const handleLogout = () => {
//     // TODO: اتصال به بک‌اند و Context واقعی (منطق بالا) بعداً همینجا اضافه می‌شه
//     setShowModal(false);
//   };

//   return (
//     <div className={styles.root}>
//       <div className={styles.container}>
//         <div className={styles.iconWrap}>
//           <svg viewBox="0 0 24 24" width="28" height="28">
//             <path
//               d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.6"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M16 8l4 4-4 4M20 12H9"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.6"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>

//         <h1 className={styles.title}>خروج از حساب کاربری</h1>

//         <p className={styles.description}>
//           با خروج از حساب، برای دسترسی به اطلاعات سفارش‌ها مجدداً باید وارد
//           شوید.
//         </p>

//         <button
//           type="button"
//           className={styles.logoutBtn}
//           onClick={() => setShowModal(true)}
//         >
//           خروج از حساب
//         </button>
//       </div>

//       {showModal && (
//         <div className={styles.overlay} onClick={() => setShowModal(false)}>
//           <div
//             className={styles.modal}
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="logout-confirm-title"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3 id="logout-confirm-title" className={styles.modalTitle}>
//               تأیید خروج
//             </h3>

//             <p className={styles.modalText}>
//               آیا از خروج از حساب کاربری مطمئن هستید؟
//             </p>

//             <div className={styles.actions}>
//               <button
//                 type="button"
//                 className={styles.cancelBtn}
//                 onClick={() => setShowModal(false)}
//               >
//                 انصراف
//               </button>

//               <button
//                 type="button"
//                 className={styles.confirmBtn}
//                 onClick={handleLogout}
//               >
//                 بله، خارج شو
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import styles from "./page.module.css";
export default function Logout() {
  const [showModal, setShowModal] = useState(false);
  // ==================== خروج از حساب (فعلاً بدون منطق واقعی) ====================
  // این تابع فعلاً فقط مودال رو می‌بنده تا ظاهر و رفتار صفحه مشخص باشه.
  // وقتی Context و بک‌اند رو وصل کردی، این تابع باید شبیه این بشه:
  //
  //   const { logout, setIsLoggedIn, setNotif } = useAuth();
  //   const router = useRouter();
  //
  //   const handleLogout = async () => {
  //     try {
  //       await api.get("/api/auth/logout/");
  //       logout();
  //       setIsLoggedIn(false);
  //       router.replace("/");
  //       setNotif({ id: Date.now(), message: "با موفقیت از حساب خود خارج شدید", type: "success" });
  //     } catch (err) {
  //       setNotif({ id: Date.now(), message: "خطا در خروج، لطفا دوباره امتحان کنید", type: "error" });
  //     }
  //   };
  const handleLogout = () => {
    // TODO: اتصال به بک‌اند و Context واقعی (منطق بالا) بعداً همینجا اضافه می‌شه
    setShowModal(false);
  };
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.iconWrap}>
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path
              d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 8l4 4-4 4M20 12H9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.stripeAccent} aria-hidden="true"></div>
        <h1 className={styles.title}>خروج از حساب کاربری</h1>
        <p className={styles.description}>
          با خروج از حساب، برای دسترسی به اطلاعات سفارش‌ها مجدداً باید وارد
          شوید.
        </p>
        <button
          type="button"
          className={styles.logoutBtn}
          onClick={() => setShowModal(true)}
        >
          خروج از حساب
        </button>
      </div>
      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-confirm-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="logout-confirm-title" className={styles.modalTitle}>
              تأیید خروج
            </h3>
            <p className={styles.modalText}>
              آیا از خروج از حساب کاربری مطمئن هستید؟
            </p>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                انصراف
              </button>
              <button
                type="button"
                className={styles.confirmBtn}
                onClick={handleLogout}
              >
                بله، خارج شو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}