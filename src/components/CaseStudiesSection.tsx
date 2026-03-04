import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface CaseStudy {
  id: string;
  title: string;
  before_image_url: string;
  after_image_url: string;
  category: string;
}

function CaseStudiesSection() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('id, title, before_image_url, after_image_url, category')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(8);

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-8 md:py-16 px-2 md:px-6 bg-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <p className="text-sm" style={{color: '#6B7280'}}>加载中...</p>
        </div>
      </section>
    );
  }

  if (cases.length === 0) {
    return (
      <section className="py-8 md:py-16 px-2 md:px-6 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-xl md:text-3xl font-light text-center mb-3 md:mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
            他们通过 YANOR A 找回的自信
          </h2>
          <div className="w-16 md:w-20 h-px mx-auto mb-6 md:mb-12" style={{backgroundColor: '#A0A7B5'}}></div>

          <div className="space-y-2 md:space-y-3">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3">
                {[1, 2].map((col) => (
                  <div key={col} className="md:col-span-2 bg-white overflow-hidden border-4 border-blue-500">
                    <div className="grid grid-cols-2 gap-0">
                      <div className="aspect-[4/5] flex items-center justify-center relative border-2 border-red-500" style={{backgroundColor: '#B9CBDC'}}>
                        <span className="text-gray-400 text-xs">对比 A-{row * 2 - 2 + col}</span>
                        <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 text-xs text-gray-500">
                          对比 A-{row}-{col}
                        </div>
                      </div>
                      <div className="aspect-[4/5] flex items-center justify-center relative border-2 border-red-500" style={{backgroundColor: '#B9CBDC'}}>
                        <span className="text-gray-400 text-xs">对比 B-{row * 2 - 2 + col}</span>
                        <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 text-xs text-gray-500">
                          对比 B-{row}-{col}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const rows = [];
  for (let i = 0; i < cases.length; i += 2) {
    rows.push(cases.slice(i, i + 2));
  }

  return (
    <section className="py-8 md:py-16 px-2 md:px-6 bg-white">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-xl md:text-3xl font-light text-center mb-3 md:mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
          他们通过 YANOR A 找回的自信
        </h2>
        <div className="w-16 md:w-20 h-px mx-auto mb-6 md:mb-12" style={{backgroundColor: '#A0A7B5'}}></div>

        <div className="space-y-2 md:space-y-3">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3">
              {row.map((caseStudy) => (
                <div key={caseStudy.id} className="md:col-span-2 border-4 border-blue-500">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="aspect-[4/5] overflow-hidden relative group border-2 border-red-500">
                      <img
                        src={caseStudy.before_image_url}
                        alt={`${caseStudy.title} - 术前`}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 bg-black bg-opacity-50 px-2 py-1">
                        <span className="text-xs text-white">术前</span>
                      </div>
                    </div>
                    <div className="aspect-[4/5] overflow-hidden relative group border-2 border-red-500">
                      <img
                        src={caseStudy.after_image_url}
                        alt={`${caseStudy.title} - 术后`}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 bg-black bg-opacity-50 px-2 py-1">
                        <span className="text-xs text-white">术后</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 md:p-4 bg-white border-t" style={{borderColor: '#E5E7EB'}}>
                    <h3 className="text-xs md:text-sm font-normal" style={{color: '#1F1F1F'}}>{caseStudy.title}</h3>
                    <p className="text-xs mt-1" style={{color: '#6B7280'}}>{caseStudy.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;
