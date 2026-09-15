/**
 * ALEX KANE PORTFOLIO DATA ARCHITECTURE
 * Easily customizable CMS-ready dataset.
 * Replace images, text, and metadata to instantly rebrand the website.
 */

export const PHOTOGRAPHER_CONFIG = {
  name: "ALEX KANE",
  firstName: "ALEX",
  lastName: "KANE",
  monogram: "AK",
  role: "Art Director & Editorial Photographer",
  tagline: "Capturing people, places and moments that deserve to be remembered.",
  statement: "I photograph the space between the moment and the memory.",
  basedIn: "Paris & Tokyo",
  secondaryLocations: ["New York", "Milan", "Kyoto"],
  coordinates: "48°51'24\"N 2°21'07\"E / 35°41'22\"N 139°41'30\"E",
  status: "Available Worldwide Q3 / Q4 2026",
  statusAvailable: true,
  email: "studio@alexkane.photo",
  phone: "+33 (0) 1 42 68 55 00",
  instagram: "@alexkane.studio",
  instagramUrl: "https://instagram.com",
  behanceUrl: "https://behance.net",
  vimeoUrl: "https://vimeo.com",
  whatsapp: "+33 6 88 94 20 11",
  whatsappUrl: "https://wa.me/33688942011",
  heroPortrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=85",
  aboutPortrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85",
  studioLocation: "14 Rue de Turenne, 75004 Paris, France",
  secondaryStudio: "Minato-ku, Minami-Aoyama 5-Chome, Tokyo 107-0062",
  stats: [
    { value: "12+", label: "Years in Editorial Practice" },
    { value: "04", label: "Published Monographs" },
    { value: "68", label: "International Covers" },
    { value: "19", label: "Solo & Group Exhibitions" }
  ]
};

export const CATEGORIES = [
  "ALL",
  "EDITORIAL",
  "FASHION",
  "PORTRAIT",
  "COMMERCIAL",
  "TRAVEL",
  "ARCHITECTURE"
];

