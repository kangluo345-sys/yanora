import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ImageCompareSlider from './ImageCompareSlider';
import CTASection from './CTASection';
import ServiceCasesSection from './ServiceCasesSection';

function FacialContourPage() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<'nose' | 'eyes' | 'lips' | 'eyebrows' | 'ears'>('nose');

  const noseTypes = [
    { id: 1, name: '直鼻', description: '气质干练', image: '🖼️' },
    { id: 2, name: '微翘鼻', description: '柔和甜美', image: '🖼️' },
    { id: 3, name: '盒鼻', description: '混血立体', image: '🖼️' },
    { id: 4, name: '水滴鼻', description: '自然圆润', image: '🖼️' },
  ];

  const eyeTypes = [
    { id: 1, name: '开扇双眼皮', description: '妩媚动人', image: '🖼️' },
    { id: 2, name: '平行双眼皮', description: '清纯自然', image: '🖼️' },
    { id: 3, name: '新月型', description: '甜美温柔', image: '🖼️' },
  ];

  const lipTypes = [
    { id: 1, name: 'M唇', description: '性感迷人', image: '🖼️' },
    { id: 2, name: '微笑唇', description: '亲和友善', image: '🖼️' },
    { id: 3, name: '饱满丰唇', description: '丰盈立体', image: '🖼️' },
  ];

  const eyebrowTypes = [
    { id: 1, name: '欧式挑眉', description: '高级精致', image: '🖼️' },
    { id: 2, name: '平直眉', description: '温柔大气', image: '🖼️' },
    { id: 3, name: '弯月眉', description: '柔和优雅', image: '🖼️' },
  ];

  const earTypes = [
    { id: 1, name: '贴发耳', description: '精灵耳矫正', image: '🖼️' },
    { id: 2, name: '正常耳廓', description: '杯状耳矫正', image: '🖼️' },
  ];

  const getCurrentTypes = () => {
    switch (activeFeature) {
      case 'nose': return noseTypes;
      case 'eyes': return eyeTypes;
      case 'lips': return lipTypes;
      case 'eyebrows': return eyebrowTypes;
      case 'ears': return earTypes;
      default: return noseTypes;
    }
  };

  const cases = [
    {
      id: 1,
      parts: '颧骨 + 下巴',
      description: '利用颧骨内推和颏成型术式改善面部轮廓流畅度，打造柔和的面部线条',
      before: '🖼️',
      after: '🖼️'
    },
    {
      id: 2,
      parts: '鼻子 + 眼睛',
      description: '综合鼻综合和双眼皮手术，提升五官精致度与面部协调性',
      before: '🖼️',
      after: '🖼️'
    },
    {
      id: 3,
      parts: '下颌线',
      description: '通过下颌角截骨改善方形脸，塑造流畅的下颌线条',
      before: '🖼️',
      after: '🖼️'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section - Core Value Statement */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-white md:bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-light mb-6 leading-relaxed tracking-wide" style={{color: '#1F1F1F'}}>
            面部轮廓重塑
          </h1>
          <p className="text-sm md:text-base font-light leading-relaxed mb-8 max-w-2xl mx-auto" style={{color: '#4B5563'}}>
            我们根据不同人种的面部结构和骨架特征，<br />结合个人审美偏好，科学地提供个性化整形解决方案。
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
        </div>
      </section>

      {/* Facial Contour Section - Bone & Soft Tissue */}
      <section id="facial-contour-section" className="py-20 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex justify-center mb-16">
              <div className="w-full md:w-3/4 lg:w-3/5 relative bg-white p-8">
                <img
                  src="/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png"
                  alt="面部轮廓示例"
                  className="w-full h-auto object-contain"
                  style={{
                    filter: 'brightness(1.1)',
                    mixBlendMode: 'multiply'
                  }}
                />

                {/* 额头标注 - 左侧 */}
                <div className="absolute" style={{top: '18%', left: '10%'}}>
                  <div className="relative">
                    {/* 点 - 桌面端显示 */}
                    <div className="hidden md:block absolute w-2.5 h-2.5 bg-white border-2 rounded-full" style={{borderColor: '#1C2B3A', left: '-5px', top: '-5px'}}></div>
                    {/* 线条 - 桌面端显示 */}
                    <div className="hidden md:block absolute w-20 h-0.5" style={{backgroundColor: '#1C2B3A', top: '-1px', right: '0'}}></div>
                    {/* 浮动文字框 - 桌面端 */}
                    <div
                      className="hidden md:block absolute px-4 py-2 bg-white border shadow-lg"
                      style={{
                        borderColor: '#1C2B3A',
                        right: '84px',
                        top: '-16px',
                        minWidth: '80px',
                        animation: 'floatUpDown 3s ease-in-out infinite'
                      }}
                    >
                      <p className="text-sm font-light whitespace-nowrap" style={{color: '#1F1F1F'}}>额头</p>
                    </div>
                    {/* 移动端标签 */}
                    <div
                      className="md:hidden px-2 py-1 bg-white border shadow-lg"
                      style={{
                        borderColor: '#1C2B3A',
                        transform: 'translate(-100%, -50%)',
                        animation: 'floatUpDown 3s ease-in-out infinite'
                      }}
                    >
                      <p className="text-xs font-light whitespace-nowrap" style={{color: '#1F1F1F'}}>额头</p>
                    </div>
                  </div>
                </div>

                {/* 颧骨标注 - 右侧 */}
                <div className="absolute" style={{top: '31%', right: '8%'}}>
                  <div className="relative">
                    {/* 点 - 桌面端显示 */}
                    <div className="hidden md:block absolute w-2.5 h-2.5 bg-white border-2 rounded-full" style={{borderColor: '#1C2B3A', right: '-5px', top: '-5px'}}></div>
                    {/* 线条 - 桌面端显示 */}
                    <div className="hidden md:block absolute w-20 h-0.5" style={{backgroundColor: '#1C2B3A', top: '-1px', left: '0'}}></div>
                    {/* 浮动文字框 - 桌面端 */}
                    <div
                      className="hidden md:block absolute px-4 py-2 bg-white border shadow-lg"
                      style={{
                        borderColor: '#1C2B3A',
                        left: '84px',
                        top: '-16px',
                        minWidth: '80px',
                        animation: 'floatUpDown 3s ease-in-out infinite 0.5s'
                      }}
                    >
                      <p className="text-sm font-light whitespace-nowrap" style={{color: '#1F1F1F'}}>颧骨</p>
                    </div>
                    {/* 移动端标签 */}
                    <div
                      className="md:hidden px-2 py-1 bg-white border shadow-lg"
                      style={{
                        borderColor: '#1C2B3A',
                        transform: 'translate(0%, -50%)',
                        animation: 'floatUpDown 3s ease-in-out infinite 0.5s'
                      }}
                    >
                      <p className="text-xs font-light whitespace-nowrap" style={{color: '#1F1F1F'}}>颧骨</p>
                    </div>
                  </div>
                </div>

                {/* 下巴标注 - 左侧 */}
                <div className="absolute" style={{top: '56%', left: '9%'}}>
                  <div className="relative">
                    {/* 点 - 桌面端显示 */}
                    <div className="hidden md:block absolute w-2.5 h-2.5 bg-white border-2 rounded-full" style={{borderColor: '#1C2B3A', left: '-5px', top: '-5px'}}></div>
                    {/* 线条 - 桌面端显示 */}
                    <div className="hidden md:block absolute w-20 h-0.5" style={{backgroundColor: '#1C2B3A', top: '-1px', right: '0'}}></div>
                    {/* 浮动文字框 - 桌面端 */}
                    <div
                      className="hidden md:block absolute px-4 py-2 bg-white border shadow-lg"
                      style={{
                        borderColor: '#1C2B3A',
                        right: '84px',
                        top: '-16px',
                        minWidth: '90px',
                        animation: 'floatUpDown 3s ease-in-out infinite 1s'
                      }}
                    >
                      <p className="text-sm font-light whitespace-nowrap" style={{color: '#1F1F1F'}}>下巴</p>
                    </div>
                    {/* 移动端标签 */}
                    <div
                      className="md:hidden px-2 py-1 bg-white border shadow-lg"
                      style={{
                        borderColor: '#1C2B3A',
                        transform: 'translate(-100%, -50%)',
                        animation: 'floatUpDown 3s ease-in-out infinite 1s'
                      }}
                    >
                      <p className="text-xs font-light whitespace-nowrap" style={{color: '#1F1F1F'}}>下巴</p>
                    </div>
                  </div>
                </div>

                {/* 下颌线标注 - 右侧 */}
                <div className="absolute" style={{top: '50%', right: '8%'}}>
                  <div className="relative">
                    {/* 点 - 桌面端显示 */}
                    <div className="hidden md:block absolute w-2.5 h-2.5 bg-white border-2 rounded-full" style={{borderColor: '#1C2B3A', right: '-5px', top: '-5px'}}></div>
                    {/* 线条 - 桌面端显示 */}
                    <div className="hidden md:block absolute w-20 h-0.5" style={{backgroundColor: '#1C2B3A', top: '-1px', left: '0'}}></div>
                    {/* 浮动文字框 - 桌面端 */}
                    <div
                      className="hidden md:block absolute px-4 py-2 bg-white border shadow-lg"
                      style={{
                        borderColor: '#1C2B3A',
                        left: '84px',
                        top: '-16px',
                        minWidth: '80px',
                        animation: 'floatUpDown 3s ease-in-out infinite 1.5s'
                      }}
                    >
                      <p className="text-sm font-light whitespace-nowrap" style={{color: '#1F1F1F'}}>下颌线</p>
                    </div>
                    {/* 移动端标签 */}
                    <div
                      className="md:hidden px-2 py-1 bg-white border shadow-lg"
                      style={{
                        borderColor: '#1C2B3A',
                        transform: 'translate(0%, -50%)',
                        animation: 'floatUpDown 3s ease-in-out infinite 1.5s'
                      }}
                    >
                      <p className="text-xs font-light whitespace-nowrap" style={{color: '#1F1F1F'}}>下颌线</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: '□', title: '额头/眉骨', subtitle: '丰额头、眉弓抬高', image: null },
              { icon: '□', title: '颧骨', subtitle: '颧骨内推/降低', image: '/3ba84e3181bb4794304515b7dc9aad6f.jpg' },
              { icon: '□', title: '下颌线', subtitle: '下颌角截骨、去咬肌', image: null },
              { icon: '□', title: '下巴', subtitle: '颏成型、假体隆颏', image: null },
            ].map((item, index) => (
              <div
                key={index}
                className="border transition-all duration-300 overflow-hidden"
                style={{borderColor: '#E5E7EB'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1C2B3A';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {item.image ? (
                  <div className="w-full aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center text-5xl" style={{color: '#1C2B3A'}}>
                    {item.icon}
                  </div>
                )}
                <div className="text-center p-6 md:p-8">
                  <h3 className="text-base md:text-lg font-normal mb-2" style={{color: '#1F1F1F'}}>
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm font-light" style={{color: '#6B7280'}}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facial Features Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white md:bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
              五官精雕板块
            </h2>
            <p className="text-sm md:text-base font-light" style={{color: '#6B7280'}}>
              聚焦于五官局部的精细化调整
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex flex-wrap gap-3 md:gap-4 mb-12 justify-center">
            {[
              { key: 'nose' as const, label: '鼻子' },
              { key: 'eyes' as const, label: '眼睛' },
              { key: 'lips' as const, label: '嘴巴' },
              { key: 'eyebrows' as const, label: '眉毛' },
              { key: 'ears' as const, label: '耳朵' },
            ].map((feature) => (
              <button
                key={feature.key}
                onClick={() => setActiveFeature(feature.key)}
                className="px-8 md:px-10 py-3 md:py-4 text-sm md:text-base transition-all duration-300 border"
                style={{
                  backgroundColor: activeFeature === feature.key ? '#1C2B3A' : 'white',
                  color: activeFeature === feature.key ? 'white' : '#6B7280',
                  borderColor: activeFeature === feature.key ? '#1C2B3A' : '#D1D5DB',
                }}
                onMouseEnter={(e) => {
                  if (activeFeature !== feature.key) {
                    e.currentTarget.style.borderColor = '#1C2B3A';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFeature !== feature.key) {
                    e.currentTarget.style.borderColor = '#D1D5DB';
                  }
                }}
              >
                {feature.label}
              </button>
            ))}
          </div>

          {/* Feature Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getCurrentTypes().map((type) => (
              <div
                key={type.id}
                className="bg-white border transition-all duration-300"
                style={{borderColor: '#E5E7EB'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="aspect-square flex items-center justify-center text-6xl"
                  style={{backgroundColor: '#F9FAFB'}}
                >
                  {type.image}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-base md:text-lg font-normal mb-2" style={{color: '#1F1F1F'}}>
                    {type.name}
                  </h3>
                  <p className="text-xs md:text-sm font-light" style={{color: '#6B7280'}}>
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceCasesSection serviceType="facial" />

      <CTASection />

      <Footer />
    </div>
  );
}

export default FacialContourPage;
