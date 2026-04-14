import Navbar, { Footer } from '@/components/layout/Layout';
import BottomBar from '@/components/layout/BottomBar';
import { Hero } from '@/components/home/Sections';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <section className="w-full flex">
          <a 
            href="https://i.ibb.co/mCxhRPRx/Kakao-Talk-20260316-162406123.jpg" 
            target="_blank" 
            rel="noreferrer" 
            className="w-1/2 block cursor-zoom-in"
          >
            <img 
              src="https://i.ibb.co/mCxhRPRx/Kakao-Talk-20260316-162406123.jpg" 
              alt="Guide 1" 
              className="w-full h-auto block"
              referrerPolicy="no-referrer"
            />
          </a>
          <a 
            href="https://i.ibb.co/hFZmdGJc/Kakao-Talk-20260316-162406123-01.jpg" 
            target="_blank" 
            rel="noreferrer" 
            className="w-1/2 block cursor-zoom-in"
          >
            <img 
              src="https://i.ibb.co/hFZmdGJc/Kakao-Talk-20260316-162406123-01.jpg" 
              alt="Guide 2" 
              className="w-full h-auto block"
              referrerPolicy="no-referrer"
            />
          </a>
        </section>
        <section className="w-full">
          <img 
            src="https://i.ibb.co/fzQxsNtD/039.png" 
            alt="Guide 3" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/YBnLxFDL/006.png" 
            alt="Guide 4" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/BH7WV611/007.png" 
            alt="Guide 5" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/qFnHVqnr/008.png" 
            alt="Guide 6" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/PsTGmpXT/009.png" 
            alt="Guide 7" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/Qvg6vw4X/010.png" 
            alt="Guide 8" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/39Pzr7m7/011.png" 
            alt="Guide 9" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/p6VfC65q/012.png" 
            alt="Guide 10" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/hxdzm4L9/013.png" 
            alt="Guide 11" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/5hsfTfX6/014.png" 
            alt="Guide 12" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/mrhzkTQ0/015.png" 
            alt="Guide 13" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/dwwDRg9R/016.png" 
            alt="Guide 14" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://i.ibb.co/FkBf2Xsg/017.png" 
            alt="Guide 15" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <a 
            href="http://pf.kakao.com/_eSGRn/chat" 
            target="_blank" 
            rel="noreferrer" 
            className="block w-full cursor-pointer"
          >
            <img 
              src="https://i.ibb.co/bjNBxbZG/040.png" 
              alt="Guide 16" 
              className="w-full h-auto block"
              referrerPolicy="no-referrer"
            />
          </a>
          <div className="w-full max-w-4xl mx-auto my-12 px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
              선불폰 개통방법
            </h2>
            <div className="overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
              <div className="relative pt-[56.25%] bg-gray-100">
                <iframe
                  src="https://tv.naver.com/embed/97530270"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomBar />
    </div>
  );
}
