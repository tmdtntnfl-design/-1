import { useSiteConfig } from '@/lib/cms';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Hero() {
  const { config } = useSiteConfig();

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-0">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-red-50 rounded-full blur-3xl opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center gap-2 flex-wrap">
              <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-[#E02020] text-sm font-bold uppercase tracking-widest">
                편의점 유심 셀프개통
              </span>
              <div className="flex items-end gap-1">
                <div className="bg-white px-1.5 py-1 rounded-md border border-gray-100 flex items-center justify-center h-10 md:h-12 shadow-sm">
                  <img 
                    src="https://i.ibb.co/pvnx65yk/4253921-140787-21.jpg" 
                    alt="KT" 
                    className="h-full w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="bg-white px-1.5 py-1 rounded-md border border-gray-100 flex items-center justify-center h-10 md:h-12 shadow-sm">
                  <img 
                    src="https://i.ibb.co/cShqgNPz/Kakao-Talk-20251023-154810612.png" 
                    alt="U+" 
                    className="h-full w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-8">
              {config.bannerText.split(' ').map((word, i) => (
                <span key={i} className={(word.includes('무조건') || word.includes('개통방법')) ? 'text-[#E02020]' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium leading-tight mb-6 whitespace-pre-line -mt-4">
              {config.serviceIntro}
            </p>

            <div className="flex flex-nowrap items-center gap-3 md:gap-6 mb-10 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <CheckCircle2 className="text-[#E02020] w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-bold text-gray-600 whitespace-nowrap">본인 명의 100%</span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <CheckCircle2 className="text-[#E02020] w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-bold text-gray-600 whitespace-nowrap">당일 즉시 개통</span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <CheckCircle2 className="text-[#E02020] w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-bold text-gray-600 whitespace-nowrap">전국 어디서나</span>
              </div>
            </div>
            
            <div className="mb-8" />

            <div className="flex flex-col gap-4">
              <img 
                src="https://i.ibb.co/m5gt49Dq/038.png" 
                alt="Partner Info 3" 
                className="w-full max-w-sm h-auto rounded-xl shadow-sm"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://i.ibb.co/W497MHcr/Kakao-Talk-20250713-170004269.jpg" 
                alt="Additional Info" 
                className="w-full max-w-sm h-auto rounded-xl shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
