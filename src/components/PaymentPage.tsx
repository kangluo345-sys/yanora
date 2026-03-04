import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Check, CreditCard, Smartphone } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface Service {
  name: string;
  price: number;
  selected: boolean;
}

interface BookingDetails {
  id: string;
  name: string;
  email: string;
  service_type: string;
  consultation_fee: number;
  selected_services: Service[];
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('booking_id');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [availableServices, setAvailableServices] = useState<Service[]>([
    { name: '面部轮廓手术', price: 50000, selected: false },
    { name: '注射除皱', price: 8000, selected: false },
    { name: '皮肤美容', price: 15000, selected: false },
    { name: '身体塑形', price: 30000, selected: false },
    { name: '植发', price: 25000, selected: false },
    { name: '牙齿美容', price: 20000, selected: false },
  ]);

  useEffect(() => {
    if (!bookingId) {
      navigate('/booking');
      return;
    }
    loadBookingDetails();
  }, [bookingId]);

  const loadBookingDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        setError('预约信息不存在');
        return;
      }

      setBookingDetails({
        id: data.id,
        name: data.name,
        email: data.email,
        service_type: data.service_type,
        consultation_fee: data.consultation_fee || 500,
        selected_services: data.selected_services || []
      });

      if (data.selected_services && data.selected_services.length > 0) {
        const updatedServices = availableServices.map(service => {
          const isSelected = data.selected_services.some(
            (s: Service) => s.name === service.name
          );
          return { ...service, selected: isSelected };
        });
        setAvailableServices(updatedServices);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (index: number) => {
    const updated = [...availableServices];
    updated[index].selected = !updated[index].selected;
    setAvailableServices(updated);
  };

  const calculateTotal = () => {
    const consultationFee = bookingDetails?.consultation_fee || 500;
    const servicesTotal = availableServices
      .filter(s => s.selected)
      .reduce((sum, s) => sum + s.price, 0);
    return consultationFee + servicesTotal;
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      setError('请选择支付方式');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const selectedServices = availableServices
        .filter(s => s.selected)
        .map(s => ({ name: s.name, price: s.price }));

      const totalAmount = calculateTotal();

      const { data: { user } } = await supabase.auth.getUser();

      const { error: updateError } = await supabase
        .from('bookings')
        .update({
          selected_services: selectedServices,
          total_amount: totalAmount,
          payment_method: paymentMethod,
          payment_status: 'paid',
          payment_completed_at: new Date().toISOString(),
          status: 'confirmed'
        })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      const paymentData = {
        booking_id: bookingId,
        user_id: user?.id || null,
        amount: totalAmount,
        currency: 'CNY',
        payment_method: paymentMethod,
        status: 'completed',
        transaction_id: `TXN${Date.now()}`
      };

      const { error: paymentError } = await supabase
        .from('payments')
        .insert([paymentData]);

      if (paymentError) throw paymentError;

      try {
        await supabase.functions.invoke('send-booking-confirmation', {
          body: {
            bookingId: bookingId,
            email: bookingDetails?.email,
            name: bookingDetails?.name
          }
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }

      navigate(`/booking/success?booking_id=${bookingId}`);
    } catch (err: any) {
      setError(err.message || '支付失败，请重试');
    } finally {
      setSubmitting(false);
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

  if (error && !bookingDetails) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/booking')}
              className="px-6 py-2 bg-black text-white hover:bg-gray-800"
            >
              返回预约页面
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-8 text-center">完成支付</h1>

        <div className="bg-gray-50 p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">预约信息</h2>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-medium">姓名：</span>{bookingDetails?.name}</p>
            <p><span className="font-medium">邮箱：</span>{bookingDetails?.email}</p>
            <p><span className="font-medium">服务类型：</span>{bookingDetails?.service_type}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">费用明细</h2>
          <div className="border border-gray-300 divide-y">
            <div className="p-4 flex justify-between items-center bg-gray-50">
              <span className="font-medium">咨询费</span>
              <span className="text-lg">¥{bookingDetails?.consultation_fee}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">选择服务项目（可选）</h2>
          <div className="border border-gray-300 divide-y">
            {availableServices.map((service, index) => (
              <label
                key={index}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={service.selected}
                    onChange={() => toggleService(index)}
                    className="w-5 h-5"
                  />
                  <span className="font-medium">{service.name}</span>
                </div>
                <span className="text-lg">¥{service.price.toLocaleString()}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8 p-6 bg-black text-white">
          <div className="flex justify-between items-center text-xl">
            <span className="font-medium">总计</span>
            <span className="text-2xl font-light">¥{calculateTotal().toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">选择支付方式</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setPaymentMethod('微信支付')}
              className={`p-6 border-2 transition-all ${
                paymentMethod === '微信支付'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6" />
                  <span className="text-lg">微信支付</span>
                </div>
                {paymentMethod === '微信支付' && <Check className="w-6 h-6" />}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('支付宝')}
              className={`p-6 border-2 transition-all ${
                paymentMethod === '支付宝'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6" />
                  <span className="text-lg">支付宝</span>
                </div>
                {paymentMethod === '支付宝' && <Check className="w-6 h-6" />}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('银行卡')}
              className={`p-6 border-2 transition-all ${
                paymentMethod === '银行卡'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6" />
                  <span className="text-lg">银行卡</span>
                </div>
                {paymentMethod === '银行卡' && <Check className="w-6 h-6" />}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('PayPal')}
              className={`p-6 border-2 transition-all ${
                paymentMethod === 'PayPal'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6" />
                  <span className="text-lg">PayPal</span>
                </div>
                {paymentMethod === 'PayPal' && <Check className="w-6 h-6" />}
              </div>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/booking')}
            disabled={submitting}
            className="flex-1 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            返回修改
          </button>
          <button
            onClick={handlePayment}
            disabled={submitting || !paymentMethod}
            className="flex-1 py-4 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:bg-gray-400"
          >
            {submitting ? '处理中...' : '确认支付'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