export const PROJECTS = [
  {
    id: "midnight-stories",
    number: "01",
    title: "MIDNIGHT STORIES",
    category: "EDITORIAL",
    location: "Tokyo, Japan",
    year: "2026",
    client: "Editorial Commission",
    aspectRatio: "portrait", // 4:5
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=85",
    camera: "Leica M11 / Noctilux-M 50mm f/0.95",
    exif: "ISO 800 • 50mm • f/1.2 • 1/125s",
    shortDesc: "A noir visual study of human isolation and neon luminescence across Shinjuku and Roppongi alleys.",
    concept: "Captured over twelve nights during rainstorms in Tokyo. The project investigates how artificial LED frequencies interplay with rain reflections on asphalt and damp fabric, rendering a cinematic intimacy between subject and the metropolitan sprawl.",
    photographerNotes: "Tokyo at 3:45 AM has a unique resonance. You don't direct the scene; you wait until the ambient steam from the ramen basements merges with the red taillights of solitary taxis.",
    storySpread: [
      {
        src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85",
        aspect: "full",
        caption: "Plates of rain and red neon reflections across Kabukicho crossway.",
        cameraExif: "50mm • f/1.0 • 1/160s"
      },
      {
        src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Subject in bespoke wool coat against misted storefront window.",
        cameraExif: "35mm • f/1.4 • 1/200s"
      },
      {
        src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Light refractions across the elevated Yamanote railway line.",
        cameraExif: "75mm • f/1.8 • 1/250s"
      },
      {
        src: "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1800&q=85",
        aspect: "panoramic",
        caption: "Dawn transition over the Sumida River as morning light dissolves the city haze.",
        cameraExif: "28mm • f/4.0 • 1/80s"
      }
    ]
  },
  {
    id: "solitude-in-sand",
    number: "02",
    title: "SOLITUDE IN SAND",
    category: "FASHION",
    location: "Merzouga, Morocco",
    year: "2025",
    client: "Maison Margiela / Editorial Spread",
    aspectRatio: "landscape", // 16:10
    coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=85",
    camera: "Hasselblad H6D-100c / HC 80mm f/2.8",
    exif: "ISO 100 • 80mm • f/4.0 • 1/500s",
    shortDesc: "High fashion silhouettes framed against the unforgiving geometry of Sahara dunes at golden hour.",
    concept: "Commissioned as an exploration of drape and natural friction. Using solely natural ambient light and heavy linen drapery, the garments become topographical extensions of the shifting sand waves.",
    photographerNotes: "The desert strips away pretense. In fifty-degree wind, there is no room for over-styling; the model's breath and the wind’s velocity dictate every single shutter release.",
    storySpread: [
      {
        src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=85",
        aspect: "full",
        caption: "Silk georgette flowing parallel to the crest of Erg Chebbi.",
        cameraExif: "80mm • f/3.5 • 1/800s"
      },
      {
        src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Sculptural silhouette against twilight gradient horizon.",
        cameraExif: "100mm • f/2.8 • 1/320s"
      },
      {
        src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Textural contrast: raw hand-woven wool against windblown dune facets.",
        cameraExif: "50mm • f/4.5 • 1/640s"
      }
    ]
  },
  {
    id: "raw-portraits-paris",
    number: "03",
    title: "THE SPACE BETWEEN",
    category: "PORTRAIT",
    location: "Paris, France",
    year: "2026",
    client: "Personal Monograph Series",
    aspectRatio: "portrait",
    coverImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1400&q=85",
    camera: "Leica SL2-S / APO-Summicron-SL 75mm",
    exif: "ISO 200 • 75mm • f/2.0 • 1/250s",
    shortDesc: "Unretouched, candid black-and-white studies of French actors and painters in natural north studio light.",
    concept: "A rejection of digital skin-smoothing and artificial flash. Every portrait was captured within 15 minutes of quiet dialogue, using only diffuse north-facing skylight in an 1890s Le Marais artist atelier.",
    photographerNotes: "The truest portrait happens when the subject tires of performing their public face. The second they exhale, you press the shutter.",
    storySpread: [
      {
        src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1600&q=85",
        aspect: "full",
        caption: "Painter Camille M. in repose, atelier natural skylight.",
        cameraExif: "75mm • f/2.0 • 1/200s"
      },
      {
        src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Actor Jean-Paul V. — quiet contemplation between takes.",
        cameraExif: "90mm • f/2.2 • 1/160s"
      },
      {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Sculptor Élise B. — micro-expressions under window shadow.",
        cameraExif: "50mm • f/1.4 • 1/320s"
      }
    ]
  },
  {
    id: "palazzo-de-luxe",
    number: "04",
    title: "PALAZZO MONOCHROME",
    category: "ARCHITECTURE",
    location: "Milan & Lake Como, Italy",
    year: "2025",
    client: "Architectural Digest Italia",
    aspectRatio: "landscape",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    camera: "Phase One IQ4 150MP / Rodenstock 32mm",
    exif: "ISO 50 • 32mm • f/11 • 2.5s",
    shortDesc: "Rationalist and Renaissance architectural tensions rendered in deep chiaroscuro.",
    concept: "Documenting Carlo Scarpa and Piero Portaluppi interiors during the spring equinox. The camera tracks razor-sharp travertine shadow lines intersecting with hand-rubbed Venetian stucco.",
    photographerNotes: "Architecture is frozen music. When you shoot at 150 megapixels on a medium format digital back, you can literally count the microscopic marble granules and dust motes hanging in the vaulted shafts of sunlight.",
    storySpread: [
      {
        src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85",
        aspect: "full",
        caption: "Grand vestibule with morning light beam through arched transom.",
        cameraExif: "32mm • f/11 • 3.0s"
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Travertine staircase cantilevered into negative space.",
        cameraExif: "50mm • f/8.0 • 1/15s"
      },
      {
        src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Minimalist courtyard reflecting water basin at dusk.",
        cameraExif: "23mm • f/9.0 • 1.5s"
      }
    ]
  },
  {
    id: "icelandic-solitude",
    number: "05",
    title: "THE ICELANDIC VOID",
    category: "TRAVEL",
    location: "Vík & Highlands, Iceland",
    year: "2025",
    client: "National Geographic Traveler / Monograph",
    aspectRatio: "panoramic",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
    camera: "Leica SL2 / Super-Vario-Elmar-SL 16-35mm",
    exif: "ISO 100 • 21mm • f/8.0 • 1/60s",
    shortDesc: "Volcanic basalt fields, black ocean foam, and glacial icebergs trapped in eternal Arctic fog.",
    concept: "Shot during a three-week solo expedition into the uninhabited interior highlands. The series questions scale: where does the geological ancient stone end and the momentary wave begin?",
    photographerNotes: "Freezing rain on the lens front element is not a defect; it's a co-author of the image.",
    storySpread: [
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
        aspect: "panoramic",
        caption: "Black sand coastline meeting cold North Atlantic foam.",
        cameraExif: "18mm • f/8.0 • 1/80s"
      },
      {
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Glacial valley enveloped in low-hanging sub-zero clouds.",
        cameraExif: "35mm • f/5.6 • 1/125s"
      },
      {
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Volcanic peaks emerging from frozen geothermal sulfur beds.",
        cameraExif: "70mm • f/6.3 • 1/200s"
      }
    ]
  },
  {
    id: "bottega-chroma",
    number: "06",
    title: "TACTILE WHISPERS",
    category: "COMMERCIAL",
    location: "Milan, Italy",
    year: "2026",
    client: "Luxury Leather Goods House",
    aspectRatio: "square",
    coverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
    camera: "Leica S3 Medium Format / Summarit-S 70mm",
    exif: "ISO 100 • 70mm • f/5.6 • 1/200s",
    shortDesc: "A tactile, macro-oriented commercial study celebrating hand-stitched nappa leather and human skin tension.",
    concept: "Moving away from sterile e-commerce aesthetics toward sensual, tactile honesty. The campaign emphasizes craftsmanship through extreme depth of field, chiaroscuro lighting, and skin-to-leather tactile contact.",
    photographerNotes: "Luxury isn't perfection; it's the imperceptible irregularity that proves a human hand guided the needle.",
    storySpread: [
      {
        src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85",
        aspect: "full",
        caption: "Campaign lead: tactile interaction between calfskin and artisan hands.",
        cameraExif: "70mm • f/4.0 • 1/250s"
      },
      {
        src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Sculptural silhouette with woven nappa clutch under raking beam.",
        cameraExif: "90mm • f/2.8 • 1/160s"
      }
    ]
  },
  {
    id: "kyoto-shadows",
    number: "07",
    title: "IN PRAISE OF SHADOWS",
    category: "EDITORIAL",
    location: "Kyoto, Japan",
    year: "2025",
    client: "Bungeishunju / Monograph",
    aspectRatio: "portrait",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85",
    camera: "Leica M10 Monochrom / Summicron-M 28mm",
    exif: "ISO 400 • 28mm • f/2.8 • 1/125s",
    shortDesc: "An homage to Jun'ichiro Tanizaki's timeless aesthetic essay on dark Japanese domestic interiors and gold lacquer.",
    concept: "Captured entirely on black-and-white sensor in century-old wooden machiya in Gion and Daitoku-ji Zen temples. Shadows are treated not as the absence of light, but as a rich, living physical substance.",
    photographerNotes: "In Western photography, you chase the highlight. In classical Japan, you listen to where the shadow breathes.",
    storySpread: [
      {
        src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
        aspect: "full",
        caption: "Paper shoji screen diffusing late afternoon light into cedar hallway.",
        cameraExif: "28mm • f/2.8 • 1/90s"
      },
      {
        src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Zen garden moss illuminated by single ray through bamboo grove.",
        cameraExif: "50mm • f/2.0 • 1/160s"
      }
    ]
  },
  {
    id: "haute-couture-noir",
    number: "08",
    title: "HAUTE COUTURE NOIR",
    category: "FASHION",
    location: "Paris, France",
    year: "2026",
    client: "Harper's Bazaar France",
    aspectRatio: "landscape",
    coverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85",
    camera: "Leica M11 / Noctilux 50mm",
    exif: "ISO 320 • 50mm • f/1.1 • 1/320s",
    shortDesc: "Autumn/Winter couture collections captured inside the Brutalist concrete caverns of Maison de la Radio.",
    concept: "Juxtaposing delicate silk tulle, hand-embroidered organza, and heavy wool against unadorned industrial board-formed concrete and cold tungsten practical bulbs.",
    photographerNotes: "The contrast between raw aggregate cement and $80,000 hand-pleated gowns creates an electric tension that studio backdrops can never simulate.",
    storySpread: [
      {
        src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85",
        aspect: "full",
        caption: "Couture gown volume mirroring architectural brutalist arches.",
        cameraExif: "50mm • f/1.2 • 1/250s"
      },
      {
        src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
        aspect: "portrait",
        caption: "Detail: metallic thread woven into black French velvet.",
        cameraExif: "75mm • f/2.0 • 1/400s"
      }
    ]
  }
];

