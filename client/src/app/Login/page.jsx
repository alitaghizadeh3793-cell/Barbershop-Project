// "use client";

// import React, { useState } from "react";
// import styles from "./page.module.css";
// import { useAuth } from "@/app/Context/Context";
// import Code from "@/app/Login/Code/Code";

// // آیکون‌های ساده و یکدست (بدون وابستگی به کتابخونه بیرونی مثل boxicons)
// function IconPerson() {
//   return (
//     <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M20 21a8 8 0 0 0-16 0" />
//       <circle cx="12" cy="8" r="4" />
//     </svg>
//   );
// }

// function IconPhone() {
//   return (
//     <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//     </svg>
//   );
// }

// export default function Login() {
//   const [status, setStatus] = useState(false);
//   const { setNotif } = useAuth();

//   // وقتی مقدار داره یعنی مرحله‌ی ورود کد تأیید فعاله؛ مقدارش همون شماره‌ایه
//   // که کد براش فرستاده شده و باید به کامپوننت Code داده بشه.
//   const [otpPhone, setOtpPhone] = useState(null);

//   // فرم ثبت‌نام: فقط نام، نام‌خانوادگی و شماره تلفن (بدون رمز عبور)
//   const [signupData, setSignupData] = useState({
//     firstname: "",
//     lastname: "",
//     phone: "",
//   });

//   // فرم ورود: فقط شماره تلفن
//   const [loginData, setLoginData] = useState({
//     phone: "",
//   });

//   const handleToggleStatus = () => {
//     setStatus(!status);
//   };

//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData((prev) => ({ ...prev, [name]: value }));
//   };

//   const phoneRegex = /^09\d{9}$/;

//   const handleSubmitSignup = (e) => {
//     e.preventDefault();
//     const { firstname, lastname, phone } = signupData;

//     if (firstname.trim() === "")
//       return setNotif({ id: Date.now(), message: "نام را وارد کنید", type: "error" });
//     if (lastname.trim() === "")
//       return setNotif({ id: Date.now(), message: "نام‌خانوادگی را وارد کنید", type: "error" });
//     if (!phoneRegex.test(phone))
//       return setNotif({ id: Date.now(), message: "شماره موبایل معتبر نیست", type: "error" });

//     // TODO: اینجا باید درخواست واقعی ثبت‌نام به بک‌اند زده بشه، مثلاً:
//     // await api.post("/api/auth/signup/", { firstname, lastname, phone });
//     const dataToSend = { firstname, lastname, phone, createdAt: new Date() };
//     console.log("ارسال به بک‌اند (ثبت‌نام):", dataToSend);

//     setNotif({ id: Date.now(), message: "با موفقیت ثبت‌نام شدید", type: "success" });
//     setSignupData({ firstname: "", lastname: "", phone: "" });
//   };

//   const handleSubmitLogin = (e) => {
//     e.preventDefault();
//     const { phone } = loginData;

//     if (!phoneRegex.test(phone))
//       return setNotif({ id: Date.now(), message: "شماره موبایل معتبر نیست", type: "error" });

//     // TODO: اینجا باید درخواست واقعی ارسال کد به بک‌اند زده بشه، مثلاً:
//     // await api.post("/api/auth/send-code/", { phone });
//     console.log("ارسال به بک‌اند (ارسال کد):", { phone });

//     setNotif({ id: Date.now(), message: "کد ورود برای شما ارسال شد", type: "success" });

//     // به‌جای موندن تو همین صفحه، می‌ریم مرحله‌ی وارد کردن کد تأیید
//     setOtpPhone(phone);
//   };

//   // بعد از ارسال شماره از فرم ورود، به‌جای فرم‌ها، مرحله‌ی کد تأیید نشون داده می‌شه.
//   if (otpPhone) {
//     return (
//       <div className={styles.loginBody}>
//         <div className={styles.otpWrap}>
//           <button
//             type="button"
//             className={styles.backToPhone}
//             onClick={() => setOtpPhone(null)}
//           >
//             بازگشت و ویرایش شماره
//           </button>
//           <Code phone={otpPhone} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.loginBody}>
//       <div className={styles.loginSection}>
//         <main className={styles.loginContent}>
//           {/* فرم ورود: فقط شماره موبایل */}
//           <form className={styles.loginFirst} onSubmit={handleSubmitLogin} noValidate>
//             <h1>ورود</h1>
//             <div>
//               <div className={styles.loginInput}>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={loginData.phone}
//                   onChange={handleLoginChange}
//                   required
//                 />
//                 <label>شماره موبایل</label>
//                 <span className={styles.icon}>
//                   <IconPhone />
//                 </span>
//                 <span className={styles.line}></span>
//               </div>
//             </div>

