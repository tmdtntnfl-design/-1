import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Navbar, { Footer } from '@/components/layout/Layout';
import { db } from '@/lib/firebase';
import { Calendar, ChevronLeft } from 'lucide-react';

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getDoc(doc(db, 'posts', id)).then(d => {
      if (d.exists()) setPost({ id: d.id, ...d.data() });
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!post) return <div className="flex items-center justify-center h-screen">Post not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-sm text-gray-400 hover:text-[#E02020] mb-12 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            목록으로 돌아가기
          </Link>
          
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-red-50 text-[#E02020] text-xs font-bold uppercase tracking-wider">
                {post.category === 'notice' ? '공지사항' : post.category === 'review' ? '개통후기' : '이용안내'}
              </span>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                {post.createdAt?.toDate().toLocaleDateString()}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
              {post.title}
            </h1>
          </div>

          <div className="aspect-video bg-gray-100 rounded-3xl mb-12 overflow-hidden">
            <img 
              src={post.thumbnail || `https://picsum.photos/seed/${post.id}/1200/675`} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
