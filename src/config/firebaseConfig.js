// Firebase & Supabase Database Configuration & Client Initialization

export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "eduvision-cms.firebaseapp.com",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "eduvision-cms-cloud",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "eduvision-cms.appspot.com",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "884291039",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:884291039:web:a1b2c3d4e5f6"
};

export const DEFAULT_SUPABASE_CONFIG = {
  url: import.meta.env?.VITE_SUPABASE_URL || "https://eduvision-cms.supabase.co",
  anonKey: import.meta.env?.VITE_SUPABASE_ANON_KEY || ""
};
