import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  image1_url: string;
  image2_url: string;
  image3_url: string;
  message: string;
  customer_name: string;
  display_order: number;
}

function MobileTestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (data) {
      setTestimonials(data);
    }
    setLoading(false);
  };
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }

    if (touchStart - touchEnd < -75) {
      handlePrevious();
    }
  };

  if (loading) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-sm" style={{color: '#9CA3AF'}}>加载中...</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-sm" style={{color: '#9CA3AF'}}>暂无客户评价</p>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full">
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="py-8 px-4 md:px-12">
          <div className="flex gap-4 md:gap-8 justify-center items-start mb-6 md:mb-10">
            <div className="bg-white shadow-xl md:hidden" style={{ width: '110px', aspectRatio: '3/4' }}>
              {currentTestimonial.image1_url ? (
                <img src={currentTestimonial.image1_url} alt="照片 1" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#E8F4EA'}}>
                  <span className="text-xs" style={{color: '#6B7280'}}>照片 1</span>
                </div>
              )}
            </div>

            <div className="bg-white shadow-xl md:hidden" style={{ width: '110px', aspectRatio: '3/4' }}>
              {currentTestimonial.image2_url ? (
                <img src={currentTestimonial.image2_url} alt="照片 2" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#B9CBDC'}}>
                  <span className="text-xs text-gray-500">照片 2</span>
                </div>
              )}
            </div>

            <div className="bg-white shadow-xl md:hidden" style={{ width: '110px', aspectRatio: '3/4' }}>
              {currentTestimonial.image3_url ? (
                <img src={currentTestimonial.image3_url} alt="照片 3" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#A0A7B5'}}>
                  <span className="text-xs text-white">照片 3</span>
                </div>
              )}
            </div>

            <div className="hidden md:block bg-white shadow-xl" style={{ width: '180px', aspectRatio: '3/4' }}>
              {currentTestimonial.image1_url ? (
                <img src={currentTestimonial.image1_url} alt="照片 1" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#E8F4EA'}}>
                  <span className="text-base" style={{color: '#6B7280'}}>照片 1</span>
                </div>
              )}
            </div>

            <div className="hidden md:block bg-white shadow-xl" style={{ width: '180px', aspectRatio: '3/4' }}>
              {currentTestimonial.image2_url ? (
                <img src={currentTestimonial.image2_url} alt="照片 2" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#B9CBDC'}}>
                  <span className="text-base text-gray-500">照片 2</span>
                </div>
              )}
            </div>

            <div className="hidden md:block bg-white shadow-xl" style={{ width: '180px', aspectRatio: '3/4' }}>
              {currentTestimonial.image3_url ? (
                <img src={currentTestimonial.image3_url} alt="照片 3" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#A0A7B5'}}>
                  <span className="text-base text-white">照片 3</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-center max-w-lg md:max-w-2xl mx-auto">
            <p className="text-sm md:text-base font-light leading-relaxed mb-4 md:mb-6" style={{color: '#4B5563'}}>
              "{currentTestimonial.message}"
            </p>
            <p className="text-xs md:text-sm font-normal" style={{color: '#1F1F1F'}}>
              — {currentTestimonial.customer_name}
            </p>
          </div>
        </div>

        <button
          onClick={handlePrevious}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white shadow-lg transition-opacity opacity-70 hover:opacity-100"
          style={{color: '#1C2B3A'}}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white shadow-lg transition-opacity opacity-70 hover:opacity-100"
          style={{color: '#1C2B3A'}}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all"
            style={{
              backgroundColor: currentIndex === index ? '#1C2B3A' : '#D1D5DB'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MobileTestimonialCarousel;
