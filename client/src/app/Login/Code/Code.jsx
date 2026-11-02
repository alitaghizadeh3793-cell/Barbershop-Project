// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import style from "@/app/Login/Code/Code.module.css";
// import { useAuth } from "@/app/Context/Context";
// import { useRouter } from "next/navigation";

// export default function Code({ phone, onSuccess }) {
//   const { verifyCode, setNotif } = useAuth();

//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const inputsRef = useRef([]);
//   const router = useRouter();

//   const convertToEnglishNumber = (value) => {
//     return value
//       .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
//       .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
//   };

//   useEffect(() => {
//     inputsRef.current[0]?.focus();
//   }, []);

//   const handleChange = (value, index) => {
//     value = convertToEnglishNumber(value);

//     if (!/^\d?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputsRef.current[index + 1]?.focus();
//     }

//     if (newOtp.every((digit) => digit !== "")) {
//       handleSubmit(newOtp.join(""));
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1]?.focus();
//     }
//     if (e.key === "ArrowLeft" && index > 0) {
//       inputsRef.current[index - 1]?.focus();
//     }
//     if (e.key === "ArrowRight" && index < 5) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();

//     const pastedData = convertToEnglishNumber(e.clipboardData.getData("text"))
//       .replace(/\D/g, "")
//       .slice(0, 6);

//     if (!pastedData) return;

//     const newOtp = ["", "", "", "", "", ""];

//     pastedData.split("").forEach((digit, index) => {
//       newOtp[index] = digit;
//     });

//     setOtp(newOtp);

//     const lastIndex = Math.min(pastedData.length - 1, 5);
//     inputsRef.current[lastIndex]?.focus();

//     if (newOtp.every((digit) => digit !== "")) {
//       handleSubmit(newOtp.join(""));
//     }
//   };

//   const handleSubmit = async (code) => {
//     try {
//       await verifyCode(phone, code);

//       setNotif({
//         id: Date.now(),
//         message: "ورود موفق، خوش آمدید",
//         type: "success",
//       });

//       if (onSuccess) {
//         await onSuccess();
//       } else {
//         router.push("/");
//       }
//     } catch (error) {
//       if (error.response?.data?.error === "کد اشتباه است") {
//         setNotif({
//           id: Date.now(),
//           message: "کد تایید اشتباه است",
//           type: "error",
//         });
//       } else {
//         setNotif({
//           id: Date.now(),
//           message: "ورود ناموفق، لطفا دوباره امتحان کنید",
//           type: "error",
//         });
//       }

//       setOtp(["", "", "", "", "", ""]);
//       setTimeout(() => inputsRef.current[0]?.focus(), 0);
//     }
//   };

//   return (
//     <div className={style.bodyCode}>
//       <div className={style.boxContainer}>
//         <h2>کد تایید را وارد کنید</h2>

//         <div className={style.boxCodeContainer}>
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               className={style.boxCodeInput}
//               type="text"
//               inputMode="numeric"
//               pattern="[0-9]*"
//               autoComplete={index === 0 ? "one-time-code" : "off"}
//               maxLength={1}
//               value={digit}
//               ref={(el) => (inputsRef.current[index] = el)}
//               onChange={(e) => handleChange(e.target.value, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               onPaste={handlePaste}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "@/app/Login/Code/Code.module.css";
import { api } from "@/app/config";
import { useAuth } from "@/app/Context/Context";

