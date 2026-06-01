// wedding-sections.jsx
// All section components (Hero, OurStory, TheBigDay, TravelStay, ThingsToDo,
// Registry, FAQs, RSVP, Footer) and small helpers.

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function Monogram({ size = "mini", color }) {
  if (size === "mini") {
    return (
      <a href="#top" className="monogram-mini">
        <span style={{ color: color || "var(--ink)" }}>M</span>
        <span className="amp">&amp;</span>
        <span style={{ color: color || "var(--ink)" }}>J</span>
      </a>
    );
  }
  return (
    <div className="monogram-oval">
      <span className="monogram-oval-text">
        <span className="m">M</span>
        <span className="j">J</span>
      </span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, color }) {
  return (
    <div className="section-header">
      {eyebrow && <div className="eyebrow" style={color ? { color } : null}>{eyebrow}</div>}
      <div className="rule" style={color ? { background: color } : null} />
      <h2 className="h-section" style={color ? { color } : null}>{title}</h2>
      {subtitle && (
        <div className="h-3" style={{ marginTop: 18, color: "var(--ink-1)", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
          {subtitle}
        </div>
      )}
    </div>
  );
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
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

// ─────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────
function Nav({ activeSection }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["story", "Our Story"],
    ["bigday", "The Big Day"],
    ["travel", "Travel & Stay"],
    ["things", "Things to Do"],
    ["registry", "Registry"],
    ["faqs", "FAQs"]
  ];
  return (
    <nav className="nav-bar" id="nav-bar">
      <div className="nav-inner">
        <Monogram />
        <div className={"nav-links" + (open ? " open" : "")}>
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={"nav-link" + (activeSection === id ? " active" : "")}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a href="#rsvp" className="nav-rsvp" onClick={() => setOpen(false)}>RSVP</a>
        </div>
        <button className="nav-menu-btn" onClick={() => setOpen(o => !o)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────
function Hero({ showCountdown = true }) {
  const target = useMemo(() => new Date("2026-10-10T16:30:00-07:00").getTime(), []);
  const { days, hours, minutes } = useCountdown(target);
  return (
    <section className="hero" id="top" data-screen-label="Hero">
      <div className="hero-monogram-wrap">
        <Monogram size="oval" />
      </div>
      <div className="hero-names">
        <span className="display-1">Mia</span>
        <span className="ampersand">&amp;</span>
        <span className="display-1">Joe</span>
      </div>
      <div className="hero-date">October 10, 2026</div>
      <div className="hero-location">The Estate Yountville · Yountville, California</div>
      <a href="#rsvp" className="hero-rsvp-pill">RSVP</a>
      {showCountdown && (
        <div className="hero-countdown">
          <CountItem n={days} l="Days" />
          <div className="hero-countdown-sep"></div>
          <CountItem n={hours} l="Hours" />
          <div className="hero-countdown-sep"></div>
          <CountItem n={minutes} l="Min" />
        </div>
      )}
      <div className="hero-scroll">
        <span>Scroll</span>
        <span className="hero-scroll-line"></span>
      </div>
    </section>
  );
}

function CountItem({ n, l }) {
  return (
    <div className="hero-countdown-item">
      <div className="hero-countdown-num">{String(n).padStart(2, "0")}</div>
      <div className="hero-countdown-lbl">{l}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Our Story
// ─────────────────────────────────────────────────────────────
function OurStory() {
  return (
    <section id="story" data-screen-label="Our Story">
      <div className="container">
        <SectionHeader eyebrow="Chapter One" title="Our Story" />

        <div className="story-grid">
          <div>
            <image-slot
              id="story-photo-1"
              style={{ width: "100%", aspectRatio: "4/5" }}
              shape="rounded"
              radius="4"
              placeholder="Mia & Joe — first meeting"
            ></image-slot>
            <div className="eyebrow-sm" style={{ marginTop: 14 }}>
              July 7, 2025 · Chilseok
            </div>
          </div>
          <div className="story-text-block">
            <div className="eyebrow" style={{ marginBottom: 18, color: "var(--terra)" }}>
              How we began
            </div>
            <p>
              We first met on July 7th last year, Chilseok, the Korean legend of two lovers
              reuniting across the Milky Way. That evening, Mia brought fruits and crackers.
              Joe brought his favorite Napa Cabernet wine, Duckhorn. We only found out later
              that Duckhorn is named after the mandarin duck, a symbol of devoted love and
              lifelong partnership in Korean tradition.
            </p>
            <p>
              The coincidences didn't stop. A few weeks later, Joe showed up to help Mia
              move, wearing a cap with <em>"412"</em> stitched across the front. It was
              Pittsburgh's area code, but also Mia's birthday, April 12th. It felt less
              like coincidence and more like the universe quietly whispering that we were
              exactly where we were meant to be.
            </p>
          </div>
        </div>

        <div className="story-pull">
          "We come from different worlds. We want to keep honoring both of them,
          while continuing to build something that's ours."
        </div>

        <div className="story-grid reverse">
          <div>
            <image-slot
              id="story-photo-2"
              style={{ width: "100%", aspectRatio: "4/5" }}
              shape="rounded"
              radius="4"
              placeholder="A favorite memory together"
            ></image-slot>
            <div className="eyebrow-sm" style={{ marginTop: 14 }}>
              From cooking at home to Iceland & Taiwan
            </div>
          </div>
          <div className="story-text-block">
            <div className="eyebrow" style={{ marginBottom: 18, color: "var(--olive)" }}>
              How it grew
            </div>
            <p>
              From there, it was cooking together at home, afternoons on the golf course,
              weekend trips to Lake Erie, and bigger adventures in Iceland and Taiwan. The
              kinds of things that, when you look back, you realize were never really small
              at all.
            </p>
            <p>
              On October 10th, 2026, we'll begin our next chapter together in Napa Valley.
              It also happens to be a national holiday in Taiwan, a place close to Joe's
              heart, which makes the date feel even more meaningful to us.
            </p>
            <p>
              More than anything, we're looking forward to a lifetime of continuing to
              understand each other, and never feeling like we're done. We'd love for you
              to be there.
            </p>
            <div className="story-signature">
              <small>With love,</small>
              Mia &amp; Joe
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// The Big Day
// ─────────────────────────────────────────────────────────────
function TheBigDay({ data }) {
  return (
    <section id="bigday" className="bigday-bg" data-screen-label="The Big Day">
      <div className="container">
        <SectionHeader
          eyebrow="October 10, 2026 · Saturday"
          title="The Big Day"
          subtitle="An afternoon and evening among the vineyards of Napa Valley."
        />

        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div className="eyebrow" style={{ textAlign: "center", color: "var(--terra)", marginBottom: 8 }}>
            Schedule of Events
          </div>
          <div className="schedule">
            {data.schedule.map((row, i) => {
              if (row.interlude) {
                return (
                  <div key={i} className="sched-interlude">
                    <span style={{ fontSize: 14 }}>↓</span> {row.interlude}
                  </div>
                );
              }
              return (
                <div key={i} className="sched-row">
                  <div className="sched-time">{row.time}</div>
                  <div>
                    <h3 className="sched-title">{row.title}</h3>
                    <p className="sched-desc">{row.desc}</p>
                  </div>
                  <div className="sched-loc">{row.loc}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="attire">
          <div>
            <div className="eyebrow" style={{ color: "var(--terra)", marginBottom: 12 }}>
              Dress Code
            </div>
            <h3 className="h-1" style={{ marginTop: 0, marginBottom: 18 }}>
              Cocktail or<br />
              <em>garden party</em> attire
            </h3>
            <p className="body" style={{ marginTop: 0 }}>
              Where timeless elegance meets the romance of an autumn evening in Napa Valley.
              October evenings in Yountville are beautiful but can become cool after sunset,
              with temperatures dropping to around 50°F (10°C). A light wrap or tailored
              jacket is recommended.
            </p>

            <div className="attire-swatches">
              {[
                ["#DAD6CB", "Stone"],
                ["#9F523E", "Terracotta"],
                ["#757153", "Olive"],
                ["#391817", "Cocoa"]
              ].map(([c, n], i) => (
                <div key={i} className="attire-swatch" style={{ background: c, color: i < 2 ? "#391817" : "#FCF7F2" }}>
                  <span>{n}</span>
                </div>
              ))}
            </div>
            <div className="eyebrow-sm" style={{ marginTop: 14 }}>
              Soft neutrals & muted tones welcome
            </div>
          </div>

          <div>
            <ul className="attire-list">
              <li>Soft neutrals, muted tones, and classic silhouettes are always welcome.</li>
              <li>Earth tones — sage, olive, terracotta, dusty rose — feel right at home.</li>
              <li>October evenings can drop to 50°F (10°C); bring a light wrap or jacket.</li>
              <li>The ceremony is outdoors on grass — comfortable footwear is encouraged.</li>
            </ul>
            <div className="attire-avoid">
              <div className="attire-avoid-label">Please avoid</div>
              <div style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontSize: 20 }}>
                white · ivory · cream
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Travel & Stay
// ─────────────────────────────────────────────────────────────
function HotelCard({ hotel, slotId }) {
  return (
    <div className="hotel-card">
      <image-slot
        id={slotId}
        className="hotel-img"
        shape="rounded"
        radius="4"
        placeholder={hotel.name}
      ></image-slot>
      <div className="hotel-meta">
        <span className="hotel-stars">★ {hotel.stars}</span>
        <span className="hotel-distance">{hotel.distance}</span>
      </div>
      <h3 className="hotel-name">{hotel.name}</h3>
      <p className="hotel-desc">{hotel.desc}</p>
      <div>
        <a className="btn-link" href="#" target="_blank" rel="noreferrer">Book stay</a>
      </div>
    </div>
  );
}

function TravelStay({ data }) {
  return (
    <section id="travel" data-screen-label="Travel & Stay">
      <div className="container">
        <SectionHeader
          eyebrow="Getting Here"
          title="Travel & Stay"
          subtitle="A few places we love, and how to find your way to us."
        />

        <div className="travel-info">
          <div>
            <div className="eyebrow" style={{ color: "var(--terra)" }}>Travel</div>
            <div className="h-3" style={{ marginTop: 8 }}>From SFO</div>
          </div>
          <p className="body" style={{ margin: 0 }}>
            A rental car is recommended for exploring Napa Valley at your own pace. Most
            major car rental services, including Hertz, are available at San Francisco
            International Airport (SFO), approximately 1.5 hrs away.
            <br /><br />
            <em>We've only included places we've personally been to and loved.</em>
          </p>
        </div>

        <div className="area-label">
          <span className="area-label-text">In Yountville</span>
          <span className="area-label-sub">steps from the venue</span>
        </div>
        <div className="hotels">
          {data.hotels_yountville.map((h, i) => (
            <HotelCard key={i} hotel={h} slotId={`hotel-y-${i}`} />
          ))}
        </div>

        <div className="area-label">
          <span className="area-label-text">In Napa</span>
          <span className="area-label-sub">10–15 min drive</span>
        </div>
        <div className="hotels">
          {data.hotels_napa.map((h, i) => (
            <HotelCard key={i} hotel={h} slotId={`hotel-n-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Things to Do
// ─────────────────────────────────────────────────────────────
function PlaceList({ label, items, color }) {
  return (
    <div className="place-cat">
      <div className="place-cat-label" style={color ? { color, borderColor: color } : null}>
        {label}
      </div>
      {items.map((p, i) => (
        <div key={i} className="place-item">
          <h4 className="place-name">
            {p.name}
            {p.reserve && (
              <a className="reserve-tag" href={p.reserve} target="_blank" rel="noreferrer">
                Reserve
              </a>
            )}
          </h4>
          <p className="place-desc">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

function ThingsToDo({ data }) {
  return (
    <section id="things" className="todo-bg" data-screen-label="Things to Do">
      <div className="container">
        <SectionHeader
          eyebrow="A Wedding Weekend"
          title="Things to Do"
          subtitle="Beyond the wedding, we hope you'll have time to slow down and enjoy the valley. Every recommendation below is somewhere Mia & Joe have personally loved."
        />

        <h3 className="place-area-title">Yountville</h3>
        <div className="place-grid">
          <PlaceList label="Food & Drink" items={data.yountville_food} color="var(--terra)" />
          <PlaceList label="To Do" items={data.yountville_todo} color="var(--olive)" />
        </div>

        <h3 className="place-area-title">Napa</h3>
        <div className="place-grid">
          <PlaceList label="Food & Drink" items={data.napa_food} color="var(--terra)" />
          <PlaceList label="To Do" items={data.napa_todo} color="var(--olive)" />
        </div>

        <h3 className="place-area-title">Wineries</h3>
        <div className="place-grid">
          <PlaceList label="Tastings" items={data.napa_wine.slice(0, 2)} color="var(--wine)" />
          <PlaceList label="Tastings, cont." items={data.napa_wine.slice(2)} color="var(--wine)" />
        </div>

        <div style={{ textAlign: "center", marginTop: 60 }}>
          <p className="body" style={{ fontStyle: "italic", maxWidth: 620, margin: "0 auto 24px" }}>
            For more suggestions, feel free to reach out to Mia at jmink0412@gmail.com —
            she's visited Napa more than ten times and happily considers herself very
            familiar with the valley by now.
          </p>
          <a className="btn" href="https://maps.google.com" target="_blank" rel="noreferrer">
            Google Map
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────
function Registry() {
  return (
    <section id="registry" className="registry-section" data-screen-label="Registry">
      <div className="container-narrow">
        <div className="eyebrow">A Note On Gifts</div>
        <div className="rule" style={{ background: "rgba(252,247,242,0.5)" }} />
        <h2 className="h-section" style={{ color: "var(--bg-cream)" }}>Registry</h2>

        <p className="body-lg" style={{ color: "rgba(252,247,242,0.85)", maxWidth: 600, margin: "32px auto 0", textAlign: "center" }}>
          Your presence at our wedding is the greatest gift of all. But if you'd
          like to celebrate with us a little longer, we've created a honeymoon
          fund for the adventures that await us.
        </p>

        <div className="registry-card">
          <div className="eyebrow-sm" style={{ color: "rgba(252,247,242,0.6)" }}>
            Honeymoon Fund
          </div>
          <div style={{ height: 16 }} />
          <h3 className="h-2">Joe &amp; Mia's<br />Honeymoon Fund</h3>
          <a className="btn" href="#" target="_blank" rel="noreferrer">
            Visit Honeyfund
          </a>
        </div>

        <p className="h-3" style={{ color: "var(--pink-3)", marginTop: 60, fontStyle: "italic" }}>
          We can't wait to see you in Yountville.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────────────────────
function FAQs({ data }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section id="faqs" data-screen-label="FAQs">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Good Questions"
          title="FAQs"
          subtitle="If something isn't covered here, please reach out — we're happy to help."
        />
        <div className="faq-list">
          {data.faqs.map((f, i) => (
            <div key={i} className={"faq-item" + (openIdx === i ? " open" : "")}>
              <button
                className="faq-btn"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                <span style={{ flex: 1 }}>{f.q}</span>
                <span className="faq-toggle"></span>
              </button>
              <div className="faq-body">
                <div className="faq-body-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// RSVP Form
// ─────────────────────────────────────────────────────────────
function RSVP() {
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

  const update = (key, v) => setForm(f => ({ ...f, [key]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: document.getElementById("rsvp").offsetTop - 80, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <section id="rsvp" className="rsvp-section" data-screen-label="RSVP">
        <div className="container-narrow">
          <SectionHeader eyebrow="Thank You" title="RSVP" />
          <div className="rsvp-success">
            <div className="display-2" style={{ fontStyle: "italic", color: "var(--terra)", marginBottom: 16 }}>
              Thank you, {form.name.split(" ")[0] || "friend"}.
            </div>
            <p className="body-lg" style={{ marginTop: 0 }}>
              {form.attending === "yes"
                ? "We've received your RSVP and can't wait to celebrate with you on October 10th."
                : "Thank you for letting us know. We'll miss you on October 10th, but appreciate you so much."}
            </p>
            <button className="btn" style={{ marginTop: 24 }} onClick={() => setSubmitted(false)}>
              Edit response
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="rsvp-section" data-screen-label="RSVP">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Please Respond"
          title="RSVP"
          subtitle="Please RSVP by August 31st. We'd love to hear from you soon."
        />

        <form className="form" onSubmit={onSubmit}>
          <div className="form-row-2">
            <div className="form-row">
              <label htmlFor="rsvp-name">Full Name</label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={form.name}
                onChange={e => update("name", e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="form-row">
              <label htmlFor="rsvp-email">Email Address</label>
              <input
                id="rsvp-email"
                type="email"
                required
                value={form.email}
                onChange={e => update("email", e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-row">
            <label>Will you be attending?</label>
            <div className="pill-group">
              <button
                type="button"
                className={"pill" + (form.attending === "yes" ? " selected attending" : "")}
                onClick={() => update("attending", "yes")}
              >
                ✓ Yes, I'll be there
              </button>
              <button
                type="button"
                className={"pill" + (form.attending === "no" ? " selected declining" : "")}
                onClick={() => update("attending", "no")}
              >
                Regretfully decline
              </button>
            </div>
          </div>

          {form.attending === "yes" && (
            <>
              <div className="form-row-2">
                <div className="form-row">
                  <label>Number of Guests</label>
                  <div>
                    <div className="number-stepper">
                      <button type="button" onClick={() => update("guests", Math.max(1, form.guests - 1))}>−</button>
                      <span>{form.guests}</span>
                      <button type="button" onClick={() => update("guests", Math.min(4, form.guests + 1))}>+</button>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <label>Meal Preference</label>
                  <div className="pill-group">
                    {["Chicken", "Fish", "Vegetarian"].map(m => (
                      <button
                        key={m}
                        type="button"
                        className={"pill" + (form.meal === m ? " selected" : "")}
                        onClick={() => update("meal", m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="rsvp-diet">Dietary Restrictions or Allergies</label>
                <input
                  id="rsvp-diet"
                  type="text"
                  value={form.dietary}
                  onChange={e => update("dietary", e.target.value)}
                  placeholder="Let us know if anything"
                />
              </div>

              <div className="form-row">
                <label htmlFor="rsvp-song">Song Request</label>
                <input
                  id="rsvp-song"
                  type="text"
                  value={form.song}
                  onChange={e => update("song", e.target.value)}
                  placeholder="Is there a song that would get you on the dance floor?"
                />
              </div>
            </>
          )}

          <div className="form-row">
            <label htmlFor="rsvp-note">A Note or Wish for the Couple</label>
            <textarea
              id="rsvp-note"
              value={form.note}
              onChange={e => update("note", e.target.value)}
              placeholder="Anything you'd like to share with Mia & Joe"
            />
          </div>

          <div className="form-submit">
            <button type="submit" className="btn btn-wine">Send RSVP</button>
          </div>
        </form>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <Monogram size="oval" />
      <div className="footer-names">Mia <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontWeight: 200, color: 'var(--pink-2)', textTransform: 'lowercase' }}>&amp;</span> Joe</div>
      <div className="footer-meta">October 10, 2026 · The Estate Yountville</div>
      <div className="footer-credit">Made with love · jmink0412@gmail.com</div>
    </footer>
  );
}

// Export to global scope
Object.assign(window, {
  Nav, Hero, OurStory, TheBigDay, TravelStay, ThingsToDo,
  Registry, FAQs, RSVP, Footer, SectionHeader, Monogram
});

// ─────────────────────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────────────────────
const WEDDING_DATA = JSON.parse(document.getElementById("wedding-data").textContent);

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentPalette": "wine",
  "displayFont": "Bodoni Moda",
  "showCountdown": true
}/*EDITMODE-END*/;

const ACCENT_PALETTES = {
  wine:    { wine: "#4C0000", terra: "#9F523E", olive: "#757153", sage: "#AC9D60" },
  terra:   { wine: "#9F523E", terra: "#9F523E", olive: "#757153", sage: "#AC9D60" },
  olive:   { wine: "#757153", terra: "#9F523E", olive: "#757153", sage: "#AC9D60" },
  cocoa:   { wine: "#391817", terra: "#796D51", olive: "#757153", sage: "#AC9D60" },
  rose:    { wine: "#9F523E", terra: "#C9A8A2", olive: "#AC9D60", sage: "#D9BFBA" }
};

const DISPLAY_FONTS = {
  "Bodoni Moda": '"Bodoni Moda", serif',
  "Italiana":    '"Italiana", serif',
  "Cormorant":   '"Cormorant Garamond", serif',
  "EB Garamond": '"EB Garamond", serif'
};

function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + offset;
      let current = ids[0];
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

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const active = useScrollSpy(["story", "bigday", "travel", "things", "registry", "faqs", "rsvp"]);

  useEffect(() => {
    const root = document.documentElement;
    const palette = ACCENT_PALETTES[t.accentPalette] || ACCENT_PALETTES.wine;
    root.style.setProperty("--wine", palette.wine);
    root.style.setProperty("--terra", palette.terra);
    root.style.setProperty("--olive", palette.olive);
    root.style.setProperty("--sage", palette.sage);
    root.style.setProperty("--f-display", DISPLAY_FONTS[t.displayFont] || DISPLAY_FONTS["Bodoni Moda"]);
  }, [t.accentPalette, t.displayFont]);

  return (
    <>
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

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color & Palette" />
        <TweakRadio
          label="Accent palette"
          value={t.accentPalette}
          options={["wine", "terra", "olive", "cocoa", "rose"]}
          onChange={(v) => setTweak("accentPalette", v)}
        />
        <TweakSection label="Typography" />
        <TweakSelect
          label="Display font"
          value={t.displayFont}
          options={Object.keys(DISPLAY_FONTS)}
          onChange={(v) => setTweak("displayFont", v)}
        />
        <TweakSection label="Hero" />
        <TweakToggle
          label="Show countdown"
          value={t.showCountdown}
          onChange={(v) => setTweak("showCountdown", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
