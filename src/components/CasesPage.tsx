import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Navbar from './Navbar';
import Footer from './Footer';
import ImageCompareSlider from './ImageCompareSlider';
import CTASection from './CTASection';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  before_image_url: string;
  after_image_url: string;
  duration: string;
  features: string[];
  created_at: string;
}

function CasesPage() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const categories = ['全部', '面部轮廓', '身体塑形', '注射提升', '植发', '牙齿美容'];

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('Error loading cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCases = selectedCategory === '全部'
    ? cases
    : cases.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
              真实案例展示
            </h1>
            <p className="text-base md:text-lg tracking-wide" style={{color: '#6B7280'}}>
              见证每一次美丽蜕变
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-2 text-sm transition-all duration-300"
                style={{
                  color: selectedCategory === category ? 'white' : '#6B7280',
                  backgroundColor: selectedCategory === category ? '#1C2B3A' : 'transparent',
                  border: selectedCategory === category ? 'none' : '1px solid #D1D5DB'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = '#1C2B3A';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = '#D1D5DB';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">加载中...</p>
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg mb-8" style={{color: '#6B7280'}}>暂无案例</p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 text-white text-sm transition"
                style={{backgroundColor: '#1C2B3A'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#101D29'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1C2B3A'}
              >
                返回首页
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
                  style={{border: '1px solid #E5E7EB'}}
                >
                  <div className="aspect-[4/3]">
                    <ImageCompareSlider
                      beforeLabel="术前"
                      afterLabel="术后"
                      initialPosition={50}
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-normal" style={{color: '#1F1F1F'}}>
                        {caseStudy.title}
                      </h3>
                      <span
                        className="text-xs px-3 py-1"
                        style={{
                          backgroundColor: '#F3F4F6',
                          color: '#6B7280'
                        }}
                      >
                        {caseStudy.category}
                      </span>
                    </div>

                    <p className="text-sm mb-4 leading-relaxed" style={{color: '#6B7280'}}>
                      {caseStudy.description}
                    </p>

                    {caseStudy.duration && (
                      <div className="mb-4 pb-4 border-b" style={{borderColor: '#E5E7EB'}}>
                        <span className="text-xs" style={{color: '#6B7280'}}>
                          恢复时间：{caseStudy.duration}
                        </span>
                      </div>
                    )}

                    {caseStudy.features && caseStudy.features.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium mb-2" style={{color: '#1F1F1F'}}>
                          主要改善：
                        </p>
                        {caseStudy.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-xs mt-0.5" style={{color: '#1C2B3A'}}>•</span>
                            <span className="text-xs leading-relaxed" style={{color: '#6B7280'}}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />

      <Footer />
    </div>
  );
}

export default CasesPage;
