import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import ImageCompareSlider from './ImageCompareSlider';
import CTASection from './CTASection';
import Footer from './Footer';
import Navbar from './Navbar';

function InjectionLiftingPage() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<'botox' | 'fillers' | 'midface' | 'smas' | 'single'>('botox');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-light mb-6 leading-relaxed tracking-wide" style={{color: '#1F1F1F'}}>
            面部年轻化
          </h1>
          <p className="text-sm md:text-base font-light leading-relaxed mb-8 max-w-2xl mx-auto" style={{color: '#4B5563'}}>
            非手术方式，轻松实现年轻化效果
          </p>
          <button
            onClick={() => navigate('/booking')}
            className="px-8 py-3 text-sm md:text-base font-light tracking-wide transition-all duration-300 hover:opacity-80"
            style={{
              backgroundColor: '#1C2B3A',
              color: '#FFFFFF'
            }}
          >
            现在开始探索
          </button>

          {/* Before/After Images */}
          <div className="grid grid-cols-2 gap-6 md:gap-8 mt-12 max-w-4xl mx-auto bg-white">
            <div className="overflow-hidden bg-white">
              <img
                src="/3d931fc8d4b7d9ba6357f51f842da33d.jpg"
                alt="面部年轻化效果展示1"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="overflow-hidden bg-white">
              <img
                src="/6492d5ffd9ae5616e415a8afbe984073.jpg"
                alt="面部年轻化效果展示2"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
              服务项目
            </h2>
            <p className="text-sm md:text-base font-light" style={{color: '#6B7280'}}>
              无创年轻化，重塑自然美感
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-16">
            {[
              { key: 'botox' as const, title: '肉毒素注射', subtitle: '抚平动态皱纹' },
              { key: 'fillers' as const, title: '玻尿酸填充', subtitle: '恢复面部饱满' },
              { key: 'midface' as const, title: '面中三件套', subtitle: '综合提升改善' },
              { key: 'smas' as const, title: 'SMAS筋膜提升', subtitle: '深层紧致提升' },
              { key: 'single' as const, title: '单部位提升', subtitle: '精准局部改善' },
            ].map((service) => (
              <button
                key={service.key}
                onClick={() => setActiveService(service.key)}
                className="p-6 md:p-8 border transition-all duration-300 text-center"
                style={{
                  backgroundColor: activeService === service.key ? '#1C2B3A' : 'white',
                  borderColor: activeService === service.key ? '#1C2B3A' : '#E5E7EB',
                  color: activeService === service.key ? 'white' : '#1F1F1F'
                }}
                onMouseEnter={(e) => {
                  if (activeService !== service.key) {
                    e.currentTarget.style.borderColor = '#1C2B3A';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeService !== service.key) {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <h3 className="text-base md:text-lg font-normal mb-2">
                  {service.title}
                </h3>
                <p className="text-xs md:text-sm font-light opacity-80">
                  {service.subtitle}
                </p>
              </button>
            ))}
          </div>

          {/* Service Details */}
          <div className="bg-gray-50 p-8 md:p-12 border" style={{borderColor: '#E5E7EB'}}>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-light mb-4" style={{color: '#1F1F1F'}}>
                {activeService === 'botox' && '肉毒素注射'}
                {activeService === 'fillers' && '玻尿酸填充'}
                {activeService === 'midface' && '面中三件套提升'}
                {activeService === 'smas' && 'SMAS筋膜提升'}
                {activeService === 'single' && '单部位提升'}
              </h3>
              <p className="text-sm md:text-base mb-8 leading-relaxed" style={{color: '#6B7280'}}>
                {activeService === 'botox' && '精准减少动态皱纹，抚平额头纹、鱼尾纹、川字纹'}
                {activeService === 'fillers' && '恢复面部饱满度，填充凹陷，重塑年轻轮廓'}
                {activeService === 'midface' && '针对面中部位进行综合提升，改善苹果肌、泪沟、法令纹'}
                {activeService === 'smas' && '深层筋膜层提升，从根本改善面部松弛下垂'}
                {activeService === 'single' && '针对性改善局部问题，精准提升单一部位'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeService === 'botox' && ['即刻见效', '无恢复期', '效果自然', '安全可靠'].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white border"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <span className="mt-1 text-sm" style={{color: '#1C2B3A'}}>●</span>
                    <span className="text-sm md:text-base" style={{color: '#4B5563'}}>{feature}</span>
                  </div>
                ))}
                {activeService === 'fillers' && ['立体塑形', '持久保湿', '安全可吸收', '即时见效'].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white border"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <span className="mt-1 text-sm" style={{color: '#1C2B3A'}}>●</span>
                    <span className="text-sm md:text-base" style={{color: '#4B5563'}}>{feature}</span>
                  </div>
                ))}
                {activeService === 'midface' && ['三位一体', '全面年轻化', '效果显著', '持久自然'].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white border"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <span className="mt-1 text-sm" style={{color: '#1C2B3A'}}>●</span>
                    <span className="text-sm md:text-base" style={{color: '#4B5563'}}>{feature}</span>
                  </div>
                ))}
                {activeService === 'smas' && ['深层提升', '持久紧致', '专业技术', '效果自然'].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white border"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <span className="mt-1 text-sm" style={{color: '#1C2B3A'}}>●</span>
                    <span className="text-sm md:text-base" style={{color: '#4B5563'}}>{feature}</span>
                  </div>
                ))}
                {activeService === 'single' && ['精准定位', '个性化方案', '快速恢复', '效果明显'].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white border"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <span className="mt-1 text-sm" style={{color: '#1C2B3A'}}>●</span>
                    <span className="text-sm md:text-base" style={{color: '#4B5563'}}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white p-8 md:p-12 border mt-8" style={{borderColor: '#E5E7EB'}}>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activeService === 'botox' && [
                  '/3d931fc8d4b7d9ba6357f51f842da33d.jpg',
                  '/6492d5ffd9ae5616e415a8afbe984073.jpg',
                  '/Gemini_Generated_Image_94iwds94iwds94iw.png',
                  '/Gemini_Generated_Image_iubeodiubeodiube.png'
                ].map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border overflow-hidden"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <img
                      src={image}
                      alt={`肉毒素注射 案例 ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
                {activeService === 'fillers' && [
                  '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
                  '/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png',
                  '/3d931fc8d4b7d9ba6357f51f842da33d.jpg',
                  '/6492d5ffd9ae5616e415a8afbe984073.jpg'
                ].map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border overflow-hidden"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <img
                      src={image}
                      alt={`玻尿酸填充 案例 ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
                {activeService === 'midface' && [
                  '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
                  '/Gemini_Generated_Image_pf7kappf7kappf7k.png',
                  '/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png',
                  '/Gemini_Generated_Image_a16ssqa16ssqa16s.png'
                ].map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border overflow-hidden"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <img
                      src={image}
                      alt={`面中三件套提升 案例 ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
                {activeService === 'smas' && [
                  '/6492d5ffd9ae5616e415a8afbe984073.jpg',
                  '/3d931fc8d4b7d9ba6357f51f842da33d.jpg',
                  '/Gemini_Generated_Image_94iwds94iwds94iw.png',
                  '/Gemini_Generated_Image_iubeodiubeodiube.png'
                ].map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border overflow-hidden"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <img
                      src={image}
                      alt={`SMAS筋膜提升 案例 ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
                {activeService === 'single' && [
                  '/Gemini_Generated_Image_a16ssqa16ssqa16s.png',
                  '/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png',
                  '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
                  '/Gemini_Generated_Image_pf7kappf7kappf7k.png'
                ].map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border overflow-hidden"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <img
                      src={image}
                      alt={`单部位提升 案例 ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t" style={{borderColor: '#E5E7EB'}}>
            <h2 className="text-2xl md:text-3xl font-light mb-8 md:mb-12 text-center" style={{color: '#1F1F1F'}}>为什么选择我们</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center p-6 md:p-8 bg-white border transition-all duration-300 hover:shadow-lg" style={{borderColor: '#E5E7EB'}}>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center" style={{backgroundColor: '#F3F4F6'}}>
                  <span className="text-2xl md:text-3xl">✓</span>
                </div>
                <h3 className="text-lg md:text-xl font-normal mb-3" style={{color: '#1F1F1F'}}>无创安全</h3>
                <p className="text-sm md:text-base font-light leading-relaxed" style={{color: '#6B7280'}}>
                  无需手术，采用国际认证产品，安全可靠，风险极低
                </p>
              </div>
              <div className="text-center p-6 md:p-8 bg-white border transition-all duration-300 hover:shadow-lg" style={{borderColor: '#E5E7EB'}}>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center" style={{backgroundColor: '#F3F4F6'}}>
                  <span className="text-2xl md:text-3xl">⚡</span>
                </div>
                <h3 className="text-lg md:text-xl font-normal mb-3" style={{color: '#1F1F1F'}}>即刻见效</h3>
                <p className="text-sm md:text-base font-light leading-relaxed" style={{color: '#6B7280'}}>
                  治疗后即可看到初步效果，无需漫长等待期
                </p>
              </div>
              <div className="text-center p-6 md:p-8 bg-white border transition-all duration-300 hover:shadow-lg" style={{borderColor: '#E5E7EB'}}>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center" style={{backgroundColor: '#F3F4F6'}}>
                  <span className="text-2xl md:text-3xl">★</span>
                </div>
                <h3 className="text-lg md:text-xl font-normal mb-3" style={{color: '#1F1F1F'}}>自然持久</h3>
                <p className="text-sm md:text-base font-light leading-relaxed" style={{color: '#6B7280'}}>
                  效果自然不僵硬，持续时间长，塑造真实美感
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
              真实案例
            </h2>
            <p className="text-sm md:text-base font-light" style={{color: '#6B7280'}}>
              见证专业技术带来的美丽蜕变
            </p>
          </div>

          <div className="space-y-16">
            {[
              {
                id: 1,
                title: '肉毒素除皱案例',
                category: '面部年轻化',
                beforeImage: '/3d931fc8d4b7d9ba6357f51f842da33d.jpg',
                afterImage: '/6492d5ffd9ae5616e415a8afbe984073.jpg',
                description: '通过精准肉毒素注射，有效减少额头纹和鱼尾纹，面部整体更加年轻自然。'
              },
              {
                id: 2,
                title: '玻尿酸填充案例',
                category: '面部塑形',
                beforeImage: '/6492d5ffd9ae5616e415a8afbe984073.jpg',
                afterImage: '/3d931fc8d4b7d9ba6357f51f842da33d.jpg',
                description: '采用玻尿酸填充技术，恢复面部饱满度，改善苹果肌和泪沟，重塑年轻轮廓。'
              }
            ].map((caseStudy, index) => (
              <div key={caseStudy.id} className="bg-white border" style={{borderColor: '#E5E7EB'}}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Compare Slider */}
                  <div className="p-6 md:p-8 min-h-[500px] md:min-h-[600px] flex items-center">
                    <ImageCompareSlider
                      beforeImage={caseStudy.beforeImage}
                      afterImage={caseStudy.afterImage}
                      altBefore={`${caseStudy.title} - 术前`}
                      altAfter={`${caseStudy.title} - 术后`}
                    />
                  </div>

                  {/* Case Details */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <span
                        className="inline-block px-4 py-1 text-xs font-light tracking-wider"
                        style={{backgroundColor: '#1C2B3A', color: 'white'}}
                      >
                        {caseStudy.category}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-light mb-4" style={{color: '#1F1F1F'}}>
                      案例 {String(index + 1).padStart(2, '0')}
                    </h3>
                    <h4 className="text-lg md:text-xl font-normal mb-4" style={{color: '#1F1F1F'}}>
                      {caseStudy.title}
                    </h4>
                    <p className="text-sm md:text-base leading-relaxed" style={{color: '#6B7280'}}>
                      {caseStudy.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <Footer />
    </div>
  );
}

export default InjectionLiftingPage;
