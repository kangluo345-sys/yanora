import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ServiceItem {
  name: string;
}

interface ServiceCategory {
  name: string;
  items: ServiceItem[];
}

const ServicesSection = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

  const services: ServiceCategory[] = [
    {
      name: '鼻部',
      items: [
        { name: '耳软骨综合（假体+耳软骨+缩鼻头+鼻小柱抬高）' },
        { name: '鼻中隔（假体+耳软骨+缩鼻头+鼻小柱抬高）' },
        { name: '自体肋骨鼻（隆鼻术）' },
        { name: '超体耳软骨鼻' },
        { name: '肋骨鼻基底（单做）' },
        { name: '鼻⻣矫正（鼻骨内推）' },
        { name: '磨驼峰鼻' },
        { name: '鼻尖延长' },
        { name: '鼻小柱延长/鼻小柱缩短' },
        { name: '鼻翼内缩' },
        { name: '鼻翼外切' },
        { name: '鼻头调整' },
        { name: '鼻小柱抬高' },
        { name: '鼻降低' },
        { name: '鼻中隔穿孔修复' },
        { name: '鼻中隔矫正' },
        { name: '取鼻假体硅胶/自体' },
        { name: '鼻头缩小' },
        { name: '硅胶鼻基底' },
        { name: '膨体鼻基底' },
        { name: '真皮鼻基底' },
        { name: '自体鼻基底' },
        { name: '鼻假体置换' },
        { name: '自体鼻基底调整' },
      ],
    },
    {
      name: '眼睛',
      items: [
        { name: '全切双眼皮（去皮去脂 亮瞳、翘睫）' },
        { name: '无痕提眉' },
        { name: '切眉／提眉' },
        { name: '埋线/三点/纳米双眼皮' },
        { name: '眶格脂肪释放' },
        { name: '眼窝填充' },
        { name: '开内眼角' },
        { name: '开外眼角' },
        { name: '提肌' },
        { name: '包眼角术' },
        { name: '外切眼袋' },
        { name: '内吸眼袋' },
        { name: '眼尾上扬/眼尾提升' },
        { name: '倒睫矫正' },
        { name: '下睑外翻修复' },
        { name: '去脂（眼部）' },
        { name: '眼尾取脂' },
        { name: '切痣一个' },
        { name: '下眼袋去皮' },
        { name: '自体卧蚕成型' },
        { name: '人工真皮卧蚕成形' },
        { name: '人工真皮卧蚕取出' },
        { name: '轮匝肌瓣卧蚕' },
        { name: '眼窝吸脂（眼尾小切扣）' },
        { name: '眼部取异物' },
        { name: '眼部取埋线' },
      ],
    },
    {
      name: '眉弓',
      items: [
        { name: '自体真皮垫眉间纹' },
        { name: '鱼尾纹阻断术' },
        { name: '鼻唇沟整形术' },
        { name: '真皮（adm）眉弓' },
        { name: '硅胶假体眉弓' },
        { name: '膨体假体眉弓' },
        { name: '自体肋骨眉弓' },
        { name: '眉弓调整' },
        { name: '眉弓线雕取出' },
      ],
    },
    {
      name: '脂肪填充',
      items: [
        { name: '脂肪填充单个大部位(太阳穴、额头、面颊)' },
        { name: '脂肪填充单个小部位(苹果肌、泪沟、下巴、下颌缘、法令纹、眉⻣、眉弓，鼻基底)' },
        { name: '卧蚕填充' },
        { name: '手背脂肪填充' },
        { name: '全脸脂肪胶填充' },
        { name: '全脸脂肪填充' },
        { name: '臀部填充（臀凹）' },
        { name: '大腿填充' },
        { name: '大腿内侧填充' },
        { name: '肚脐脂肪填充' },
        { name: '小腿填充' },
        { name: '单膝盖内侧脂肪填充/双' },
        { name: '胯部填充单侧/双侧' },
        { name: '前腹部脂肪填充' },
        { name: '直角肩脂肪填充' },
      ],
    },
    {
      name: '面部吸脂',
      items: [
        { name: '⻩金微雕+吸脂(面颊+双下巴)' },
        { name: '⻩金微雕+吸脂(面颊/双下巴)单项' },
        { name: '单做黄金微雕（面颊）' },
        { name: '面部吸脂(面颊+双下巴)' },
        { name: '面颊吸脂/双下巴/额头吸脂单项' },
        { name: '苹果肌吸脂' },
        { name: '全面部吸脂（不包含下巴/下颌缘）' },
        { name: '太阳穴吸脂（全麻手术）' },
      ],
    },
    {
      name: '额头',
      items: [
        { name: '额头缩短' },
      ],
    },
    {
      name: '下巴',
      items: [
        { name: '假体下巴（硅胶）' },
        { name: '膨体下巴' },
        { name: '下巴调整' },
        { name: '下巴缩短' },
      ],
    },
    {
      name: '酒窝',
      items: [
        { name: '酒窝（梨涡）单侧/双侧' },
      ],
    },
    {
      name: '嘴唇',
      items: [
        { name: '唇部单项（上唇/下唇M唇）花瓣唇' },
        { name: '唇珠成型' },
        { name: '唇综合二项' },
        { name: '唇综合（三项）' },
        { name: '嘴角上扬（内切/外切）' },
        { name: '嘴角平移' },
        { name: '唇峰再造' },
        { name: '唇峰平移' },
        { name: '下唇外翻矫正' },
        { name: '唇珠切除' },
        { name: 'adm唇珠/唇线成形' },
      ],
    },
    {
      name: '隆胸',
      items: [
        { name: '自体脂肪隆胸' },
        { name: '胸假体取出' },
        { name: '胸假体调整' },
        { name: '乳房下垂矫正术（胸部悬吊）' },
        { name: '乳房整形术（巨乳缩小）' },
        { name: '乳头缩小' },
        { name: '乳头内陷矫正单侧/双侧' },
        { name: '乳头再造' },
        { name: '乳晕缩小' },
        { name: '副乳切除（包含副乳吸脂）' },
      ],
    },
    {
      name: '吸脂',
      items: [
        { name: '手臂环吸' },
        { name: '副乳吸脂' },
        { name: '腰腹环吸' },
        { name: '腰腹环吸+马甲线' },
        { name: '马甲线' },
        { name: '侧腰吸脂' },
        { name: '后腰吸脂' },
        { name: '折角腰' },
        { name: '大腿环吸' },
        { name: '小腿环吸' },
        { name: '肩胛吸脂' },
        { name: '背部吸脂' },
        { name: '假胯吸脂' },
        { name: '妈妈臀吸脂' },
        { name: '臀吸脂' },
        { name: '臀线吸脂' },
        { name: '双侧臀缘吸脂' },
        { name: '腹壁成型/大腿成型' },
        { name: '肚脐再造' },
        { name: '富贵包吸脂' },
        { name: '单部位吸脂（指定小部位）' },
        { name: '肩峰吸脂' },
        { name: '脚踝吸脂' },
        { name: '胸部外侧吸脂（女士）' },
        { name: '胸部脂肪抽吸术' },
        { name: '胃包吸脂' },
        { name: '胸部脂肪堆积吸脂（男士）' },
        { name: '脂肪丰臀' },
        { name: '脂肪胶丰臀' },
        { name: '提臀线' },
        { name: '脂肪填臀线' },
      ],
    },
    {
      name: '面部提升',
      items: [
        { name: '中下面部星钻线' },
        { name: '苹果肌复位（络艺线）' },
        { name: '苹果肌筋膜悬吊/筋膜提升' },
        { name: '微拉美提升' },
        { name: '双面网兜提升术' },
        { name: '中面部取线雕' },
        { name: '眼周筋膜悬吊' },
        { name: '中下面部取线雕' },
      ],
    },
    {
      name: '私密',
      items: [
        { name: '阴唇缩小' },
        { name: '阴道口/阴道壁收紧' },
        { name: 'G点重造' },
        { name: '韧带阴道缩紧' },
        { name: '阴唇改薄' },
        { name: '会阴下体修整术' },
        { name: '大阴唇填充' },
        { name: '小阴唇缩小' },
        { name: '阴道收紧生物束带' },
        { name: '大阴唇赘生物剔除' },
        { name: '阴蒂包皮/小阴唇切除' },
        { name: '会阴体重建' },
        { name: '外阴息肉切除' },
        { name: '小阴唇系带切除' },
      ],
    },
    {
      name: '拉皮',
      items: [
        { name: '中下面部（小拉皮）' },
        { name: '中下面部无痕拉皮' },
        { name: '颞部拉皮' },
        { name: '额头拉皮' },
        { name: '全脸拉皮（大拉皮）' },
      ],
    },
    {
      name: '人中',
      items: [
        { name: '外切人中缩短' },
        { name: '内切人中缩短' },
        { name: '人中窝加深' },
        { name: '埋线人中/人中脊成型' },
      ],
    },
  ];

  const toggleCategory = (index: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4" style={{ color: '#1F1F1F' }}>
            我们的服务项目
          </h2>
          <div className="w-20 h-0.5 mx-auto" style={{ backgroundColor: '#1C2B3A' }}></div>
          <p className="mt-6 text-base md:text-lg font-light" style={{ color: '#6B7280' }}>
            专业团队，精湛技术，为您定制专属美丽方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((category, index) => (
            <div
              key={index}
              className="border transition-all duration-300 hover:shadow-lg bg-white"
              style={{ borderColor: '#E5E7EB' }}
            >
              <button
                onClick={() => toggleCategory(index)}
                className="w-full px-6 py-4 flex items-center justify-between transition-colors"
                style={{ color: '#1F1F1F' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span className="text-lg font-normal tracking-wide">{category.name}</span>
                <div className="transition-transform duration-300" style={{
                  transform: expandedCategories.has(index) ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                  {expandedCategories.has(index) ? (
                    <ChevronUp className="w-5 h-5" style={{ color: '#1C2B3A' }} />
                  ) : (
                    <ChevronDown className="w-5 h-5" style={{ color: '#6B7280' }} />
                  )}
                </div>
              </button>

              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: expandedCategories.has(index) ? `${category.items.length * 48}px` : '0',
                  opacity: expandedCategories.has(index) ? 1 : 0,
                }}
              >
                <div className="border-t" style={{ borderColor: '#E5E7EB' }}>
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="px-6 py-3 border-b last:border-b-0 transition-colors"
                      style={{ borderColor: '#F3F4F6', color: '#6B7280' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                        e.currentTarget.style.color = '#1F1F1F';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#6B7280';
                      }}
                    >
                      <span className="text-sm font-light">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
