import { useSiteConfig } from '@/lib/cms';
import { MessageCircle, Phone, Globe, Instagram, BookOpen, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { config } = useSiteConfig();

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center overflow-hidden">
              <img 
                src="https://i.ibb.co/mpzxYFy/image.png" 
                alt="Logo" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 whitespace-nowrap">
              {config.siteName}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/admin" className="text-sm font-medium text-gray-400 hover:text-gray-600">관리자</Link>
          </div>

          <a 
            href={config.kakaoLink}
            target="_blank"
            rel="noreferrer"
            className="bg-[#E02020] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#c01a1a] transition-all shadow-lg shadow-red-100 flex items-center gap-2 ml-auto"
          >
            개통문의
          </a>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  const { config } = useSiteConfig();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://i.ibb.co/mpzxYFy/image.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <span className="text-lg font-bold text-gray-900">{config.siteName}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-4">
              앤텔레콤 무조건모바일은 신용불량, 미납자, 외국인 등 누구나 본인 명의로 즉시 개통이 가능한 프리미엄 선불폰 서비스입니다.
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>대표자명: 신승수</p>
              <p>주소: 경기도 김포시 김포한강10로 133번길 127, 530동 DH43호 (구래동)</p>
              <p>전화번호: 010-2580-6274</p>
            </div>
          </div>
          
          <div>
            <a 
              href="http://info.n-telecom.co.kr/customers/event_view.jsp?idx=455"
              target="_blank"
              rel="noreferrer"
              className="inline-block overflow-hidden rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <img 
                src="https://i.ibb.co/JFH94JJK/image.png" 
                alt="Event Banner" 
                className="w-24 h-auto object-cover" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/event/96/96';
                }}
              />
            </a>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Social</h4>
            <div className="flex gap-4">
              <a 
                href={config.blogLink} 
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#E02020] hover:border-[#E02020] transition-all"
                title="네이버 블로그"
              >
                <BookOpen className="w-5 h-5" />
              </a>
              <a 
                href={config.youtubeLink} 
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#E02020] hover:border-[#E02020] transition-all"
                title="유튜브"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2026 {config.siteName}. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-gray-400">개인정보처리방침</span>
            <span className="text-xs text-gray-400">이용약관</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
