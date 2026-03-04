import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from './Navbar';
import Footer from './Footer';
import ImageCompareSlider from './ImageCompareSlider';
import CTASection from './CTASection';

interface DetailedCase {
  id: string;
  title: string;
  title_en: string;
  category: string;
  description: string;
  description_en: string;
  before_image_url: string;
  after_image_url: string;
  created_at: string;
}

function CasesPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [cases, setCases] = useState<DetailedCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label_zh: '全部', label_en: 'All' },
    { value: 'facial', label_zh: '面部轮廓', label_en: 'Facial Contour' },
    { value: 'dental', label_zh: '齿科', label_en: 'Dental' },
    { value: 'injection', label_zh: '注射提升', label_en: 'Injection Lifting' },
    { value: 'body', label_zh: '身体塑形', label_en: 'Body Sculpting' },
    { value: 'hair', label_zh: '毛发移植', label_en: 'Hair Transplant' },
  ];

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const { data, error } = await supabase
        .from('detailed_cases')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('Error loading cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCases = selectedCategory === 'all'
    ? cases
    : cases.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
              {language === 'zh' ? '真实案例展示' : 'Real Cases'}
            </h1>
            <p className="text-base md:text-lg tracking-wide" style={{color: '#6B7280'}}>
              {language === 'zh' ? '见证每一次美丽蜕变' : 'Witness Every Beautiful Transformation'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className="px-6 py-2 text-sm transition-all duration-300"
                style={{
                  color: selectedCategory === category.value ? 'white' : '#6B7280',
                  backgroundColor: selectedCategory === category.value ? '#1C2B3A' : 'transparent',
                  border: selectedCategory === category.value ? 'none' : '1px solid #D1D5DB'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.value) {
                    e.currentTarget.style.borderColor = '#1C2B3A';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.value) {
                    e.currentTarget.style.borderColor = '#D1D5DB';
                  }
                }}
              >
                {language === 'zh' ? category.label_zh : category.label_en}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">{language === 'zh' ? '加载中...' : 'Loading...'}</p>
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg mb-8" style={{color: '#6B7280'}}>
                {language === 'zh' ? '暂无案例' : 'No cases available'}
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 text-white text-sm transition"
                style={{backgroundColor: '#1C2B3A'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#101D29'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1C2B3A'}
              >
                {language === 'zh' ? '返回首页' : 'Back to Home'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[4/3] relative">
                    <ImageCompareSlider
                      beforeImage={caseItem.before_image_url}
                      afterImage={caseItem.after_image_url}
                      beforeLabel={language === 'zh' ? '术前' : 'Before'}
                      afterLabel={language === 'zh' ? '术后' : 'After'}
                      initialPosition={50}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {language === 'zh' ? caseItem.title : caseItem.title_en}
                    </h3>
                    {((language === 'zh' ? caseItem.description : caseItem.description_en)) && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {language === 'zh' ? caseItem.description : caseItem.description_en}
                      </p>
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
