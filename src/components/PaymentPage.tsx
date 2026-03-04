import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Check } from 'lucide-react';

interface Service {
  name: string;
  nameEn: string;
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
    { name: '终身VIP服务', nameEn: 'Lifetime VIP Service', price: 200, selected: false },
    { name: '注射调整建议', nameEn: 'Injection Adjustment Consultation', price: 50, selected: false },
    { name: '手术建议', nameEn: 'Surgical Consultation', price: 60, selected: false },
    { name: '面部基础分析', nameEn: 'Basic Facial Analysis', price: 20, selected: false },
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
    const servicesTotal = availableServices
      .filter(s => s.selected)
      .reduce((sum, s) => sum + s.price, 0);
    return servicesTotal;
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
        currency: 'USD',
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg" style={{ color: '#6B7280' }}>Loading...</div>
      </div>
    );
  }

  if (error && !bookingDetails) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/booking')}
            className="px-6 py-2 text-white transition"
            style={{ backgroundColor: '#1C2B3A' }}
          >
            Back to Booking
          </button>
        </div>
      </div>
    );
  }

  const isMobile = window.innerWidth < 768;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      {/* Desktop & Mobile Layout */}
      <div className={`${isMobile ? 'px-4 py-8' : 'max-w-2xl mx-auto px-12 py-16'}`}>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-light text-center mb-12 tracking-wide`} style={{ color: '#1F1F1F' }}>
          Select Services
        </h1>

        {/* Services List */}
        <div className="space-y-3 mb-12">
          {availableServices.map((service, index) => (
            <label
              key={index}
              className="bg-white border p-5 flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
              style={{ borderColor: service.selected ? '#1C2B3A' : '#E5E7EB' }}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={service.selected}
                  onChange={() => toggleService(index)}
                  className="w-5 h-5 accent-gray-900"
                />
                <div>
                  <div className="text-sm font-normal tracking-wide" style={{ color: '#1F1F1F' }}>
                    {service.name}
                  </div>
                  <div className="text-xs tracking-wide mt-1" style={{ color: '#9CA3AF' }}>
                    {service.nameEn}
                  </div>
                </div>
              </div>
              <span className="text-lg font-light" style={{ color: '#1F1F1F' }}>
                ${service.price}
              </span>
            </label>
          ))}
        </div>

        {/* Total */}
        {calculateTotal() > 0 && (
          <div className="bg-white border p-6 mb-8" style={{ borderColor: '#E5E7EB' }}>
            <div className="flex justify-between items-center">
              <span className="text-lg font-normal tracking-wide" style={{ color: '#1F1F1F' }}>Total</span>
              <span className="text-2xl font-light" style={{ color: '#1F1F1F' }}>${calculateTotal()}</span>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        {calculateTotal() > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-normal mb-4 tracking-wide" style={{ color: '#1F1F1F' }}>
              Payment Method
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('PayPal')}
                className="w-full bg-white border p-5 text-left transition-all hover:shadow-md"
                style={{ borderColor: paymentMethod === 'PayPal' ? '#1C2B3A' : '#E5E7EB' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-normal tracking-wide" style={{ color: '#1F1F1F' }}>PayPal</span>
                  {paymentMethod === 'PayPal' && <Check className="w-5 h-5" style={{ color: '#1C2B3A' }} />}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('Bank Card')}
                className="w-full bg-white border p-5 text-left transition-all hover:shadow-md"
                style={{ borderColor: paymentMethod === 'Bank Card' ? '#1C2B3A' : '#E5E7EB' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-normal tracking-wide" style={{ color: '#1F1F1F' }}>Bank Card</span>
                  {paymentMethod === 'Bank Card' && <Check className="w-5 h-5" style={{ color: '#1C2B3A' }} />}
                </div>
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <button
          onClick={handlePayment}
          disabled={submitting || !paymentMethod || calculateTotal() === 0}
          className="w-full py-4 text-white text-sm font-light transition tracking-wider disabled:opacity-50 mb-6"
          style={{ backgroundColor: '#1C2B3A' }}
        >
          {submitting ? 'Processing...' : 'Complete Payment'}
        </button>

        {/* Logo at bottom */}
        <div className="text-center pt-8">
          <button
            onClick={() => navigate('/')}
            className="text-xl font-light tracking-widest transition"
            style={{ color: '#1F1F1F' }}
          >
            YANORA
          </button>
        </div>
      </div>
    </div>
  );
}
