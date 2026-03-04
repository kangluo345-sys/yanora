import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import ImageCompareSlider from './components/ImageCompareSlider';
import CaseStudiesSection from './components/CaseStudiesSection';
import ServicesSection from './components/ServicesSection';
import MobileTestimonialCarousel from './components/MobileTestimonialCarousel';
import LanguageSelector from './components/LanguageSelector';
import { useLanguage } from './contexts/LanguageContext';

interface Profile {
  avatar_url: string | null;
  email: string;
}

function App() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileProjects, setShowMobileProjects] = useState(false);
  const [expandedEthnicity, setExpandedEthnicity] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('avatar_url, email')
      .eq('id', userId)
      .maybeSingle();

    if (data) {
      setProfile(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 bg-white z-50 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-light tracking-widest" style={{color: '#1F1F1F'}}>YANORA</span>
          </div>

          <button
            className="md:hidden"
            onClick={() => setShowMobileMenu(true)}
          >
            <Menu className="w-6 h-6" style={{color: '#1F1F1F'}} />
          </button>

          <div className="hidden md:flex items-center gap-12">
            <a href="#home" className="text-sm transition" style={{color: '#6B7280'}} onMouseEnter={(e) => e.currentTarget.style.color = '#1F1F1F'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>{t('nav.home')}</a>

            <div
              className="relative"
              onMouseEnter={() => setShowProjectsMenu(true)}
              onMouseLeave={() => setShowProjectsMenu(false)}
            >
              <a href="#projects" className="text-sm transition" style={{color: '#6B7280'}} onMouseEnter={(e) => e.currentTarget.style.color = '#1F1F1F'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>{t('nav.projects')}</a>

              {showProjectsMenu && (
                <>
                  <div className="absolute left-0 right-0" style={{top: '100%', height: '20px'}} />
                  <div
                    className="fixed left-0 right-0 shadow-2xl"
                    style={{backgroundColor: '#1C2B3A', height: '480px', top: '80px'}}
                    onMouseEnter={() => setShowProjectsMenu(true)}
                    onMouseLeave={() => setShowProjectsMenu(false)}
                  >
                    <div className="max-w-7xl mx-auto px-16 h-full relative">
                      <div className="flex flex-col justify-center gap-4 h-full py-24" style={{maxWidth: '500px'}}>
                        <button
                          onClick={() => navigate('/facial-contour')}
                          className="text-left px-8 py-5 transition-all duration-300 border border-white border-opacity-20"
                          style={{color: 'white', backgroundColor: 'transparent'}}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <span className="text-lg font-light tracking-wider">{t('nav.facialContour')}</span>
                        </button>
                        <button
                          onClick={() => navigate('/body-sculpting')}
                          className="text-left px-8 py-5 transition-all duration-300 border border-white border-opacity-20"
                          style={{color: 'white', backgroundColor: 'transparent'}}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <span className="text-lg font-light tracking-wider">{t('nav.bodySculpting')}</span>
                        </button>
                        <button
                          onClick={() => navigate('/injection-lifting')}
                          className="text-left px-8 py-5 transition-all duration-300 border border-white border-opacity-20"
                          style={{color: 'white', backgroundColor: 'transparent'}}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <span className="text-lg font-light tracking-wider">{t('nav.facialRejuvenation')}</span>
                        </button>
                        <button
                          onClick={() => navigate('/hair-transplant')}
                          className="text-left px-8 py-5 transition-all duration-300 border border-white border-opacity-20"
                          style={{color: 'white', backgroundColor: 'transparent'}}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <span className="text-lg font-light tracking-wider">{t('nav.hairTransplant')}</span>
                        </button>
                        <button
                          onClick={() => navigate('/dental')}
                          className="text-left px-8 py-5 transition-all duration-300 border border-white border-opacity-20"
                          style={{color: 'white', backgroundColor: 'transparent'}}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <span className="text-lg font-light tracking-wider">{t('nav.dental')}</span>
                        </button>
                      </div>

                      <div className="absolute bottom-8 right-16">
                        <span className="text-6xl font-extralight tracking-widest" style={{color: 'rgba(255,255,255,0.3)'}}>YANORA</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button onClick={() => navigate('/cases')} className="text-sm transition" style={{color: '#6B7280'}} onMouseEnter={(e) => e.currentTarget.style.color = '#1F1F1F'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>{t('nav.cases')}</button>
            <button onClick={() => navigate('/faq')} className="text-sm transition" style={{color: '#6B7280'}} onMouseEnter={(e) => e.currentTarget.style.color = '#1F1F1F'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>{t('nav.faq')}</button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 transition"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover border-2"
                      style={{borderColor: '#1C2B3A'}}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{backgroundColor: '#1C2B3A'}}>
                      <UserIcon className="w-5 h-5" />
                    </div>
                  )}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border shadow-lg" style={{borderColor: '#D1D5DB'}}>
                    <div className="px-4 py-3 border-b" style={{borderColor: '#E5E7EB'}}>
                      <p className="text-sm font-normal" style={{color: '#1F1F1F'}}>{profile?.email || user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm flex items-center gap-2 transition"
                      style={{color: '#6B7280'}}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="text-sm transition px-4 py-2"
                style={{color: '#6B7280'}}
              >
                {t('nav.login')}
              </button>
            )}
            <button
              onClick={() => navigate('/booking')}
              className="text-sm text-white px-6 py-2 transition"
              style={{backgroundColor: '#1C2B3A'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#101D29'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1C2B3A'}
            >
              {t('nav.bookNow')}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-80 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          showMobileMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{backgroundColor: '#1C2B3A'}}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-white border-opacity-20">
            <span className="text-xl font-light tracking-widest text-white">YANORA</span>
            <button onClick={() => setShowMobileMenu(false)}>
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            <LanguageSelector isMobile={true} />

            <a
              href="#home"
              onClick={() => setShowMobileMenu(false)}
              className="block px-6 py-4 text-white text-sm transition-all border-b border-white border-opacity-10"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {t('nav.home')}
            </a>

            <div className="border-b border-white border-opacity-10">
              <button
                onClick={() => setShowMobileProjects(!showMobileProjects)}
                className="w-full text-left px-6 py-4 text-white text-sm transition-all"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {t('nav.projects')}
              </button>
              {showMobileProjects && (
                <div className="bg-black bg-opacity-20">
                  <button
                    onClick={() => {
                      navigate('/facial-contour');
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-10 py-3 text-white text-sm transition-all border-l-2 border-white border-opacity-30"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {t('nav.facialContour')}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/body-sculpting');
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-10 py-3 text-white text-sm transition-all border-l-2 border-white border-opacity-30"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {t('nav.bodySculpting')}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/injection-lifting');
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-10 py-3 text-white text-sm transition-all border-l-2 border-white border-opacity-30"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {t('nav.facialRejuvenation')}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/hair-transplant');
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-10 py-3 text-white text-sm transition-all border-l-2 border-white border-opacity-30"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {t('nav.hairTransplant')}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/dental');
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-10 py-3 text-white text-sm transition-all border-l-2 border-white border-opacity-30"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {t('nav.dental')}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                navigate('/cases');
                setShowMobileMenu(false);
              }}
              className="w-full text-left px-6 py-4 text-white text-sm transition-all border-b border-white border-opacity-10"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {t('nav.cases')}
            </button>

            <button
              onClick={() => {
                navigate('/faq');
                setShowMobileMenu(false);
              }}
              className="w-full text-left px-6 py-4 text-white text-sm transition-all border-b border-white border-opacity-10"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {t('nav.faq')}
            </button>
          </div>

          <div className="p-6 border-t border-white border-opacity-20">
            <button
              onClick={() => {
                navigate('/booking');
                setShowMobileMenu(false);
              }}
              className="w-full py-3 text-white text-sm transition mb-3 border border-white border-opacity-40"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {t('nav.bookNow')}
            </button>

            {user ? (
              <div>
                <div className="px-4 py-3 mb-2 border-b border-white border-opacity-20">
                  <p className="text-sm text-white">{profile?.email || user.email}</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm flex items-center gap-2 text-white transition"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut className="w-4 h-4" />
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setShowMobileMenu(false);
                }}
                className="w-full py-3 text-white text-sm transition border border-white border-opacity-40"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {t('nav.login')}
              </button>
            )}
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      <section className="py-16 md:py-32 px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-xl md:text-3xl font-light mb-3 leading-relaxed tracking-wide" style={{color: '#1F1F1F'}}>
            {t('hero.title1')}
          </h1>
          <h2 className="text-xl md:text-3xl font-light mb-12 leading-relaxed tracking-wide" style={{color: '#1F1F1F'}}>
            {t('hero.title2')}
          </h2>
          <button
            onClick={() => navigate('/booking')}
            className="px-12 py-3 text-white text-sm transition tracking-wider"
            style={{backgroundColor: '#1C2B3A'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#101D29'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1C2B3A'}
          >
            {t('hero.cta')}
          </button>
        </div>
      </section>

      {/* 桌面端服务展示 */}
      <section className="hidden md:block py-12 px-12">
        <div className="w-4/5 mx-auto">
          <div className="p-8 flex flex-row gap-8 rounded-3xl" style={{minHeight: '450px'}}>
            <div className="w-3/4 grid grid-cols-2 gap-6">
              <div className="aspect-[3/3.5]">
                <ImageCompareSlider
                  beforeImage="/68744e766a6b63d88f86d714366bcd31.jpg"
                  afterImage="/24a1e5e820d6d721e7aa3970ae648b43.jpg"
                  beforeLabel="术前"
                  afterLabel="术后"
                  initialPosition={50}
                />
              </div>
              <div className="aspect-[3/3.5]">
                <ImageCompareSlider
                  beforeImage="/5ef6dae25777256ca4e3fafedffbbea9.jpg"
                  afterImage="/c324214cb2a62d16d00510d9652c0f60.jpg"
                  beforeLabel="术前"
                  afterLabel="术后"
                  initialPosition={50}
                />
              </div>
            </div>

            <div className="w-1/4 space-y-12">
              <div className="group cursor-pointer">
                <h3 className="text-xl font-normal transition" style={{color: '#1F1F1F'}}>{t('nav.facialContour')}</h3>
              </div>
              <div className="group cursor-pointer">
                <h3 className="text-xl font-normal transition" style={{color: '#1F1F1F'}}>{t('nav.bodySculpting')}</h3>
              </div>
              <div className="group cursor-pointer">
                <h3 className="text-xl font-normal transition" style={{color: '#1F1F1F'}}>{t('nav.facialRejuvenation')}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 移动端服务展示 */}
      <section className="md:hidden py-8 px-4">
        <div className="w-full">
          <div className="p-3 flex flex-col gap-4 rounded-3xl border-4 border-blue-500">
            <div className="flex flex-col gap-3">
              <div className="aspect-square border-8 border-red-500">
                <ImageCompareSlider
                  beforeImage="/68744e766a6b63d88f86d714366bcd31.jpg"
                  afterImage="/24a1e5e820d6d721e7aa3970ae648b43.jpg"
                  beforeLabel="术前"
                  afterLabel="术后"
                  initialPosition={50}
                />
              </div>
              <div className="aspect-square border-8 border-red-500">
                <ImageCompareSlider
                  beforeImage="/5ef6dae25777256ca4e3fafedffbbea9.jpg"
                  afterImage="/c324214cb2a62d16d00510d9652c0f60.jpg"
                  beforeLabel="术前"
                  afterLabel="术后"
                  initialPosition={50}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 active:scale-95"
                style={{
                  backgroundColor: '#F5F8FA',
                  border: '1.5px solid #B9CBDC'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = '#1C2B3A';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(28, 43, 58, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = '#B9CBDC';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 className="text-sm font-normal text-center" style={{color: '#1F1F1F'}}>{t('nav.facialContour')}</h3>
              </div>
              <div
                className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 active:scale-95"
                style={{
                  backgroundColor: '#F5F8FA',
                  border: '1.5px solid #B9CBDC'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = '#1C2B3A';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(28, 43, 58, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = '#B9CBDC';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 className="text-sm font-normal text-center" style={{color: '#1F1F1F'}}>{t('nav.bodySculpting')}</h3>
              </div>
              <div
                className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 active:scale-95"
                style={{
                  backgroundColor: '#F5F8FA',
                  border: '1.5px solid #B9CBDC'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = '#1C2B3A';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(28, 43, 58, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = '#B9CBDC';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 className="text-sm font-normal text-center" style={{color: '#1F1F1F'}}>{t('nav.facialRejuvenation')}</h3>
              </div>
              <div
                className="cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 active:scale-95"
                style={{
                  backgroundColor: '#F5F8FA',
                  border: '1.5px solid #B9CBDC'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = '#1C2B3A';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(28, 43, 58, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = '#B9CBDC';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 className="text-sm font-normal text-center" style={{color: '#1F1F1F'}}>{t('nav.hairTransplant')}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="hidden md:block">
            <h2 className="text-3xl font-light text-center mb-20 tracking-wide" style={{color: '#1F1F1F'}}>{t('advantages.title')}</h2>

            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5" style={{backgroundColor: '#B9CBDC', transform: 'translateY(-50%)'}}></div>

              <div className="grid grid-cols-5 gap-8 relative">
                {[
                  { num: '1', title: t('advantages.advantage1') },
                  { num: '2', title: t('advantages.advantage2') },
                  { num: '3', title: t('advantages.advantage3') },
                  { num: '4', title: t('advantages.advantage4') },
                  { num: '5', title: t('advantages.advantage5') }
                ].map((item) => (
                  <div key={item.num} className="text-center relative">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-light relative z-10" style={{backgroundColor: '#1C2B3A'}}>
                      {item.num}
                    </div>
                    <h3 className="text-sm font-normal tracking-wide px-2" style={{color: '#1F1F1F'}}>{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:hidden max-w-md mx-auto">
            <div className="rounded-3xl p-6" style={{backgroundColor: '#B9CBDC'}}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white">
                  <svg className="w-6 h-6" style={{color: '#B9CBDC'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-light text-center mb-5 text-white">{t('advantages.title')}</h2>

              <div className="rounded-2xl p-4 space-y-0" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
                {[
                  { num: '1', title: t('advantages.advantage1') },
                  { num: '2', title: t('advantages.advantage2') },
                  { num: '3', title: t('advantages.advantage3') },
                  { num: '4', title: t('advantages.advantage4') },
                  { num: '5', title: t('advantages.advantage5') }
                ].map((item, index, array) => (
                  <div key={item.num}>
                    <div className="flex items-start gap-3 py-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white flex-shrink-0 text-sm font-light" style={{color: '#6B7280'}}>
                        {item.num}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-sm font-light text-white">{item.title}</h3>
                      </div>
                    </div>
                    {index < array.length - 1 && (
                      <div className="flex justify-center py-0">
                        <svg className="w-4 h-4 text-white opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
              {t('ethnicity.title')}
            </h2>
            <p className="text-sm md:text-base leading-relaxed tracking-wide" style={{color: '#4B5563'}}>
              {t('ethnicity.subtitle')}
            </p>
          </div>

          <div className="border-4 p-4 md:p-24 relative overflow-hidden bg-white" style={{borderColor: '#B9CBDC'}}>
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full -mr-32 -mt-32" style={{backgroundColor: '#B9CBDC'}}></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5 rounded-full -ml-24 -mb-24" style={{backgroundColor: '#B9CBDC'}}></div>

            <div className="relative z-10">
            <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-16 mb-6 md:mb-16">
              {[
                {
                  ethnicity: t('ethnicity.black'),
                  image: '/black_facial_features/1_(1).png',
                  features: {
                    bone: t('ethnicity.blackBone'),
                    soft: t('ethnicity.blackSoft')
                  }
                },
                {
                  ethnicity: t('ethnicity.asian'),
                  image: '/east_asian_facial_features/1_(2).png',
                  features: {
                    bone: t('ethnicity.asianBone'),
                    soft: t('ethnicity.asianSoft')
                  }
                },
                {
                  ethnicity: t('ethnicity.white'),
                  image: '/white_facial_features/3.png',
                  features: {
                    bone: t('ethnicity.whiteBone'),
                    soft: t('ethnicity.whiteSoft')
                  }
                }
              ].map((item) => (
                <div key={item.ethnicity} className="text-center">
                  <div className="w-full aspect-[3/4] overflow-hidden mb-4 bg-gray-100">
                    <img src={item.image} alt={`${item.ethnicity}面部特征`} className="w-full h-full object-contain" />
                  </div>
                  <button
                    onClick={() => setExpandedEthnicity(expandedEthnicity === item.ethnicity ? null : item.ethnicity)}
                    className="text-sm font-normal tracking-wide mb-3 transition-colors duration-200 hover:opacity-70"
                    style={{color: '#1F1F1F'}}
                  >
                    {item.ethnicity} {expandedEthnicity === item.ethnicity ? '▲' : '▼'}
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: expandedEthnicity === item.ethnicity ? '500px' : '0',
                      opacity: expandedEthnicity === item.ethnicity ? 1 : 0
                    }}
                  >
                    <div className="text-left space-y-3 px-4 py-2">
                      <div>
                        <h4 className="text-xs font-medium mb-1" style={{color: '#1F1F1F'}}>1. {t('ethnicity.boneFeatures')}</h4>
                        <p className="text-xs leading-relaxed" style={{color: '#6B7280'}}>{item.features.bone}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium mb-1" style={{color: '#1F1F1F'}}>2. {t('ethnicity.softTissue')}</h4>
                        <p className="text-xs leading-relaxed" style={{color: '#6B7280'}}>{item.features.soft}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:hidden mb-6">
              <div className="space-y-4">
                {[
                  {
                    ethnicity: t('ethnicity.black'),
                    image: '/black_facial_features/1_(1).png',
                    features: {
                      bone: t('ethnicity.blackBone'),
                      soft: t('ethnicity.blackSoft')
                    }
                  },
                  {
                    ethnicity: t('ethnicity.asian'),
                    image: '/east_asian_facial_features/1_(2).png',
                    features: {
                      bone: t('ethnicity.asianBone'),
                      soft: t('ethnicity.asianSoft')
                    }
                  },
                  {
                    ethnicity: t('ethnicity.white'),
                    image: '/white_facial_features/3.png',
                    features: {
                      bone: t('ethnicity.whiteBone'),
                      soft: t('ethnicity.whiteSoft')
                    }
                  }
                ].map((item) => (
                  <div key={item.ethnicity} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex gap-3 mb-2">
                      <div className="w-20 aspect-[3/4] overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={item.image} alt={`${item.ethnicity}面部特征`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <button
                          onClick={() => setExpandedEthnicity(expandedEthnicity === item.ethnicity ? null : item.ethnicity)}
                          className="text-sm font-normal tracking-wide transition-colors duration-200 hover:opacity-70 flex items-center justify-between w-full"
                          style={{color: '#1F1F1F'}}
                        >
                          <span>{item.ethnicity}</span>
                          <span className="text-xs">{expandedEthnicity === item.ethnicity ? '▲' : '▼'}</span>
                        </button>
                      </div>
                    </div>

                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: expandedEthnicity === item.ethnicity ? '500px' : '0',
                        opacity: expandedEthnicity === item.ethnicity ? 1 : 0
                      }}
                    >
                      <div className="text-left space-y-2 pt-2 border-t border-gray-100">
                        <div>
                          <h4 className="text-xs font-medium mb-1" style={{color: '#1F1F1F'}}>1. {t('ethnicity.boneFeatures')}</h4>
                          <p className="text-xs leading-relaxed" style={{color: '#6B7280'}}>{item.features.bone}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium mb-1" style={{color: '#1F1F1F'}}>2. {t('ethnicity.softTissue')}</h4>
                          <p className="text-xs leading-relaxed" style={{color: '#6B7280'}}>{item.features.soft}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-sm tracking-wide mt-8" style={{color: '#6B7280'}}>
              {t('ethnicity.cta')}
            </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-3 tracking-wide" style={{color: '#1F1F1F'}}>{t('plan.title')}</h2>
          <p className="text-sm text-center mb-8 md:mb-16 tracking-wide" style={{color: '#6B7280'}}>
            {t('plan.subtitle')}
          </p>

          {/* Mobile layout - compact version */}
          <div className="md:hidden">
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex justify-center gap-6">
                <div className="overflow-hidden relative w-40" style={{backgroundColor: '#F3F4F6'}}>
                  <img
                    src="/540f310b1f9b5244da98c950465274f4.png"
                    alt={t('plan.before')}
                    className="h-56 w-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-white px-2 py-0.5">
                    <span className="text-xs text-gray-600">{t('plan.beforeLabel')}</span>
                  </div>
                </div>
                <div className="overflow-hidden relative w-40" style={{backgroundColor: '#F3F4F6'}}>
                  <img
                    src="/7f2a85b5a678c2f472ee7c56c64a6039.png"
                    alt={t('plan.after')}
                    className="h-56 w-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-white px-2 py-0.5">
                    <span className="text-xs text-gray-600">{t('plan.afterLabel')}</span>
                  </div>
                </div>
              </div>

              <div className="max-w-md mx-auto space-y-3">
                {[
                  { num: '01', title: t('plan.step1') },
                  { num: '02', title: t('plan.step2') },
                  { num: '03', title: t('plan.step3') },
                  { num: '04', title: t('plan.step4') }
                ].map((item) => (
                  <div key={item.num} className="flex items-center gap-3 pb-3 border-b border-gray-200 last:border-0">
                    <div className="text-base font-light flex-shrink-0" style={{color: '#A0A7B5', width: '36px'}}>{item.num}</div>
                    <h3 className="text-sm font-normal tracking-wide leading-snug" style={{color: '#1F1F1F'}}>{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop layout - new design */}
          <div className="hidden md:flex md:flex-col md:items-center">
            {/* Before/After Images Section with Connected Border */}
            <div className="relative flex gap-32 flex-shrink-0 mb-12">
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                <path
                  d="M 20,20 L 420,20 L 420,524 L 20,524 L 20,20 M 548,20 L 948,20 L 948,524 L 548,524 L 548,20"
                  fill="none"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />
              </svg>
              <div className="overflow-hidden relative" style={{width: '400px', backgroundColor: '#F3F4F6'}}>
                <img
                  src="/540f310b1f9b5244da98c950465274f4.png"
                  alt={t('plan.before')}
                  className="w-full object-cover"
                  style={{height: '500px'}}
                />
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 shadow">
                  <span className="text-xs font-medium text-gray-700">{t('plan.beforeLabel')}</span>
                </div>
              </div>
              <div className="overflow-hidden relative" style={{width: '400px', backgroundColor: '#F3F4F6'}}>
                <img
                  src="/7f2a85b5a678c2f472ee7c56c64a6039.png"
                  alt={t('plan.after')}
                  className="w-full object-cover"
                  style={{height: '500px'}}
                />
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 shadow">
                  <span className="text-xs font-medium text-gray-700">{t('plan.afterLabel')}</span>
                </div>
              </div>
            </div>

            {/* Steps Section - Single Row */}
            <div className="flex gap-16 justify-center">
              {[
                { num: '01', title: t('plan.step1') },
                { num: '02', title: t('plan.step2') },
                { num: '03', title: t('plan.step3') },
                { num: '04', title: t('plan.step4') }
              ].map((item) => (
                <div key={item.num} className="flex flex-col items-center text-center">
                  <div className="text-4xl font-extralight mb-4" style={{color: '#D1D5DB'}}>{item.num}</div>
                  <h3 className="text-base font-normal leading-relaxed" style={{color: '#1F1F1F'}}>{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full relative bg-white">
        <div className="max-w-7xl mx-auto py-12 md:py-20 px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-wide" style={{color: '#1F2937'}}>
              {t('analysis.title')}
            </h2>
            <p className="text-base md:text-lg font-light tracking-wide" style={{color: '#6B7280'}}>
              {t('analysis.subtitle')}
            </p>
          </div>
        </div>

        {/* Desktop Layout - Keep Original */}
        <div className="hidden md:block w-full relative bg-white">
          <img
            src="/56315efc544d966bb744e9a52c7de1f4.png"
            alt="Professional portrait"
            className="w-full h-auto object-cover"
          />

          <div className="absolute inset-0 pointer-events-none">
            <div className="max-w-7xl mx-auto h-full relative px-4">
              <img
                src="/Gemini_Generated_Image_lv6nndlv6nndlv6n.png"
                alt="Analysis 1"
                className="absolute left-8 top-[15%] w-48 md:w-64 h-auto rounded-lg shadow-2xl float-left-1"
              />
              <img
                src="/Gemini_Generated_Image_pf7kappf7kappf7k.png"
                alt="Analysis 2"
                className="absolute left-12 bottom-[20%] w-48 md:w-64 h-auto rounded-lg shadow-2xl float-left-2"
              />
              <img
                src="/Gemini_Generated_Image_a16ssqa16ssqa16s.png"
                alt="Analysis 3"
                className="absolute right-8 top-[20%] w-48 md:w-64 h-auto rounded-lg shadow-2xl float-right-1"
              />
              <img
                src="/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png"
                alt="Analysis 4"
                className="absolute right-12 bottom-[15%] w-48 md:w-64 h-auto rounded-lg shadow-2xl float-right-2"
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout - New Design */}
        <div className="md:hidden w-full">
          <div className="px-4">
            <img
              src="/56315efc544d966bb744e9a52c7de1f4.png"
              alt="Professional portrait"
              className="w-full h-auto object-cover rounded-lg mb-6"
            />

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                {
                  image: '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
                  title: t('analysis.dimension1')
                },
                {
                  image: '/Gemini_Generated_Image_pf7kappf7kappf7k.png',
                  title: t('analysis.dimension2')
                },
                {
                  image: '/Gemini_Generated_Image_a16ssqa16ssqa16s.png',
                  title: t('analysis.dimension3')
                },
                {
                  image: '/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png',
                  title: t('analysis.dimension4')
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm border" style={{borderColor: '#E5E7EB', minHeight: '200px'}}>
                  <div className="flex-1 flex items-center justify-center mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  <h3 className="text-xs font-normal text-center leading-relaxed" style={{color: '#1F2937'}}>
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-3 tracking-wide" style={{color: '#1F1F1F'}}>
            {t('vision.title')}
          </h2>
          <p className="text-sm md:text-base text-center mb-8 md:mb-16 tracking-wide" style={{color: '#6B7280'}}>{t('vision.subtitle')}</p>

          <div className="mb-8 md:mb-16 mx-auto w-full md:w-4/5 lg:w-3/4">
            <div className="h-80 md:h-[500px] lg:h-[700px]">
              <ImageCompareSlider
                beforeLabel="【此处放置案例照片 A】"
                afterLabel="【此处放置案例照片 B】"
                initialPosition={50}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-24 px-3 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-light text-center mb-6 md:mb-8" style={{color: '#1F2937'}}>
            {t('realCases.title')}
          </h2>

          {/* Desktop layout - two cases side by side */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* First case */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-2 gap-0">
                <div className="aspect-[3/4] flex items-center justify-center" style={{backgroundColor: '#E5E7EB'}}>
                  <span className="text-gray-600 text-sm font-light">{t('realCases.before')}</span>
                </div>
                <div className="aspect-[3/4] flex items-center justify-center" style={{backgroundColor: '#D1D5DB'}}>
                  <span className="text-gray-700 text-sm font-light">{t('realCases.after')}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium" style={{color: '#1F2937'}}>手术前特征：</p>
                  <div className="space-y-1 text-xs" style={{color: '#6B7280'}}>
                    <p>• 面部轮廓不够立体</p>
                    <p>• 鼻梁较低</p>
                    <p>• 下颌线条不够明显</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium" style={{color: '#1F2937'}}>手术后特征：</p>
                  <div className="space-y-1 text-xs" style={{color: '#6B7280'}}>
                    <p>• 面部轮廓立体分明</p>
                    <p>• 鼻梁挺拔自然</p>
                    <p>• 下颌线条流畅优雅</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second case */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-2 gap-0">
                <div className="aspect-[3/4] flex items-center justify-center" style={{backgroundColor: '#E5E7EB'}}>
                  <span className="text-gray-600 text-sm font-light">{t('realCases.before')}</span>
                </div>
                <div className="aspect-[3/4] flex items-center justify-center" style={{backgroundColor: '#D1D5DB'}}>
                  <span className="text-gray-700 text-sm font-light">{t('realCases.after')}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium" style={{color: '#1F2937'}}>手术前特征：</p>
                  <div className="space-y-1 text-xs" style={{color: '#6B7280'}}>
                    <p>• 眼部形态不够精致</p>
                    <p>• 皮肤松弛下垂</p>
                    <p>• 面部缺乏年轻活力</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium" style={{color: '#1F2937'}}>手术后特征：</p>
                  <div className="space-y-1 text-xs" style={{color: '#6B7280'}}>
                    <p>• 眼部深邃迷人</p>
                    <p>• 皮肤紧致年轻</p>
                    <p>• 面部线条柔美自然</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile layout - new design inspired by reference */}
          <div className="md:hidden space-y-6">
            {/* First case */}
            <div className="bg-white p-6" style={{borderColor: '#B9CBDC', border: '3px solid #B9CBDC'}}>
              {/* Before/After Images */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="aspect-[3/5] overflow-hidden flex items-center justify-center" style={{backgroundColor: '#B9CBDC'}}>
                  <span className="text-gray-600 text-xs">{t('realCases.before')}</span>
                </div>
                <div className="aspect-[3/5] overflow-hidden flex items-center justify-center" style={{backgroundColor: '#A0A7B5'}}>
                  <span className="text-white text-xs">{t('realCases.after')}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative mb-8">
                <div className="absolute left-0 right-0 top-1/2 h-px" style={{backgroundColor: '#D1D5DB', transform: 'translateY(-50%)'}}></div>
                <div className="relative text-center">
                  <span className="inline-block px-4 py-1 text-sm font-light" style={{backgroundColor: '#F3F4F6', color: '#6B7280'}}>8 {t('realCases.months')}</span>
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-normal mb-3" style={{color: '#1F1F1F'}}>面部轮廓立体提升</h3>
                  <p className="text-xs leading-relaxed" style={{color: '#6B7280'}}>
                    通过专业的面部轮廓手术，使面部线条更加立体分明
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-normal mb-3" style={{color: '#1F1F1F'}}>鼻梁挺拔自然</h3>
                  <p className="text-xs leading-relaxed" style={{color: '#6B7280'}}>
                    精准的鼻部整形技术，打造自然挺拔的鼻梁线条
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-normal mb-3" style={{color: '#1F1F1F'}}>下颌线条优化</h3>
                  <p className="text-xs leading-relaxed" style={{color: '#6B7280'}}>
                    塑造流畅优雅的下颌线条，提升整体面部和谐度
                  </p>
                </div>
              </div>
            </div>

            {/* Second case */}
            <div className="bg-white p-6" style={{borderColor: '#B9CBDC', border: '3px solid #B9CBDC'}}>
              {/* Before/After Images */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="aspect-[3/5] overflow-hidden flex items-center justify-center" style={{backgroundColor: '#B9CBDC'}}>
                  <span className="text-gray-600 text-xs">{t('realCases.before')}</span>
                </div>
                <div className="aspect-[3/5] overflow-hidden flex items-center justify-center" style={{backgroundColor: '#A0A7B5'}}>
                  <span className="text-white text-xs">{t('realCases.after')}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative mb-8">
                <div className="absolute left-0 right-0 top-1/2 h-px" style={{backgroundColor: '#D1D5DB', transform: 'translateY(-50%)'}}></div>
                <div className="relative text-center">
                  <span className="inline-block px-4 py-1 text-sm font-light" style={{backgroundColor: '#F3F4F6', color: '#6B7280'}}>6 {t('realCases.months')}</span>
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-normal mb-3" style={{color: '#1F1F1F'}}>眼部轮廓精致化</h3>
                  <p className="text-xs leading-relaxed" style={{color: '#6B7280'}}>
                    打造深邃迷人的双眼，让眼神更加有神采
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-normal mb-3" style={{color: '#1F1F1F'}}>皮肤紧致提升</h3>
                  <p className="text-xs leading-relaxed" style={{color: '#6B7280'}}>
                    改善肌肤松弛问题，恢复年轻紧致状态
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-normal mb-3" style={{color: '#1F1F1F'}}>整体气质提升</h3>
                  <p className="text-xs leading-relaxed" style={{color: '#6B7280'}}>
                    细节调整，打造更加协调自然的面部美感
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CaseStudiesSection />

      <section className="py-12 md:py-24 relative overflow-hidden bg-white">
        <div className="relative">
          {/* Mobile title */}
          <div className="md:hidden">
            <h2 className="text-2xl font-light text-center mb-3 tracking-wide px-6" style={{color: '#1F1F1F'}}>
              {t('testimonials.title')}
            </h2>
            <p className="text-sm text-center mb-2" style={{color: '#6B7280'}}>{t('testimonials.mapTitle')}</p>
            <p className="text-xs text-center mb-6" style={{color: '#6B7280'}}>{t('testimonials.mapSubtitle')}</p>
            <div className="w-20 h-px mx-auto mb-8" style={{backgroundColor: '#A0A7B5'}}></div>
          </div>

          {/* Desktop title */}
          <div className="hidden md:block">
            <h2 className="text-3xl font-light text-center mb-4 tracking-wide px-12" style={{color: '#1F1F1F'}}>
              {t('testimonials.title')}
            </h2>
            <div className="w-20 h-px mx-auto mb-6" style={{backgroundColor: '#A0A7B5'}}></div>
          </div>

          {/* Desktop map with text on left */}
          <div className="hidden md:block max-w-7xl mx-auto mb-8 px-12">
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-3">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('testimonials.mapTitle')}</h3>
                <p className="text-sm text-gray-600">{t('testimonials.mapSubtitle')}</p>
              </div>
              <div className="col-span-9 col-start-4">
                <div className="w-full h-[36rem] overflow-hidden">
                  <img src="/map.png" alt="全球客户分布地图" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile map - responsive */}
          <div className="md:hidden px-4 mb-8 bg-white">
            <div className="w-full overflow-hidden bg-white">
              <img src="/map.png" alt="全球客户分布地图" className="w-full h-auto object-contain bg-white" />
            </div>
          </div>

          {/* Desktop and Mobile testimonials - unified carousel */}
          <div className="w-full">
            <MobileTestimonialCarousel />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="p-8 md:p-16 relative overflow-hidden" style={{backgroundColor: '#1C2B3A'}}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-light text-white mb-8 md:mb-12 tracking-wide">{t('journey.title')}</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
                {[
                  t('journey.step1'),
                  t('journey.step2'),
                  t('journey.step3'),
                  t('journey.step4')
                ].map((step, index) => (
                  <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm p-6 md:p-8 text-white">
                    <div className="text-xl md:text-2xl font-light mb-2 md:mb-3">{index + 1}</div>
                    <div className="text-xs md:text-sm font-light tracking-wide">{step}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button className="px-8 md:px-10 py-2.5 md:py-3 bg-white text-xs md:text-sm font-light transition tracking-wider" style={{color: '#1C2B3A'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}>
                  {t('journey.cta')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-white py-16 px-12" style={{backgroundColor: '#1C2B3A'}}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-xl font-light tracking-widest">YANORA</span>
          </div>
          <p className="text-sm mb-10 font-light tracking-wide" style={{color: '#A0A7B5'}}>{t('footer.tagline')}</p>
          <div className="flex justify-center gap-12 text-xs font-light" style={{color: '#A0A7B5'}}>
            <a href="#" className="hover:text-white transition">{t('footer.about')}</a>
            <a href="#" className="hover:text-white transition">{t('footer.contact')}</a>
            <a href="#" className="hover:text-white transition">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition">{t('footer.terms')}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
