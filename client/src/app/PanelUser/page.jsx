// "use client";

// import { useState, useRef, useEffect } from "react";
// import styles from "./page.module.css";
// import { useRouter } from "next/navigation";
// import OrdersList from "@/app/PanelUser/OrderList/page";
// import Logout from "@/app/PanelUser/Logout/page";

// export default function PanelUser() {
//   const router = useRouter();

//   // ==================== دیتای موقت (Mock Data) ====================
//   const [isLoggedIn] = useState(true);
//   const [authLoading] = useState(false);

//   const [dataForm, setDataForm] = useState({
//     firstname: "علی",
//     lastname: "محمدی",
//     phone: "09120000000",
//   });

//   // ==================== تب فعال منو ====================
//   const [activeTab, setActiveTab] = useState("orders");

//   // ==================== وضعیت پاپ‌آپ ویرایش نام ====================
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [nameDraft, setNameDraft] = useState("");
//   const inputRef = useRef(null);

//   const fullName =
//     dataForm?.firstname && dataForm?.lastname
//       ? `${dataForm.firstname} ${dataForm.lastname}`
//       : dataForm?.firstname || "کاربر مهمان";

//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.push("/");
//     }
//   }, [isLoggedIn, authLoading, router]);

//   useEffect(() => {
//     if (isModalOpen) {
//       setNameDraft(fullName === "کاربر مهمان" ? "" : fullName);
//       document.body.style.overflow = "hidden";
//       setTimeout(() => {
//         inputRef.current?.focus();
//         inputRef.current?.select();
//       }, 50);
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isModalOpen, fullName]);

//   useEffect(() => {
//     const onKeyDown = (e) => {
//       if (e.key === "Escape") setIsModalOpen(false);
//     };
//     document.addEventListener("keydown", onKeyDown);
//     return () => document.removeEventListener("keydown", onKeyDown);
//   }, []);

//   const openNameModal = () => setIsModalOpen(true);
//   const closeNameModal = () => setIsModalOpen(false);

//   const saveName = () => {
//     const trimmed = nameDraft.trim();
//     if (!trimmed) return;

//     const [firstname, ...rest] = trimmed.split(" ");
//     const lastname = rest.join(" ");

//     setDataForm((prev) => ({ ...prev, firstname, lastname }));
//     setIsModalOpen(false);
//   };

//   const handleNameKeyDown = (e) => {
//     if (e.key === "Enter") saveName();
//   };

//   const menuItems = [
//     {
//       id: "orders",
//       title: "سفارش‌های من",
//       icon: (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.menuIcon}>
//           <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
//           <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
//           <path d="M9 14l2 2 4-4"></path>
//         </svg>
//       ),
//     },
//     {
//       id: "logout",
//       title: "خروج از حساب",
//       icon: (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.menuIcon}>
//           <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//           <polyline points="16 17 21 12 16 7"></polyline>
//           <line x1="21" y1="12" x2="9" y2="12"></line>
//         </svg>
//       ),
//     },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "orders":
//         return <OrdersList />;
//       case "logout":
//         return <Logout />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <section className={styles.panelWrapper}>
//       <div className={styles.panelContainer}>
//         {/* سایدبار منو */}
//         <aside className={styles.sidebar}>
//           <div className={styles.sidebarInner}>
//             {/* دکمه بازگشت */}
//             <button
//               className={styles.backButton}
//               type="button"
//               onClick={() => router.push("/")}
//             >
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.backIcon}>
//                 <line x1="19" y1="12" x2="5" y2="12"></line>
//                 <polyline points="12 19 5 12 12 5"></polyline>
//               </svg>
//               <span>بازگشت به خانه</span>
//             </button>

//             {/* کارت پروفایل */}
//             <div className={styles.profileCard}>
//               <div className={styles.avatarWrap}>
//                 <div className={styles.avatar}>
//                   {fullName.trim().charAt(0) || "؟"}
//                 </div>
//                 <button
//                   type="button"
//                   className={styles.editBadge}
//                   aria-label="ویرایش نام"
//                   onClick={openNameModal}
//                   title="ویرایش نام"
//                 >
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//                     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//                   </svg>
//                 </button>
//               </div>

//               <div className={styles.profileDetails}>
//                 <h3 className={styles.nameText}>{fullName}</h3>
//                 {dataForm?.phone && (
//                   <span className={styles.phoneText}>{dataForm.phone}</span>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 className={styles.editLink}
//                 onClick={openNameModal}
//               >
//                 ویرایش مشخصات
//               </button>
//             </div>

//             {/* بخش پیمایش منو */}
//             <nav className={styles.menu}>
//               <span className={styles.menuTitle}>منوی حساب</span>
//               {menuItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => setActiveTab(item.id)}
//                   className={`${styles.menuItem} ${
//                     activeTab === item.id ? styles.menuItemActive : ""
//                   }`}
//                 >
//                   {item.icon}
//                   <span>{item.title}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* محتوای اصلی */}
//         <main className={styles.content}>
//           <div className={styles.contentInner}>{renderContent()}</div>
//         </main>
//       </div>

