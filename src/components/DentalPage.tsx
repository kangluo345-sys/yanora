import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import CTASection from './CTASection';
import Footer from './Footer';
import Navbar from './Navbar';

function DentalPage() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<'whitening' | 'orthodontics' | 'veneers' | 'implants' | 'cleaning' | 'cosmetic'>('whitening');

  const services = [
    { key: 'whitening' as const, title: '牙齿美白', subtitle: '提亮牙齿色泽' },
    { key: 'orthodontics' as const, title: '牙齿矫正', subtitle: '打造完美牙列' },
    { key: 'veneers' as const, title: '瓷贴面', subtitle: '改善牙齿形态' },
    { key: 'implants' as const, title: '种植牙', subtitle: '恢复缺失牙齿' },
    { key: 'cleaning' as const, title: '洗牙护理', subtitle: '保持口腔健康' },
    { key: 'cosmetic' as const, title: '牙齿美学', subtitle: '微笑设计方案' },
  ];

  const serviceDetails = {
    whitening: {
      title: '牙齿美白',
      description: '专业美白技术，安全有效提亮牙齿色泽，让笑容更加自信灿烂',
      techniques: [
        '冷光美白技术',
        '激光美白',
        '家用美白套装',
        '深层色素去除'
      ],
      images: [
        '/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png',
        '/Gemini_Generated_Image_94iwds94iwds94iw.png',
        '/Gemini_Generated_Image_iubeodiubeodiube.png',
        '/Gemini_Generated_Image_u1lac1u1lac1u1la.png'
      ]
    },
    orthodontics: {
      title: '牙齿矫正',
      description: '采用先进正畸技术，矫正牙齿排列，打造整齐美观的牙列',
      techniques: [
        '隐形矫正',
        '传统金属矫正',
        '陶瓷自锁矫正',
        '快速矫正技术'
      ],
      images: [
        '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
        '/Gemini_Generated_Image_pf7kappf7kappf7k.png',
        '/Gemini_Generated_Image_a16ssqa16ssqa16s.png',
        '/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png'
      ]
    },
    veneers: {
      title: '瓷贴面',
      description: '精密定制瓷贴面，改善牙齿形态、颜色和排列，自然美观',
      techniques: [
        '全瓷贴面',
        '超薄贴面',
        '美学贴面设计',
        '无磨牙贴面'
      ],
      images: [
        '/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png',
        '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
        '/Gemini_Generated_Image_94iwds94iwds94iw.png',
        '/Gemini_Generated_Image_iubeodiubeodiube.png'
      ]
    },
    implants: {
      title: '种植牙',
      description: '采用进口种植体，恢复缺失牙齿，功能与美观兼具',
      techniques: [
        '即刻种植',
        '延期种植',
        '全口种植修复',
        '数字化种植导板'
      ],
      images: [
        '/3d931fc8d4b7d9ba6357f51f842da33d.jpg',
        '/6492d5ffd9ae5616e415a8afbe984073.jpg',
        '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
        '/Gemini_Generated_Image_pf7kappf7kappf7k.png'
      ]
    },
    cleaning: {
      title: '洗牙护理',
      description: '专业洗牙护理，去除牙菌斑和牙结石，维护口腔健康',
      techniques: [
        '超声波洁牙',
        '喷砂洁牙',
        '牙周深度清洁',
        '抛光护理'
      ],
      images: [
        '/Gemini_Generated_Image_a16ssqa16ssqa16s.png',
        '/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png',
        '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
        '/Gemini_Generated_Image_pf7kappf7kappf7k.png'
      ]
    },
    cosmetic: {
      title: '牙齿美学',
      description: '综合美学设计，打造完美微笑曲线，提升面部整体美感',
      techniques: [
        '微笑设计',
        '牙龈美学塑形',
        '咬合重建',
        'DSD数字化设计'
      ],
      images: [
        '/Gemini_Generated_Image_94iwds94iwds94iw.png',
        '/Gemini_Generated_Image_iubeodiubeodiube.png',
        '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
        '/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-light mb-6 leading-relaxed tracking-wide" style={{color: '#1F1F1F'}}>
            牙齿美容
          </h1>
          <p className="text-sm md:text-base font-light leading-relaxed mb-8 max-w-2xl mx-auto" style={{color: '#4B5563'}}>
            专业口腔美容，绽放自信笑容
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

          <div className="mt-12 flex justify-center">
            <img
              src="/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png"
              alt="牙齿美容效果展示"
              className="w-full max-w-3xl h-auto object-contain"
              style={{
                filter: 'brightness(1.05)',
              }}
            />
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
              专业口腔美容技术，为你量身定制完美笑容
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

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light mb-12 text-center" style={{color: '#1F1F1F'}}>
            为什么选择我们
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border bg-white transition-all duration-300" style={{borderColor: '#E5E7EB'}}
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
              <h3 className="text-lg md:text-xl font-normal mb-3" style={{color: '#1F1F1F'}}>专业团队</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{color: '#6B7280'}}>
                资深口腔医师，经验丰富，技术精湛
              </p>
            </div>
            <div className="p-8 border bg-white transition-all duration-300" style={{borderColor: '#E5E7EB'}}
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
              <h3 className="text-lg md:text-xl font-normal mb-3" style={{color: '#1F1F1F'}}>先进设备</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{color: '#6B7280'}}>
                采用国际领先的口腔医疗设备，精准安全
              </p>
            </div>
            <div className="p-8 border bg-white transition-all duration-300" style={{borderColor: '#E5E7EB'}}
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
              <h3 className="text-lg md:text-xl font-normal mb-3" style={{color: '#1F1F1F'}}>舒适体验</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{color: '#6B7280'}}>
                无痛治疗技术，舒适安心的就诊环境
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

export default DentalPage;