//             <p className={styles.helperText}>
//               کد تأیید برای همین شماره پیامک می‌شود.
//             </p>
//             <button type="submit">ورود</button>
//           </form>

//           {/* فرم ثبت‌نام: نام، نام‌خانوادگی، شماره موبایل */}
//           <form className={styles.loginFirst} onSubmit={handleSubmitSignup} noValidate>
//             <h1>ثبت نام</h1>
//             <div>
//               <div className={styles.loginInput}>
//                 <input
//                   type="text"
//                   name="firstname"
//                   value={signupData.firstname}
//                   onChange={handleSignupChange}
//                   required
//                 />
//                 <label>نام</label>
//                 <span className={styles.icon}>
//                   <IconPerson />
//                 </span>
//                 <span className={styles.line}></span>
//               </div>

//               <div className={styles.loginInput}>
//                 <input
//                   type="text"
//                   name="lastname"
//                   value={signupData.lastname}
//                   onChange={handleSignupChange}
//                   required
//                 />
//                 <label>نام‌خانوادگی</label>
//                 <span className={styles.icon}>
//                   <IconPerson />
//                 </span>
//                 <span className={styles.line}></span>
//               </div>

//               <div className={styles.loginInput}>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={signupData.phone}
//                   onChange={handleSignupChange}
//                   required
//                 />
//                 <label>شماره موبایل</label>
//                 <span className={styles.icon}>
//                   <IconPhone />
//                 </span>
//                 <span className={styles.line}></span>
//               </div>
//             </div>

//             <button className={styles.signupButton} type="submit">
//               ثبت نام
//             </button>
//           </form>

//           {/* بخش تغییر وضعیت (تغییر بین ورود و ثبت‌نام) */}
//           <section className={status ? styles.signup : styles.loginLast}>
//             <h1 className={styles.loginTitelH1}>خوش آمدید</h1>
//             <h3 className={styles.loginTextH3}>
//               {status ? "آیا از قبل حساب کاربری دارید؟" : "حساب کاربری ندارید؟"}
//             </h3>
//             <button className={styles.loginButtonSignup} type="button" onClick={handleToggleStatus}>
//               {status ? "ورود" : "ثبت نام"}
//             </button>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Code from "@/app/Login/Code/Code";
import { useAuth } from "@/app/Context/Context";
import { api } from "@/app/config";

