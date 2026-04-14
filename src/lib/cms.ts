import { doc, getDoc, onSnapshot, collection, query, orderBy, limit, addDoc, serverTimestamp, setDoc, increment } from 'firebase/firestore';
import { db, auth } from './firebase';
import { useEffect, useState } from 'react';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface SiteConfig {
  siteName: string;
  primaryColor: string;
  bannerText: string;
  serviceIntro: string;
  kakaoLink: string;
  blogLink: string;
  youtubeLink: string;
  instagramLink: string;
}

export const DEFAULT_CONFIG: SiteConfig = {
  siteName: "앤텔레콤 무조건선불폰",
  primaryColor: "#E02020",
  bannerText: "선불폰 개통방법",
  serviceIntro: "신용불량, 통신미납, 외국인\nKT,LG선불폰 누구나 본인명의 즉시개통!",
  kakaoLink: "http://pf.kakao.com/_eSGRn/chat",
  blogLink: "https://blog.naver.com/tmdtntnfl",
  youtubeLink: "https://www.youtube.com/@%EB%AC%B4%EC%A1%B0%EA%B1%B4%EC%84%A0%EB%B6%88%ED%8F%B0",
  instagramLink: "https://instagram.com/xxxx",
};

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = 'config/site';
    const unsub = onSnapshot(doc(db, path), (snapshot: any) => {
      if (snapshot.exists()) {
        setConfig(snapshot.data() as SiteConfig);
      } else {
        // Only attempt to initialize if the user is the admin
        const isAdmin = auth.currentUser?.email === 'tmdtntnfl@gmail.com' && auth.currentUser?.emailVerified;
        if (isAdmin) {
          setDoc(snapshot.ref, DEFAULT_CONFIG).catch(err => {
            console.error("Failed to initialize config:", err);
          });
        }
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
    return unsub;
  }, []);

  return { config, loading };
}

export function usePosts(cat?: string) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = 'posts';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(20));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPosts(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
    return unsub;
  }, [cat]);

  return { posts, loading };
}

export async function submitInquiry(data: { name: string, phone: string, message: string }) {
  const path = 'inquiries';
  try {
    await addDoc(collection(db, path), {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function trackVisit() {
  const today = new Date().toISOString().split('T')[0];
  const path = `stats/${today}`;
  const ref = doc(db, 'stats', today);
  try {
    await setDoc(ref, { count: increment(1), date: today }, { merge: true });
  } catch (error) {
    // Silently fail for stats to not disrupt user experience, but log it
    console.warn("Failed to track visit:", error);
  }
}
