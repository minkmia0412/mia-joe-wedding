// wedding-sections.jsx
// All section components (Hero, OurStory, TheBigDay, TravelStay, ThingsToDo,
// Registry, FAQs, RSVP, Footer) and small helpers.

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// Language
// ─────────────────────────────────────────────────────────────
const LangContext = React.createContext(null);
function useLangCtx() {
  return React.useContext(LangContext) || { lang: "en", setLang: () => {} };
}
function useT() {
  return STRINGS[useLangCtx().lang];
}

const STRINGS = {
  en: {
    days: "Days", hours: "Hours", min: "Min",
    heroDate: "October 10, 2026",
    invited: "You're Invited",
    navStory: "Our Story", navBigDay: "The Big Day", navTravel: "Travel & Stay",
    navThings: "Things to Do", navRegistry: "Registry", navFaqs: "FAQs",
    labelYountville: "Yountville", labelNapa: "Napa",
    story: [
      "We first met on July 7th last year, on Chilseok, the Korean legend of two lovers who reunite across the Milky Way. Mia brought cherries and crackers, and Joe brought his favorite Napa Cabernet, Duckhorn. We only found out later that Duckhorn is named after the mandarin duck, which in Korea is a symbol of devoted, lifelong love.",
      "The coincidences didn't stop there. A few weeks later, Joe showed up to help Mia move wearing a cap with \"412\" on it. It's Pittsburgh's area code, but it's also Mia's birthday, April 12th. It started to feel less like coincidence and more like we were exactly where we were meant to be.",
      "After that came cooking at home, slow afternoons on the golf course, weekend trips to Lake Erie, and bigger adventures in Iceland and Taiwan. Looking back, none of it was ever really small.",
      "On October 10th, 2026, we'll begin our next chapter in Napa Valley. We come from different worlds, and we want to keep honoring both as we build something that's ours.\nWe'd love for you to be there."
    ],
    galleryLabel: "Gallery",
    galleryEmpty: "Photo coming soon",
    venueBookPre: "If you'd like to stay at the venue, ",
    venueBookLink: "you can book your stay here",
    venueBookPost: ".",
    interludeLabel: "5 Minute Walk to The Social",
    attireTextPre: "Cocktail or garden party attire, where timeless elegance meets the romance of",
    attireTextPost: "an autumn evening in Napa Valley.",
    attireList: [
      "Soft neutrals, muted tones, and classic silhouettes are welcome.",
      "Please avoid white, ivory, and cream.",
      "October evenings in Yountville can become cool after sunset, with temperatures dropping to around 50°F (10°C). A light wrap or jacket is recommended."
    ],
    travelParagraph: "A rental car is recommended for exploring Napa Valley at your own pace.\nMost major car rental services, including Hertz, are available at\nSan Francisco International Airport (SFO), approximately 1.5 hrs away.",
    hotelMeta: (stars, distance) => `Google Review ${stars} / ${distance} from venue`,
    thingsIntro1: "We chose Napa Valley in hopes of creating a wedding weekend that feels like a little getaway for the people we love, especially for those traveling from afar. Beyond the wedding itself, we hope you'll have time to slow down and enjoy everything this beautiful valley has to offer, from world-class wine to breathtaking vineyard views.",
    thingsIntro2: "Every recommendation below is a place Mia and Joe have personally visited and loved over the years!",
    wineries: "Wineries",
    thingsClosing: "For more suggestions, feel free to reach out to Mia at jmink0412@gmail.com!",
    registryBody: "Your presence at our wedding is the greatest gift of all. But if you'd like to\ncelebrate with us a little longer, we've created a honeymoon fund :)",
    registryCardLine1: "Mia and Joe's", registryCardLine2: "Honeymoon Fund",
    registryButton: "Visit Honeymoon Fund",
    faqIntroPre: "If something isn't covered here, ", faqIntroPost: "please reach out for help!",
    rsvpThankYouEyebrow: "Thank You",
    rsvpThankYouName: (name) => `Thank you, ${name}.`,
    rsvpYes: "We've received your RSVP and can't wait to celebrate with you on October 10th.",
    rsvpNo: "Thank you for letting us know. We'll miss you on October 10th,\nbut appreciate you so much.",
    nameFallback: "friend",
    editResponse: "Edit response",
    rsvpIntroPre: "Please RSVP by August 31st. ", rsvpIntroPost: "We'd love to hear from you soon.",
    fullName: "Full Name", fullNamePh: "Your full name",
    email: "Email Address",
    attendingQ: "Will you be attending?",
    attendYes: "✓ Yes, I'll be there", attendNo: "Regretfully decline",
    guestsLabel: "Number of Guests",
    mealLabel: "Meal Preference", mealOptions: ["Beef", "Fish", "Vegetarian", "Vegan"],
    dietaryLabel: "Dietary Restrictions or Allergies",
    dietaryPhDesktop: "Let us know if anything — and please add your guest's meal preference if you have one.",
    dietaryPhMobile: "Let us know if anything — and please add\nyour guest's meal preference if you have one.",
    songLabel: "Song Request", songPh: "Is there a song that would get you on the dance floor?",
    noteLabel: "A Note or Wish for the Couple", notePh: "Anything you'd like to share with Mia & Joe",
    sendRsvp: "Send RSVP",
    footerHeadline: "We can't wait to see you!"
  },
  ko: {
    days: "일", hours: "시간", min: "분",
    heroDate: "2026년 10월 10일",
    invited: "초대합니다",
    navStory: "Our Story", navBigDay: "The Big Day", navTravel: "Travel & Stay", navThings: "Things to Do", navRegistry: "Registry", navFaqs: "FAQs",
    labelYountville: "욘트빌", labelNapa: "나파",
    story: [
      "저희는 작년 7월 7일, 은하수를 사이에 두고 다시 만나는 두 연인의 이야기가 담긴 칠석날에 처음 만났습니다. Mia는 체리와 크래커를, Joe는 가장 좋아하는 나파 카베르네인 Duckhorn을 가져왔어요. Duckhorn이 한국에서 변치 않는 평생의 사랑을 상징하는 원앙에서 이름을 따왔다는 건 나중에야 알게 되었습니다.",
      "우연은 거기서 그치지 않았어요. 몇 주 뒤, Joe는 Mia의 이사를 도와주러 \"412\"가 적힌 모자를 쓰고 나타났습니다. 그건 피츠버그의 지역번호이기도 하지만, 4월 12일, Mia의 생일이기도 했죠. 그때부터 이건 단순한 우연이 아니라, 운명이라는 느낌이 들기 시작했습니다.",
      "그 후로 우리는 함께 요리를 하고, 골프장에서 느긋한 오후를 보내고, 근교의 Lake Erie부터, Iceland와 Taiwan으로 더 큰 모험을 떠났습니다. 돌이켜보면, 그 어느 순간도 결코 사소하지 않았어요.",
      "2026년 10월 10일, 저희는 나파 밸리에서 인생의 새로운 막을 시작하려 합니다. 서로 다른 세계에서 자라온 저희는, 두 세계를 소중히 간직하며 우리만의 것들을 함께 만들어나가고 싶습니다.\n그 자리에 여러분이 함께해 주시면 더없이 기쁘겠습니다."
    ],
    galleryLabel: "Gallery",
    galleryEmpty: "사진 준비 중",
    venueBookPre: "예식장에서 머무르길 원하신다면, ",
    venueBookLink: "이곳에서 예약하실 수 있어요",
    venueBookPost: ".",
    interludeLabel: "The Social까지 도보 5분",
    attireTextPre: "칵테일 또는 가든파티 차림으로, 나파 밸리의 가을 저녁이 지닌 낭만과",
    attireTextPost: "변치 않는 우아함을 더해주세요.",
    attireList: [
      "부드러운 뉴트럴 컬러, 차분한 톤, 클래식한 실루엣을 환영합니다.",
      "화이트, 아이보리, 크림 색상은 피해 주세요.",
      "욘트빌의 10월 저녁은 해가 진 뒤 약 10°C(50°F)까지 쌀쌀해질 수 있습니다. 가벼운 숄이나 재킷을 준비하시길 권해 드려요."
    ],
    travelParagraph: "나파 밸리를 여유롭게 둘러보시려면 렌터카를 추천드립니다. 차량으로 약 1시간 30분 떨어진\n샌프란시스코 국제공항(SFO)에서 Hertz를 비롯한 대부분의 주요 렌터카 업체를 이용할 수 있습니다.",
    hotelMeta: (stars, distance) => `구글 리뷰 ${stars} · 예식장에서 ${distance}`,
    thingsIntro1: "저희는 사랑하는 분들, 특히 먼 길을 와 주시는 분들께 작은 휴가처럼 느껴지는 결혼식 주말을\n선물해 드리고 싶어 나파 밸리를 선택했습니다. 결혼식뿐만 아니라, 나파밸리가 선사하는\n숨 막히게 아름다운 포도밭 풍경을 여유롭게 즐기시길 바랍니다.",
    thingsIntro2: "아래의 장소들은 Mia와 Joe가 직접 방문하고 사랑했던 곳들이에요!",
    wineries: "와이너리",
    thingsClosing: "더 많은 추천이 필요하시면, Mia(jmink0412@gmail.com)에게 언제든 편하게 연락 주세요!",
    registryBody: "여러분이 저희 결혼식에 함께해 주시는 것이 가장 큰 선물입니다. 다만 저희와 조금 더 오래 축하를\n나누고 싶으시다면, 이용하실 수 있는 신혼여행 기금 시스템을 마련해 두었어요 :)",
    registryCardLine1: "Mia & Joe의", registryCardLine2: "신혼여행 기금",
    registryButton: "신혼여행 기금 보러 가기",
    faqIntroPre: "여기에 없는 내용이 있다면, ", faqIntroPost: "언제든 편하게 문의해 주세요!",
    rsvpThankYouEyebrow: "감사합니다",
    rsvpThankYouName: (name) => `${name}님, 감사합니다.`,
    rsvpYes: "참석 회신을 잘 받았습니다. 10월 10일, 여러분과 함께 축하할 날을 손꼽아 기다리겠습니다.",
    rsvpNo: "알려주셔서 감사합니다. 10월 10일 함께하지 못해 아쉽지만, 마음 깊이 감사드립니다.",
    nameFallback: "소중한 분",
    editResponse: "응답 수정하기",
    rsvpIntroPre: "8월 31일까지 참석 여부를 회신해 주세요. ", rsvpIntroPost: "여러분의 소식을 기다리고 있겠습니다.",
    fullName: "성함", fullNamePh: "성함을 입력해 주세요",
    email: "이메일 주소",
    attendingQ: "참석하시나요?",
    attendYes: "✓ 네, 참석합니다", attendNo: "아쉽지만 참석이 어렵습니다",
    guestsLabel: "참석 인원",
    mealLabel: "식사 선택", mealOptions: ["소고기", "생선", "채식", "비건"],
    dietaryLabel: "식이 제한 또는 알레르기",
    dietaryPhDesktop: "특이사항이 있다면 알려주세요 — 동반인의 식사 선택도 함께 적어주세요.",
    dietaryPhMobile: "특이사항이 있다면 알려주세요 —\n동반인의 식사 선택도 함께 적어주세요.",
    songLabel: "신청곡", songPh: "댄스 플로어로 이끌 만한 노래가 있나요?",
    noteLabel: "신랑·신부에게 전하는 글", notePh: "Mia & Joe에게 전하고 싶은 말을 남겨주세요",
    sendRsvp: "회신 보내기",
    footerHeadline: "여러분을 만날 날을 손꼽아 기다리고 있어요!"
  }
};