//       {/* ==================== مودال ویرایش نام ==================== */}
//       {isModalOpen && (
//         <div className={styles.overlay} onClick={closeNameModal}>
//           <div
//             className={styles.modal}
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="edit-name-title"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               type="button"
//               className={styles.modalClose}
//               aria-label="بستن"
//               onClick={closeNameModal}
//             >
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18"></line>
//                 <line x1="6" y1="6" x2="18" y2="18"></line>
//               </svg>
//             </button>

//             <div className={styles.modalHeader}>
//               <h2 id="edit-name-title" className={styles.modalTitle}>
//                 ویرایش نام و نام خانوادگی
//               </h2>
//               <p className={styles.modalDesc}>
//                 نام جدید خود را وارد کنید تا در فاکتورها و نوبت‌های شما اعمال شود.
//               </p>
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.modalLabel} htmlFor="fullNameInput">
//                 نام کامل
//               </label>
//               <input
//                 id="fullNameInput"
//                 ref={inputRef}
//                 type="text"
//                 className={styles.modalInput}
//                 value={nameDraft}
//                 onChange={(e) => setNameDraft(e.target.value)}
//                 onKeyDown={handleNameKeyDown}
//                 placeholder="مثلاً: علی محمدی"
//               />
//             </div>

//             <div className={styles.modalFooter}>
//               <button
//                 type="button"
//                 className={styles.btnSecondary}
//                 onClick={closeNameModal}
//               >
//                 انصراف
//               </button>
//               <button
//                 type="button"
//                 className={styles.btnPrimary}
//                 onClick={saveName}
//               >
//                 ذخیره تغییرات
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }




"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import OrdersList from "@/app/PanelUser/OrderList/page";
import Logout from "@/app/PanelUser/Logout/page";

import { useAuth } from "@/app/Context/Context";
import { api } from "@/app/config";

