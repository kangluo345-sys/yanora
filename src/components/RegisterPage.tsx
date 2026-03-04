import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Eye, EyeOff, Upload, User } from 'lucide-react';
import Navbar from './Navbar';

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAvatar = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const colors = ['#2D3748', '#4A5568', '#718096', '#A0AEC0'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      ctx.fillStyle = randomColor;
      ctx.fillRect(0, 0, 200, 200);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 80px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const initial = email.charAt(0).toUpperCase() || 'U';
      ctx.fillText(initial, 100, 100);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'avatar.png', { type: 'image/png' });
          setAvatarFile(file);
          setAvatarPreview(canvas.toDataURL());
        }
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setError('密码长度至少为6个字符');
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        let avatarUrl = null;

        if (avatarFile) {
          const fileExt = avatarFile.name.split('.').pop();
          const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
          const filePath = `avatars/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, avatarFile);

          if (uploadError) {
            console.error('头像上传失败:', uploadError);
          } else {
            const { data: urlData } = supabase.storage
              .from('avatars')
              .getPublicUrl(filePath);
            avatarUrl = urlData.publicUrl;
          }
        }

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email: email,
              avatar_url: avatarUrl,
            },
          ]);

        if (profileError) {
          console.error('创建用户资料失败:', profileError);
        }

        navigate('/login');
      }
    } catch (err: any) {
      setError(err.message || '注册失败，请稍后再试');
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
            创建新账户
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {error && (
            <div className="p-4 text-sm border" style={{backgroundColor: '#FEF2F2', borderColor: '#FEE2E2', color: '#DC2626'}}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-normal mb-3 tracking-wide" style={{color: '#1F1F1F'}}>
              头像
            </label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center overflow-hidden" style={{borderColor: '#D1D5DB'}}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10" style={{color: '#9CA3AF'}} />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <span className="inline-flex items-center gap-2 px-4 py-2 border text-sm cursor-pointer transition" style={{borderColor: '#D1D5DB', color: '#1F1F1F'}}>
                    <Upload className="w-4 h-4" />
                    上传头像
                  </span>
                </label>
                <button
                  type="button"
                  onClick={generateAvatar}
                  disabled={!email}
                  className="block w-full text-left px-4 py-2 border text-sm transition disabled:opacity-50"
                  style={{borderColor: '#D1D5DB', color: '#1F1F1F'}}
                >
                  生成默认头像
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-normal mb-3 tracking-wide" style={{color: '#1F1F1F'}}>
              邮箱地址 <span style={{color: '#EF4444'}}>*</span>
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
              密码 <span style={{color: '#EF4444'}}>*</span>
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
                placeholder="至少6个字符"
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

          <div>
            <label className="block text-sm font-normal mb-3 tracking-wide" style={{color: '#1F1F1F'}}>
              确认密码 <span style={{color: '#EF4444'}}>*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#9CA3AF'}} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 border text-sm tracking-wide transition focus:outline-none focus:border-gray-900"
                style={{borderColor: '#D1D5DB', color: '#1F1F1F'}}
                placeholder="再次输入密码"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
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
              {loading ? '注册中...' : '注册'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm tracking-wide" style={{color: '#6B7280'}}>
            已有账户？{' '}
            <Link to="/login" className="transition" style={{color: '#1F1F1F'}} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
              立即登录
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

export default RegisterPage;
