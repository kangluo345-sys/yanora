import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import ImageCompareSlider from './ImageCompareSlider';
import CTASection from './CTASection';
import Footer from './Footer';
import Navbar from './Navbar';

function BodySculptingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeService, setActiveService] = useState<'waist' | 'breast' | 'liposuction' | 'abdomen' | 'buttocks' | 'thigh'>('waist');

  const images = [
    '/Gemini_Generated_Image_94iwds94iwds94iw.png',
    '/Gemini_Generated_Image_iubeodiubeodiube.png',
    '/Gemini_Generated_Image_u1lac1u1lac1u1la.png'
  ];

  const services = [
    { key: 'waist' as const, title: '直角腰', subtitle: '打造完美腰线' },
    { key: 'breast' as const, title: '隆胸', subtitle: '自然饱满胸型' },
    { key: 'liposuction' as const, title: '吸脂塑形', subtitle: '精准去除脂肪' },
    { key: 'abdomen' as const, title: '腹部塑形', subtitle: '平坦紧致腹部' },
    { key: 'buttocks' as const, title: '臀部提升', subtitle: '塑造完美臀型' },
    { key: 'thigh' as const, title: '大腿塑形', subtitle: '改善腿部线条' },
  ];

  const serviceDetails = {
    waist: {
      title: '直角腰塑形',
      description: '通过精准吸脂与肌肉塑形，打造90度完美腰臀比例',
      techniques: [
        '腰部360度环形吸脂',
        '后腰凹陷塑造',
        '侧腰线条雕刻',
        '腰臀比例黄金设计'
      ],
      images: [
        '/Gemini_Generated_Image_94iwds94iwds94iw.png',
        '/Gemini_Generated_Image_iubeodiubeodiube.png',
        '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
        '/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png'
      ]
    },
    breast: {
      title: '隆胸手术',
      description: '采用多种技术方案，量身定制自然饱满的胸型',
      techniques: [
        '假体隆胸 - 硅胶/盐水',
        '自体脂肪隆胸',
        '复合隆胸技术',
        '个性化形态设计'
      ],
      images: [
        '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
        '/Gemini_Generated_Image_pf7kappf7kappf7k.png',
        '/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png',
        '/Gemini_Generated_Image_a16ssqa16ssqa16s.png'
      ]
    },
    liposuction: {
      title: '吸脂塑形',
      description: '精准去除顽固脂肪，雕刻理想身材曲线',
      techniques: [
        '超声波吸脂',
        '水动力吸脂',
        '激光溶脂',
        '多部位综合塑形'
      ],
      images: [
        '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
        '/Gemini_Generated_Image_94iwds94iwds94iw.png',
        '/Gemini_Generated_Image_iubeodiubeodiube.png',
        '/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png'
      ]
    },
    abdomen: {
      title: '腹部塑形',
      description: '打造平坦紧致的腹部线条',
      techniques: [
        '腹部吸脂',
        '腹壁成型',
        '马甲线雕刻',
        '腹部皮肤收紧'
      ],
      images: [
        '/Gemini_Generated_Image_pf7kappf7kappf7k.png',
        '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
        '/Gemini_Generated_Image_a16ssqa16ssqa16s.png',
        '/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png'
      ]
    },
    buttocks: {
      title: '臀部提升',
      description: '塑造挺翘饱满的完美臀型',
      techniques: [
        '臀部填充',
        '臀部提升',
        '臀部吸脂',
        'S曲线塑造'
      ],
      images: [
        '/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png',
        '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
        '/Gemini_Generated_Image_94iwds94iwds94iw.png',
        '/Gemini_Generated_Image_iubeodiubeodiube.png'
      ]
    },
    thigh: {
      title: '大腿塑形',
      description: '改善腿部线条，塑造纤细修长美腿',
      techniques: [
        '大腿吸脂',
        '膝盖周围塑形',
        '小腿肌肉缩小',
        '腿部线条雕刻'
      ],
      images: [
        '/Gemini_Generated_Image_a16ssqa16ssqa16s.png',
        '/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png',
        '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
        '/Gemini_Generated_Image_pf7kappf7kappf7k.png'
      ]
    }
  };

  const caseStudies = [
    {
      id: 1,
      title: '直角腰塑形案例',
      category: '腰部塑形',
      beforeImage: '/Gemini_Generated_Image_94iwds94iwds94iw.png',
      afterImage: '/Gemini_Generated_Image_iubeodiubeodiube.png',
      description: '通过精准吸脂技术，成功打造完美直角腰线，腰臀比例达到理想状态。'
    },
    {
      id: 2,
      title: '隆胸手术案例',
      category: '胸部塑形',
      beforeImage: '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
      afterImage: '/Gemini_Generated_Image_94iwds94iwds94iw.png',
      description: '采用假体隆胸技术，塑造自然饱满的胸型，提升整体身材比例。'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light mb-6 tracking-wide" style={{color: '#1F1F1F'}}>
              身体塑形
            </h1>
            <p className="text-base md:text-lg mb-8 leading-relaxed" style={{color: '#6B7280'}}>
              科学塑形方案，打造理想身材曲线
            </p>
            <button
              onClick={() => navigate('/booking')}
              className="px-10 py-3 text-white text-sm transition tracking-wider"
              style={{backgroundColor: '#1C2B3A'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#101D29'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1C2B3A'}
            >
              现在开始探索
            </button>
          </div>

          {/* Desktop view - 3 images side by side */}
          <div className="hidden md:flex items-end justify-center gap-0 mb-16">
            <img
              src="/Gemini_Generated_Image_94iwds94iwds94iw.png"
              alt="身体塑形示例1"
              className="h-[500px] object-contain"
              style={{
                filter: 'brightness(1.1) contrast(1.05)',
                mixBlendMode: 'darken'
              }}
            />
            <img
              src="/Gemini_Generated_Image_iubeodiubeodiube.png"
              alt="身体塑形示例2"
              className="h-[500px] object-contain"
              style={{
                filter: 'brightness(1.1) contrast(1.05)',
                mixBlendMode: 'darken'
              }}
            />
            <img
              src="/Gemini_Generated_Image_u1lac1u1lac1u1la.png"
              alt="身体塑形示例3"
              className="h-[500px] object-contain"
              style={{
                filter: 'brightness(1.1) contrast(1.05)',
                mixBlendMode: 'darken'
              }}
            />
          </div>

          {/* Mobile view - swipeable carousel */}
          <div className="md:hidden mb-12">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  const startX = touch.clientX;

                  const handleTouchMove = (moveEvent: TouchEvent) => {
                    const currentX = moveEvent.touches[0].clientX;
                    const diff = startX - currentX;

                    if (Math.abs(diff) > 50) {
                      if (diff > 0 && currentSlide < images.length - 1) {
                        setCurrentSlide(currentSlide + 1);
                      } else if (diff < 0 && currentSlide > 0) {
                        setCurrentSlide(currentSlide - 1);
                      }
                      document.removeEventListener('touchmove', handleTouchMove);
                    }
                  };

                  document.addEventListener('touchmove', handleTouchMove);
                  document.addEventListener('touchend', () => {
                    document.removeEventListener('touchmove', handleTouchMove);
                  }, { once: true });
                }}
              >
                {images.map((src, index) => (
                  <div key={index} className="w-full flex-shrink-0 flex justify-center items-center px-4">
                    <img
                      src={src}
                      alt={`身体塑形示例${index + 1}`}
                      className="w-full max-w-md object-contain"
                      style={{
                        filter: 'brightness(1.1) contrast(1.05)',
                        mixBlendMode: 'darken',
                        height: 'auto'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: currentSlide === index ? '#1F1F1F' : '#D1D5DB'
                  }}
                  aria-label={`切换到图片 ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
              服务项目
            </h2>
            <p className="text-sm md:text-base font-light" style={{color: '#6B7280'}}>
              专业塑形技术，为你量身定制理想身材
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-16">
            {services.map((service) => (
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
                {serviceDetails[activeService].title}
              </h3>
              <p className="text-sm md:text-base mb-8 leading-relaxed" style={{color: '#6B7280'}}>
                {serviceDetails[activeService].description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceDetails[activeService].techniques.map((technique, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white border"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <span className="mt-1 text-sm" style={{color: '#1C2B3A'}}>●</span>
                    <span className="text-sm md:text-base" style={{color: '#4B5563'}}>{technique}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white p-8 md:p-12 border mt-8" style={{borderColor: '#E5E7EB'}}>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {serviceDetails[activeService].images.map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border overflow-hidden"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <img
                      src={image}
                      alt={`${serviceDetails[activeService].title} 案例 ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
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
            {caseStudies.map((caseStudy, index) => (
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

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light mb-12 text-center" style={{color: '#1F1F1F'}}>
            为什么选择我们
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border transition-all duration-300" style={{borderColor: '#E5E7EB'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1C2B3A';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="text-4xl mb-4" style={{color: '#1C2B3A'}}>□</div>
              <h3 className="text-lg md:text-xl font-normal mb-3" style={{color: '#1F1F1F'}}>先进技术</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{color: '#6B7280'}}>
                采用国际领先的塑形技术，精准安全
              </p>
            </div>
            <div className="p-8 border transition-all duration-300" style={{borderColor: '#E5E7EB'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1C2B3A';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="text-4xl mb-4" style={{color: '#1C2B3A'}}>□</div>
              <h3 className="text-lg md:text-xl font-normal mb-3" style={{color: '#1F1F1F'}}>个性化方案</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{color: '#6B7280'}}>
                根据身体比例量身定制最佳塑形方案
              </p>
            </div>
            <div className="p-8 border transition-all duration-300" style={{borderColor: '#E5E7EB'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1C2B3A';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="text-4xl mb-4" style={{color: '#1C2B3A'}}>□</div>
              <h3 className="text-lg md:text-xl font-normal mb-3" style={{color: '#1F1F1F'}}>快速恢复</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{color: '#6B7280'}}>
                微创技术，恢复期短，效果自然持久
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      <Footer />
    </div>
  );
}

export default BodySculptingPage;