// Language lives in the URL: /en (English) and /kr (Korean).
// In environments where those paths don't exist (local preview / editor),
// the toggle falls back to switching in place.
function langFromLocation() {
  return "en"; // this file drives the English page only
}

function isDeployedPath() {
  try {
    const p = (location.pathname || "").toLowerCase();
    return /(^\/|\/index\.html|\/(en|kr)(\.html)?|\/(en|kr)\/(index\.html)?)$/.test(p);
  } catch (e) { return false; }
}
function langHref(target) {
  try {
    const p = (location.pathname || "").toLowerCase();
    const nested = /\/(en|kr)\/(index\.html)?$/.test(p);
    const prefix = nested ? "../" : "";
    return prefix + (target === "ko" ? "kr" : "en");
  } catch (e) { return target === "ko" ? "/kr" : "/en"; }
}

function LangToggle() {
  const { lang, setLang } = useLangCtx();
  const pick = (v) => (e) => {
    if (!isDeployedPath()) { e.preventDefault(); setLang(v); }
  };
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <a href={langHref("en")} hrefLang="en" className={"lang-btn" + (lang === "en" ? " active" : "")} onClick={pick("en")}>EN</a>
      <span className="lang-toggle-sep">/</span>
      <a href={langHref("ko")} hrefLang="ko" className={"lang-btn" + (lang === "ko" ? " active" : "")} onClick={pick("ko")}>KR</a>
    </div>);
}


// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function Monogram({ size = "mini", color }) {
  if (size === "mini") {
    return (
      <a href="#top" className="monogram-mini" aria-label="M&J — Home">
        <img src="uploads/Monogram.png" alt="M&J" className="monogram-mini-img" />
      </a>);

  }
  return (
    <div className="monogram-oval" style={{ fontSize: "25px" }}>
      <span className="monogram-oval-text">
        <span className="m">M</span>
        <span className="j">J</span>
      </span>
    </div>);

}

function SectionHeader({ eyebrow, title, subtitle, color }) {
  return (
    <div className="section-header">
      <div className="section-header-label" style={{ ...(color ? { color } : null), fontWeight: "400", textAlign: "center", fontSize: "10px" }}>{title}</div>
      <div className="section-header-rule" style={{ ...(color ? { background: color } : null), height: "1px", width: "8px" }} />
      {subtitle &&
      <div style={{ marginTop: 18, fontFamily: "var(--f-serif)", fontStyle: "italic", color: "var(--ink-1)", maxWidth: 540, marginLeft: "auto", marginRight: "auto", fontSize: "20px", lineHeight: "1.3" }}>
          {subtitle}
        </div>
      }
    </div>);

}

function renderDesc(text) {
  return String(text).split(/(\n|\{d\}|\{m\})/g).map((seg, i) => {
    if (seg === "\n" || seg === "{d}")
    return <React.Fragment key={i}><br className="desktop-br" />{" "}</React.Fragment>;
    if (seg === "{m}") return <br key={i} className="mobile-br" />;
    return seg;
  });
}

function SectionDisplayTitle({ children }) {
  return <h2 className="section-display-title" style={{ letterSpacing: "-1px", fontSize: "50px", fontWeight: "400", fontFamily: "\"PP Editorial New\"", margin: "0px 0px 41px", color: "rgb(5, 5, 5)" }}>{children}</h2>;
}

// ─────────────────────────────────────────────────────────────
// Countdown to wedding
// ─────────────────────────────────────────────────────────────
function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(diff / (1000 * 60) % 60);
  return { days, hours, minutes };
}

// ─────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────
function Nav({ activeSection }) {
  const [open, setOpen] = useState(false);
  const t = useT();
  const links = [
  ["story", t.navStory],
  ["bigday", t.navBigDay],
  ["travel", t.navTravel],
  ["things", t.navThings],
  ["registry", t.navRegistry],
  ["faqs", t.navFaqs]];

  return (
    <nav className="nav-bar" id="nav-bar">
      <div className="nav-inner">
        <div className="nav-mono-col" style={{ height: "80px" }}>
          <Monogram />
          <div className={"nav-links" + (open ? " open" : "")} style={{ letterSpacing: "0px", fontSize: "15px", textAlign: "center", height: "70px" }}>
            {links.map(([id, label]) =>
            <a
              key={id}
              href={`#${id}`}
              className={"nav-link" + (activeSection === id ? " active" : "")}
              onClick={() => setOpen(false)} style={{ letterSpacing: "0px", fontWeight: "400" }}>
              
                {label}
              </a>
            )}
          </div>
        </div>
        <div className="nav-rsvp-col">
          <button
            className={"nav-menu-btn" + (open ? " is-open" : "")}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}>
            <span className="nav-menu-icon"><span></span><span></span><span></span></span>
          </button>
          <a href="#rsvp" className="nav-rsvp" onClick={() => setOpen(false)} style={{ borderRadius: "100px", fontWeight: "200", lineHeight: "0.5", borderWidth: "0.5px", borderStyle: "solid", margin: "0px", padding: "13px 20px", letterSpacing: "1px" }}>RSVP</a>
        </div>
      </div>
    </nav>);

}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────
function Hero({ showCountdown = true }) {
  const t = useT();
  const target = useMemo(() => new Date("2026-10-10T16:30:00-07:00").getTime(), []);
  const { days, hours, minutes } = useCountdown(target);
  return (
    <section className="hero" id="top" data-screen-label="Hero">
      <div className="hero-names hero-names-image">
        <img src="uploads/Hero-Page.png" alt="The Wedding — Mia & Joe" className="hero-names-img" />
      </div>
      <div className="hero-date" style={{ fontFamily: "\"PP Editorial New\"", fontSize: "30px", lineHeight: "1", fontWeight: "400", color: "rgb(5, 5, 5)" }}>{t.heroDate}</div>
      <div className="hero-location" style={{ letterSpacing: "0.5px", fontWeight: "400", color: "rgb(5, 5, 5)" }}>The Estate Yountville, Yountville, CA</div>
      {showCountdown &&
      <div className="hero-countdown" style={{ fontSize: "6px", gap: "5px", flexDirection: "row", height: "27px" }}>
          <CountItem n={days} l={t.days} />
          <span className="hero-countdown-colon" style={{ fontSize: "20px" }}>:</span>
          <CountItem n={hours} l={t.hours} />
          <span className="hero-countdown-colon" style={{ fontSize: "20px" }}>:</span>
          <CountItem n={minutes} l={t.min} />
        </div>
      }
      <a href="#rsvp" className="hero-rsvp-pill" style={{ lineHeight: "1", fontSize: "11px", padding: "10px 20px", letterSpacing: "1px" }}>RSVP</a>
    </section>);

}

