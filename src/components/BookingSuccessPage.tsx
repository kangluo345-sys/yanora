import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, Calendar, Mail, Phone } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface BookingInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  total_amount: number;
  payment_method: string;
  created_at: string;
}

export default function BookingSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('booking_id');
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      navigate('/booking');
      return;
    }
    loadBookingInfo();
  }, [bookingId]);

  const loadBookingInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setBookingInfo(data);
      }
    } catch (error) {
      console.error('Error loading booking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-gray-600">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-light mb-4">预约成功！</h1>
          <p className="text-gray-600 text-lg">
            感谢您选择 YANORA，我们已收到您的预约和付款
          </p>
        </div>

        {bookingInfo && (
          <div className="bg-gray-50 p-8 mb-8">
            <h2 className="text-xl font-medium mb-6">预约详情</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">预约编号</p>
                  <p className="font-medium">{bookingInfo.id.substring(0, 8).toUpperCase()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">联系邮箱</p>
                  <p className="font-medium">{bookingInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">联系电话</p>
                  <p className="font-medium">{bookingInfo.phone}</p>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">服务类型</span>
                  <span className="font-medium">{bookingInfo.service_type}</span>
                </div>
                {bookingInfo.preferred_date && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">预约日期</span>
                    <span className="font-medium">{bookingInfo.preferred_date}</span>
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">支付方式</span>
                  <span className="font-medium">{bookingInfo.payment_method}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-4 border-t border-gray-300">
                  <span>总计</span>
                  <span>¥{bookingInfo.total_amount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 p-6 mb-8">
          <h3 className="font-medium mb-2 text-blue-900">下一步</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• 我们已发送确认邮件到您的邮箱，请查收</li>
            <li>• 我们的团队将在24小时内与您联系确认具体时间</li>
            <li>• 如有任何问题，请随时通过邮箱或电话联系我们</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            返回首页
          </button>
          <button
            onClick={() => navigate('/cases')}
            className="flex-1 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            查看案例
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