export const SERVICES = [
  {
    number: "01",
    title: "EDITORIAL & MAGAZINE COVERS",
    category: "Editorial",
    description: "Complete photographic direction, concept conception, casting guidance, and on-location shooting for international fashion, art, and cultural publications.",
    deliverables: [
      "Custom moodboard & art direction deck",
      "Full day or multi-day shoot on location/studio",
      "High-resolution archival grading & retouching",
      "Global publication & print licensing rights",
      "Behind-the-scenes analogue 35mm roll archive"
    ],
    investment: "From €4,800 / Project",
    timeline: "2 to 3 weeks turnaround"
  },
  {
    number: "02",
    title: "GLOBAL FASHION CAMPAIGNS",
    category: "Fashion",
    description: "Comprehensive creative direction and principal photography for seasonal lookbooks, digital flagships, out-of-home billboards, and multi-channel campaign collateral.",
    deliverables: [
      "End-to-end creative treatment & technical storyboard",
      "Medium format digital (100MP+) master files",
      "Full commercial advertising usage buyout options",
      "On-set tethered digital tech & client monitoring",
      "Color-matched masters for print & high-gamut OLED"
    ],
    investment: "From €8,500 / Day Rate",
    timeline: "Custom schedule per season"
  },
  {
    number: "03",
    title: "INTIMATE PORTRAITURE & ARTISTS",
    category: "Portrait",
    description: "Authentic, profound portrait sessions for actors, designers, architects, authors, and private collectors. Shot with natural north skylight or subtle continuous tungsten.",
    deliverables: [
      "Private 3-hour studio or residential atelier session",
      "Direct artistic consultation & styling dialogue",
      "Curated suite of 12 master archival prints",
      "Archival 300gsm cotton rag exhibition proof",
      "Full digital rights for press, editorial & personal"
    ],
    investment: "From €2,800 / Session",
    timeline: "10 days post-session"
  },
  {
    number: "04",
    title: "COMMERCIAL & ARCHITECTURAL VISIONS",
    category: "Commercial",
    description: "Capturing spatial design, luxury hospitality, monumental residential architecture, and artisanal products with meticulous perspective control and chiaroscuro.",
    deliverables: [
      "Perspective-corrected tilt-shift & medium format masters",
      "Comprehensive day-to-twilight lighting coverage",
      "Interior spatial flow & intimate tactile micro-details",
      "Full architectural press & marketing usage package"
    ],
    investment: "From €5,200 / Property",
    timeline: "2 weeks post-production"
  },
  {
    number: "05",
    title: "LIMITED MONOGRAPHS & FINE ART COMMISSIONS",
    category: "Fine Art",
    description: "Bespoke fine art editions, private monograph books, and institutional exhibitions created in close collaboration with curators, private patrons, and galleries.",
    deliverables: [
      "Museum-standard silver gelatin or pigment archival prints",
      "Hardcover monograph book curation & typography layout",
      "Numbered & signed Certificate of Authenticity",
      "Exclusive singular licensing agreements"
    ],
    investment: "Available on Request",
    timeline: "3 to 6 months bespoke timeline"
  },
  {
    number: "06",
    title: "DESTINATION & EXPEDITION DOCUMENTARIES",
    category: "Travel",
    description: "Remote location visual storytelling, cultural documentary photography, and expedition documentation across extreme landscapes worldwide.",
    deliverables: [
      "Autonomous remote location self-sufficiency & kit",
      "Environmental portraits & geological landscape plates",
      "Narrative documentary sequencing & essay writing",
      "Multi-platform editorial feature package"
    ],
    investment: "Custom Commission",
    timeline: "Worldwide travel availability"
  }
];

