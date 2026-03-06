import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SplashScreenProps {
  onComplete: () => void;
}

function SplashScreen({ onComplete }: SplashScreenProps) {
  const { t } = useLanguage();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#1C2B3A' }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
        <div
          className="mb-8 md:mb-12 animate-fadeInScale"
          style={{
            animation: 'fadeInScale 1.5s ease-out forwards'
          }}
        >
          <div className="w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white border-opacity-20 shadow-2xl">
            <img
              src="/24a1e5e820d6d721e7aa3970ae648b43.jpg"
              alt="YANORA"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          className="text-center animate-fadeInUp"
          style={{
            animation: 'fadeInUp 1.5s ease-out 0.5s forwards',
            opacity: 0
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-light tracking-widest mb-4 text-white"
            style={{
              textShadow: '0 2px 20px rgba(0,0,0,0.3)'
            }}
          >
            YANORA
          </h1>
          <p
            className="text-xl md:text-2xl font-light tracking-wide text-white opacity-90"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            {t('splash.tagline')}
          </p>
        </div>

        <div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          style={{
            animation: 'pulse 2s ease-in-out infinite'
          }}
        >
          <div className="w-1 h-12 bg-white opacity-30"></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.6;
            transform: scaleY(1.5);
          }
        }
      `}</style>
    </div>
  );
}

export default SplashScreen;
