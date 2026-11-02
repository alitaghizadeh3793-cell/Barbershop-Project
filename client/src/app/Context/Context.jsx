// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import { api } from "@/app/config";

// const AppContext = createContext();

// export function AppProvider({ children }) {
//   const [notif, setNotif] = useState(null);

//   const [user, setUser] = useState(null);

//   const [authLoading, setAuthLoading] = useState(true);

//   const isLoggedIn = !!user;

//   // ==========================================
//   // بررسی وضعیت ورود
//   // ==========================================

//   useEffect(() => {
//     let mounted = true;

//     const checkAuth = async () => {
//       try {
//         /*
//          * اگر Cookie وجود داشته باشد،
//          * مرورگر خودش آن را همراه request می‌فرستد.
//          *
//          * نیازی به localStorage نداریم.
//          */

//         const response = await api.get(
//           "/api/v1/auth/me/"
//         );

//         if (mounted) {
//           setUser(response.data);
//         }
//       } catch (error) {
//         console.log(
//           "Auth check:",
//           error.response?.status,
//           error.response?.data
//         );

//         if (mounted) {
//           setUser(null);
//         }
//       } finally {
//         if (mounted) {
//           setAuthLoading(false);
//         }
//       }
//     };

//     checkAuth();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // ==========================================
//   // Login
//   // ==========================================

//   const login = (userData) => {
//     /*
//      * Cookie توسط بک‌اند ست شده.
//      *
//      * ما فقط user را داخل Context نگه می‌داریم.
//      */

//     setUser(userData);
//   };

//   // ==========================================
//   // Logout
//   // ==========================================

//   const logout = async () => {
//     try {
//       /*
//        * اگر بک‌اند endpoint logout دارد،
//        * اینجا باید آن را صدا بزنیم تا Cookie
//        * از سمت سرور پاک/blacklist شود.
//        */

//       await api.post("/api/v1/auth/logout/");
//     } catch (error) {
//       console.log(
//         "Logout API error:",
//         error.response?.data || error.message
//       );
//     } finally {
//       setUser(null);
//     }
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         notif,
//         setNotif,

//         user,
//         setUser,

//         isLoggedIn,
//         authLoading,

//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AppContext);
// }





"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "@/app/config";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [notif, setNotif] = useState(null);

  const [user, setUser] = useState(null);

  // تا زمانی که وضعیت واقعی Cookie مشخص نشده
  const [authLoading, setAuthLoading] = useState(true);

  const isLoggedIn = Boolean(user);

  // =====================================================
  // دریافت کاربر فعلی
  // =====================================================

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/api/v1/auth/me/");

      setUser(response.data);

      return response.data;
    } catch (error) {
      /*
       * 401 یعنی Cookie معتبر برای کاربر وجود ندارد
       * یا کاربر لاگین نیست.
       *
       * اینجا خطا را به UI نمایش نمی‌دهیم.
       */

      if (error.response?.status === 401) {
        setUser(null);
        return null;
      }

      /*
       * خطاهای دیگر مثل 500 یا Network Error
       * هم نباید باعث شود user قبلی باقی بماند.
       */

      setUser(null);

      console.error(
        "Fetch current user error:",
        error.response?.data || error.message
      );

      return null;
    }
  };

  // =====================================================
  // بررسی اولیه Auth
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const response = await api.get("/api/v1/auth/me/");

        if (!mounted) return;

        setUser(response.data);
      } catch (error) {
        if (!mounted) return;

        /*
         * 401 در این درخواست طبیعی است
         * اگر Cookie لاگین وجود نداشته باشد.
         */

        setUser(null);

        if (error.response?.status !== 401) {
          console.error(
            "Auth check error:",
            error.response?.data || error.message
          );
        }
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // Login
  // =====================================================

  const login = async () => {
    /*
     * درخواست Login/OTP قبلاً در کامپوننت Code
     * به بک‌اند ارسال شده است.
     *
     * بک‌اند در صورت موفقیت باید Cookie را Set-Cookie کند.
     *
     * بنابراین اینجا توکن access/refresh را
     * از response نمی‌گیریم و ذخیره نمی‌کنیم.
     *
     * فقط /me/ را صدا می‌زنیم تا اطلاعات کاربر
     * را از Cookie دریافت کنیم.
     */

    try {
      const response = await api.get("/api/v1/auth/me/");

      setUser(response.data);

      return response.data;
    } catch (error) {
      setUser(null);

      console.error(
        "Login user fetch error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // =====================================================
  // Logout
  // =====================================================

  const logout = async () => {
    try {
      /*
       * بک‌اند باید Cookie مربوط به احراز هویت
       * را اینجا حذف/باطل کند.
       */

      await api.post("/api/v1/auth/logout/");
    } catch (error) {
      console.error(
        "Logout API error:",
        error.response?.data || error.message
      );
    } finally {
      /*
       * چه Logout موفق باشد چه درخواست خطا بدهد،
       * وضعیت UI را از حساب خارج می‌کنیم.
       */

      setUser(null);
    }
  };

  // =====================================================
  // Context
  // =====================================================

  return (
    <AppContext.Provider
      value={{
        // Notifications
        notif,
        setNotif,

        // User
        user,
        setUser,

        // Auth state
        isLoggedIn,
        authLoading,

        // Auth functions
        login,
        logout,
        fetchCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// =====================================================
// useAuth
// =====================================================

export function useAuth() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AppProvider"
    );
  }

  return context;
}
