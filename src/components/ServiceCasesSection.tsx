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
      <section className="py-20 md:py-28 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-base" style={{color: '#6B7280'}}>{language === 'zh' ? '加载中...' : 'Loading...'}</p>
          </div>
        </div>
      </section>
    );
  }

  if (cases.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
            {displayTitle}
          </h2>
          <p className="text-sm md:text-base font-light" style={{color: '#6B7280'}}>
            {language === 'zh' ? '见证专业技术带来的美丽蜕变' : 'Witness the beautiful transformation brought by professional technology'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white shadow-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-0">
                <div className="relative aspect-[3/4]">
                  <img
                    src={caseItem.before_image_url}
                    alt={`${language === 'zh' ? caseItem.title : caseItem.title_en} - ${language === 'zh' ? '术前' : 'Before'}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2 text-sm md:text-base font-light">
                    {language === 'zh' ? '术前' : 'Before'}
                  </div>
                </div>
                <div className="relative aspect-[3/4]">
                  <img
                    src={caseItem.after_image_url}
                    alt={`${language === 'zh' ? caseItem.title : caseItem.title_en} - ${language === 'zh' ? '术后' : 'After'}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2 text-sm md:text-base font-light">
                    {language === 'zh' ? '术后' : 'After'}
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6 lg:p-8">
                <h3 className="text-base md:text-lg lg:text-xl font-light mb-2 md:mb-3" style={{color: '#1F1F1F'}}>
                  {language === 'zh' ? caseItem.title : caseItem.title_en}
                </h3>
                {(caseItem.description || caseItem.description_en) && (
                  <p className="text-xs md:text-sm lg:text-base leading-relaxed" style={{color: '#6B7280'}}>
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
