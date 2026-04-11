import { useSiteConfig } from '@/lib/cms';
import { Phone, MessageCircle } from 'lucide-react';

export default function BottomBar() {
  const { config } = useSiteConfig();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 p-3 md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex gap-3">
          {/* Phone Button */}
          <a 
            href="tel:+821025806274" 
            className="flex-1 h-14 bg-[#4CAF50] rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-100 active:scale-95 transition-transform gap-2"
          >
            <Phone className="w-6 h-6 fill-current" />
            <span className="font-bold">전화상담</span>
          </a>
          
          {/* Kakao Button */}
          <a 
            href={config.kakaoLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 h-14 bg-[#FEE500] rounded-xl flex items-center justify-center text-[#3C1E1E] shadow-lg shadow-yellow-100 active:scale-95 transition-transform gap-2"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="font-bold">카톡상담</span>
          </a>
        </div>
      </div>
      {/* Spacer to prevent content from being hidden behind the bar */}
      <div className="h-20 md:hidden" />
    </>
  );
}
