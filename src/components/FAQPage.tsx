import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: '整形手术',
    question: '整形手术安全吗？',
    answer: '我们的整形手术由经验丰富的专业医生执行，使用国际标准的医疗设备和技术。所有手术都在符合国际医疗标准的设施中进行，确保您的安全。'
  },
  {
    category: '整形手术',
    question: '整形手术需要多长时间恢复？',
    answer: '恢复时间因手术类型而异。面部轮廓手术通常需要2-4周恢复，注射类治疗可能只需要几天。我们会为您提供详细的术后护理指导。'
  },
  {
    category: '整形手术',
    question: '手术会留疤吗？',
    answer: '我们使用先进的微创技术，切口通常隐藏在自然褶皱或发际线中。随着时间推移，疤痕会逐渐淡化，几乎不可见。'
  },
  {
    category: '预约咨询',
    question: '如何预约咨询？',
    answer: '您可以通过我们的在线预约系统、电话或微信预约咨询。初次咨询包括面部分析、手术计划讨论和费用评估。'
  },
  {
    category: '预约咨询',
    question: '咨询需要付费吗？',
    answer: '首次咨询是免费的。我们的专家会详细了解您的需求，提供专业建议和定制化方案。'
  },
  {
    category: '预约咨询',
    question: '可以远程咨询吗？',
    answer: '是的，我们提供在线视频咨询服务。您可以通过视频通话与我们的专家讨论您的需求和期望。'
  },
  {
    category: '费用支付',
    question: '手术费用包含哪些项目？',
    answer: '费用包括术前检查、手术费、麻醉费、术后护理和复诊。我们会在咨询时提供详细的费用明细。'
  },
  {
    category: '费用支付',
    question: '支持分期付款吗？',
    answer: '是的，我们提供灵活的分期付款方案，让您能够更轻松地进行投资。具体方案可在咨询时讨论。'
  },
  {
    category: '费用支付',
    question: '可以使用保险吗？',
    answer: '美容整形手术通常不在医疗保险覆盖范围内。但如果是因医疗需要的重建手术，部分保险可能覆盖。'
  },
  {
    category: '术后护理',
    question: '术后需要多久复诊？',
    answer: '通常在术后1周、1个月、3个月和6个月进行复诊，确保恢复情况良好。紧急情况可随时联系我们。'
  },
  {
    category: '术后护理',
    question: '术后有什么注意事项？',
    answer: '需要避免剧烈运动、保持伤口清洁、按时服药、定期复诊。我们会提供详细的术后护理手册。'
  },
  {
    category: '术后护理',
    question: '术后效果可以维持多久？',
    answer: '效果持续时间因手术类型和个人情况而异。手术类治疗效果通常是永久的，注射类治疗可能需要定期维护。'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const categories = ['全部', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs = selectedCategory === '全部'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
            常见问题
          </h1>
          <p className="text-base md:text-lg tracking-wide" style={{color: '#6B7280'}}>
            解答您关于整形手术的疑问
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-12 py-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 text-sm md:text-base transition-all ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-xs md:text-sm font-medium mb-1 block" style={{color: '#6B7280'}}>
                      {faq.category}
                    </span>
                    <h3 className="text-base md:text-lg font-normal" style={{color: '#1F1F1F'}}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6" style={{color: '#1F1F1F'}} />
                    ) : (
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6" style={{color: '#6B7280'}} />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-5 md:pb-6 pt-2">
                    <p className="text-sm md:text-base leading-relaxed" style={{color: '#6B7280'}}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 md:px-12 py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
            还有其他问题？
          </h2>
          <p className="text-base md:text-lg mb-8" style={{color: '#6B7280'}}>
            我们的专家团队随时为您解答
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="px-8 py-3 bg-black text-white text-base md:text-lg font-normal hover:bg-gray-800 transition-colors"
            >
              预约咨询
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-black text-black text-base md:text-lg font-normal hover:bg-black hover:text-white transition-colors"
            >
              联系我们
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
