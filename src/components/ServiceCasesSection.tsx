import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import ImageCompareSlider from './ImageCompareSlider';

interface CaseItem {
  id: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  before_image_url: string;
  after_image_url: string;
}

interface ServiceCasesSectionProps {
  serviceType: 'facial' | 'dental' | 'injection' | 'body' | 'hair';
  title?: string;
  title_en?: string;
}

export default function ServiceCasesSection({ serviceType, title, title_en }: ServiceCasesSectionProps) {
  const { language } = useLanguage();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultTitles = {
    facial: { zh: '面部轮廓真实案例', en: 'Facial Contour Real Cases' },
    dental: { zh: '齿科真实案例', en: 'Dental Real Cases' },
    injection: { zh: '注射提升真实案例', en: 'Injection Lifting Real Cases' },
    body: { zh: '身体塑形真实案例', en: 'Body Sculpting Real Cases' },
    hair: { zh: '毛发移植真实案例', en: 'Hair Transplant Real Cases' },
  };

  const displayTitle = language === 'zh'
    ? (title || defaultTitles[serviceType].zh)
    : (title_en || defaultTitles[serviceType].en);

  useEffect(() => {
    fetchCases();
  }, [serviceType]);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const columnName = `show_in_${serviceType}`;

      const { data, error } = await supabase
        .from('detailed_cases')
        .select('*')
        .eq(columnName, true)
        .eq('is_published', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">{language === 'zh' ? '加载中...' : 'Loading...'}</p>
          </div>
        </div>
      </section>
    );
  }

  if (cases.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-900">
            {displayTitle}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] relative">
                <ImageCompareSlider
                  beforeImage={caseItem.before_image_url}
                  afterImage={caseItem.after_image_url}
                  beforeLabel={language === 'zh' ? '术前' : 'Before'}
                  afterLabel={language === 'zh' ? '术后' : 'After'}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {language === 'zh' ? caseItem.title : caseItem.title_en}
                </h3>
                {(caseItem.description || caseItem.description_en) && (
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {language === 'zh' ? caseItem.description : caseItem.description_en}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
