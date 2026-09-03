import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">;
export type Farm = Tables<"farms">;
export type Device = Tables<"devices">;

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "bn", label: "বাংলা (Bengali)" },
  { value: "hi", label: "हिन्दी (Hindi)" },
];

export const SOIL_TYPES = ["Alluvial", "Clay loam", "Sandy loam", "Laterite", "Black cotton"];
export const IRRIGATION_TYPES = ["Drip", "Sprinkler", "Canal", "Borewell", "Rain-fed"];
export const CROP_OPTIONS = ["Tomato", "Paddy", "Potato", "Brinjal", "Chilli", "Maize", "Mustard", "Jute"];

export async function fetchPortal(userId: string) {
  const [profileRes, farmsRes, devicesRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("farms").select("*").eq("user_id", userId).order("created_at"),
    supabase.from("devices").select("*").eq("user_id", userId).order("created_at"),
  ]);

  if (profileRes.error) throw profileRes.error;
  if (farmsRes.error) throw farmsRes.error;
  if (devicesRes.error) throw devicesRes.error;

  return {
    profile: profileRes.data as Profile | null,
    farms: (farmsRes.data ?? []) as Farm[],
    devices: (devicesRes.data ?? []) as Device[],
  };
}