function IconPerson() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 0-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Login() {
  const router = useRouter();

  const { setNotif, isLoggedIn, authLoading } = useAuth();
  const [status, setStatus] = useState(false);
  const [otpPhone, setOtpPhone] = useState(null);
  const [otpMode, setOtpMode] = useState(null);
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
  });

  const [loginData, setLoginData] = useState({
    phone: "",
  });

  const phoneRegex = /^09\d{9}$/;

  // ==========================================
  // اگر قبلاً لاگین است، ورود ممنوع
  // ==========================================

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      router.replace("/PanelUser");
    }
  }, [isLoggedIn, authLoading, router]);

  // ==========================================
  // تغییر فرم
  // ==========================================

  const handleSignupChange = (e) => {
    const { name, value } = e.target;

    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleStatus = () => {
    setStatus((prev) => !prev);
  };

  // ==========================================
  // ثبت نام - مرحله اول
  // ==========================================

  const handleSubmitSignup = async (e) => {
    e.preventDefault();

    const firstname = signupData.firstname.trim();
    const lastname = signupData.lastname.trim();
    const phone = signupData.phone.trim();

    if (!firstname) {
      return setNotif({
        id: Date.now(),
        message: "نام را وارد کنید",
        type: "error",
      });
    }

    if (!lastname) {
      return setNotif({
        id: Date.now(),
        message: "نام خانوادگی را وارد کنید",
        type: "error",
      });
    }

    if (!phoneRegex.test(phone)) {
      return setNotif({
        id: Date.now(),
        message: "شماره موبایل معتبر نیست",
        type: "error",
      });
    }

    try {
      await api.post("/api/v1/auth/register/", {
        first_name: firstname,
        last_name: lastname,
        phone_number: phone,
      });

      setNotif({
        id: Date.now(),
        message: "کد تایید برای شما ارسال شد",
        type: "success",
      });

      setOtpPhone(phone);
      setOtpMode("signup");
    } catch (error) {
      console.log("Signup error:", error);

      const message = error.response?.data?.detail || "ثبت نام انجام نشد";

      setNotif({
        id: Date.now(),
        message,
        type: "error",
      });
    }
  };

  // ==========================================
  // ورود - مرحله اول
  // ==========================================

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const phone = loginData.phone.trim();

    if (!phoneRegex.test(phone)) {
      return setNotif({
        id: Date.now(),
        message: "شماره موبایل معتبر نیست",
        type: "error",
      });
    }

    try {
      await api.post("/api/v1/auth/login/", {
        phone_number: phone,
      });

      setNotif({
        id: Date.now(),
        message: "کد ورود برای شما ارسال شد",
        type: "success",
      });

      setOtpPhone(phone);
      setOtpMode("login");
    } catch (error) {
      console.log("Login error:", error);

      const message = error.response?.data?.detail || "کد ورود ارسال نشد";

      setNotif({
        id: Date.now(),
        message,
        type: "error",
      });
    }
  };

  // ==========================================
  // صفحه OTP
  // ==========================================

  if (otpPhone) {
    return (
      <div className={styles.loginBody}>
        <div className={styles.otpWrap}>
          <button
            type="button"
            className={styles.backToPhone}
            onClick={() => {
              setOtpPhone(null);
              setOtpMode(null);
            }}
          >
            بازگشت و ویرایش شماره
          </button>

          <Code
            phone={otpPhone}
            mode={otpMode}
            signupData={signupData}
            onSuccess={() => {
              router.replace("/PanelUser");
            }}
          />
        </div>
      </div>
    );
  }

  if (authLoading || isLoggedIn) {
    return null;
  }

  return (
    <div className={styles.loginBody}>
      <div className={styles.loginSection}>
        <main className={styles.loginContent}>
          {/* ================= ورود ================= */}

          <form
            className={styles.loginFirst}
            onSubmit={handleSubmitLogin}
            noValidate
          >
            <h1>ورود</h1>

            <div>
              <div className={styles.loginInput}>
                <input
                  type="tel"
                  name="phone"
                  value={loginData.phone}
                  onChange={handleLoginChange}
                  required
                />

                <label>شماره موبایل</label>

                <span className={styles.icon}>
                  <IconPhone />
                </span>

                <span className={styles.line}></span>
              </div>
            </div>

            <p className={styles.helperText}>
              کد تأیید برای همین شماره پیامک می‌شود.
            </p>

            <button type="submit">ورود</button>
          </form>

          {/* ================= ثبت نام ================= */}

          <form
            className={styles.loginFirst}
            onSubmit={handleSubmitSignup}
            noValidate
          >
            <h1>ثبت نام</h1>

            <div>
              <div className={styles.loginInput}>
                <input
                  type="text"
                  name="firstname"
                  value={signupData.firstname}
                  onChange={handleSignupChange}
                  required
                />

                <label>نام</label>

                <span className={styles.icon}>
                  <IconPerson />
                </span>

                <span className={styles.line}></span>
              </div>

              <div className={styles.loginInput}>
                <input
                  type="text"
                  name="lastname"
                  value={signupData.lastname}
                  onChange={handleSignupChange}
                  required
                />

                <label>نام‌خانوادگی</label>

                <span className={styles.icon}>
                  <IconPerson />
                </span>

                <span className={styles.line}></span>
              </div>

              <div className={styles.loginInput}>
                <input
                  type="tel"
                  name="phone"
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  required
                />

                <label>شماره موبایل</label>

                <span className={styles.icon}>
                  <IconPhone />
                </span>

                <span className={styles.line}></span>
              </div>
            </div>

            <button className={styles.signupButton} type="submit">
              ثبت نام
            </button>
          </form>

          {/* ================= تغییر حالت ================= */}

          <section className={status ? styles.signup : styles.loginLast}>
            <h1 className={styles.loginTitelH1}>خوش آمدید</h1>

            <h3 className={styles.loginTextH3}>
              {status ? "آیا از قبل حساب کاربری دارید؟" : "حساب کاربری ندارید؟"}
            </h3>

            <button
              className={styles.loginButtonSignup}
              type="button"
              onClick={handleToggleStatus}
            >
              {status ? "ورود" : "ثبت نام"}
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
