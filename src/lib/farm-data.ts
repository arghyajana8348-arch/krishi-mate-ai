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
