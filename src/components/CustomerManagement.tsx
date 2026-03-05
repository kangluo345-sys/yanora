import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Mail, Calendar, User, Trash2 } from 'lucide-react';

interface Customer {
  id: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  booking_count?: number;
  last_booking?: string;
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const customersWithBookings = await Promise.all(
        (profilesData || []).map(async (profile) => {
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select('created_at')
            .eq('user_id', profile.id)
            .order('created_at', { ascending: false });

          if (bookingsError) {
            console.error('Error fetching bookings:', bookingsError);
            return {
              ...profile,
              booking_count: 0,
              last_booking: null
            };
          }

          return {
            ...profile,
            booking_count: bookingsData?.length || 0,
            last_booking: bookingsData?.[0]?.created_at || null
          };
        })
      );

      setCustomers(customersWithBookings);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    if (!confirm('确定要删除这个客户吗？这将删除客户的所有相关数据。')) {
      return;
    }

    try {
      setDeleteLoading(customerId);

      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', customerId);

      if (deleteError) throw deleteError;

      setCustomers(customers.filter(c => c.id !== customerId));
    } catch (error: any) {
      console.error('Error deleting customer:', error);
      alert('删除失败：' + error.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-base" style={{color: '#6B7280'}}>加载中...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2" style={{color: '#1F1F1F'}}>客户管理</h2>
        <p className="text-sm" style={{color: '#6B7280'}}>
          管理所有注册客户信息
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#9CA3AF'}} />
          <input
            type="text"
            placeholder="搜索客户邮箱..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border text-sm focus:outline-none focus:border-gray-900"
            style={{borderColor: '#E5E7EB', color: '#1F1F1F'}}
          />
        </div>
      </div>

      <div className="bg-white border" style={{borderColor: '#E5E7EB'}}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b" style={{borderColor: '#E5E7EB', backgroundColor: '#F9FAFB'}}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-normal tracking-wider" style={{color: '#6B7280'}}>
                  客户
                </th>
                <th className="px-6 py-4 text-left text-xs font-normal tracking-wider" style={{color: '#6B7280'}}>
                  邮箱
                </th>
                <th className="px-6 py-4 text-left text-xs font-normal tracking-wider" style={{color: '#6B7280'}}>
                  预约次数
                </th>
                <th className="px-6 py-4 text-left text-xs font-normal tracking-wider" style={{color: '#6B7280'}}>
                  最后预约
                </th>
                <th className="px-6 py-4 text-left text-xs font-normal tracking-wider" style={{color: '#6B7280'}}>
                  注册时间
                </th>
                <th className="px-6 py-4 text-left text-xs font-normal tracking-wider" style={{color: '#6B7280'}}>
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{borderColor: '#E5E7EB'}}>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm" style={{color: '#6B7280'}}>
                    {searchTerm ? '没有找到匹配的客户' : '暂无客户数据'}
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {customer.avatar_url ? (
                          <img
                            src={customer.avatar_url}
                            alt={customer.email}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#E5E7EB'}}>
                            <User className="w-5 h-5" style={{color: '#6B7280'}} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" style={{color: '#9CA3AF'}} />
                        <span className="text-sm" style={{color: '#1F1F1F'}}>
                          {customer.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium" style={{color: '#1F1F1F'}}>
                        {customer.booking_count || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {customer.last_booking ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" style={{color: '#9CA3AF'}} />
                          <span className="text-sm" style={{color: '#6B7280'}}>
                            {formatDate(customer.last_booking)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm" style={{color: '#9CA3AF'}}>
                          无
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm" style={{color: '#6B7280'}}>
                        {formatDate(customer.created_at)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        disabled={deleteLoading === customer.id}
                        className="flex items-center gap-2 px-3 py-2 text-sm border transition disabled:opacity-50"
                        style={{borderColor: '#FCA5A5', color: '#DC2626'}}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#FEE2E2';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleteLoading === customer.id ? '删除中...' : '删除'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm" style={{color: '#6B7280'}}>
          共 {filteredCustomers.length} 位客户
        </p>
      </div>
    </div>
  );
}
