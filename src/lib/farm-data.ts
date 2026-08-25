export const farmer = {
  name: "Arghya Jana",
  village: "Kanthi, Purba Medinipur",
  farmSize: "4.2 acres",
  crop: "Tomato · Paddy",
  language: "English / বাংলা",
  phone: "+91 98300 44120",
};

export const healthScore = 92;

export const sensors = [
  { id: "moisture", label: "Soil Moisture", value: "42", unit: "%", status: "Low", tone: "warning" },
  { id: "temp", label: "Temperature", value: "31", unit: "°C", status: "Normal", tone: "primary" },
  { id: "humidity", label: "Humidity", value: "68", unit: "%", status: "Optimal", tone: "info" },
  { id: "rain", label: "Rainfall", value: "No", unit: "Rain", status: "Clear", tone: "primary" },
] as const;

export const trend = [
  { t: "Mon", temp: 29, humidity: 64, moisture: 51, health: 88 },
  { t: "Tue", temp: 30, humidity: 66, moisture: 49, health: 89 },
  { t: "Wed", temp: 32, humidity: 61, moisture: 46, health: 87 },
  { t: "Thu", temp: 33, humidity: 58, moisture: 44, health: 85 },
  { t: "Fri", temp: 31, humidity: 67, moisture: 43, health: 90 },
  { t: "Sat", temp: 30, humidity: 70, moisture: 45, health: 91 },
  { t: "Sun", temp: 31, humidity: 68, moisture: 42, health: 92 },
];

export const diseaseHistory = [
  { month: "Mar", cases: 2 },
  { month: "Apr", cases: 4 },
  { month: "May", cases: 1 },
  { month: "Jun", cases: 5 },
  { month: "Jul", cases: 3 },
  { month: "Aug", cases: 1 },
];

export type Severity = "critical" | "warning" | "info";

export const alerts: {
  id: string;
  title: string;
  severity: Severity;
  time: string;
  action: string;
}[] = [
  {
    id: "a1",
    title: "Low soil moisture in Block A101",
    severity: "critical",
    time: "12 min ago",
    action: "Start drip irrigation for 40 minutes",
  },
  {
    id: "a2",
    title: "Heat stress risk — 33°C peak forecast",
    severity: "warning",
    time: "1 hr ago",
    action: "Shift irrigation to early morning window",
  },
  {
    id: "a3",
    title: "Late blight risk elevated (humidity 68%)",
    severity: "warning",
    time: "3 hrs ago",
    action: "Inspect lower canopy leaves of tomato rows",
  },
  {
    id: "a4",
    title: "Heavy rain warning — Thursday",
    severity: "info",
    time: "Yesterday",
    action: "Delay fertiliser application until Friday",
  },
];

export const scans = [
  {
    id: "s1",
    crop: "Tomato",
    result: "Healthy",
    confidence: 98,
    date: "Today · 07:12",
    note: "No action needed. Continue current schedule.",
    healthy: true,
  },
  {
    id: "s2",
    crop: "Tomato",
    result: "Late Blight",
    confidence: 97,
    date: "Yesterday · 18:40",
    note: "Copper fungicide applied to Block A101.",
    healthy: false,
  },
  {
    id: "s3",
    crop: "Paddy",
    result: "Leaf Blast",
    confidence: 91,
    date: "23 Aug · 16:05",
    note: "Tricyclazole spray recommended, irrigation delayed.",
    healthy: false,
  },
  {
    id: "s4",
    crop: "Tomato",
    result: "Healthy",
    confidence: 95,
    date: "21 Aug · 09:30",
    note: "Canopy density improving after nutrient dose.",
    healthy: true,
  },
];

export const notifications = [
  { id: "n1", title: "Disease detected", body: "Late Blight found in Block A101", time: "18:40", tone: "critical" },
  { id: "n2", title: "Rain alert", body: "22mm rainfall expected Thursday", time: "14:02", tone: "info" },
  { id: "n3", title: "Irrigation reminder", body: "Block B is due for watering tomorrow 06:00", time: "09:15", tone: "warning" },
  { id: "n4", title: "Device synced", body: "ESP32 uploaded 1,204 offline readings", time: "07:00", tone: "info" },
] as const;

export const fields = [
  { id: "A101", name: "Block A101", crop: "Tomato", area: "1.4 acres", stage: "Fruiting", health: 78, moisture: 42, tone: "warning" as const },
  { id: "A102", name: "Block A102", crop: "Tomato", area: "0.9 acres", stage: "Flowering", health: 94, moisture: 55, tone: "primary" as const },
  { id: "B201", name: "Block B201", crop: "Paddy", area: "1.2 acres", stage: "Tillering", health: 88, moisture: 71, tone: "info" as const },
  { id: "B202", name: "Block B202", crop: "Paddy", area: "0.7 acres", stage: "Vegetative", health: 96, moisture: 68, tone: "primary" as const },
];

export const deviceStats = {
  id: "ESP32-KM-0417",
  firmware: "v2.4.1",
  battery: 84,
  signal: 72,
  storage: 38,
  lastSync: "2 min ago",
  uptime: "18d 04h",
  queued: 1204,
};

export const deviceNodes = [
  { id: "n1", name: "Soil probe · A101", status: "Online", battery: 91, tone: "primary" as const },
  { id: "n2", name: "Soil probe · B201", status: "Online", battery: 76, tone: "primary" as const },
  { id: "n3", name: "Weather node · Gate", status: "Online", battery: 64, tone: "info" as const },
  { id: "n4", name: "Rain gauge · North", status: "Sleeping", battery: 22, tone: "warning" as const },
];

export const emergencyContacts = [
  { id: "e1", name: "Kisan Call Centre", role: "Government helpline", phone: "1800-180-1551" },
  { id: "e2", name: "Block Agriculture Officer", role: "Kanthi-I Block", phone: "+91 98300 11223" },
  { id: "e3", name: "Krishi Vigyan Kendra", role: "Purba Medinipur", phone: "+91 3220 255 401" },
  { id: "e4", name: "Veterinary & Pest Unit", role: "Rapid response", phone: "+91 98745 66210" },
];

export const emergencyPlaybooks = [
  { id: "p1", title: "Sudden pest outbreak", steps: ["Photograph affected rows and scan offline", "Isolate the block, stop shared tool use", "Apply the recommended bio-pesticide at dusk"] },
  { id: "p2", title: "Flooding / heavy rain", steps: ["Open drainage channels on the low side", "Delay fertiliser for 48 hours", "Record water level daily for insurance"] },
  { id: "p3", title: "Heatwave stress", steps: ["Irrigate 05:00–07:00 only", "Mulch exposed beds", "Shade nets on nursery trays"] },
];

export const faqs = [
  { q: "Does the AI scan work without internet?", a: "Yes. The disease model runs fully on-device. Results sync to the cloud the next time you are online." },
  { q: "How do I pair my ESP32 sensor kit?", a: "Open Device Status, tap Pair New Node and hold the board's BOOT button for 3 seconds until the LED blinks green." },
  { q: "How accurate is the disease detection?", a: "The model averages 94% top-1 accuracy across 38 crop-disease classes validated on Indian field imagery." },
  { q: "Can I use the app in Bengali?", a: "Yes, switch language in Settings. Advisory text, alerts and reports are all translated." },
  { q: "Where is my data stored?", a: "Sensor and scan data stay encrypted on your phone, and sync to your private farm workspace." },
];