function CountItem({ n, l }) {
  return (
    <div className="hero-countdown-item" style={{ gap: "5px", color: "rgb(57, 27, 23)" }}>
      <div className="hero-countdown-num" style={{ fontFamily: "\"PP Editorial New\"", fontSize: "30px", color: "rgb(57, 27, 23)", fontWeight: "200" }}>{String(n).padStart(2, "0")}</div>
      <div className="hero-countdown-lbl" style={{ fontSize: "7px", width: "26px", color: "rgb(104, 45, 37)" }}>{l}</div>
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Our Story
// ─────────────────────────────────────────────────────────────
function OurStory() {
  const t = useT();
  return (
    <section id="story" data-screen-label="Our Story">
      <div className="container">
        <SectionDisplayTitle>Our Story</SectionDisplayTitle>

        <div className="story-body" style={{ fontSize: "20px", maxWidth: "100%", lineHeight: "1.3", color: "#3D3C3A", fontWeight: "300", width: "780px" }}>
          {t.story.map((p, i) => <p key={i}>{renderDesc(p)}</p>)}
        </div>
        <div className="story-film">
          <div className="film-strip-h film-strip-horiz">
            <div className="film-frames-h">
              <div className="film-frame"><img src="uploads/story-film-1.jpg" alt="Mia and Joe" /></div>
              <div className="film-frame"><img src="uploads/story-film-2.jpg" alt="Mia and Joe" /></div>
              <div className="film-frame"><img src="uploads/story-film-5.jpg" alt="Mia and Joe" /></div>
            </div>
          </div>
          <div className="film-strip-v film-strip-vert">
            <div className="film-frames-v">
              <div className="film-frame"><img src="uploads/story-film-4.jpg" alt="Mia and Joe" /></div>
              <div className="film-frame"><img src="uploads/story-film-3.jpg" alt="Mia and Joe" /></div>
            </div>
          </div>
        </div>
        <Gallery />
        <div className="story-illustration">
          <img src="uploads/Duck.png" alt="" className="story-illustration-img" />
        </div>
      </div>
    </section>);
}

// ─────────────────────────────────────────────────────────────
// Gallery — 16 photo slots (4 × 4). Drop files into uploads/ and set src.
// ─────────────────────────────────────────────────────────────
const GALLERY_PHOTOS = [
  { src: "uploads/1.jpg", alt: "Mia and Joe", focus: "center 78%" },
  { src: "uploads/2.jpg", alt: "Mia and Joe", focus: "center 25%" },
  { src: "uploads/3.jpg", alt: "Mia and Joe", focus: "center 78%" },
  { src: "uploads/4.jpg", alt: "Mia and Joe" },
  { src: "uploads/5.jpg", alt: "Mia and Joe", focus: "center 100%" },
  { src: "uploads/6.jpg", alt: "Mia and Joe", focus: "center 25%" },
  { src: "uploads/7.jpg", alt: "Mia and Joe", focus: "center 78%" },
  { src: "uploads/8.jpg", alt: "Mia and Joe" },
  { src: "uploads/w9.jpg", alt: "Mia and Joe" },
  { src: "uploads/w10.jpg", alt: "Mia and Joe" },
  { src: "uploads/w11.jpg", alt: "Mia and Joe" },
  { src: "uploads/w12.jpg", alt: "Mia and Joe", focus: "center 95%" },
  { src: "uploads/w13.jpg", alt: "Mia and Joe", focus: "center 88%" },
  { src: "uploads/w14.jpg", alt: "Mia and Joe" },
  { src: "uploads/w15.jpg", alt: "Mia and Joe" },
  { src: "uploads/w16.jpg", alt: "Mia and Joe", focus: "center 55%" }
];

function Gallery() {
  const t = useT();
  const photos = GALLERY_PHOTOS.filter((p) => p.src);
  const [pos, setPos] = useState(0);
  const [zoom, setZoom] = useState(false);
  const n = photos.length;
  const next = () => setPos((v) => (v + 1) % n);
  const prev = () => setPos((v) => (v - 1 + n) % n);
  const railRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setZoom(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n]);

  // keep the active thumbnail in view without touching page scroll
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const thumb = rail.children[pos];
    if (!thumb) return;
    const target = thumb.offsetLeft - (rail.clientWidth - thumb.clientWidth) / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [pos]);

  if (!n) return null;
  const photo = photos[pos];

  return (
    <div className="gallery-block">
      <SectionHeader title={t.galleryLabel} />
      <div className="gallery-slider">
        <button type="button" className="gallery-arrow gallery-arrow-prev" aria-label="Previous photo" onClick={prev}>&#8249;</button>
        <div className="gallery-stage">
          {photos.map((p, i) => (
            <img key={i} src={p.src} alt={p.alt} loading={i < 3 ? "eager" : "lazy"}
              className={"gallery-slide" + (i === pos ? " is-active" : "")}
              style={{ ...(p.focus ? { objectPosition: p.focus } : null), ...(p.shift ? { transform: p.shift } : null) }}
              onClick={() => { setPos(i); setZoom(true); }} />
          ))}
          <div className="gallery-dots" onClick={(e) => e.stopPropagation()}>
            {photos.map((p, i) => (
              <button key={i} type="button" className={"gallery-dot" + (i === pos ? " is-active" : "")}
                aria-label={"Photo " + (i + 1)} onClick={() => setPos(i)} />
            ))}
          </div>
        </div>
        <button type="button" className="gallery-arrow gallery-arrow-next" aria-label="Next photo" onClick={next}>&#8250;</button>
      </div>
      <div className="gallery-rail" ref={railRef}>
        {photos.map((p, i) => (
          <button key={i} type="button" className={"gallery-thumb" + (i === pos ? " is-active" : "")}
            aria-label={"Photo " + (i + 1)} onClick={() => setPos(i)}>
            <img src={p.src} alt="" loading="lazy" style={p.focus ? { objectPosition: p.focus } : null} />
          </button>
        ))}
      </div>
      {zoom &&
        <div className="gallery-lightbox" onClick={() => setZoom(false)} role="dialog" aria-modal="true">
          <button type="button" className="gallery-close" aria-label="Close" onClick={() => setZoom(false)}>&times;</button>
          <button type="button" className="gallery-nav gallery-prev" aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); prev(); }}>&#8249;</button>
          <img src={photo.src} alt={photo.alt} className="gallery-lightbox-img" onClick={(e) => e.stopPropagation()} />
          <button type="button" className="gallery-nav gallery-next" aria-label="Next"
            onClick={(e) => { e.stopPropagation(); next(); }}>&#8250;</button>
          <div className="gallery-counter">{pos + 1} / {n}</div>
        </div>
      }
    </div>);
}

// ─────────────────────────────────────────────────────────────
// The Big Day
// ─────────────────────────────────────────────────────────────
const SCHEDULE_ILLUSTRATIONS = {
  reception: "uploads/Reception.png",
  ceremony: "uploads/Ceremony.png",
  cocktail: "uploads/Cocktail-Hour.png",
  dinner: "uploads/Dinner.png",
  afterparty: "uploads/After-Hours.png"
};

