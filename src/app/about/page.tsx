import { Metadata } from "next";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";
import Image from "next/image";

export const metadata: Metadata = {
  title: "קצת על גל | לזכותה של גל חפץ ז״ל",
  description: "הכירו את גל",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-gradient relative">
      <SunflowerBackground />

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-earth-800">
            קצת על גל
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-earth-600 mb-8 max-w-lg mx-auto leading-relaxed">
           &ldquo;השמיים הם הגבול והדרך דרך ארץ&rdquo;
          </p>

        </div>

        <div className="max-w-3xl mx-auto">
          {/* Featured Image Placeholder */}
          <figure className="relative mb-8 max-w-md mx-auto" aria-label="תמונה של גל">
            <div className="rounded-2xl overflow-hidden shadow-warm">
              <Image
                src="/images/about-page-photo.jpg"
                alt="תמונה של גל"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </figure>

          {/* Biography Card */}
          <article
            className="card-warm rounded-2xl p-6 md:p-8"
            aria-labelledby="about-title"
          >
            <h2 id="about-title" className="sr-only">
              על גל
            </h2>

            {/* Decorative divider */}
            <div className="sunflower-divider" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-sunflower-400"></span>
            </div>

            <div className="space-y-5 text-earth-600 text-base md:text-lg leading-relaxed">
              <p>
                בצער עמוק וכאב גדול נפרדנו מגל, שהלכה לעולמה בגיל 24 לאחר מאבק
                ארוך ואמיץ במחלת הסרטן. גל הייתה מודל יוצא דופן לחיים של עוצמה,
                מודעות ובחירה מתמדת בטוב. גם ברגעים הקשים ביותר, גל שמרה על
                אופטימיות מעוררת השראה. היא בחרה לראות את האור שבכל מכשול,
                להוקיר תודה על כל רגע, ולחיות מתוך הודיה ותקווה – עד הרגע
                האחרון. מעבר להיותה ג’ינג’ית יפה ומיוחדת, גל הייתה אדם שגרם לכל
                מי שסביבה להרגיש אהוב וחשוב. היא עטפה את הקרובים לה בחום
                ובנתינה, והאהבה שהעניקה חזרה אליה בעוצמה – בחברים ובמשפחה שתמיד
                היו לצידה.
              </p>

              <p>
                גל נולדה ב־12.03.2001 להוריה טלי ואורן, אחות לעמרי, נמרוד ועפר.
                כבר בילדותה בלטה בעקשנותה ובדעתנותה – ילדה שידעה מגיל צעיר בדיוק
                מה היא רוצה, קיבלה החלטות בעצמה וניהלה את סביבתה בביטחון. היא
                הייתה מלאת שמחת חיים, יצירתיות ואור, נסיכה אחת בין שלושה אחים.
                גל גדלה והתחנכה בתנועת הצופים, שם ליוותה חניכים במשך שנים ולקחה
                חלק משמעותי ופעיל בשבט המושבה. לאחר סיום לימודיה התגייסה לשירות
                קרבי כלוחמת מעברים, ושימשה כמפקדת טירונים בהכשרה. בצבא מספרים על
                מפקדת מקצועית ונחושה, שלמרות הדיסטנס הנדרש – זכתה לאהבה ולהערצה
                רבה מחייליה. הקשר העמוק שיצרה עמם נמשך גם לאחר שחרורה.
              </p>

              <p>
                גל הותירה אחריה מורשת של כוח, אהבה, בחירה בטוב ואמונה בחיים –
                מורשת שתמשיך ללוות את כל מי שזכה להכיר אותה.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
