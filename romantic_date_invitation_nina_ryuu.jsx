import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, Heart, Shirt, CheckCircle2 } from "lucide-react";

// ——— QUICK EDITS ———
const INVITE = {
  couple: { you: "Ilham", partner: "Nina" },
  tagline: "Time stops when I'm with you",
  date: "Saturday, 13 September 2025",
  time: "13:00 WITA",
  location: {
    places: ["Timezone Epicentrum", "Sunset in Senggigi", "Dinner at Bono Bistro"],
    address: "Mataram, Indonesia",
    mapsUrl: "https://maps.google.com",
  },
  heroImage:
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
  // Timeline of your date plan
  timeline: [
    {
      time: "13:00",
      title: "Pick Up",
      detail: "I'll be there with a smile, ready to start our day.",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      time: "13:20",
      title: "Fun at Timezone Epicentrum",
      detail: "Games, laughter, and silly prizes for us.",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      time: "16:30",
      title: "Sunset in Senggigi",
      detail: "Golden skies, your hand in mine, and nothing else needed.",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      time: "19:20",
      title: "Dinner at Bono Bistro",
      detail: "A cozy meal, soft lights, and sweeter words.",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      time: "22:00",
      title: "Safely Home",
      detail: "I'll make sure you're safe and sound back home.",
      icon: <MapPin className="h-5 w-5" />,
    },
  ],
  // Dress code guidance
  dresscode: {
    theme: "Brown & Timeless",
    text: "Wear something brown, and please, <strong class='text-rose-600 text-lg underline'>NO WATCH babe</strong>—I’ll plan everything so you can forget about time.",
    avoid: ["Watches"],
  },
  gallery: [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1200&auto=format&fit=crop",
  ],
  footerNote:
    "With you, time doesn’t tick—it just flows beautifully.",
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-xl bg-white/80 backdrop-blur p-8 ${className}`}>{children}</div>
);

const SectionTitle = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2 mb-6 mt-4">
    {Icon ? <Icon className="h-5 w-5 text-rose-500" /> : null}
    <h2 className="text-xl font-semibold tracking-tight">{children}</h2>
  </div>
);

function HeartbeatScreen({ onFinish }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="text-rose-500"
      >
        <span className="text-5xl font-extrabold tracking-wide">I ❤ N</span>
      </motion.div>
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-clock-ticking-1045.mp3" preload="auto" />
    </div>
  );
}

export default function Invitation() {
  const [showMain, setShowMain] = useState(false);
  const [yesSize, setYesSize] = useState(1);
  const [noSize, setNoSize] = useState(1);
  const [confetti, setConfetti] = useState(false);
  const [popup, setPopup] = useState(false);

  const handleNoClick = () => {
    setYesSize((prev) => prev * 1.2);
    setNoSize((prev) => prev * 0.8);
  };

  const handleYesClick = () => {
    setConfetti(true);
    setPopup(true);
    setTimeout(() => setConfetti(false), 5000);
    setTimeout(() => setPopup(false), 4000);
  };

  if (!showMain) return <HeartbeatScreen onFinish={() => setShowMain(true)} />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-rose-50 via-white to-emerald-50 text-gray-800 relative overflow-hidden">
      {/* Confetti */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(150)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * window.innerWidth, rotate: 0 }}
              animate={{ y: window.innerHeight + 50, rotate: 360 }}
              transition={{ duration: 3 + Math.random() * 2, ease: "easeIn" }}
              className="absolute w-2 h-2 bg-rose-400 rounded-full"
              style={{ left: Math.random() * 100 + "%" }}
            />
          ))}
        </div>
      )}

      {/* Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
              <h2 className="text-3xl font-bold text-rose-500 mb-2">Yeayyyy!</h2>
              <p className="text-lg text-gray-700">I love you babe ❤️</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <img
          src={INVITE.heroImage}
          alt="Hero"
          className="h-[60vh] w-full object-cover brightness-[.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 text-center"
        >
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-gray-700">Nina, will you say yes?</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-2">
            {INVITE.couple.you} & <span className="text-rose-500">{INVITE.couple.partner}</span>
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">{INVITE.tagline}</p>

          {/* YES/NO BUTTONS */}
          <div className="mt-6 flex gap-6">
            <motion.button
              style={{ transform: `scale(${yesSize})` }}
              onClick={handleYesClick}
              className="px-6 py-3 bg-rose-500 text-white rounded-full shadow-lg font-semibold"
            >
              Yes
            </motion.button>
            <motion.button
              style={{ transform: `scale(${noSize})` }}
              onClick={handleNoClick}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full shadow font-medium"
            >
              No
            </motion.button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow">
              <Calendar className="h-4 w-4" /> {INVITE.date}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow">
              <Clock className="h-4 w-4" /> {INVITE.time}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card>
              <SectionTitle icon={MapPin}>Where</SectionTitle>
              <ul className="space-y-2 text-gray-700">
                {INVITE.location.places.map((place, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-400" />
                    <span className="font-medium text-lg">{place}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-4">{INVITE.location.address}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card>
              <SectionTitle icon={Calendar}>When</SectionTitle>
              <p className="font-medium text-lg">{INVITE.date}</p>
              <p className="text-sm text-gray-600 mt-2">Start at {INVITE.time}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card>
              <SectionTitle icon={Heart}>Message</SectionTitle>
              <p className="text-sm leading-relaxed text-gray-700 mt-2">
                "Forget about the hours, forget about the minutes—let me take care of the time. All you need to do is be with me."
              </p>
            </Card>
          </motion.div>
        </div>

        {/* TIMELINE */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
          <Card>
            <SectionTitle icon={Clock}>Timeline</SectionTitle>
            <ol className="relative border-l-2 border-rose-200 pl-6 space-y-6">
              {INVITE.timeline.map((step, idx) => (
                <li key={idx} className="">
                  <div className="absolute -left-[10px] h-5 w-5 rounded-full bg-white border-2 border-rose-300 flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold tracking-wide uppercase text-rose-500">{step.time}</span>
                    <span className="text-sm inline-flex items-center gap-2 px-2 py-1 rounded-full bg-rose-50 border border-rose-100">
                      {step.icon} {step.title}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{step.detail}</p>
                </li>
              ))}
            </ol>
          </Card>
        </motion.div>

        {/* DRESSCODE */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
          <Card>
            <SectionTitle icon={Shirt}>Dress code</SectionTitle>
            <p className="font-medium">Theme: {INVITE.dresscode.theme}</p>
            <p
              className="text-sm text-gray-700 mt-2"
              dangerouslySetInnerHTML={{ __html: INVITE.dresscode.text }}
            />
            <p className="mt-3 text-sm text-gray-600">Avoid: {INVITE.dresscode.avoid.join(", ")}</p>
          </Card>
        </motion.div>

        {/* GALLERY */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
          <Card>
            <SectionTitle icon={Heart}>Us (soon)</SectionTitle>
            <div className="grid md:grid-cols-3 gap-4">
              {INVITE.gallery.map((src, i) => (
                <img key={i} src={src} alt={`Gallery ${i + 1}`} className="rounded-xl object-cover h-48 w-full" />)
              )}
            </div>
            <p className="text-xs text-gray-500 mt-3">Tip: Replace with your photos or screenshots of your chats you love.</p>
          </Card>
        </motion.div>

        {/* FOOTER */}
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>{INVITE.footerNote}</p>
          <p className="mt-2">Made with ♥ by {INVITE.couple.you} for {INVITE.couple.partner}</p>
        </div>
      </div>
    </div>
  );
}