export const CLIENT_PLACEHOLDERS = [
  { name: "VOGUE", note: "Editorial Fashion" },
  { name: "GQ MAGAZINE", note: "Men's Style & Culture" },
  { name: "HARPER'S BAZAAR", note: "Couture Covers" },
  { name: "ACNE STUDIOS", note: "Seasonal Campaigns" },
  { name: "BOTTEGA VENETA", note: "Tactile Leather Stories" },
  { name: "LEICA CAMERA", note: "Global Ambassador / Master Series" },
  { name: "NIKE LAB", note: "Experimental Sportswear" },
  { name: "NETFLIX", note: "Key Art & Character Portraits" },
  { name: "SONY ARTISAN", note: "Exhibition Retrospective" }
];

export const JOURNAL_POSTS = [
  {
    id: "geometry-natural-light-tokyo",
    title: "The Geometry of Natural Light in Tokyo",
    date: "August 2026",
    category: "Craft & Philosophy",
    readTime: "6 min read",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85",
    excerpt: "Why modern digital sensors crave shadow more than illumination, and how Tokyo's architectural density creates natural softboxes at high noon.",
    content: `When photographers talk about light, they almost invariably speak in terms of abundance: golden hours, bright key lights, specular reflections. But after spending seven years working between Paris and Tokyo, I realized that true elegance resides in the restraint of shadow.

Tokyo’s architectural grid is an accidental marvel of light sculpting. Between the 40-story glass monoliths of Ginza and the narrow residential alleys of Yanaka, direct sunlight never strikes the ground unmediated. It is refracted, bounced off brushed aluminum louvers, absorbed by dark asphalt, and softened by ambient humidity.

In our 'Midnight Stories' series, we never touched a strobe. Working at f/1.2 on a 50mm Leica Noctilux with ISO pushed to 1600 allowed us to capture the skin of our subjects illuminated solely by the warm 2700K tungsten spill of a soba restaurant window. The resulting tonal gradation has a three-dimensional weight that artificial strobes invariably flatten.

The lesson for young photographers is simple: don't fight the shadow. Treat shadow as an active, physical material in your frame.`
  },
  {
    id: "behind-the-frame-iceland",
    title: "Behind the Frame: Analogue Medium Format in the Arctic Void",
    date: "May 2026",
    category: "Field Notes",
    readTime: "8 min read",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    excerpt: "Sub-zero mechanical shutter reliability, handling 120 film rolls with numb fingers, and finding silence along the volcanic black sands.",
    content: `There is a peculiar stillness that occurs when temperatures drop below minus fifteen degrees on the black beaches of Vík. The Atlantic waves break in slow motion against basalt sea stacks, and your camera's lithium batteries lose half their capacity in twenty minutes.

On this expedition, we packed two mechanical Hasselblad 500C/M bodies alongside our modern digital systems. There is no electronic screen to distract you from the landscape. You gaze down into the waist-level viewfinder, your breathing fogging the glass, looking at a reverse-mirrored square slice of reality.

When you only have 12 frames per roll, your brain switches from 'machine-gun capture' to meditative discipline. You wait forty minutes for a solitary flock of northern fulmars to cross the diagonal of a glacial iceberg. When you finally release the mechanical shutter, you know in your chest whether the moment was held.`
  },
  {
    id: "directing-movement-stillness",
    title: "Directing Movement and Stillness in Modern Fashion",
    date: "February 2026",
    category: "Art Direction",
    readTime: "5 min read",
    cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85",
    excerpt: "How to abandon stiff fashion poses in favor of natural body kinetics, fabric momentum, and psychological presence on set.",
    content: `The greatest error in fashion photography is asking a human being to 'pose.' A pose is dead; it belongs in a static catalog. In high editorial storytelling, we choreograph momentum.

Before shooting the Merzouga desert campaign with Maison Margiela, we spent the first hour simply walking through the dunes with the models without picking up a camera. We observed how each person naturally carried their center of gravity, how the wind caught the hem of the silk, and how the light carved their cheekbones.

When the shoot begins, my instructions are kinetic rather than static: 'Walk toward the ridge as if you heard a bell in the distance,' or 'Turn sharply on your heel when the wind gusts.' By shifting the subject's focus from 'how do I look' to an intentional action, self-consciousness vanishes. The resulting image feels caught, alive, and unrepeatable.`
  },
  {
    id: "ethics-of-intimacy-portraiture",
    title: "The Ethics of Intimacy in Fine Art Portraiture",
    date: "November 2025",
    category: "Monograph Essay",
    readTime: "7 min read",
    cover: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=85",
    excerpt: "A portrait is not taken; it is granted. Exploring the contract of trust between photographer, subject, and unretouched reality.",
    content: `Susan Sontag famously argued that to photograph someone is to violate them, by seeing them as they never see themselves, by having knowledge of them that they can never have. While there is truth in this warning, I believe that authentic portraiture is a collaborative covenant of trust.

In 'The Space Between', our series of portraits of Paris artists, we banned all frequency-separation skin retouching. Wrinkles, scars, asymmetric smiles, tired eyes from late nights in the studio—these are not flaws to be smoothed away with a digital brush. They are the sacred cartography of a human life.

When a subject sees themselves portrayed with complete honesty and realizes that this honesty is revered rather than hidden, a profound emotional liberation takes place. That is the true work of portraiture.`
  }
];

