import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Navbar from './Navbar';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || '登录失败，请检查您的邮箱和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-widest mb-3" style={{color: '#1F1F1F'}}>
            AESTHETIC
          </h1>
          <p className="text-sm tracking-wide" style={{color: '#6B7280'}}>
            登录您的账户
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 text-sm border" style={{backgroundColor: '#FEF2F2', borderColor: '#FEE2E2', color: '#DC2626'}}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-normal mb-3 tracking-wide" style={{color: '#1F1F1F'}}>
              邮箱地址
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#9CA3AF'}} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-5 py-4 border text-sm tracking-wide transition focus:outline-none focus:border-gray-900"
                style={{borderColor: '#D1D5DB', color: '#1F1F1F'}}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-normal mb-3 tracking-wide" style={{color: '#1F1F1F'}}>
              密码
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#9CA3AF'}} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 border text-sm tracking-wide transition focus:outline-none focus:border-gray-900"
                style={{borderColor: '#D1D5DB', color: '#1F1F1F'}}
                placeholder="输入您的密码"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" style={{color: '#9CA3AF'}} />
                ) : (
                  <Eye className="w-5 h-5" style={{color: '#9CA3AF'}} />
                )}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-white text-sm font-light transition tracking-wider disabled:opacity-50"
              style={{backgroundColor: '#1C2B3A'}}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#101D29')}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1C2B3A'}
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm tracking-wide" style={{color: '#6B7280'}}>
            还没有账户？{' '}
            <Link to="/register" className="transition" style={{color: '#1F1F1F'}} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
              立即注册
            </Link>
          </p>
          <Link to="/" className="block text-sm transition tracking-wide" style={{color: '#6B7280'}}>
            返回首页
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
