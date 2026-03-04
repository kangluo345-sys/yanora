import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface Profile {
  avatar_url: string | null;
  email: string;
}

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileProjects, setShowMobileProjects] = useState(false);

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
    const { data } = await supabase
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
    <>
      <nav className="sticky top-0 bg-white z-50 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')}>
              <span className="text-xl font-light tracking-widest" style={{color: '#1F1F1F'}}>YANORA</span>
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setShowMobileMenu(true)}
          >
            <Menu className="w-6 h-6" style={{color: '#1F1F1F'}} />
          </button>

          <div className="hidden md:flex items-center gap-12">
            <button onClick={() => navigate('/')} className="text-sm transition" style={{color: '#6B7280'}} onMouseEnter={(e) => e.currentTarget.style.color = '#1F1F1F'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>首页</button>

            <div
              className="relative"
              onMouseEnter={() => setShowProjectsMenu(true)}
              onMouseLeave={() => setShowProjectsMenu(false)}
            >
              <button className="text-sm transition" style={{color: '#6B7280'}} onMouseEnter={(e) => e.currentTarget.style.color = '#1F1F1F'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>项目</button>

              {showProjectsMenu && (
                <>
                  <div className="absolute left-0 right-0" style={{top: '100%', height: '28px'}} />
                  <div
                    className="fixed left-0 right-0 shadow-2xl"
                    style={{backgroundColor: '#1C2B3A', height: '480px', top: '80px'}}
                  >
                    <div className="max-w-7xl mx-auto px-16 h-full relative">
                      <div className="flex flex-col justify-center gap-4 h-full py-24" style={{maxWidth: '500px'}}>
                        <button
                          onClick={() => {
                            navigate('/facial-contour');
                            setShowProjectsMenu(false);
                          }}
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
                          <span className="text-lg font-light tracking-wider">面部轮廓</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/body-sculpting');
                            setShowProjectsMenu(false);
                          }}
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
                          <span className="text-lg font-light tracking-wider">身体塑形</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/injection-lifting');
                            setShowProjectsMenu(false);
                          }}
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
                          <span className="text-lg font-light tracking-wider">面部年轻化</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/hair-transplant');
                            setShowProjectsMenu(false);
                          }}
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
                          <span className="text-lg font-light tracking-wider">植发</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/dental');
                            setShowProjectsMenu(false);
                          }}
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
                          <span className="text-lg font-light tracking-wider">牙齿美容</span>
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

            <button onClick={() => navigate('/cases')} className="text-sm transition" style={{color: '#6B7280'}} onMouseEnter={(e) => e.currentTarget.style.color = '#1F1F1F'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>案例</button>
            <button onClick={() => navigate('/faq')} className="text-sm transition" style={{color: '#6B7280'}} onMouseEnter={(e) => e.currentTarget.style.color = '#1F1F1F'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>FAQ</button>
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
                      退出登录
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
                登录
              </button>
            )}
            <button
              onClick={() => navigate('/booking')}
              className="text-sm text-white px-6 py-2 transition"
              style={{backgroundColor: '#1C2B3A'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#101D29'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1C2B3A'}
            >
              立即预约
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
            <button
              onClick={() => {
                navigate('/');
                setShowMobileMenu(false);
              }}
              className="block w-full text-left px-6 py-4 text-white text-sm transition-all border-b border-white border-opacity-10"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              首页
            </button>

            <div className="border-b border-white border-opacity-10">
              <button
                onClick={() => setShowMobileProjects(!showMobileProjects)}
                className="w-full text-left px-6 py-4 text-white text-sm transition-all"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                项目
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
                    面部轮廓
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
                    身体塑形
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
                    面部年轻化
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
                    植发
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
                    牙齿美容
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
              案例
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
              FAQ
            </button>
          </div>

          <div className="p-6 border-t border-white border-opacity-20">
            <div className="mb-4">
              <LanguageSelector isMobile={true} isBottomSection={true} />
            </div>

            <button
              onClick={() => {
                navigate('/booking');
                setShowMobileMenu(false);
              }}
              className="w-full py-3 text-white text-sm transition mb-3 border border-white border-opacity-40"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              立即预约
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
                  退出登录
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
                登录
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
    </>
  );
}

export default Navbar;