export const TIMELINE_EVENTS = [
  {
    year: "2026",
    title: "Solo Exhibition: 'Chromatics of Silence'",
    place: "Palais de Tokyo, Paris",
    desc: "A major retrospective featuring 48 monumental silver-gelatin and archival pigment prints spanning eight years of editorial and documentary work."
  },
  {
    year: "2025",
    title: "Monograph: 'In Praise of Shadows'",
    place: "Thames & Hudson / Tokyo",
    desc: "Published hardcover monograph documenting 120 black-and-white studies of traditional Japanese domestic spaces and artisans."
  },
  {
    year: "2024",
    title: "Sony World Photography Awards Winner",
    place: "London, UK",
    desc: "Awarded First Place in Professional Editorial Portfolio for the 'Nordic Void' environmental narrative series."
  },
  {
    year: "2023",
    title: "Global Art Direction for Acne Studios FW23",
    place: "Paris & Stockholm",
    desc: "Conceived creative direction, film campaign, and print imagery distributed across 32 international flagship destinations."
  },
  {
    year: "2021",
    title: "Leica Master Series Ambassador",
    place: "Wetzlar, Germany",
    desc: "Selected as contributing master photographer testing and documenting with the Leica M11 rangefinder system."
  },
  {
    year: "2018",
    title: "Studio Founded in Le Marais",
    place: "Paris, France",
    desc: "Established permanent creative studio and print darkroom on Rue de Turenne, focusing on fashion and private commissions."
  }
];

