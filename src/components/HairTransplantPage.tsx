import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ImageCompareSlider from './ImageCompareSlider';
import CTASection from './CTASection';
import { useState } from 'react';

function HairTransplantPage() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<'fue' | 'hairline' | 'eyebrow' | 'beard'>('fue');

  const caseStudies = [
    {
      id: 1,
      title: 'FUE无痕植发案例',
      category: '头顶加密',
      beforeImage: '/Gemini_Generated_Image_94iwds94iwds94iw.png',
      afterImage: '/Gemini_Generated_Image_iubeodiubeodiube.png',
      description: '采用FUE技术进行头顶加密，术后6个月效果自然浓密，发际线流畅自然。'
    },
    {
      id: 2,
      title: '发际线调整案例',
      category: '发际线种植',
      beforeImage: '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
      afterImage: '/Gemini_Generated_Image_94iwds94iwds94iw.png',
      description: '根据面部比例精准设计发际线，成功改善M型脱发，提升整体气质。'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-light mb-6 leading-relaxed tracking-wide" style={{color: '#1F1F1F'}}>
            植发
          </h1>
          <p className="text-sm md:text-base font-light leading-relaxed mb-8 max-w-2xl mx-auto" style={{color: '#4B5563'}}>
            科学重塑浓密秀发，重拾自信形象
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
              alt="植发效果展示"
              className="w-full max-w-3xl h-auto object-contain"
              style={{
                filter: 'brightness(1.05)',
              }}
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12" style={{backgroundColor: '#F9FAFB'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide" style={{color: '#1F1F1F'}}>
              头发为什么会脱落？
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed" style={{color: '#6B7280'}}>
              头发生长和脱落是个周期性的动态过程。简单来说，毛囊这个"生产车间"遭到了破坏。
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 mb-12 shadow-sm">
            <h3 className="text-2xl font-light mb-8 tracking-wide" style={{color: '#1F1F1F'}}>
              毛囊生长周期
            </h3>
            <p className="text-base mb-8 leading-relaxed" style={{color: '#6B7280'}}>
              我们可以把毛囊想象成一个生产头发的工厂，它会经历三个主要阶段：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6" style={{backgroundColor: '#F9FAFB'}}>
                <h4 className="text-lg font-normal mb-3" style={{color: '#1C2B3A'}}>
                  生长期 (约2-7年)
                </h4>
                <p className="text-sm leading-relaxed" style={{color: '#6B7280'}}>
                  头发积极生长，约85%-90%的头发处于这个阶段。
                </p>
              </div>
              <div className="p-6" style={{backgroundColor: '#F9FAFB'}}>
                <h4 className="text-lg font-normal mb-3" style={{color: '#1C2B3A'}}>
                  退行期 (约2-3周)
                </h4>
                <p className="text-sm leading-relaxed" style={{color: '#6B7280'}}>
                  工厂"停工"，头发停止生长。
                </p>
              </div>
              <div className="p-6" style={{backgroundColor: '#F9FAFB'}}>
                <h4 className="text-lg font-normal mb-3" style={{color: '#1C2B3A'}}>
                  休止期 (约3-4个月)
                </h4>
                <p className="text-sm leading-relaxed" style={{color: '#6B7280'}}>
                  工厂"放假"，旧头发会自然脱落，为新生头发腾出空间。
                </p>
              </div>
            </div>
            <p className="text-sm mt-8 p-4" style={{backgroundColor: '#FEF3C7', color: '#92400E'}}>
              正常情况下，每天脱落50-100根头发属于正常生理现象。
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-sm">
            <h3 className="text-2xl font-light mb-8 tracking-wide" style={{color: '#1F1F1F'}}>
              病理性脱发的主要原因
            </h3>
            <div className="space-y-6">
              <div className="pb-6 border-b" style={{borderColor: '#E5E7EB'}}>
                <h4 className="text-lg font-normal mb-3 flex items-center gap-2" style={{color: '#1F1F1F'}}>
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#1C2B3A'}} />
                  雄激素性脱发
                </h4>
                <p className="text-sm leading-relaxed ml-4" style={{color: '#6B7280'}}>
                  也称为脂溢性脱发，有遗传倾向。关键是一种叫二氢睾酮（DHT）的激素攻击毛囊，使生长期缩短，头发逐渐变细、变短，长不出头发。
                </p>
              </div>
              <div className="pb-6 border-b" style={{borderColor: '#E5E7EB'}}>
                <h4 className="text-lg font-normal mb-3 flex items-center gap-2" style={{color: '#1F1F1F'}}>
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#1C2B3A'}} />
                  精神与情绪因素
                </h4>
                <p className="text-sm leading-relaxed ml-4" style={{color: '#6B7280'}}>
                  长期精神压力大、熬夜、焦虑，导致身体释放皮质醇等压力激素，扰乱毛囊周期，导致短时间内脱落增多。
                </p>
              </div>
              <div className="pb-6 border-b" style={{borderColor: '#E5E7EB'}}>
                <h4 className="text-lg font-normal mb-3 flex items-center gap-2" style={{color: '#1F1F1F'}}>
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#1C2B3A'}} />
                  营养缺乏
                </h4>
                <p className="text-sm leading-relaxed ml-4" style={{color: '#6B7280'}}>
                  头发主要由角蛋白构成，需要足够的蛋白质、维生素和微量元素。过度节食或缺乏铁、锌、维生素B族等，都可能因"原料"不足导致脱发。
                </p>
              </div>
              <div className="pb-6 border-b" style={{borderColor: '#E5E7EB'}}>
                <h4 className="text-lg font-normal mb-3 flex items-center gap-2" style={{color: '#1F1F1F'}}>
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#1C2B3A'}} />
                  产后脱发
                </h4>
                <p className="text-sm leading-relaxed ml-4" style={{color: '#6B7280'}}>
                  怀孕时雌激素水平高，头发会延长生长期。产后雌激素骤降，大量头发同时进入休止期，导致短期内集中脱落，这通常是暂时的。
                </p>
              </div>
              <div>
                <h4 className="text-lg font-normal mb-3 flex items-center gap-2" style={{color: '#1F1F1F'}}>
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#1C2B3A'}} />
                  疾病与药物影响
                </h4>
                <p className="text-sm leading-relaxed ml-4" style={{color: '#6B7280'}}>
                  甲状腺功能异常、自身免疫疾病（如斑秃）等会干扰毛囊。化疗药物、部分降压药也可能引起脱发。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide" style={{color: '#1F1F1F'}}>
              治疗方案的三个层级
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed" style={{color: '#6B7280'}}>
              根据脱发类型和严重程度，选择最适合的治疗方式
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white border-l-4 p-8 md:p-12 shadow-sm" style={{borderColor: '#1C2B3A'}}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-light" style={{backgroundColor: '#1C2B3A'}}>
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-2 tracking-wide" style={{color: '#1F1F1F'}}>
                    日常调理与生活方式干预
                  </h3>
                  <p className="text-sm mb-4" style={{color: '#6B7280'}}>
                    适用于休止期脱发、营养性脱发的辅助改善，以及所有脱发类型的预防。
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-16">
                <div className="p-4" style={{backgroundColor: '#F9FAFB'}}>
                  <h4 className="text-base font-normal mb-2" style={{color: '#1F1F1F'}}>营养补充</h4>
                  <p className="text-sm" style={{color: '#6B7280'}}>均衡饮食，补充蛋白质、维生素和微量元素</p>
                </div>
                <div className="p-4" style={{backgroundColor: '#F9FAFB'}}>
                  <h4 className="text-base font-normal mb-2" style={{color: '#1F1F1F'}}>压力管理</h4>
                  <p className="text-sm" style={{color: '#6B7280'}}>保证充足睡眠，减少焦虑和精神压力</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 p-8 md:p-12 shadow-sm" style={{borderColor: '#1C2B3A'}}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-light" style={{backgroundColor: '#1C2B3A'}}>
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-2 tracking-wide" style={{color: '#1F1F1F'}}>
                    药物治疗
                  </h3>
                  <p className="text-sm mb-4" style={{color: '#6B7280'}}>
                    适用于雄激素性脱发、斑秃等，是目前最主要的保守治疗手段。
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-16">
                <div className="p-4" style={{backgroundColor: '#F9FAFB'}}>
                  <h4 className="text-base font-normal mb-2" style={{color: '#1F1F1F'}}>外用药物</h4>
                  <p className="text-sm" style={{color: '#6B7280'}}>局部刺激毛囊生长，改善头皮血液循环</p>
                </div>
                <div className="p-4" style={{backgroundColor: '#F9FAFB'}}>
                  <h4 className="text-base font-normal mb-2" style={{color: '#1F1F1F'}}>口服药物</h4>
                  <p className="text-sm" style={{color: '#6B7280'}}>抑制DHT生成，延缓脱发进程</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 p-8 md:p-12 shadow-sm" style={{borderColor: '#1C2B3A'}}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-light" style={{backgroundColor: '#1C2B3A'}}>
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-2 tracking-wide" style={{color: '#1F1F1F'}}>
                    外科手术（植发）
                  </h3>
                  <p className="text-sm mb-4" style={{color: '#6B7280'}}>
                    适用于永久性脱发，且药物治疗无效，但后枕部资源充足的雄激素性脱发患者，也用于修复疤痕性脱发。
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-16">
                <div className="p-4" style={{backgroundColor: '#F9FAFB'}}>
                  <h4 className="text-base font-normal mb-2" style={{color: '#1F1F1F'}}>FUE技术</h4>
                  <p className="text-sm" style={{color: '#6B7280'}}>单个毛囊提取种植，无痕迹，恢复快</p>
                </div>
                <div className="p-4" style={{backgroundColor: '#F9FAFB'}}>
                  <h4 className="text-base font-normal mb-2" style={{color: '#1F1F1F'}}>FUT技术</h4>
                  <p className="text-sm" style={{color: '#6B7280'}}>条状取发，适合大面积脱发</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12" style={{backgroundColor: '#F9FAFB'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide" style={{color: '#1F1F1F'}}>
              如何选择治疗方案？
            </h2>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-light" style={{backgroundColor: '#1C2B3A'}}>
                  1
                </div>
                <div>
                  <h3 className="text-lg font-normal mb-2" style={{color: '#1F1F1F'}}>先诊断</h3>
                  <p className="text-sm leading-relaxed" style={{color: '#6B7280'}}>
                    去正规医院皮肤科，明确脱发类型和原因。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-light" style={{backgroundColor: '#1C2B3A'}}>
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-normal mb-4" style={{color: '#1F1F1F'}}>后治疗：根据诊断结果选择方案</h3>
                  <div className="space-y-4">
                    <div className="pl-4 border-l-2" style={{borderColor: '#D1D5DB'}}>
                      <p className="text-sm font-normal mb-1" style={{color: '#1F1F1F'}}>
                        急性短期脱发（如产后、压力大）
                      </p>
                      <p className="text-sm" style={{color: '#6B7280'}}>
                        首选第一层，通常可自愈。
                      </p>
                    </div>
                    <div className="pl-4 border-l-2" style={{borderColor: '#D1D5DB'}}>
                      <p className="text-sm font-normal mb-1" style={{color: '#1F1F1F'}}>
                        慢性进行性脱发（如雄激素性脱发）
                      </p>
                      <p className="text-sm" style={{color: '#6B7280'}}>
                        早期以第二层为主，若效果不佳再考虑第三层。
                      </p>
                    </div>
                    <div className="pl-4 border-l-2" style={{borderColor: '#D1D5DB'}}>
                      <p className="text-sm font-normal mb-1" style={{color: '#1F1F1F'}}>
                        毛囊未坏死
                      </p>
                      <p className="text-sm" style={{color: '#6B7280'}}>
                        可采用第二层药物治疗。
                      </p>
                    </div>
                    <div className="pl-4 border-l-2" style={{borderColor: '#D1D5DB'}}>
                      <p className="text-sm font-normal mb-1" style={{color: '#1F1F1F'}}>
                        毛囊已坏死
                      </p>
                      <p className="text-sm" style={{color: '#6B7280'}}>
                        只能靠第三层手术解决。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide" style={{color: '#1F1F1F'}}>
              服务项目
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed" style={{color: '#6B7280'}}>
              专业团队，先进技术，为您提供个性化的植发解决方案
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {[
              { key: 'fue' as const, title: 'FUE无痕植发', subtitle: '无痕迹恢复快' },
              { key: 'hairline' as const, title: '发际线调整', subtitle: '精准设计提升' },
              { key: 'eyebrow' as const, title: '眉毛种植', subtitle: '立体自然眉形' },
              { key: 'beard' as const, title: '胡须种植', subtitle: '塑造男性魅力' },
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
                {activeService === 'fue' && 'FUE无痕植发'}
                {activeService === 'hairline' && '发际线调整'}
                {activeService === 'eyebrow' && '眉毛种植'}
                {activeService === 'beard' && '胡须种植'}
              </h3>
              <p className="text-sm md:text-base mb-8 leading-relaxed" style={{color: '#6B7280'}}>
                {activeService === 'fue' && '采用先进的毛囊单位提取技术，逐个提取健康毛囊进行种植，无需开刀，不留疤痕，恢复快，效果自然。'}
                {activeService === 'hairline' && '根据面部黄金比例设计发际线，优化面部轮廓，提升整体气质。适合发际线后移、M型脱发等情况。'}
                {activeService === 'eyebrow' && '针对眉毛稀疏、缺失等问题，通过精细种植技术，打造立体自然的眉形，提升面部精致度。'}
                {activeService === 'beard' && '为胡须稀疏的男士提供专业种植服务，塑造阳刚魅力，提升男性气质。'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeService === 'fue' && ['适合大面积脱发', '毛囊存活率高达95%以上', '术后3-5天即可正常工作', '无痕迹自然美观'].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white border"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <span className="mt-1 text-sm" style={{color: '#1C2B3A'}}>●</span>
                    <span className="text-sm md:text-base" style={{color: '#4B5563'}}>{feature}</span>
                  </div>
                ))}
                {activeService === 'hairline' && ['个性化设计方案', '符合面部美学比例', '显年轻，提升颜值', '精准种植自然流畅'].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white border"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <span className="mt-1 text-sm" style={{color: '#1C2B3A'}}>●</span>
                    <span className="text-sm md:text-base" style={{color: '#4B5563'}}>{feature}</span>
                  </div>
                ))}
                {activeService === 'eyebrow' && ['根据脸型设计眉形', '一根一根精细种植', '永久保持，无需化妆', '立体自然眉形'].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white border"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <span className="mt-1 text-sm" style={{color: '#1C2B3A'}}>●</span>
                    <span className="text-sm md:text-base" style={{color: '#4B5563'}}>{feature}</span>
                  </div>
                ))}
                {activeService === 'beard' && ['多种胡型可选', '生长方向精确控制', '增强男性魅力', '自然浓密效果'].map((feature, index) => (
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
                {activeService === 'fue' && [
                  '/Gemini_Generated_Image_94iwds94iwds94iw.png',
                  '/Gemini_Generated_Image_iubeodiubeodiube.png',
                  '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
                  '/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png'
                ].map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border overflow-hidden"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <img
                      src={image}
                      alt={`FUE无痕植发 案例 ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
                {activeService === 'hairline' && [
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
                      alt={`发际线调整 案例 ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
                {activeService === 'eyebrow' && [
                  '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
                  '/Gemini_Generated_Image_94iwds94iwds94iw.png',
                  '/Gemini_Generated_Image_iubeodiubeodiube.png',
                  '/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png'
                ].map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border overflow-hidden"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <img
                      src={image}
                      alt={`眉毛种植 案例 ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
                {activeService === 'beard' && [
                  '/Gemini_Generated_Image_pf7kappf7kappf7k.png',
                  '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
                  '/Gemini_Generated_Image_a16ssqa16ssqa16s.png',
                  '/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png'
                ].map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border overflow-hidden"
                    style={{borderColor: '#E5E7EB'}}
                  >
                    <img
                      src={image}
                      alt={`胡须种植 案例 ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-12" style={{backgroundColor: '#F9FAFB'}}>
        <div className="max-w-7xl mx-auto">

          <div className="space-y-16">
            {caseStudies.map((caseStudy, index) => (
              <div key={caseStudy.id} className="bg-white border" style={{borderColor: '#E5E7EB'}}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-6 md:p-8 min-h-[500px] md:min-h-[600px] flex items-center">
                    <ImageCompareSlider
                      beforeImage={caseStudy.beforeImage}
                      afterImage={caseStudy.afterImage}
                      altBefore={`${caseStudy.title} - 术前`}
                      altAfter={`${caseStudy.title} - 术后`}
                    />
                  </div>

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

      <section className="py-20 px-6 md:px-12" style={{backgroundColor: '#1C2B3A'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide text-white">
              为什么选择我们
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-light mx-auto mb-6" style={{backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'}}>
                95%
              </div>
              <h3 className="text-lg font-normal mb-3 text-white">高存活率</h3>
              <p className="text-sm text-white opacity-80 leading-relaxed">
                采用国际领先的微创技术，毛囊存活率高达95%以上，确保植发效果
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-light mx-auto mb-6" style={{backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'}}>
                ★
              </div>
              <h3 className="text-lg font-normal mb-3 text-white">自然美观</h3>
              <p className="text-sm text-white opacity-80 leading-relaxed">
                精细种植，严格控制种植角度和方向，术后效果自然，看不出痕迹
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-light mx-auto mb-6" style={{backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'}}>
                ∞
              </div>
              <h3 className="text-lg font-normal mb-3 text-white">永久保持</h3>
              <p className="text-sm text-white opacity-80 leading-relaxed">
                种植的毛发来自后枕部不受DHT影响的健康毛囊，可永久生长
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

export default HairTransplantPage;
