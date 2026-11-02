// // دیتای مشترک آرایشگرها. این فایل رو هم صفحه «درباره ما» (لیست تیم) و هم
// // صفحه جزئیات هر آرایشگر (app/Barbers/[id]/page.jsx) استفاده می‌کنن.
// // وقتی به بک‌اند وصل کردی، به‌جای این آرایه یه fetch از API واقعی بذار.

// export const barbers = [
//   {
//     id: "master-rezaei",
//     name: "استاد رضایی",
//     role: "سلمانی ارشد و بنیان‌گذار",
//     image: "/image-dashboard/photo-1503951914875-452162b0f3f1.avif",
//     coverImage: "/image-dashboard/photo-1503951914875-452162b0f3f1.avif",
//     experienceYears: 14,
//     clientsServed: "۳۲۰۰+",
//     specialties: ["کوتاهی کلاسیک", "اصلاح با تیغ سنتی", "استایل ریش"],
//     bio: "استاد رضایی بنیان‌گذار ولوت بار و با بیش از ۱۴ سال تجربه، یکی از باتجربه‌ترین سلمانی‌های شهره. سبک کارش ترکیبی از تکنیک‌های سنتی اصلاح با تیغ و استانداردهای مدرن آرایشگری مردانه‌ست. اکثر مشتری‌های قدیمی سالن مستقیماً برای کار با ایشون رزرو می‌گیرن.",
//     certificates: [
//       { title: "مدرک درجه یک آرایشگری مردانه", issuer: "سازمان فنی و حرفه‌ای", year: "۱۳۹۰" },
//       { title: "دوره تخصصی اصلاح با تیغ سنتی", issuer: "آکادمی باربر ترکیه", year: "۱۳۹۵" },
//       { title: "گواهی مدیریت سالن", issuer: "اتحادیه آرایشگران", year: "۱۴۰۰" },
//     ],
//     gallery: [
//       "/image-content/barbers/rezaei/work-1.jpg",
//       "/image-content/barbers/rezaei/work-2.jpg",
//       "/image-content/barbers/rezaei/work-3.jpg",
//       "/image-content/barbers/rezaei/work-4.jpg",
//     ],
//   },
//   {
//     id: "master-karimi",
//     name: "استاد کریمی",
//     role: "متخصص اصلاح ریش",
//     image: "/image-dashboard/photo-1517832606299-7ae9b720a186.avif",
//     coverImage: "/image-dashboard/photo-1517832606299-7ae9b720a186.avif",
//     experienceYears: 9,
//     clientsServed: "۱۸۰۰+",
//     specialties: ["فرم‌دهی ریش", "اصلاح خط ریش", "رنگ ریش"],
//     bio: "استاد کریمی تمرکز اصلیش روی فرم‌دهی و اصلاح تخصصی ریشه؛ از ریش‌های کوتاه و مرتب تا مدل‌های بلند و حجیم. دقت بالا تو خط زدن و تقارن، ایشون رو به انتخاب اول خیلی از مشتری‌هایی تبدیل کرده که به ریششون اهمیت ویژه می‌دن.",
//     certificates: [
//       { title: "دوره تخصصی فرم‌دهی ریش", issuer: "آکادمی باربر دبی", year: "۱۳۹۸" },
//       { title: "گواهی رنگ و دکلره تخصصی", issuer: "سازمان فنی و حرفه‌ای", year: "۱۴۰۰" },
//     ],
//     gallery: [
//       "/image-content/barbers/karimi/work-1.jpg",
//       "/image-content/barbers/karimi/work-2.jpg",
//       "/image-content/barbers/karimi/work-3.jpg",
//     ],
//   },
//   {
//     id: "master-sadeghi",
//     name: "استاد صادقی",
//     role: "استایلیست مو",
//     image: "/image-dashboard/photo-1532710093739-9470acff878f.avif",
//     coverImage: "/image-dashboard/photo-1532710093739-9470acff878f.avif",
//     experienceYears: 7,
//     clientsServed: "۱۵۰۰+",
//     specialties: ["مدل‌های مدرن", "فید و تیپر", "استایلینگ روزانه"],
//     bio: "استاد صادقی متخصص مدل‌های مدرن و ترندهای روز مو مردانه‌ست؛ از فیدهای دقیق تا استایل‌های شخصی‌سازی‌شده بر اساس فرم صورت. همیشه دنبال آخرین تکنیک‌های جهانی آرایشگریه و اونا رو با ذوق خودش ترکیب می‌کنه.",
//     certificates: [
//       { title: "دوره فید و تیپر پیشرفته", issuer: "آکادمی باربر لندن", year: "۱۴۰۱" },
//       { title: "مدرک آرایشگری درجه دو", issuer: "سازمان فنی و حرفه‌ای", year: "۱۳۹۷" },
//     ],
//     gallery: [
//       "/image-content/barbers/sadeghi/work-1.jpg",
//       "/image-content/barbers/sadeghi/work-2.jpg",
//       "/image-content/barbers/sadeghi/work-3.jpg",
//       "/image-content/barbers/sadeghi/work-4.jpg",
//     ],
//   },
//   {
//     id: "master-nouri",
//     name: "استاد نوری",
//     role: "متخصص رنگ و کراتینه",
//     image: "/image-dashboard/photo-1585747860715-2ba37e788b70.avif",
//     coverImage: "/image-dashboard/photo-1585747860715-2ba37e788b70.avif",
//     experienceYears: 11,
//     clientsServed: "۲۱۰۰+",
//     specialties: ["کراتینه و احیا", "رنگ و مش", "ترمیم مو آسیب‌دیده"],
//     bio: "استاد نوری کارشناس تخصصی مراقبت و ترمیم موئه. با تسلط بر کراتینه و رنگ‌های تخصصی، موهای آسیب‌دیده رو به حالت سالم و درخشان برمی‌گردونه، همیشه با توجه ویژه به سلامت پوست سر.",
//     certificates: [
//       { title: "دوره تخصصی کراتینه و احیا", issuer: "آکادمی زیبایی تهران", year: "۱۳۹۶" },
//       { title: "گواهی رنگ‌شناسی حرفه‌ای", issuer: "برند لورآل حرفه‌ای", year: "۱۳۹۹" },
//     ],
//     gallery: [
//       "/image-content/barbers/nouri/work-1.jpg",
//       "/image-content/barbers/nouri/work-2.jpg",
//       "/image-content/barbers/nouri/work-3.jpg",
//     ],
//   },
//   {
//     id: "master-amini",
//     name: "استاد امینی",
//     role: "متخصص فشیال و پوست",
//     image: "/image-dashboard/photo-1599351431202-1e0f0137899a.avif",
//     coverImage: "/image-dashboard/photo-1599351431202-1e0f0137899a.avif",
//     experienceYears: 8,
//     clientsServed: "۱۴۰۰+",
//     specialties: ["پاکسازی پوست", "فشیال تخصصی", "ماسک صورت"],
//     bio: "استاد امینی مسئول بخش مراقبت پوست ولوت باره. با تکنیک‌های تخصصی پاکسازی و فشیال، پوست صورت رو بعد از اصلاح آماده و شاداب نگه می‌داره؛ گزینه ایده‌آل برای کسایی که هم اصلاح می‌خوان هم مراقبت پوست.",
//     certificates: [
//       { title: "مدرک تخصصی پوست و زیبایی", issuer: "سازمان فنی و حرفه‌ای", year: "۱۳۹۸" },
//       { title: "دوره فشیال پیشرفته", issuer: "کلینیک زیبایی آریا", year: "۱۴۰۰" },
//     ],
//     gallery: [
//       "/image-content/barbers/amini/work-1.jpg",
//       "/image-content/barbers/amini/work-2.jpg",
//     ],
//   },
//   {
//     id: "master-taheri",
//     name: "استاد طاهری",
//     role: "مدیر پذیرش و رزرو",
//     image: "/image-dashboard/photo-1621605815971-fbc98d665033.avif",
//     coverImage: "/image-dashboard/photo-1621605815971-fbc98d665033.avif",
//     experienceYears: 6,
//     clientsServed: "۴۰۰۰+",
//     specialties: ["مدیریت نوبت‌دهی", "مشاوره خدمات", "هماهنگی پکیج VIP"],
//     bio: "استاد طاهری اولین نفریه که با ورودتون به سالن روبه‌رو می‌شید؛ مسئول هماهنگی نوبت‌ها، مشاوره درباره خدمات مناسب شما و مدیریت پکیج‌های VIP. با دقت و حوصله، تجربه‌ی شما رو از همون لحظه ورود می‌سازه.",
//     certificates: [
//       { title: "دوره مدیریت مشتری و پذیرش", issuer: "اتحادیه آرایشگران", year: "۱۴۰۰" },
//     ],
//     gallery: [],
//   },
// ];

// export function getBarberById(id) {
//   return barbers.find((b) => b.id === id) || null;
// }



import { api } from "@/app/config";

export async function getBarbers() {
  const response = await api.get("/api/v1/public/barbers");
  return response.data;
}
export async function getBarberById(id) {
  const response = await api.get(`/api/v1/barbers/${id}/detail`);
  return response.data;
}