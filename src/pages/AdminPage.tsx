import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useSiteConfig } from '@/lib/cms';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp, setDoc, limit } from 'firebase/firestore';
import { LayoutDashboard, FileText, MessageSquare, Settings, LogOut, Plus, Trash2, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function AdminPage() {
  const { user, loading, isAdmin, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-12 rounded-[2rem] shadow-xl text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">관리자 로그인</h1>
          <p className="text-gray-500 mb-8">관리자 계정으로 로그인하여 사이트를 관리하세요.</p>
          <Button onClick={login} className="w-full bg-[#E02020] hover:bg-[#c01a1a] h-14 rounded-xl font-bold">
            Google 계정으로 로그인
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <p className="text-red-500 font-bold mb-4">권한이 없습니다.</p>
        <Button onClick={logout} variant="outline">로그아웃</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-8 border-b border-gray-100">
          <span className="font-black text-xl tracking-tight text-[#E02020]">ADMIN PANEL</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="대시보드" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={<FileText size={20} />} label="게시글 관리" active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} />
          <SidebarItem icon={<MessageSquare size={20} />} label="상담 신청" active={activeTab === 'inquiries'} onClick={() => setActiveTab('inquiries')} />
          <SidebarItem icon={<Settings size={20} />} label="사이트 설정" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:text-red-500 transition-colors">
            <LogOut size={20} />
            <span className="text-sm font-bold">로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'posts' && <PostsManager />}
        {activeTab === 'inquiries' && <InquiryManager />}
        {activeTab === 'settings' && <SettingsManager />}
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3.5 rounded-xl transition-all ${active ? 'bg-red-50 text-[#E02020]' : 'text-gray-500 hover:bg-gray-50'}`}
    >
      {icon}
      <span className="text-sm font-bold">{label}</span>
    </button>
  );
}

function DashboardView() {
  const [stats, setStats] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'stats'), orderBy('date', 'desc'), limit(7));
    return onSnapshot(q, (snap) => setStats(snap.docs.map(d => d.data())));
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'), limit(5));
    return onSnapshot(q, (snap) => setInquiries(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">대시보드</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500 uppercase tracking-wider">오늘의 방문자</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black">{stats[0]?.count || 0}</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500 uppercase tracking-wider">대기 중인 상담</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black text-[#E02020]">{inquiries.filter(i => i.status === 'pending').length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl border-none shadow-sm">
        <CardHeader>
          <CardTitle>최근 상담 신청</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>날짜</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-bold">{i.name}</TableCell>
                  <TableCell>{i.phone}</TableCell>
                  <TableCell>
                    <Badge variant={i.status === 'pending' ? 'destructive' : 'default'}>
                      {i.status === 'pending' ? '대기 중' : '완료'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400 text-xs">
                    {i.createdAt?.toDate().toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function PostsManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', category: 'notice' });
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        ...form,
        authorUid: user?.uid,
        createdAt: serverTimestamp()
      });
      toast.success('게시글이 등록되었습니다.');
      setIsAdding(false);
      setForm({ title: '', content: '', category: 'notice' });
    } catch (err) {
      toast.error('등록 실패');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await deleteDoc(doc(db, 'posts', id));
    toast.success('삭제되었습니다.');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">게시글 관리</h1>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-[#E02020] hover:bg-[#c01a1a] rounded-xl">
          {isAdding ? '취소' : <><Plus size={18} className="mr-2" /> 새 게시글</>}
        </Button>
      </div>

      {isAdding && (
        <Card className="rounded-3xl border-none shadow-md p-8">
          <form onSubmit={handleAdd} className="space-y-4">
            <Input 
              placeholder="제목을 입력하세요" 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})}
              className="h-12 rounded-xl"
            />
            <select 
              className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
              value={form.category}
              onChange={e => setForm({...form, category: e.target.value})}
            >
              <option value="notice">공지사항</option>
              <option value="review">개통후기</option>
              <option value="guide">이용안내</option>
            </select>
            <Textarea 
              placeholder="내용을 입력하세요 (Markdown 지원)" 
              value={form.content} 
              onChange={e => setForm({...form, content: e.target.value})}
              className="h-64 rounded-xl"
            />
            <Button type="submit" className="w-full bg-[#E02020] h-12 rounded-xl">등록하기</Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {posts.map(post => (
          <Card key={post.id} className="rounded-2xl border-none shadow-sm flex items-center p-6 justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline">{post.category}</Badge>
              <span className="font-bold">{post.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="text-gray-400 hover:text-red-500">
                <Trash2 size={18} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InquiryManager() {
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => setInquiries(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  const toggleStatus = async (id: string, current: string) => {
    await updateDoc(doc(db, 'inquiries', id), {
      status: current === 'pending' ? 'completed' : 'pending'
    });
    toast.success('상태가 변경되었습니다.');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">상담 신청 관리</h1>
      <Card className="rounded-3xl border-none shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>상태</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>문의 내용</TableHead>
                <TableHead>날짜</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map(i => (
                <TableRow key={i.id}>
                  <TableCell>
                    <Badge variant={i.status === 'pending' ? 'destructive' : 'default'}>
                      {i.status === 'pending' ? '대기 중' : '완료'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold">{i.name}</TableCell>
                  <TableCell>{i.phone}</TableCell>
                  <TableCell className="max-w-xs truncate">{i.message}</TableCell>
                  <TableCell className="text-xs text-gray-400">{i.createdAt?.toDate().toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => toggleStatus(i.id, i.status)}>
                      {i.status === 'pending' ? '완료 처리' : '대기 처리'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsManager() {
  const { config, loading } = useSiteConfig();
  const [form, setForm] = useState(config);

  useEffect(() => {
    if (config) setForm(config);
  }, [config]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await setDoc(doc(db, 'config', 'site'), { ...form, updatedAt: serverTimestamp() });
    toast.success('설정이 저장되었습니다.');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">사이트 설정</h1>
      <Card className="rounded-3xl border-none shadow-sm p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">사이트 이름</label>
              <Input value={form.siteName} onChange={e => setForm({...form, siteName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">메인 배너 문구</label>
              <Input value={form.bannerText} onChange={e => setForm({...form, bannerText: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2">서비스 소개 문구</label>
              <Input value={form.serviceIntro} onChange={e => setForm({...form, serviceIntro: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">카카오톡 상담 링크</label>
              <Input value={form.kakaoLink} onChange={e => setForm({...form, kakaoLink: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">블로그 링크</label>
              <Input value={form.blogLink} onChange={e => setForm({...form, blogLink: e.target.value})} />
            </div>
          </div>
          <Button type="submit" className="bg-[#E02020] hover:bg-[#c01a1a] w-full h-12 rounded-xl">저장하기</Button>
        </form>
      </Card>
    </div>
  );
}
