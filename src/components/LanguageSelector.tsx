import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSelectorProps {
  isMobile?: boolean;
  isBottomSection?: boolean;
}

const LanguageSelector = ({ isMobile = false, isBottomSection = false }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);

  const languages = [
    { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    { code: 'ar' as const, name: 'العربية', flag: '🇸🇦' },
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: 'zh' | 'en' | 'fr' | 'ar' | 'es') => {
    setLanguage(langCode);
    setShowMenu(false);

    if (langCode === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  if (isMobile) {
    return (
      <div className={isBottomSection ? '' : 'border-b border-white border-opacity-10'}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`w-full text-left text-white text-sm transition-all flex items-center justify-between ${
            isBottomSection ? 'px-0 py-3 border border-white border-opacity-40' : 'px-6 py-4'
          }`}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div className={`flex items-center gap-2 ${isBottomSection ? 'px-4' : ''}`}>
            <Globe className="w-4 h-4" />
            <span>{currentLanguage?.flag} {currentLanguage?.name}</span>
          </div>
          <span className={`text-xs ${isBottomSection ? 'px-4' : ''}`}>{showMenu ? '▲' : '▼'}</span>
        </button>
        {showMenu && (
          <div className={isBottomSection ? 'mt-2 border border-white border-opacity-40' : 'bg-black bg-opacity-20'}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-10 py-3 text-white text-sm transition-all ${
                  isBottomSection ? '' : 'border-l-2'
                } ${
                  language === lang.code ? 'border-white' : isBottomSection ? '' : 'border-white border-opacity-30'
                }`}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 transition px-3 py-2"
        style={{color: '#6B7280'}}
        onMouseEnter={(e) => e.currentTarget.style.color = '#1F1F1F'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLanguage?.flag}</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg z-50" style={{borderColor: '#D1D5DB'}}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition ${
                language === lang.code ? 'bg-gray-100' : ''
              }`}
              style={{color: '#1F1F1F'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
              onMouseLeave={(e) => {
                if (language !== lang.code) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;
