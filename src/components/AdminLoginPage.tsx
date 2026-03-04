import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock } from 'lucide-react';
import Navbar from './Navbar';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('*')
          .eq('id', authData.user.id)
          .eq('is_active', true)
          .maybeSingle();

        if (adminError) throw adminError;

        if (!adminData) {
          await supabase.auth.signOut();
          throw new Error('您没有管理员权限');
        }

        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || '登录失败，请检查您的凭据');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F3F4F6'}}>
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-lg">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: '#1C2B3A'}}>
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-light text-center mb-8 tracking-wide" style={{color: '#1F1F1F'}}>
            管理员登录
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm mb-2" style={{color: '#4B5563'}}>
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border focus:outline-none focus:border-gray-400"
                style={{borderColor: '#D1D5DB'}}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{color: '#4B5563'}}>
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border focus:outline-none focus:border-gray-400"
                style={{borderColor: '#D1D5DB'}}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white text-sm transition disabled:opacity-50"
              style={{backgroundColor: '#1C2B3A'}}
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm transition"
              style={{color: '#6B7280'}}
            >
              返回首页
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
