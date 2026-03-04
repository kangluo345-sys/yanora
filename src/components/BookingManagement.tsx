import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Check, X, Clock, DollarSign } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  service_type: string;
  message: string;
  status: string;
  payment_status: string;
  consultation_fee: number;
  created_at: string;
}

function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const updatePaymentStatus = async (id: string, paymentStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ payment_status: paymentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchBookings();
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#10B981';
      case 'completed':
        return '#6366F1';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#F59E0B';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    return status === 'paid' ? '#10B981' : '#EF4444';
  };

  const filteredBookings = bookings.filter(booking =>
    filter === 'all' ? true : booking.status === filter
  );

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-light" style={{color: '#1F1F1F'}}>预约管理</h2>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 text-sm transition ${
                filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100'
              }`}
              style={filter !== f ? {color: '#6B7280'} : {}}
            >
              {f === 'all' ? '全部' : f === 'pending' ? '待确认' : f === 'confirmed' ? '已确认' : '已完成'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border" style={{borderColor: '#E5E7EB'}}>
        <table className="w-full">
          <thead className="border-b" style={{borderColor: '#E5E7EB', backgroundColor: '#F9FAFB'}}>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-normal" style={{color: '#6B7280'}}>客户信息</th>
              <th className="px-4 py-3 text-left text-xs font-normal" style={{color: '#6B7280'}}>预约日期</th>
              <th className="px-4 py-3 text-left text-xs font-normal" style={{color: '#6B7280'}}>服务类型</th>
              <th className="px-4 py-3 text-left text-xs font-normal" style={{color: '#6B7280'}}>面诊金</th>
              <th className="px-4 py-3 text-left text-xs font-normal" style={{color: '#6B7280'}}>支付状态</th>
              <th className="px-4 py-3 text-left text-xs font-normal" style={{color: '#6B7280'}}>预约状态</th>
              <th className="px-4 py-3 text-left text-xs font-normal" style={{color: '#6B7280'}}>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-b" style={{borderColor: '#E5E7EB'}}>
                <td className="px-4 py-4">
                  <div className="text-sm" style={{color: '#1F1F1F'}}>{booking.name}</div>
                  <div className="text-xs" style={{color: '#6B7280'}}>{booking.email}</div>
                  <div className="text-xs" style={{color: '#6B7280'}}>{booking.phone}</div>
                </td>
                <td className="px-4 py-4 text-sm" style={{color: '#4B5563'}}>
                  {new Date(booking.preferred_date).toLocaleDateString('zh-CN')}
                </td>
                <td className="px-4 py-4 text-sm" style={{color: '#4B5563'}}>
                  {booking.service_type}
                </td>
                <td className="px-4 py-4 text-sm" style={{color: '#4B5563'}}>
                  ¥{booking.consultation_fee}
                </td>
                <td className="px-4 py-4">
                  <span
                    className="inline-flex items-center px-2 py-1 text-xs"
                    style={{
                      color: getPaymentStatusColor(booking.payment_status),
                      backgroundColor: `${getPaymentStatusColor(booking.payment_status)}20`
                    }}
                  >
                    {booking.payment_status === 'paid' ? '已支付' : '未支付'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className="inline-flex items-center px-2 py-1 text-xs"
                    style={{
                      color: getStatusColor(booking.status),
                      backgroundColor: `${getStatusColor(booking.status)}20`
                    }}
                  >
                    {booking.status === 'pending' ? '待确认' :
                     booking.status === 'confirmed' ? '已确认' :
                     booking.status === 'completed' ? '已完成' : '已取消'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    {booking.payment_status === 'unpaid' && (
                      <button
                        onClick={() => updatePaymentStatus(booking.id, 'paid')}
                        className="p-1 transition hover:bg-green-50"
                        title="标记为已支付"
                      >
                        <DollarSign className="w-4 h-4" style={{color: '#10B981'}} />
                      </button>
                    )}
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className="p-1 transition hover:bg-green-50"
                        title="确认预约"
                      >
                        <Check className="w-4 h-4" style={{color: '#10B981'}} />
                      </button>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'completed')}
                        className="p-1 transition hover:bg-blue-50"
                        title="标记为已完成"
                      >
                        <Clock className="w-4 h-4" style={{color: '#6366F1'}} />
                      </button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="p-1 transition hover:bg-red-50"
                        title="取消预约"
                      >
                        <X className="w-4 h-4" style={{color: '#EF4444'}} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm" style={{color: '#6B7280'}}>暂无预约记录</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingManagement;
