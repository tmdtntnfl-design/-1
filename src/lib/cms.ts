import { doc, getDoc, onSnapshot, collection, query, orderBy, limit, addDoc, serverTimestamp, setDoc, increment } from 'firebase/firestore';
import { db } from './firebase';
import { useEffect, useState } from 'react';

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
    const unsub = onSnapshot(doc(db, 'config', 'site'), (snapshot: any) => {
      if (snapshot.exists()) {
        setConfig(snapshot.data() as SiteConfig);
      } else {
        // Initialize if not exists
        setDoc(snapshot.ref, DEFAULT_CONFIG);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  return { config, loading };
}

export function usePosts(cat?: string) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(20));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPosts(data);
      setLoading(false);
    });
    return unsub;
  }, [cat]);

  return { posts, loading };
}

export async function submitInquiry(data: { name: string, phone: string, message: string }) {
  await addDoc(collection(db, 'inquiries'), {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp()
  });
}

export async function trackVisit() {
  const today = new Date().toISOString().split('T')[0];
  const ref = doc(db, 'stats', today);
  await setDoc(ref, { count: increment(1), date: today }, { merge: true });
}
