import PptxGenJS from "pptxgenjs";

const BLUE = "2563EB";
const DARK = "111827";
const GRAY = "6B7280";
const LIGHT_BLUE = "EFF6FF";
const WHITE = "FFFFFF";
const GREEN = "10B981";
const AMBER = "F59E0B";
const RED = "EF4444";

export async function generatePptx() {
  const pptx = new PptxGenJS();
  pptx.author = "Davide Tuzi";
  pptx.title = "Davide Tuzi – Professional Profile";
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

  const addFooter = (slide: PptxGenJS.Slide) => {
    slide.addText("Davide Tuzi · davide.tuzi@gmail.com · linkedin.com/in/davide-tuzi", {
      x: 0.5, y: 7.0, w: 12.33, h: 0.3,
      fontSize: 8, color: GRAY, align: "center",
    });
  };

  // ─── SLIDE 1: Title ───
  const s1 = pptx.addSlide();
  s1.background = { color: DARK };
  s1.addText("Davide Tuzi", { x: 1, y: 2.2, w: 11, h: 1.2, fontSize: 44, bold: true, color: WHITE, fontFace: "Calibri" });
  s1.addText("Sales & Business Professional | Tech & Sustainability", { x: 1, y: 3.4, w: 11, h: 0.6, fontSize: 20, color: BLUE, fontFace: "Calibri" });
  s1.addText("📧 davide.tuzi@gmail.com   📱 +39 333 201 6113   🔗 linkedin.com/in/davide-tuzi", {
    x: 1, y: 4.4, w: 11, h: 0.4, fontSize: 12, color: GRAY,
  });

  // ─── SLIDE 2: Who is Davide ───
  const s2 = pptx.addSlide();
  s2.addText("Who is Davide", { x: 0.5, y: 0.3, w: 12, h: 0.6, fontSize: 28, bold: true, color: DARK });
  s2.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.85, w: 2.5, h: 0.04, fill: { color: BLUE } });
  s2.addText(
    "Born and raised in Rome 🇮🇹, lived 6 years in Turin and 6 years in the Netherlands before returning home. " +
    "Happily married with Katia, proud cat dad of three (Polpetta, Tiramisù & Sofficino), and a guitar player in my free time.\n\n" +
    "Professionally, a sales & business leader with 9+ years of B2B experience across international markets. " +
    "Engineering foundation (Politecnico di Torino), strategic thinking (MBA from Maastricht), and entrepreneurial grit (CEO & Co-Founder of NEXTON). " +
    "Thrives in multicultural environments — including Chinese corporate culture — passionate about technology, sustainability, and building things from scratch.",
    { x: 0.5, y: 1.1, w: 12.3, h: 3.0, fontSize: 14, color: DARK, lineSpacingMultiple: 1.4, valign: "top" }
  );

  // Life Journey
  const stops = ["🏠 Roma – Born & raised", "🎓 Torino – 6 years", "🌷 Netherlands – 6 years", "🏡 Roma – Current base"];
  stops.forEach((stop, i) => {
    const xPos = 1.5 + i * 2.8;
    s2.addShape(pptx.ShapeType.roundRect, { x: xPos, y: 4.5, w: 2.4, h: 0.5, fill: { color: LIGHT_BLUE }, rectRadius: 0.1 });
    s2.addText(stop, { x: xPos, y: 4.5, w: 2.4, h: 0.5, fontSize: 10, color: BLUE, align: "center", valign: "middle" });
    if (i < stops.length - 1) {
      s2.addText("✈", { x: xPos + 2.4, y: 4.5, w: 0.4, h: 0.5, fontSize: 10, color: GRAY, align: "center", valign: "middle" });
    }
  });

  // Languages
  s2.addText("Languages", { x: 0.5, y: 5.3, w: 4, h: 0.4, fontSize: 14, bold: true, color: BLUE });
  const langs = ["🇮🇹 Italian – Native", "🇬🇧 English – Fluent", "🇪🇸 Spanish – Fluent", "🇳🇱 Dutch – Limited", "🇫🇷 French – Limited"];
  langs.forEach((l, i) => {
    s2.addText(l, { x: 0.5 + i * 2.4, y: 5.7, w: 2.3, h: 0.35, fontSize: 11, color: DARK });
  });

  // Passions
  s2.addText("Passions", { x: 0.5, y: 6.2, w: 4, h: 0.4, fontSize: 14, bold: true, color: BLUE });
  const passions = ["Technology", "Sustainability", "Travel", "Cooking", "Cats", "Guitar", "Entrepreneurship"];
  passions.forEach((p, i) => {
    s2.addShape(pptx.ShapeType.roundRect, { x: 0.5 + i * 1.7, y: 6.55, w: 1.5, h: 0.35, fill: { color: LIGHT_BLUE }, rectRadius: 0.1 });
    s2.addText(p, { x: 0.5 + i * 1.7, y: 6.55, w: 1.5, h: 0.35, fontSize: 9, color: BLUE, align: "center", valign: "middle" });
  });
  addFooter(s2);

  // ─── SLIDE 3: Skills ───
  const s3 = pptx.addSlide();
  s3.addText("Skills Set", { x: 0.5, y: 0.3, w: 12, h: 0.6, fontSize: 28, bold: true, color: DARK });
  s3.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.85, w: 2, h: 0.04, fill: { color: BLUE } });
  s3.addText(
    '"Relatively young yet experienced business initiator with a proven track record in leadership, strategic vision, and business development."',
    { x: 0.5, y: 1.2, w: 12.3, h: 0.8, fontSize: 13, italic: true, color: GRAY, lineSpacingMultiple: 1.3 }
  );
  const skills = ["Business Development", "Strategic Vision", "Leadership", "Market Knowledge", "Financial Acumen", "Problem-Solver", "Effective Communicator", "Negotiation", "Cross-cultural Sensitivity", "Relationship Building"];
  skills.forEach((s, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    s3.addShape(pptx.ShapeType.roundRect, { x: 0.5 + col * 2.5, y: 2.3 + row * 0.7, w: 2.3, h: 0.5, fill: { color: LIGHT_BLUE }, rectRadius: 0.1 });
    s3.addText(s, { x: 0.5 + col * 2.5, y: 2.3 + row * 0.7, w: 2.3, h: 0.5, fontSize: 12, color: BLUE, align: "center", valign: "middle", bold: true });
  });
  addFooter(s3);

  // ─── SLIDE 4: Education ───
  const s4 = pptx.addSlide();
  s4.addText("Qualifications", { x: 0.5, y: 0.3, w: 12, h: 0.6, fontSize: 28, bold: true, color: DARK });
  s4.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.85, w: 2.5, h: 0.04, fill: { color: BLUE } });
  const quals = [
    { inst: "Politecnico di Torino", degree: "B.Sc. & M.Sc. Civil Engineering", desc: "Engineering knowledge with focus on infrastructures and structures." },
    { inst: "Erasmus for Young Entrepreneurs", degree: "Entrepreneurship Program", desc: "Selected for Erasmus experience in Finland. Reinforced entrepreneurship skills." },
    { inst: "Maastricht School of Management", degree: "Executive MBA", desc: "Digital transformation, data analytics, e-commerce, technology management. Thesis on Finance." },
  ];
  quals.forEach((q, i) => {
    const xPos = 0.5 + i * 4.1;
    s4.addShape(pptx.ShapeType.roundRect, { x: xPos, y: 1.2, w: 3.9, h: 2.5, fill: { color: WHITE }, line: { color: "E5E7EB", width: 1 }, rectRadius: 0.1 });
    s4.addText(q.inst, { x: xPos + 0.2, y: 1.4, w: 3.5, h: 0.5, fontSize: 13, bold: true, color: BLUE });
    s4.addText(q.degree, { x: xPos + 0.2, y: 1.9, w: 3.5, h: 0.4, fontSize: 12, bold: true, color: DARK });
    s4.addText(q.desc, { x: xPos + 0.2, y: 2.4, w: 3.5, h: 1.0, fontSize: 11, color: GRAY, lineSpacingMultiple: 1.3 });
  });

  s4.addText("📜 Professional Certifications", { x: 0.5, y: 4.2, w: 6, h: 0.5, fontSize: 16, bold: true, color: BLUE });
  s4.addText("Strategic Selling® with Perspective\nKorn Ferry (Miller Heiman Group) · 2025", {
    x: 0.5, y: 4.8, w: 5, h: 0.8, fontSize: 12, color: DARK, lineSpacingMultiple: 1.3,
  });
  addFooter(s4);

  // ─── SLIDE 5: Career – Lenntech & Vanderlande ───
  const s5 = pptx.addSlide();
  s5.addText("Career Path", { x: 0.5, y: 0.3, w: 12, h: 0.6, fontSize: 28, bold: true, color: DARK });
  s5.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.85, w: 2.2, h: 0.04, fill: { color: BLUE } });

  // Lenntech
  s5.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 0.06, h: 2.3, fill: { color: BLUE } });
  s5.addText("2016 – 2018", { x: 0.8, y: 1.2, w: 2, h: 0.3, fontSize: 10, color: BLUE, bold: true });
  s5.addText("Lenntech – Technical Sales Engineer", { x: 0.8, y: 1.5, w: 5, h: 0.3, fontSize: 14, bold: true, color: DARK });
  const lenntechItems = ["Exceeded sales quota by 20%", "Portfolio increased by 50% (new accounts)", "Improved sales ops by developing an internal tool", "Successfully managed corporate accounts"];
  lenntechItems.forEach((a, i) => {
    s5.addText(`●  ${a}`, { x: 1.0, y: 1.9 + i * 0.35, w: 5.5, h: 0.3, fontSize: 11, color: DARK });
  });

  // Vanderlande
  s5.addShape(pptx.ShapeType.rect, { x: 7, y: 1.2, w: 0.06, h: 4.5, fill: { color: BLUE } });
  s5.addText("2018 – 2021", { x: 7.3, y: 1.2, w: 2, h: 0.3, fontSize: 10, color: BLUE, bold: true });
  s5.addText("Vanderlande", { x: 7.3, y: 1.5, w: 5, h: 0.3, fontSize: 14, bold: true, color: DARK });

  s5.addText("Spare Parts Sales Engineer Specialist – Global Services (2018–2019)", { x: 7.3, y: 2.0, w: 5.5, h: 0.3, fontSize: 11, bold: true, color: BLUE });
  s5.addText("●  100% complex project success rate\n●  Acted as Project Manager for project leads", { x: 7.5, y: 2.35, w: 5.3, h: 0.7, fontSize: 11, color: DARK, lineSpacingMultiple: 1.4 });

  s5.addText("Sales Engineer Key Account – Amazon (2019–2021)", { x: 7.3, y: 3.2, w: 5.5, h: 0.3, fontSize: 11, bold: true, color: BLUE });
  s5.addText("●  Price negotiation with major customers\n●  Successful cross-functional collaboration", { x: 7.5, y: 3.55, w: 5.3, h: 0.7, fontSize: 11, color: DARK, lineSpacingMultiple: 1.4 });

  addFooter(s5);

  // ─── SLIDE 6: Career – NEXTON & HAI Robotics ───
  const s6 = pptx.addSlide();
  s6.addText("Career Path (cont.)", { x: 0.5, y: 0.3, w: 12, h: 0.6, fontSize: 28, bold: true, color: DARK });
  s6.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.85, w: 3, h: 0.04, fill: { color: BLUE } });

  // NEXTON
  s6.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 0.06, h: 2.0, fill: { color: BLUE } });
  s6.addText("2019 – 2023", { x: 0.8, y: 1.2, w: 2, h: 0.3, fontSize: 10, color: BLUE, bold: true });
  s6.addText("NEXTON – CEO & Co-Founder (IoT Startup)", { x: 0.8, y: 1.5, w: 5, h: 0.3, fontSize: 14, bold: true, color: DARK });
  s6.addText("●  Entrepreneurial adventure in IoT / smart lighting\n●  Raised €50,000 in investment\n●  Featured in La Repubblica, MarsicaLive, 100Torri", {
    x: 1.0, y: 1.9, w: 5.5, h: 1.1, fontSize: 11, color: DARK, lineSpacingMultiple: 1.4,
  });

  // HAI Robotics
  s6.addShape(pptx.ShapeType.rect, { x: 7, y: 1.2, w: 0.06, h: 5.0, fill: { color: BLUE } });
  s6.addText("2021 – Present", { x: 7.3, y: 1.2, w: 2, h: 0.3, fontSize: 10, color: BLUE, bold: true });
  s6.addText("HAI Robotics – Country Manager Italy & Middle East", { x: 7.3, y: 1.5, w: 5.5, h: 0.3, fontSize: 14, bold: true, color: DARK });
  const haiItems = [
    "Built Italian team from scratch (7 professionals)",
    "Led a team of 6–10 across Italy & Middle East",
    "Managed regional P&L and budget",
    "Exceeded sales quota in 2 out of 3 years",
    "Pioneered the Middle East market from zero",
    "6 partnerships signed, incl. 4 Tier-1 integrators",
    "Thrived in Chinese corporate culture",
  ];
  haiItems.forEach((a, i) => {
    s6.addText(`●  ${a}`, { x: 7.5, y: 1.9 + i * 0.35, w: 5.3, h: 0.3, fontSize: 11, color: DARK });
  });

  // Pipeline highlight
  s6.addShape(pptx.ShapeType.roundRect, { x: 7.3, y: 4.5, w: 5.3, h: 0.6, fill: { color: LIGHT_BLUE }, rectRadius: 0.1 });
  s6.addText("📊 Total pipeline developed: €30M+ in less than 3 years", {
    x: 7.3, y: 4.5, w: 5.3, h: 0.6, fontSize: 13, color: BLUE, bold: true, align: "center", valign: "middle",
  });
  addFooter(s6);

  // ─── SLIDE 7: SWOT ───
  const s7 = pptx.addSlide();
  s7.addText("SWOT Analysis", { x: 0.5, y: 0.3, w: 12, h: 0.6, fontSize: 28, bold: true, color: DARK });
  s7.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.85, w: 2.5, h: 0.04, fill: { color: BLUE } });

  const swotData = [
    { title: "Strengths", color: GREEN, items: ["Resolute", "Excellent Planner", "Open-minded Enthusiast", "Possibility-finder", "Out-of-the-box Thinker"] },
    { title: "Weaknesses", color: AMBER, items: ["Need to Know Details", "Impatient for Results", "Workaholic", "Balance the Passion"] },
    { title: "Opportunities", color: BLUE, items: ["Personal Growth", "Lead by Example", "Skill Diversification", "Mentorship", "Entrepreneurship"] },
    { title: "Threats", color: RED, items: ["Personal Affection"] },
  ];
  swotData.forEach((s, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 0.5 + col * 6.3;
    const yPos = 1.2 + row * 3.0;
    s7.addShape(pptx.ShapeType.rect, { x: xPos, y: yPos, w: 0.06, h: 2.6, fill: { color: s.color } });
    s7.addShape(pptx.ShapeType.roundRect, { x: xPos, y: yPos, w: 5.9, h: 2.6, fill: { color: WHITE }, line: { color: "E5E7EB", width: 1 }, rectRadius: 0.1 });
    s7.addText(s.title.toUpperCase(), { x: xPos + 0.3, y: yPos + 0.15, w: 5, h: 0.35, fontSize: 12, bold: true, color: s.color });
    s.items.forEach((item, j) => {
      s7.addText(`●  ${item}`, { x: xPos + 0.3, y: yPos + 0.6 + j * 0.35, w: 5, h: 0.3, fontSize: 12, color: DARK });
    });
  });
  addFooter(s7);

  // ─── SLIDE 8: What I Care in a Job ───
  const s8 = pptx.addSlide();
  s8.addText("What I Care in a Job", { x: 0.5, y: 0.3, w: 12, h: 0.6, fontSize: 28, bold: true, color: DARK });
  s8.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.85, w: 3.5, h: 0.04, fill: { color: BLUE } });

  const dreamTraits = [
    { label: "Good balance travel / home", desc: "I love travelling — business is person-to-person. Based near FCO airport and Rome's main high-speed rail hub." },
    { label: "Remote when not travelling", desc: "My family is my daily dopamine and motivation — time with them fuels my performance." },
    { label: "High responsibility", desc: "Not afraid of calculated risks. Autonomy in decision-making makes me feel trusted and empowered." },
    { label: "Sales & Strategy focused", desc: "Combining hands-on selling with strategic thinking — shaping go-to-market plans and turning vision into revenue." },
    { label: "Good work-life balance", desc: "Sustained performance requires balance. I give my best when I can be fully present at work and at home." },
    { label: "Managing a team", desc: "Building, mentoring and leading teams is where I find purpose. Watching people grow is rewarding." },
    { label: "I love challenges", desc: "Comfort zones don't excite me. Energised by ambitious targets and uncharted markets." },
  ];
  dreamTraits.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 0.5 + col * 6.3;
    const yPos = 1.2 + row * 1.5;
    s8.addShape(pptx.ShapeType.roundRect, { x: xPos, y: yPos, w: 5.9, h: 1.3, fill: { color: WHITE }, line: { color: "E5E7EB", width: 1 }, rectRadius: 0.1 });
    s8.addText(t.label, { x: xPos + 0.3, y: yPos + 0.1, w: 5.3, h: 0.4, fontSize: 13, bold: true, color: DARK });
    s8.addText(t.desc, { x: xPos + 0.3, y: yPos + 0.5, w: 5.3, h: 0.7, fontSize: 10, color: GRAY, lineSpacingMultiple: 1.3 });
  });
  addFooter(s8);

  // ─── SLIDE 9: Why Me ───
  const s9 = pptx.addSlide();
  s9.addText("Why Me for You?", { x: 0.5, y: 0.3, w: 12, h: 0.6, fontSize: 28, bold: true, color: DARK });
  s9.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.85, w: 3, h: 0.04, fill: { color: BLUE } });

  const reasons = [
    "Experience with technology, hardware & software solutions",
    "International experience across cultures",
    "Selling since 2016",
    "Entrepreneur by DNA",
    "Negotiating with C-level big players",
    "Miller-Heiman training certified",
    "Passion for what I do!",
  ];
  reasons.forEach((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 0.5 + col * 6.3;
    const yPos = 1.3 + row * 0.8;
    s9.addShape(pptx.ShapeType.roundRect, { x: xPos, y: yPos, w: 5.9, h: 0.6, fill: { color: LIGHT_BLUE }, rectRadius: 0.1 });
    s9.addText(`●  ${r}`, { x: xPos + 0.3, y: yPos, w: 5.3, h: 0.6, fontSize: 13, color: DARK, valign: "middle" });
  });
  addFooter(s9);

  // ─── SLIDE 10: Thank You ───
  const s10 = pptx.addSlide();
  s10.background = { color: DARK };
  s10.addText("Thanks for the Attention", { x: 1, y: 2.5, w: 11, h: 1, fontSize: 36, bold: true, color: WHITE, align: "center" });
  s10.addText("📧 davide.tuzi@gmail.com   📱 +39 333 201 6113   🔗 linkedin.com/in/davide-tuzi", {
    x: 1, y: 4.0, w: 11, h: 0.5, fontSize: 14, color: GRAY, align: "center",
  });

  // Download
  await pptx.writeFile({ fileName: "Davide_Tuzi_Profile.pptx" });
}
