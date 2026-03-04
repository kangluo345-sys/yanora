import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, Calendar, Image, Users } from 'lucide-react';
import BookingManagement from './BookingManagement';
import CaseStudyManagement from './CaseStudyManagement';

interface Admin {
  id: string;
  email: string;
  role: string;
}

type TabType = 'bookings' | 'cases' | 'customers';

function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('bookings');

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/admin/login');
        return;
      }

      const { data: adminData, error } = await supabase
        .from('admins')
        .select('*')
        .eq('id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !adminData) {
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }

      setAdmin(adminData);
    } catch (error) {
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg" style={{color: '#6B7280'}}>加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b" style={{borderColor: '#E5E7EB'}}>
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-light tracking-widest" style={{color: '#1F1F1F'}}>
              AESTHETIC 管理后台
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm" style={{color: '#6B7280'}}>{admin?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm transition"
              style={{color: '#6B7280'}}
            >
              <LogOut className="w-4 h-4" />
              退出登录
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 border-r min-h-screen" style={{borderColor: '#E5E7EB', backgroundColor: '#F9FAFB'}}>
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition ${
                activeTab === 'bookings' ? 'bg-white shadow-sm' : ''
              }`}
              style={{color: activeTab === 'bookings' ? '#1F1F1F' : '#6B7280'}}
            >
              <Calendar className="w-5 h-5" />
              预约管理
            </button>

            <button
              onClick={() => setActiveTab('cases')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition ${
                activeTab === 'cases' ? 'bg-white shadow-sm' : ''
              }`}
              style={{color: activeTab === 'cases' ? '#1F1F1F' : '#6B7280'}}
            >
              <Image className="w-5 h-5" />
              案例管理
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition ${
                activeTab === 'customers' ? 'bg-white shadow-sm' : ''
              }`}
              style={{color: activeTab === 'customers' ? '#1F1F1F' : '#6B7280'}}
            >
              <Users className="w-5 h-5" />
              客户管理
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === 'bookings' && <BookingManagement />}
          {activeTab === 'cases' && <CaseStudyManagement />}
          {activeTab === 'customers' && (
            <div className="text-center py-12">
              <p className="text-sm" style={{color: '#6B7280'}}>客户管理功能开发中...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