export default function Code({ phone, mode, onSuccess }) {
const { setNotif, login } = useAuth();

const [otp, setOtp] = useState(["", "", "", "", "", ""]);
const [loading, setLoading] = useState(false);

const inputsRef = useRef([]);

// ==========================================
// تبدیل اعداد فارسی و عربی به انگلیسی
// ==========================================

const convertToEnglishNumber = (value) => {
return value
.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
};

// ==========================================
// Focus اولین input
// ==========================================

useEffect(() => {
const timer = setTimeout(() => {
inputsRef.current[0]?.focus();
}, 50);

return () => clearTimeout(timer);

}, []);

// ==========================================
// دریافت اطلاعات کاربر بعد از Login
// ==========================================

const loadCurrentUser = async () => {
const response = await api.get("/api/v1/auth/me/");

return response.data;

};

// ==========================================
// تغییر عدد
// ==========================================

const handleChange = (value, index) => {
if (loading) return;

value = convertToEnglishNumber(value);

// فقط یک رقم
if (!/^\d?$/.test(value)) {
  return;
}

const newOtp = [...otp];

newOtp[index] = value;

setOtp(newOtp);

// رفتن به input بعدی
if (value && index < 5) {
  inputsRef.current[index + 1]?.focus();
}

// اگر 6 رقم کامل شد
if (newOtp.every((digit) => digit !== "")) {
  handleSubmit(newOtp.join(""));
}

};

// ==========================================
// کنترل کیبورد
// ==========================================

const handleKeyDown = (e, index) => {
if (loading) return;

if (e.key === "Backspace" && !otp[index] && index > 0) {
  inputsRef.current[index - 1]?.focus();
}

if (e.key === "ArrowLeft" && index > 0) {
  inputsRef.current[index - 1]?.focus();
}

if (e.key === "ArrowRight" && index < 5) {
  inputsRef.current[index + 1]?.focus();
}

};

// ==========================================
// Paste
// ==========================================

const handlePaste = (e) => {
if (loading) return;

e.preventDefault();

const pastedData = convertToEnglishNumber(
  e.clipboardData.getData("text")
)
  .replace(/\D/g, "")
  .slice(0, 6);

if (!pastedData) return;

const newOtp = ["", "", "", "", "", ""];

pastedData.split("").forEach((digit, index) => {
  newOtp[index] = digit;
});

setOtp(newOtp);

const lastIndex = Math.min(pastedData.length - 1, 5);

inputsRef.current[lastIndex]?.focus();

if (newOtp.every((digit) => digit !== "")) {
  handleSubmit(newOtp.join(""));
}

};

// ==========================================
// ارسال OTP به بک‌اند
// ==========================================

const handleSubmit = async (code) => {
if (loading) return;

if (!code || code.length !== 6) {
  return;
}

setLoading(true);

try {
  let response;

  // ========================================
  // ثبت نام
  // ========================================

  if (mode === "signup") {
    response = await api.post(
      "/api/v1/auth/register/",
      {
        phone_number: phone,
        code: code,
      },
      {
        withCredentials: true,
      }
    );
  }

  // ========================================
  // ورود
  // ========================================

  else if (mode === "login") {
    response = await api.post(
      "/api/v1/auth/login/",
      {
        phone_number: phone,
        code: code,
      },
      {
        withCredentials: true,
      }
    );
  }

  // ========================================
  // حالت نامعتبر
  // ========================================

  else {
    throw new Error("حالت ورود مشخص نیست.");
  }

  console.log("OTP verification response:", response.data);

  // ========================================
  // مهم:
  //
  // بک‌اند Cookie را Set-Cookie می‌کند.
  //
  // بنابراین:
  // access / refresh را از response نمی‌گیریم.
  // ========================================

  // کمی صبر برای اطمینان از ثبت Cookie
  await new Promise((resolve) => setTimeout(resolve, 50));

  // ========================================
  // گرفتن اطلاعات کاربر از /me
  // ========================================

  const user = await loadCurrentUser();

  console.log("Current user:", user);

  if (!user) {
    throw new Error("اطلاعات کاربر دریافت نشد.");
  }

  // ========================================
  // ثبت کاربر در Context
  // ========================================

  login(user);

  // ========================================
  // پیام موفقیت
  // ========================================

  setNotif({
    id: Date.now(),
    message:
      mode === "signup"
        ? "ثبت نام با موفقیت انجام شد"
        : "ورود موفق، خوش آمدید",
    type: "success",
  });

  // ========================================
  // رفتن به پنل
  // ========================================

  if (onSuccess) {
    await onSuccess();
  }
} catch (error) {
  console.log(
    "OTP verification error:",
    error.response?.status,
    error.response?.data || error.message
  );

  const data = error.response?.data;

  let message =
    data?.code ||
    data?.detail ||
    data?.message ||
    data?.error ||
    "کد تایید اشتباه است";

  if (typeof message !== "string") {
    message = "کد تایید اشتباه است";
  }

  setNotif({
    id: Date.now(),
    message,
    type: "error",
  });

  setOtp(["", "", "", "", "", ""]);

  setTimeout(() => {
    inputsRef.current[0]?.focus();
  }, 0);
} finally {
  setLoading(false);
}

};

// ==========================================
// Render
// ==========================================

return ( <div className={style.bodyCode}> <div className={style.boxContainer}> <h2>کد تایید را وارد کنید</h2>

    <div className={style.boxCodeContainer}>
      {otp.map((digit, index) => (
        <input
          key={index}
          className={style.boxCodeInput}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          disabled={loading}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          onChange={(e) => {
            handleChange(e.target.value, index);
          }}
          onKeyDown={(e) => {
            handleKeyDown(e, index);
          }}
          onPaste={handlePaste}
        />
      ))}
    </div>

    {loading && <p>در حال بررسی کد...</p>}
  </div>
</div>

);
}