export const LEGAL_CONTENT = {
  privacyPolicy: {
    title: "Privacy & Data Protection Policy",
    lastUpdated: "September 2026",
    sections: [
      {
        heading: "1. Respect for Your Privacy",
        body: "Alex Kane Studio ('we', 'us', or 'the Studio') operates in strict compliance with international data privacy standards including the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). We respect your privacy and only collect personal data strictly necessary to process your creative commissions, inquiries, and print acquisitions."
      },
      {
        heading: "2. Information We Collect",
        body: "When you submit an inquiry through our contact form, we collect your Name, Email address, Phone number (optional), Project Type, Estimated Budget, and Project Message. This information is utilized solely to respond to your specific inquiry and prepare bespoke service proposals."
      },
      {
        heading: "3. No Third-Party Data Sale",
        body: "We will NEVER sell, lease, monetize, or distribute your personal contact information or project briefs to third-party advertisers, data brokers, or marketing networks under any circumstance."
      },
      {
        heading: "4. Data Retention & Deletion",
        body: "Client inquiry records are securely stored for the duration of client communication and legal contract archiving. You have the right at any time to request a complete copy of your stored data or demand immediate deletion by writing directly to studio@alexkane.photo."
      },
      {
        heading: "5. Security Measures",
        body: "All transmissions on this website are encrypted via industry-standard SSL/TLS protocols. Client files and production contracts are held on access-controlled encrypted cloud servers."
      }
    ]
  },
  termsOfService: {
    title: "Terms & Conditions of Service",
    lastUpdated: "September 2026",
    sections: [
      {
        heading: "1. Intellectual Property & Copyright",
        body: "All photographs, imagery, editorial layouts, writings, and digital designs displayed on this website are the exclusive intellectual property of Alex Kane and are protected under international copyright treaties. No image may be downloaded, reproduced, altered, or used for commercial or artificial intelligence training purposes without an explicit written license agreement signed by the Studio."
      },
      {
        heading: "2. Commissions & Engagement Contracts",
        body: "All commissioned commercial and editorial photography engagements are governed by a formal written Production Agreement outlining scope of work, licensing tiers, dates, deliverables, and payment schedules. A non-refundable 50% reservation retainer is required to hold calendar production dates."
      },
      {
        heading: "3. Editorial vs. Commercial Licensing",
        body: "Photographic licenses are granted on a project-specific basis. Editorial licenses permit non-exclusive editorial publication in specified periodicals. Commercial advertising buyouts (worldwide, digital, print, OOH) require explicit buyout schedules and terms stipulated in the production contract."
      },
      {
        heading: "4. Moral Rights",
        body: "The photographer retains moral rights (droit moral) including attribution on all published reproductions, unless specifically waived under customized white-label agreements."
      }
    ]
  },
  cookiePolicy: {
    title: "Cookie & Tracking Policy",
    lastUpdated: "September 2026",
    sections: [
      {
        heading: "1. Our Minimal Tracking Philosophy",
        body: "This website is engineered as a clean, artistic editorial environment. We do NOT run invasive third-party ad retargeting trackers, Facebook pixels, or predatory profiling cookies."
      },
      {
        heading: "2. Essential Cookies & Local Storage",
        body: "We use lightweight browser local storage exclusively for essential user experience preferences: (a) Remembering your sound preferences (shutter audio mute/unmute); (b) Remembering your film grain toggle preference; and (c) Storing your cookie consent choice."
      },
      {
        heading: "3. Cookie Consent Management",
        body: "You can adjust your cookie settings at any time using the Cookie Consent banner at the bottom of the page or through your browser settings. Rejecting optional preferences will not restrict your access to any portfolio galleries."
      }
    ]
  },
  cancellationPolicy: {
    title: "Cancellation & Rescheduling Policy",
    lastUpdated: "September 2026",
    sections: [
      {
        heading: "1. Production Date Reservation",
        body: "Upon signing a production agreement, studio and location calendar slots are exclusively reserved. Because dates are held and crew/assistants are booked in advance, cancellations impact entire production schedules."
      },
      {
        heading: "2. Rescheduling Due to Weather or Force Majeure",
        body: "For on-location exterior shoots, we provide a mutually agreed upon backup weather date at no additional creative fee. If a shoot must be rescheduled due to certified force majeure, the deposit is credited toward the revised date within 12 months."
      },
      {
        heading: "3. Client Cancellations",
        body: "If a client cancels a confirmed shoot more than 14 days prior to call time, the 50% retainer is non-refundable but can be partially applied to a rescheduled shoot at the Studio's discretion. Cancellations within 7 days of production require payment of all non-refundable direct vendor costs incurred (studio rental, model bookings, permit fees)."
      }
    ]
  }
};