function TheBigDay({ data }) {
  const t = useT();
  // Build alternating rows; interlude counts as a slot too
  const rows = [];
  let rowIdx = 0;
  for (const item of data.schedule) {
    const side = rowIdx % 2 === 0 ? "right" : "left";
    if (item.interlude) {
      rows.push({ kind: "interlude", item, side });
    } else {
      rows.push({ kind: "event", item, side });
    }
    rowIdx++;
  }

  const timelineRef = useRef(null);
  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll(".tl-row"));
    if (!items.length) return;
    const onScroll = () => {
      // Activation line sits ~62% down the viewport — circles fill
      // as they scroll past that point.
      const trigger = window.innerHeight * 0.62;
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        if (center < trigger) {
          el.classList.add("is-filled");
        } else {
          el.classList.remove("is-filled");
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="bigday" className="bigday-bg" data-screen-label="The Big Day">
      <div className="container">
        <SectionDisplayTitle>The Big Day</SectionDisplayTitle>

        <SectionHeader title="Our Venue" />

        <figure className="venue-intro">
          <figcaption className="venue-caption">
            <h3 className="venue-name" style={{ lineHeight: "1", margin: "0px 0px 9px" }}>
              <a href="https://www.theestateyountville.com/" target="_blank" rel="noreferrer" className="venue-name-link" style={{ fontFamily: "\"PP Editorial New\"", fontSize: "30px" }}>The Estate Yountville</a>
            </h3>
            <div className="venue-meta" style={{ letterSpacing: "0px", fontSize: "13px" }}>6526 Yount Street · Yountville, CA</div>
            <p className="venue-desc">
              {t.venueBookPre}<br className="mobile-br" /><a href="https://be.synxis.com/?Hotel=39954&Chain=30212&arrive=2026-10-09&depart=2026-10-11&adult=1&child=0&group=KYUNGTUNG26" target="_blank" rel="noreferrer" className="venue-desc-link">{t.venueBookLink}</a>{t.venueBookPost}
            </p>
          </figcaption>
          <a href="https://www.theestateyountville.com/" target="_blank" rel="noreferrer" className="venue-img-wrap">
            <img src="uploads/The-Estate-Yountville.jpg" alt="The Estate Yountville" className="venue-img" />
          </a>
        </figure>

        <SectionHeader title="Schedule" />

        <div className="timeline" ref={timelineRef}>
          {rows.map((row, i) => {
            if (row.kind === "interlude") {
              const interludeContent =
              <div className="tl-side" style={{ ...{ padding: row.side === "left" ? "0px 28px 0px 0px" : "0px 0px 0px 28px", textAlign: row.side === "left" ? "right" : "left" }, padding: "0px 0px 0px 20px" }}>
                  <div className="tl-interlude-label" style={{ fontSize: "13px", letterSpacing: "0px" }}>{t.interludeLabel}</div>
                  <p className="tl-interlude-text" style={{ marginLeft: row.side === "left" ? "auto" : "0", marginRight: row.side === "left" ? "0" : "auto", color: "rgb(111, 111, 111)", fontSize: "17px", width: "284px" }}>{row.item.interlude}</p>
                </div>;
              return (
                <div key={i} className={`tl-row interlude ${row.side}`}>
                  {row.side === "left" ?
                  <>
                      {interludeContent}
                      <div className="tl-side tl-side-empty"></div>
                    </> :

                  <>
                      <div className="tl-side tl-side-empty"></div>
                      {interludeContent}
                    </>
                  }
                </div>);

            }
            const { item, side } = row;
            const illoSrc = SCHEDULE_ILLUSTRATIONS[item.id];
            const illo = illoSrc ?
            <div className="tl-side tl-illo" style={{ padding: "0px", margin: "0px 10px 0px 0px" }}>
                <img src={illoSrc} alt="" className="tl-illo-img" style={{ padding: "0px", margin: "0px 0px 0px 14px" }} />
              </div> :
            <div className="tl-side tl-side-empty"></div>;
            return (
              <div key={i} className={`tl-row ${side}`} style={{ padding: "22px 0px" }}>
                {side === "left" ?
                <>
                    <div className="tl-side event" style={{ borderWidth: "0px", borderStyle: "solid", textAlign: "right", margin: "0px", padding: "0px 20px 0px 0px", width: "303px" }}>
                      <h3 className="tl-title" style={{ fontFamily: "\"PP Editorial New\"", fontWeight: "400", fontSize: "22px", margin: "0px 0px 7px" }}>{item.title}</h3>
                      <div className="tl-meta" style={{ letterSpacing: "0px", fontSize: "13px", margin: "0px 0px 8px" }}>{item.time} / <span style={{ whiteSpace: "nowrap" }}>{item.loc}</span></div>
                      <p className="tl-desc" style={{ marginLeft: "auto", color: "rgb(111, 111, 111)", fontSize: "17px", margin: "0px", width: "286px" }}>{renderDesc(item.desc)}</p>
                    </div>
                    {illo}
                  </> :

                <>
                    {illo}
                    <div className="tl-side event" style={{ textAlign: "left", margin: "0px", padding: "0px 0px 0px 20px" }}>
                      <h3 className="tl-title" style={{ fontFamily: "\"PP Editorial New\"", fontWeight: "400", fontSize: "22px", margin: "0px 0px 7px" }}>{item.title}</h3>
                      <div className="tl-meta" style={{ letterSpacing: "0px", margin: "0px 0px 8px", fontSize: "13px" }}>{item.time} / <span style={{ whiteSpace: "nowrap" }}>{item.loc}</span></div>
                      <p className="tl-desc" style={{ color: "rgb(111, 111, 111)", fontSize: "17px", margin: "0px" }}>{renderDesc(item.desc)}</p>
                    </div>
                  </>
                }
              </div>);

          })}
        </div>

        <div style={{ marginTop: 100 }}>
          <SectionHeader title="Attire" />
          <div className="attire-wrap" style={{ width: "620px" }}>
            <p className="attire-text" style={{ fontSize: "20px" }}>{t.attireTextPre}<br className="desktop-br" /> {t.attireTextPost}</p>
            <ul className="attire-list">
              {t.attireList.map((li, i) => <li key={i} style={{ color: "rgb(5, 5, 5)", fontSize: "20px" }}>{li}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>);
}

// ─────────────────────────────────────────────────────────────
// Travel & Stay
// ─────────────────────────────────────────────────────────────
function HotelCard({ hotel }) {
  const t = useT();
  const Tag = hotel.url ? "a" : "div";
  const linkProps = hotel.url ? { href: hotel.url, target: "_blank", rel: "noreferrer" } : {};
  return (
    <Tag className="hotel-card" {...linkProps}>
      <h3 className="hotel-name" style={{ fontFamily: "\"PP Editorial New\"", color: "rgb(5, 5, 5)", margin: "10px 0px 4px" }}>{hotel.name}</h3>
      <div className="hotel-meta" style={{ letterSpacing: "0px" }}>{t.hotelMeta(hotel.stars, hotel.distance)}</div>
      <p className="hotel-desc" style={{ fontSize: "17px", color: "rgb(111, 111, 111)" }}>{renderDesc(hotel.desc)}</p>
      {hotel.img ?
      <div className="hotel-img-wrap">
          <img src={hotel.img} alt={hotel.name} className="hotel-img-photo" />
        </div> :
      <div className="hotel-img-placeholder" aria-hidden="true" style={{ borderWidth: "1px" }}>
          <span className="hotel-img-label">Image</span>
        </div>
      }
    </Tag>);

}

function TravelStay({ data }) {
  const t = useT();
  return (
    <section id="travel" data-screen-label="Travel & Stay">
      <div className="container">
        <SectionDisplayTitle>Travel &amp; Stay</SectionDisplayTitle>

        <div className="travel-block" style={{ lineHeight: "1.3" }}>
          <p style={{ fontSize: "20px" }}>{renderDesc(t.travelParagraph)}</p>
        </div>

        <div className="hotels-row">
          <div className="hotels">
            {[...data.hotels_yountville, ...data.hotels_napa].map((h, i) =>
            <HotelCard key={i} hotel={h} />
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────
// Things to Do
// ─────────────────────────────────────────────────────────────
function PlaceList({ label, items, color }) {
  return (
    <div className="place-cat">
      {label &&
      <div className="place-cat-label" style={{ ...(color ? { color, borderColor: color } : null), letterSpacing: "0px", color: "rgb(159, 82, 62)", borderColor: "rgb(159, 82, 62)", fontSize: "13px", fontWeight: "600" }}>
        {label}
      </div>
      }
      {items.map((p, i) =>
      <div key={i} className="place-item">
          <h4 className="place-name" style={{ alignItems: "center", gap: "20px", fontFamily: "\"PP Editorial New\"", margin: "0px 0px 6px" }}>
            {p.links ?
          <span className="place-name-multi">
                {p.links.map((lk, j) =>
            <React.Fragment key={j}>
                    {j > 0 && <span className="place-sep">/</span>}
                    <a href={lk.url} target="_blank" rel="noreferrer" className="place-name-link">{lk.name}</a>
                  </React.Fragment>
            )}
              </span> :
          p.url ?
          <a href={p.url} target="_blank" rel="noreferrer" className="place-name-link">{p.name}</a> :
          p.name}
          </h4>
          <p className="place-desc" style={{ color: "rgb(111, 111, 111)", fontSize: "17px" }}>{p.desc}</p>
        </div>
      )}
    </div>);

}

function ThingsToDo({ data }) {
  const t = useT();
  return (
    <section id="things" className="todo-bg" data-screen-label="Things to Do">
      <div className="container">
        <SectionDisplayTitle>Things to Do</SectionDisplayTitle>
        <p style={{ textAlign: "center", fontFamily: "var(--f-serif)", color: "var(--ink-1)", maxWidth: 720, margin: "0 auto 1.2em", fontSize: "20px", lineHeight: "1.3", width: "704px" }}>{renderDesc(t.thingsIntro1)}</p>
        <p style={{ textAlign: "center", fontFamily: "var(--f-serif)", color: "var(--ink-1)", maxWidth: 720, margin: "0 auto 56px", fontSize: "20px", lineHeight: "1.3", width: "540px" }}>{renderDesc(t.thingsIntro2)}</p>

        <div className="place-grid">
          <div className="place-col">
            <PlaceList label={t.labelYountville} items={[...data.yountville_food, ...data.yountville_todo]} color="var(--terra)" />
          </div>
          <div className="place-col">
            <PlaceList label={t.labelNapa} items={[...data.napa_food, ...data.napa_todo]} color="var(--terra)" />
            <PlaceList label={t.wineries} items={data.napa_wine} color="var(--wine)" />
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 60 }}>
          <p className="body" style={{ maxWidth: 620, margin: "0 auto 24px", fontFamily: "\"PP Editorial New\"", fontStyle: "italic", fontWeight: "300", width: "800px", lineHeight: "1.5", fontSize: "25px", color: "rgb(0, 0, 0)" }}>{t.thingsClosing}</p>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────
function Registry() {
  const t = useT();
  return (
    <section id="registry" className="registry-section" data-screen-label="Registry">
      <div className="container-narrow">
        <h2 className="section-display-title" style={{ color: "var(--bg-cream)", fontFamily: '"PP Editorial New"', fontWeight: 350, letterSpacing: "-1px", fontSize: "50px" }}>Registry</h2>

        <p className="body-lg" style={{ color: "rgba(252,247,242,0.85)", maxWidth: 780, margin: "32px auto 0", textAlign: "center", lineHeight: "1.3", fontSize: "20px", width: "auto", fontWeight: 300 }}>{renderDesc(t.registryBody)}</p>

        <div className="registry-card-row">
          <img src="uploads/Funding-1.png" alt="" className="registry-illo registry-illo-left" />
          <div className="registry-card" style={{ margin: "0px" }}>
            <div className="eyebrow-sm" style={{ color: "rgba(252,247,242,0.6)", letterSpacing: "0px", fontFamily: "\"Sohne Breit\"" }}>

            </div>
            <div style={{ height: 16 }} />
            <h3 className="registry-card-title" style={{ color: "var(--bg-cream)", fontStyle: "normal", margin: "0 0 28px 0", lineHeight: 1.2, fontFamily: "\"PP Editorial New\"", fontSize: "30px", fontWeight: "200" }}>{t.registryCardLine1}<br />{t.registryCardLine2}</h3>
            <a className="btn" href="https://www.honeyfund.com/site/Mia-Joe-10-10-2026" target="_blank" rel="noreferrer" style={{ letterSpacing: "0px" }}>
              {t.registryButton}
            </a>
          </div>
          <img src="uploads/Funding-2.png" alt="" className="registry-illo registry-illo-right" />
        </div>
      </div>
    </section>);
}

// ─────────────────────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────────────────────
function FAQs({ data }) {
  const t = useT();
  const [openSet, setOpenSet] = useState(() => new Set());
  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);else next.add(i);
      return next;
    });
  };
  return (
    <section id="faqs" data-screen-label="FAQs">
      <div className="container-narrow">
        <SectionDisplayTitle>FAQs</SectionDisplayTitle>
        <p style={{ textAlign: "center", fontStyle: "italic", maxWidth: 540, margin: "0 auto 56px", fontFamily: "\"PP Editorial New\"", fontWeight: "300", fontSize: "25px", lineHeight: "1.5", color: "rgb(0, 0, 0)" }}>{t.faqIntroPre}<br className="mobile-br" />{t.faqIntroPost}</p>
        
        <div className="faq-list">
          {data.faqs.map((f, i) =>
          <div key={i} className={"faq-item" + (openSet.has(i) ? " open" : "")}>
              <button
              className="faq-btn"
              onClick={() => toggle(i)}
              aria-expanded={openSet.has(i)} style={{ alignItems: "center", gap: "5px" }}>
              
                <span className="faq-num" style={{ letterSpacing: "0px" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ flex: 1 }}>{f.q}</span>
                <span className="faq-toggle"></span>
              </button>
              <div className="faq-body">
                <div className="faq-body-inner" dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────
// RSVP Form
// ─────────────────────────────────────────────────────────────
function RSVP() {
  const t = useT();
  const [form, setForm] = useState({
    name: "",
    email: "",
    attending: "",
    guests: 1,
    meal: "",
    dietary: "",
    song: "",
    note: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const update = (key, v) => setForm((f) => ({ ...f, [key]: v }));

  // Paste your Google Apps Script Web App URL here (see setup steps).
  // Leave as "" to keep the form working without saving anywhere.
  const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbzgF_ydwGyHW2V_aQPp3l_ygb-c_9PtOnTQdraB_wOTndzom0kKzbEDoBE4Sz_G1rsH/exec";

  const onSubmit = (e) => {
    e.preventDefault();
    if (SHEET_ENDPOINT) {
      setSending(true);
      const payload = {
        timestamp: new Date().toISOString(),
        name: form.name,
        email: form.email,
        attending: form.attending,
        guests: form.attending === "yes" ? form.guests : "",
        meal: form.attending === "yes" ? form.meal : "",
        dietary: form.attending === "yes" ? form.dietary : "",
        song: form.attending === "yes" ? form.song : "",
        note: form.note
      };
      // no-cors + urlencoded body => Apps Script accepts it without a CORS preflight
      fetch(SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload).toString()
      }).catch(() => {/* swallow — we still thank the guest */});
    }
    setSubmitted(true);
    setSending(false);
    window.scrollTo({ top: document.getElementById("rsvp").offsetTop - 80, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <section id="rsvp" className="rsvp-section" data-screen-label="RSVP">
        <div className="container-narrow">
          <SectionHeader eyebrow={t.rsvpThankYouEyebrow} title="RSVP" />
          <div className="rsvp-success" style={{ backgroundColor: "rgb(240, 234, 216)" }}>
            <div className="display-2" style={{ fontStyle: "italic", marginBottom: 16, fontFamily: "\"PP Editorial New\"", fontWeight: "300", color: "rgb(57, 24, 23)", lineHeight: "1.15", letterSpacing: "-3px" }}>
              {t.rsvpThankYouName(form.name.split(" ")[0] || t.nameFallback)}
            </div>
            <p className="body-lg" style={{ marginTop: 0, whiteSpace: "pre-line" }}>
              {form.attending === "yes" ? t.rsvpYes : t.rsvpNo}
            </p>
            <button className="btn" style={{ marginTop: 24, backgroundColor: "rgb(57, 24, 23)", color: "rgb(255, 255, 255)", letterSpacing: "0px" }} onClick={() => setSubmitted(false)}>
              {t.editResponse}
            </button>
          </div>
        </div>
      </section>);

  }

  return (
    <section id="rsvp" className="rsvp-section" data-screen-label="RSVP">
      <div className="container-narrow">
        <SectionDisplayTitle>RSVP</SectionDisplayTitle>
        <p style={{ textAlign: "center", fontStyle: "italic", maxWidth: 540, margin: "0 auto 56px", lineHeight: 1.6, fontSize: "22px", fontWeight: "300", fontFamily: "\"PP Editorial New\"", color: "rgb(0, 0, 0)" }}>{t.rsvpIntroPre}<br className="mobile-br" />{t.rsvpIntroPost}</p>
        

        <form className="form" onSubmit={onSubmit}>
          <div className="form-row-2">
            <div className="form-row">
              <label htmlFor="rsvp-name" style={{ letterSpacing: "0px" }}>{t.fullName}</label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder={t.fullNamePh} />
              
            </div>
            <div className="form-row">
              <label htmlFor="rsvp-email" style={{ letterSpacing: "0px" }}>{t.email}</label>
              <input
                id="rsvp-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com" />
              
            </div>
          </div>

          <div className="form-row">
            <label style={{ letterSpacing: "0px", padding: "0px 0px 7px" }}>{t.attendingQ}</label>
            <div className="pill-group" style={{ gap: "20px" }}>
              <button
                type="button"
                className={"pill" + (form.attending === "yes" ? " selected attending" : "")}
                onClick={() => update("attending", "yes")} style={{ letterSpacing: "0px" }}>
                
                {t.attendYes}
              </button>
              <button
                type="button"
                className={"pill" + (form.attending === "no" ? " selected declining" : "")}
                onClick={() => update("attending", "no")} style={{ letterSpacing: "0px" }}>
                
                {t.attendNo}
              </button>
            </div>
          </div>

          {form.attending === "yes" &&
          <div className="rsvp-yes-section" style={{ letterSpacing: "0px", display: "flex", flexDirection: "column", gap: "28px" }}>
              <div className="form-row-2">
                <div className="form-row">
                  <label style={{ letterSpacing: "0px", padding: "0px 0px 7px" }}>{t.guestsLabel}</label>
                  <div>
                    <div className="number-stepper" style={{ width: "140px", borderWidth: "1px" }}>
                      <button type="button" onClick={() => update("guests", Math.max(1, form.guests - 1))} style={{ padding: "10px 0px" }}>−</button>
                      <span>{form.guests}</span>
                      <button type="button" onClick={() => update("guests", Math.min(4, form.guests + 1))} style={{ padding: "10px 0px" }}>+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row" style={{ gap: "8px" }}>
                <label style={{ letterSpacing: "0px", padding: "0px 0px 7px" }}>{t.mealLabel}</label>
                <div className="pill-group" style={{ flexWrap: "wrap" }}>
                  {t.mealOptions.map((m) =>
                <button
                  key={m}
                  type="button"
                  className={"pill" + (form.meal === m ? " selected" : "")}
                  onClick={() => update("meal", m)} style={{ letterSpacing: "0px" }}>
                    
                      {m}
                    </button>
                )}
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="rsvp-diet" style={{ padding: "27px 0px 0px", letterSpacing: "0px" }}>{t.dietaryLabel}</label>
                <textarea
                id="rsvp-diet"
                rows={2}
                value={form.dietary}
                onChange={(e) => update("dietary", e.target.value)}
                placeholder={isMobile ? t.dietaryPhMobile : t.dietaryPhDesktop} />
              
              </div>

              <div className="form-row" style={{ padding: "27px 0px 0px" }}>
                <label htmlFor="rsvp-song" style={{ letterSpacing: "0px" }}>{t.songLabel}</label>
                <input
                id="rsvp-song"
                type="text"
                value={form.song}
                onChange={(e) => update("song", e.target.value)}
                placeholder={t.songPh} />
              
              </div>
            </div>
          }

          <div className="form-row" style={{ margin: "0px" }}>
            <label htmlFor="rsvp-note" style={{ letterSpacing: "0px" }}>{t.noteLabel}</label>
            <textarea
              id="rsvp-note"
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
              placeholder={t.notePh} style={{ height: "50px", padding: "5px 0px 10px" }} />
            
          </div>

          <div className="form-submit">
            <button type="submit" className="btn btn-wine" style={{ letterSpacing: "0px" }}>{t.sendRsvp}</button>
          </div>
        </form>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
function Footer() {
  const t = useT();
  return (
    <footer className="footer">
      <div className="footer-headline" style={{ fontFamily: "\"PP Editorial New\"", fontStyle: "italic", lineHeight: "1.1", fontWeight: "300", padding: "0px", textAlign: "center" }}>{t.footerHeadline}</div>
      <img src="uploads/Heart.png" alt="" className="footer-hearts" style={{ margin: "26px auto -60px" }} />
      <div className="footer-credit" style={{ letterSpacing: "0px", fontSize: "14px" }}>Made with love · miaandjoewedding.com</div>
    </footer>);

}

// Export to global scope
Object.assign(window, {
  Nav, Hero, OurStory, TheBigDay, TravelStay, ThingsToDo,
  Registry, FAQs, RSVP, Footer, SectionHeader, SectionDisplayTitle, Monogram
});

// ─────────────────────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────────────────────
const WEDDING_DATA_KO = JSON.parse(document.getElementById("wedding-data-ko").textContent);
const WEDDING_DATA_EN = JSON.parse(document.getElementById("wedding-data-en").textContent);

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentPalette": "wine",
  "displayFont": "PP Editorial New",
  "showCountdown": true
} /*EDITMODE-END*/;

const ACCENT_PALETTES = {
  wine: { wine: "#4C0000", terra: "#9F523E", olive: "#757153", sage: "#AC9D60" },
  terra: { wine: "#9F523E", terra: "#9F523E", olive: "#757153", sage: "#AC9D60" },
  olive: { wine: "#757153", terra: "#9F523E", olive: "#757153", sage: "#AC9D60" },
  cocoa: { wine: "#391817", terra: "#796D51", olive: "#757153", sage: "#AC9D60" },
  rose: { wine: "#9F523E", terra: "#C9A8A2", olive: "#AC9D60", sage: "#D9BFBA" }
};

const DISPLAY_FONTS = {
  "PP Editorial New": '"PP Editorial New", "Gowun Batang", "EB Garamond", serif',
  "Bodoni Moda": '"Bodoni Moda", serif',
  "Italiana": '"Italiana", serif',
  "Cormorant": '"Cormorant Garamond", serif',
  "EB Garamond": '"EB Garamond", serif'
};

function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + offset;
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join(",")]);
  return active;
}

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      className={"scroll-top-btn" + (visible ? " visible" : "")}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 11.5V2.5M7 2.5L3 6.5M7 2.5L11 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>);

}

function InvitationIntro() {
  const t = useT();
  const { lang } = useLangCtx();
  const [phase, setPhase] = useState("show"); // show -> fade -> done
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("fade"), 2000);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 3000);
    return () => {
      clearTimeout(t1);clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);
  if (phase === "done") return null;
  return (
    <div className={"invite-intro" + (phase === "fade" ? " fade" : "")} aria-hidden="true">
      <div className="invite-caption" style={lang === "ko" ? { fontFamily: "ui-monospace" } : null}>{t.invited}</div>
      <div className="invite-card-wrap">
        <img src="uploads/invite-card.jpg" alt="" className="invite-card-img" />
      </div>
    </div>);

}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLangState] = useState(langFromLocation);
  const setLang = (v) => {
    setLangState(v);
    try { document.documentElement.lang = v === "ko" ? "ko" : "en"; } catch (e) {}
  };
  useEffect(() => { try { document.documentElement.lang = lang === "ko" ? "ko" : "en"; } catch (e) {} }, [lang]);
  const active = useScrollSpy(["story", "bigday", "travel", "things", "registry", "faqs", "rsvp"]);
  const WEDDING_DATA = lang === "ko" ? WEDDING_DATA_KO : WEDDING_DATA_EN;

  useEffect(() => {
    const root = document.documentElement;
    const palette = ACCENT_PALETTES[t.accentPalette] || ACCENT_PALETTES.wine;
    root.style.setProperty("--wine", palette.wine);
    root.style.setProperty("--terra", palette.terra);
    root.style.setProperty("--olive", palette.olive);
    root.style.setProperty("--sage", palette.sage);
    root.style.setProperty("--f-display", DISPLAY_FONTS[t.displayFont] || DISPLAY_FONTS["PP Editorial New"]);
  }, [t.accentPalette, t.displayFont]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Nav activeSection={active} />
      <main>
        <Hero showCountdown={t.showCountdown} />
        <OurStory />
        <TheBigDay data={WEDDING_DATA} />
        <TravelStay data={WEDDING_DATA} />
        <ThingsToDo data={WEDDING_DATA} />
        <Registry />
        <FAQs data={WEDDING_DATA} />
        <RSVP />
      </main>
      <Footer />
      <ScrollTopButton />
      <InvitationIntro />


      <TweaksPanel title="Tweaks">
        <TweakSection label="Color & Palette" />
        <TweakRadio
          label="Accent palette"
          value={t.accentPalette}
          options={["wine", "terra", "olive", "cocoa", "rose"]}
          onChange={(v) => setTweak("accentPalette", v)} />
        
        <TweakSection label="Typography" />
        <TweakSelect
          label="Display font"
          value={t.displayFont}
          options={Object.keys(DISPLAY_FONTS)}
          onChange={(v) => setTweak("displayFont", v)} />
        
        <TweakSection label="Hero" />
        <TweakToggle
          label="Show countdown"
          value={t.showCountdown}
          onChange={(v) => setTweak("showCountdown", v)} />
        
      </TweaksPanel>
    </LangContext.Provider>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);