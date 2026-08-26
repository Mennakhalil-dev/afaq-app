import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { config } from 'dotenv';
import path from 'path';

// Load env vars
config({ path: path.resolve(process.cwd(), '.env.local') });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const mockProperties = [
  {
    id: "1",
    title_en: "175 Sqm Apartment", title_ar: "شقة سكنية 175 متر",
    location_en: "10th of Ramadan, Egypt", location_ar: "العاشر من رمضان، مصر",
    cityId: "10th of Ramadan",
    price: 1850000, area: 175, beds: 3, baths: 2,
    type: "Apartment", typeAr: "شقة",
    image: "/images/units/1.png", status: "available", operation: "Buy"
  },
  {
    id: "2",
    title_en: "170 Sqm Unit (Front)", title_ar: "وحدة 170 متر (أمامي)",
    location_en: "10th of Ramadan, Egypt", location_ar: "العاشر من رمضان، مصر",
    cityId: "10th of Ramadan",
    price: 1900000, area: 170, beds: 3, baths: 2,
    type: "Apartment", typeAr: "شقة",
    image: "/images/units/4.png", status: "available", operation: "Buy"
  },
  {
    id: "3",
    title_en: "170 Sqm Unit (Side)", title_ar: "وحدة 170 متر (جانبي)",
    location_en: "10th of Ramadan, Egypt", location_ar: "العاشر من رمضان، مصر",
    cityId: "10th of Ramadan",
    price: 1900000, area: 170, beds: 3, baths: 2,
    type: "Apartment", typeAr: "شقة",
    image: "/images/units/7.png", status: "available", operation: "Buy"
  },
  {
    id: "4",
    title_en: "180 Sqm Unit (Side)", title_ar: "وحدة 180 متر (جانبي)",
    location_en: "10th of Ramadan, Egypt", location_ar: "العاشر من رمضان، مصر",
    cityId: "10th of Ramadan",
    price: 1900000, area: 180, beds: 3, baths: 2,
    type: "Apartment", typeAr: "شقة",
    image: "/images/units/10.png", status: "available", operation: "Buy"
  },
  {
    id: "5",
    title_en: "180 Sqm Unit (Front)", title_ar: "وحدة 180 متر (أمامي)",
    location_en: "10th of Ramadan, Egypt", location_ar: "العاشر من رمضان، مصر",
    cityId: "10th of Ramadan",
    price: 1900000, area: 180, beds: 3, baths: 2,
    type: "Apartment", typeAr: "شقة",
    image: "/images/units/13.png", status: "available", operation: "Buy"
  },
  {
    id: "6",
    title_en: "210 Sqm Unit (Front)", title_ar: "وحدة 210 متر (أمامي)",
    location_en: "10th of Ramadan, Egypt", location_ar: "العاشر من رمضان، مصر",
    cityId: "10th of Ramadan",
    price: 2150000, area: 210, beds: 3, baths: 3,
    type: "Apartment", typeAr: "شقة",
    image: "/images/units/16.png", status: "available", operation: "Buy"
  },
  {
    id: "7",
    title_en: "210 Sqm Unit (Back)", title_ar: "وحدة 210 متر (خلفي)",
    location_en: "10th of Ramadan, Egypt", location_ar: "العاشر من رمضان، مصر",
    cityId: "10th of Ramadan",
    price: 2150000, area: 210, beds: 3, baths: 3,
    type: "Apartment", typeAr: "شقة",
    image: "/images/units/19.png", status: "available", operation: "Buy"
  }
];

async function seed() {
  console.log("Seeding properties...");
  for (const p of mockProperties) {
    const docRef = doc(db, 'properties', p.id);
    await setDoc(docRef, {
      ...p,
      createdAt: new Date().toISOString()
    });
    console.log(`Saved property ${p.id}`);
  }
  console.log("Done seeding!");
  process.exit(0);
}

seed().catch(console.error);
