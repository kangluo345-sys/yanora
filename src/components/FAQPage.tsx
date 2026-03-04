import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { supabase } from '../lib/supabase';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_active: boolean;
}

export default function FAQPage() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setFaqData(data || []);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['全部', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs = selectedCategory === '全部'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg" style={{color: '#6B7280'}}>加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
            常见问题
          </h1>
          <p className="text-base md:text-lg tracking-wide" style={{color: '#6B7280'}}>
            解答您关于整形手术的疑问
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-12 py-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 text-sm md:text-base transition-all ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-xs md:text-sm font-medium mb-1 block" style={{color: '#6B7280'}}>
                      {faq.category}
                    </span>
                    <h3 className="text-base md:text-lg font-normal" style={{color: '#1F1F1F'}}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6" style={{color: '#1F1F1F'}} />
                    ) : (
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6" style={{color: '#6B7280'}} />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-5 md:pb-6 pt-2">
                    <p className="text-sm md:text-base leading-relaxed" style={{color: '#6B7280'}}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey CTA */}
      <section className="py-12 md:py-24 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="p-8 md:p-16 relative overflow-hidden" style={{backgroundColor: '#1C2B3A'}}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-light text-white mb-8 md:mb-12 tracking-wide">今天开始你的蜕变之旅</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
                {[
                  '点击回答问题',
                  '上传图片',
                  '为你定制专属方案',
                  '为你开启旅途'
                ].map((step, index) => (
                  <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm p-6 md:p-8 text-white">
                    <div className="text-xl md:text-2xl font-light mb-2 md:mb-3">{index + 1}</div>
                    <div className="text-xs md:text-sm font-light tracking-wide">{step}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/booking')}
                  className="px-8 md:px-10 py-2.5 md:py-3 bg-white text-xs md:text-sm font-light transition tracking-wider"
                  style={{color: '#1C2B3A'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                >
                  开启你的蜕变之旅
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
