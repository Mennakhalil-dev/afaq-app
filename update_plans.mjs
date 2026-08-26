import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const mapping = {
  "1": { planImage: "/images/units/2.png", dataImage: "/images/units/3.png" },
  "2": { planImage: "/images/units/5.png", dataImage: "/images/units/6.png" },
  "3": { planImage: "/images/units/8.png", dataImage: "/images/units/9.png" },
  "4": { planImage: "/images/units/11.png", dataImage: "/images/units/12.png" },
  "5": { planImage: "/images/units/14.png", dataImage: "/images/units/15.png" },
  "6": { planImage: "/images/units/17.png", dataImage: "/images/units/18.png" },
  "7": { planImage: "/images/units/20.png", dataImage: "/images/units/21.png" },
};

async function updatePlans() {
  console.log("Updating properties with specific plans and data images...");
  
  for (const [id, images] of Object.entries(mapping)) {
    console.log(`Updating property ${id}...`);
    await updateDoc(doc(db, 'properties', id), {
      planImage: images.planImage,
      dataImage: images.dataImage,
      description: 'عقار استثنائي مصمم ليوفر أعلى معايير الفخامة والراحة. يتميز بتصميم داخلي واسع، تشطيبات فاخرة، ومجهز بأنظمة المنزل الذكي، ليكون الملاذ المثالي للحياة العصرية.'
    });
  }
  
  console.log("All properties updated successfully!");
  process.exit(0);
}

updatePlans().catch(console.error);
