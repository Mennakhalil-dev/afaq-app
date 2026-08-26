import { db, storage } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, query, orderBy, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface Property {
  id?: string;
  title_en: string;
  title_ar: string;
  location_en: string;
  location_ar: string;
  cityId: string;
  price: number;
  area: number;
  beds: number;
  baths: number;
  type: string;
  typeAr: string;
  image: string;
  images?: string[];
  planImage?: string;
  dataImage?: string;
  description?: string;
  features?: string;
  status: 'available' | 'sold' | 'rented';
  operation: 'Buy' | 'Rent';
}

export async function uploadImage(file: File): Promise<string> {
  const fileRef = ref(storage, `properties/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}

export async function addProperty(data: Omit<Property, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'properties'), {
      ...data,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding property:", error);
    return { success: false, error };
  }
}

export async function updateProperty(id: string, data: Partial<Property>) {
  try {
    await updateDoc(doc(db, 'properties', id), data);
    return { success: true };
  } catch (error) {
    console.error("Error updating property:", error);
    return { success: false, error };
  }
}

export async function deleteProperty(id: string) {
  try {
    await deleteDoc(doc(db, 'properties', id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting property:", error);
    return { success: false, error };
  }
}

export async function getProperties(): Promise<Property[]> {
  try {
    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Property[];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Property;
    }
    return null;
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export async function submitContact(data: any) {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting contact:", error);
    return { success: false, error };
  }
}

export async function getContacts(): Promise<any[]> {
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}

export interface Package {
  id?: string;
  type: 'finishings' | 'security';
  title_en: string;
  title_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  price: string;
  priceText_en?: string;
  priceText_ar?: string;
  includes_en: string;
  includes_ar: string;
  features_en: string;
  features_ar: string;
  image?: string;
  images?: string[];
  createdAt?: string;
}

export async function addPackage(data: Omit<Package, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'packages'), {
      ...data,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding package:", error);
    return { success: false, error };
  }
}

export async function updatePackage(id: string, data: Partial<Package>) {
  try {
    await updateDoc(doc(db, 'packages', id), data);
    return { success: true };
  } catch (error) {
    console.error("Error updating package:", error);
    return { success: false, error };
  }
}

export async function deletePackage(id: string) {
  try {
    await deleteDoc(doc(db, 'packages', id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting package:", error);
    return { success: false, error };
  }
}

export async function getPackages(type: 'finishings' | 'security'): Promise<Package[]> {
  try {
    const q = query(collection(db, 'packages'), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Package))
      .filter(p => p.type === type);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}