export default function PanelUser() {
  const router = useRouter();

  const { user: contextUser, authLoading } = useAuth();

  // =========================
  // وضعیت کاربر
  // =========================

  const [user, setUser] = useState(contextUser || null);
  const [userLoading, setUserLoading] = useState(true);

  // =========================
  // وضعیت تب
  // =========================

  const [activeTab, setActiveTab] = useState("orders");

  // =========================
  // ویرایش نام
  // =========================

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [savingName, setSavingName] = useState(false);

  const inputRef = useRef(null);

  // =========================
  // دریافت اطلاعات کاربر
  // GET /api/v1/auth/me
  // =========================

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const getCurrentUser = async () => {
      // اگر Context از ابتدا کاربر را ندارد،
      // درخواست API می‌زنیم تا وضعیت واقعی حساب مشخص شود.
      if (!contextUser) {
        try {
          const response = await api.get("/api/v1/auth/me");

          setUser(response.data);
        } catch (error) {
          console.error("Get current user error:", error);

          // اگر توکن نامعتبر/منقضی شده باشد
          if (error?.response?.status === 401) {
            router.replace("/Login");
            return;
          }

          setUser(null);
        } finally {
          setUserLoading(false);
        }

        return;
      }

      // کاربر از Context وجود دارد؛
      // ولی اطلاعات را از endpoint رسمی /me تازه می‌کنیم.
      try {
        const response = await api.get("/api/v1/auth/me");

        setUser(response.data);
      } catch (error) {
        console.error("Get current user error:", error);

        if (error?.response?.status === 401) {
          router.replace("/Login");
          return;
        }

        // در صورت خطای موقت، اطلاعات Context را نگه می‌داریم.
        setUser(contextUser);
      } finally {
        setUserLoading(false);
      }
    };

    getCurrentUser();
  }, [authLoading, contextUser, router]);

  // =========================
  // محافظت از صفحه
  // =========================

  useEffect(() => {
    if (authLoading || userLoading) {
      return;
    }

    if (!user) {
      router.replace("/Login");
    }
  }, [authLoading, userLoading, user, router]);

  // =========================
  // جلوگیری از نمایش لحظه‌ای پنل
  // =========================

  if (authLoading || userLoading) {
    return (
      <section className={styles.panelWrapper}>
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          در حال بررسی حساب کاربری...
        </div>
      </section>
    );
  }

  // اگر کاربر لاگین نیست
  if (!user) {
    return null;
  }

  // =========================
  // اطلاعات واقعی کاربر
  // =========================

  const firstName = user?.first_name || "";
  const lastName = user?.last_name || "";
  const phone = user?.phone_number || "";

  const fullName =
    firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName || lastName || "کاربر";

  // =========================
  // باز کردن مودال ویرایش
  // =========================

  const openNameModal = () => {
    const currentName =
      firstName || lastName
        ? `${firstName} ${lastName}`.trim()
        : "";

    setNameDraft(currentName);
    setIsModalOpen(true);
  };

  const closeNameModal = () => {
    if (savingName) {
      return;
    }

    setIsModalOpen(false);
  };

  // =========================
  // Focus روی input
  // =========================

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // =========================
  // بستن با Escape
  // =========================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !savingName) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [savingName]);

  // =========================
  // ذخیره نام
  // =========================

  const saveName = async () => {
    const trimmed = nameDraft.trim();

    if (!trimmed) {
      return;
    }

    /*
     * نکته مهم:
     *
     * طبق مستندات فعلی بک‌اند، endpoint ویرایش پروفایل
     * برای CUSTOMER وجود ندارد.
     *
     * GET /api/v1/auth/me فقط برای دریافت اطلاعات کاربر است.
     *
     * endpoint:
     * PUT /api/v1/barber/me
     *
     * فقط برای BARBER است و برای CUSTOMER نباید استفاده شود.
     *
     * بنابراین عمداً اینجا PATCH/PUT فرضی نمی‌زنیم.
     */

    console.warn(
      "ویرایش اطلاعات CUSTOMER در API فعلی مستند نشده است."
    );

    setIsModalOpen(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") {
      saveName();
    }
  };

  // =========================
  // منو
  // =========================

  const menuItems = [
    {
      id: "orders",
      title: "سفارش‌های من",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.menuIcon}
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      ),
    },

    {
      id: "logout",
      title: "خروج از حساب",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.menuIcon}
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      ),
    },
  ];

  // =========================
  // محتوای تب
  // =========================

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersList />;

      case "logout":
        return <Logout />;

      default:
        return null;
    }
  };

  // =========================
  // Render
  // =========================

  return (
    <section className={styles.panelWrapper}>
      <div className={styles.panelContainer}>
        {/* =========================
            Sidebar
        ========================= */}

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            {/* بازگشت */}
            <button
              className={styles.backButton}
              type="button"
              onClick={() => router.push("/")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.backIcon}
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>

              <span>بازگشت به خانه</span>
            </button>

            <div className={styles.stripeAccent} aria-hidden="true" />

            {/* =========================
                Profile
            ========================= */}

            <div className={styles.profileCard}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatarRing}>
                  <div className={styles.avatar}>
                    {fullName.trim().charAt(0) || "؟"}
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.editBadge}
                  aria-label="ویرایش نام"
                  onClick={openNameModal}
                  title="ویرایش نام"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>

              <div className={styles.profileDetails}>
                <h3 className={styles.nameText}>
                  {fullName}
                </h3>

                {phone && (
                  <span className={styles.phoneText}>
                    {phone}
                  </span>
                )}
              </div>

              <button
                type="button"
                className={styles.editLink}
                onClick={openNameModal}
              >
                ویرایش مشخصات
              </button>
            </div>

            {/* =========================
                Menu
            ========================= */}

            <nav className={styles.menu}>
              <span className={styles.menuTitle}>
                منوی حساب
              </span>

              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`${styles.menuItem} ${
                    activeTab === item.id
                      ? styles.menuItemActive
                      : ""
                  }`}
                >
                  {item.icon}

                  <span>{item.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* =========================
            Main Content
        ========================= */}

        <main className={styles.content}>
          <div className={styles.contentInner}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* =========================
          Edit Name Modal
      ========================= */}

      {isModalOpen && (
        <div
          className={styles.overlay}
          onClick={closeNameModal}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-name-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              aria-label="بستن"
              onClick={closeNameModal}
              disabled={savingName}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className={styles.modalHeader}>
              <div
                className={styles.modalStripe}
                aria-hidden="true"
              />

              <h2
                id="edit-name-title"
                className={styles.modalTitle}
              >
                ویرایش نام و نام خانوادگی
              </h2>

              <p className={styles.modalDesc}>
                نام جدید خود را وارد کنید تا در فاکتورها و
                نوبت‌های شما اعمال شود.
              </p>
            </div>

            <div className={styles.formGroup}>
              <label
                className={styles.modalLabel}
                htmlFor="fullNameInput"
              >
                نام کامل
              </label>

              <input
                id="fullNameInput"
                ref={inputRef}
                type="text"
                className={styles.modalInput}
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onKeyDown={handleNameKeyDown}
                placeholder="مثلاً: علی محمدی"
                disabled={savingName}
              />
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={closeNameModal}
                disabled={savingName}
              >
                انصراف
              </button>

              <button
                type="button"
                className={styles.btnPrimary}
                onClick={saveName}
                disabled={savingName}
              >
                {savingName
                  ? "در حال ذخیره..."
                  : "ذخیره تغییرات"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
