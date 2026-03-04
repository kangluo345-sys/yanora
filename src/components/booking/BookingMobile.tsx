import { Calendar, X } from 'lucide-react';
import { BookingFormData, BookingStep } from '../BookingPage';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface BookingMobileProps {
  step: BookingStep;
  formData: BookingFormData;
  loading: boolean;
  error: string;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handlePayment: (method: string) => void;
  navigate: (path: string) => void;
}

const countryCodes = [
  { code: '+93', name: '阿富汗', flag: '🇦🇫' },
  { code: '+355', name: '阿尔巴尼亚', flag: '🇦🇱' },
  { code: '+213', name: '阿尔及利亚', flag: '🇩🇿' },
  { code: '+376', name: '安道尔', flag: '🇦🇩' },
  { code: '+244', name: '安哥拉', flag: '🇦🇴' },
  { code: '+54', name: '阿根廷', flag: '🇦🇷' },
  { code: '+374', name: '亚美尼亚', flag: '🇦🇲' },
  { code: '+61', name: '澳大利亚', flag: '🇦🇺' },
  { code: '+43', name: '奥地利', flag: '🇦🇹' },
  { code: '+994', name: '阿塞拜疆', flag: '🇦🇿' },
  { code: '+973', name: '巴林', flag: '🇧🇭' },
  { code: '+880', name: '孟加拉国', flag: '🇧🇩' },
  { code: '+375', name: '白俄罗斯', flag: '🇧🇾' },
  { code: '+32', name: '比利时', flag: '🇧🇪' },
  { code: '+501', name: '伯利兹', flag: '🇧🇿' },
  { code: '+229', name: '贝宁', flag: '🇧🇯' },
  { code: '+975', name: '不丹', flag: '🇧🇹' },
  { code: '+591', name: '玻利维亚', flag: '🇧🇴' },
  { code: '+387', name: '波黑', flag: '🇧🇦' },
  { code: '+267', name: '博茨瓦纳', flag: '🇧🇼' },
  { code: '+55', name: '巴西', flag: '🇧🇷' },
  { code: '+673', name: '文莱', flag: '🇧🇳' },
  { code: '+359', name: '保加利亚', flag: '🇧🇬' },
  { code: '+226', name: '布基纳法索', flag: '🇧🇫' },
  { code: '+257', name: '布隆迪', flag: '🇧🇮' },
  { code: '+855', name: '柬埔寨', flag: '🇰🇭' },
  { code: '+237', name: '喀麦隆', flag: '🇨🇲' },
  { code: '+1', name: '加拿大', flag: '🇨🇦' },
  { code: '+238', name: '佛得角', flag: '🇨🇻' },
  { code: '+236', name: '中非', flag: '🇨🇫' },
  { code: '+235', name: '乍得', flag: '🇹🇩' },
  { code: '+56', name: '智利', flag: '🇨🇱' },
  { code: '+86', name: '中国', flag: '🇨🇳' },
  { code: '+57', name: '哥伦比亚', flag: '🇨🇴' },
  { code: '+269', name: '科摩罗', flag: '🇰🇲' },
  { code: '+242', name: '刚果(布)', flag: '🇨🇬' },
  { code: '+243', name: '刚果(金)', flag: '🇨🇩' },
  { code: '+506', name: '哥斯达黎加', flag: '🇨🇷' },
  { code: '+385', name: '克罗地亚', flag: '🇭🇷' },
  { code: '+53', name: '古巴', flag: '🇨🇺' },
  { code: '+357', name: '塞浦路斯', flag: '🇨🇾' },
  { code: '+420', name: '捷克', flag: '🇨🇿' },
  { code: '+45', name: '丹麦', flag: '🇩🇰' },
  { code: '+253', name: '吉布提', flag: '🇩🇯' },
  { code: '+593', name: '厄瓜多尔', flag: '🇪🇨' },
  { code: '+20', name: '埃及', flag: '🇪🇬' },
  { code: '+503', name: '萨尔瓦多', flag: '🇸🇻' },
  { code: '+240', name: '赤道几内亚', flag: '🇬🇶' },
  { code: '+291', name: '厄立特里亚', flag: '🇪🇷' },
  { code: '+372', name: '爱沙尼亚', flag: '🇪🇪' },
  { code: '+251', name: '埃塞俄比亚', flag: '🇪🇹' },
  { code: '+679', name: '斐济', flag: '🇫🇯' },
  { code: '+358', name: '芬兰', flag: '🇫🇮' },
  { code: '+33', name: '法国', flag: '🇫🇷' },
  { code: '+241', name: '加蓬', flag: '🇬🇦' },
  { code: '+220', name: '冈比亚', flag: '🇬🇲' },
  { code: '+995', name: '格鲁吉亚', flag: '🇬🇪' },
  { code: '+49', name: '德国', flag: '🇩🇪' },
  { code: '+233', name: '加纳', flag: '🇬🇭' },
  { code: '+30', name: '希腊', flag: '🇬🇷' },
  { code: '+502', name: '危地马拉', flag: '🇬🇹' },
  { code: '+224', name: '几内亚', flag: '🇬🇳' },
  { code: '+245', name: '几内亚比绍', flag: '🇬🇼' },
  { code: '+592', name: '圭亚那', flag: '🇬🇾' },
  { code: '+509', name: '海地', flag: '🇭🇹' },
  { code: '+504', name: '洪都拉斯', flag: '🇭🇳' },
  { code: '+852', name: '香港', flag: '🇭🇰' },
  { code: '+36', name: '匈牙利', flag: '🇭🇺' },
  { code: '+354', name: '冰岛', flag: '🇮🇸' },
  { code: '+91', name: '印度', flag: '🇮🇳' },
  { code: '+62', name: '印度尼西亚', flag: '🇮🇩' },
  { code: '+98', name: '伊朗', flag: '🇮🇷' },
  { code: '+964', name: '伊拉克', flag: '🇮🇶' },
  { code: '+353', name: '爱尔兰', flag: '🇮🇪' },
  { code: '+972', name: '以色列', flag: '🇮🇱' },
  { code: '+39', name: '意大利', flag: '🇮🇹' },
  { code: '+225', name: '科特迪瓦', flag: '🇨🇮' },
  { code: '+81', name: '日本', flag: '🇯🇵' },
  { code: '+962', name: '约旦', flag: '🇯🇴' },
  { code: '+7', name: '哈萨克斯坦', flag: '🇰🇿' },
  { code: '+254', name: '肯尼亚', flag: '🇰🇪' },
  { code: '+965', name: '科威特', flag: '🇰🇼' },
  { code: '+996', name: '吉尔吉斯斯坦', flag: '🇰🇬' },
  { code: '+856', name: '老挝', flag: '🇱🇦' },
  { code: '+371', name: '拉脱维亚', flag: '🇱🇻' },
  { code: '+961', name: '黎巴嫩', flag: '🇱🇧' },
  { code: '+266', name: '莱索托', flag: '🇱🇸' },
  { code: '+231', name: '利比里亚', flag: '🇱🇷' },
  { code: '+218', name: '利比亚', flag: '🇱🇾' },
  { code: '+423', name: '列支敦士登', flag: '🇱🇮' },
  { code: '+370', name: '立陶宛', flag: '🇱🇹' },
  { code: '+352', name: '卢森堡', flag: '🇱🇺' },
  { code: '+853', name: '澳门', flag: '🇲🇴' },
  { code: '+389', name: '北马其顿', flag: '🇲🇰' },
  { code: '+261', name: '马达加斯加', flag: '🇲🇬' },
  { code: '+265', name: '马拉维', flag: '🇲🇼' },
  { code: '+60', name: '马来西亚', flag: '🇲🇾' },
  { code: '+960', name: '马尔代夫', flag: '🇲🇻' },
  { code: '+223', name: '马里', flag: '🇲🇱' },
  { code: '+356', name: '马耳他', flag: '🇲🇹' },
  { code: '+222', name: '毛里塔尼亚', flag: '🇲🇷' },
  { code: '+230', name: '毛里求斯', flag: '🇲🇺' },
  { code: '+52', name: '墨西哥', flag: '🇲🇽' },
  { code: '+373', name: '摩尔多瓦', flag: '🇲🇩' },
  { code: '+377', name: '摩纳哥', flag: '🇲🇨' },
  { code: '+976', name: '蒙古', flag: '🇲🇳' },
  { code: '+382', name: '黑山', flag: '🇲🇪' },
  { code: '+212', name: '摩洛哥', flag: '🇲🇦' },
  { code: '+258', name: '莫桑比克', flag: '🇲🇿' },
  { code: '+95', name: '缅甸', flag: '🇲🇲' },
  { code: '+264', name: '纳米比亚', flag: '🇳🇦' },
  { code: '+977', name: '尼泊尔', flag: '🇳🇵' },
  { code: '+31', name: '荷兰', flag: '🇳🇱' },
  { code: '+64', name: '新西兰', flag: '🇳🇿' },
  { code: '+505', name: '尼加拉瓜', flag: '🇳🇮' },
  { code: '+227', name: '尼日尔', flag: '🇳🇪' },
  { code: '+234', name: '尼日利亚', flag: '🇳🇬' },
  { code: '+850', name: '朝鲜', flag: '🇰🇵' },
  { code: '+47', name: '挪威', flag: '🇳🇴' },
  { code: '+968', name: '阿曼', flag: '🇴🇲' },
  { code: '+92', name: '巴基斯坦', flag: '🇵🇰' },
  { code: '+507', name: '巴拿马', flag: '🇵🇦' },
  { code: '+675', name: '巴布亚新几内亚', flag: '🇵🇬' },
  { code: '+595', name: '巴拉圭', flag: '🇵🇾' },
  { code: '+51', name: '秘鲁', flag: '🇵🇪' },
  { code: '+63', name: '菲律宾', flag: '🇵🇭' },
  { code: '+48', name: '波兰', flag: '🇵🇱' },
  { code: '+351', name: '葡萄牙', flag: '🇵🇹' },
  { code: '+974', name: '卡塔尔', flag: '🇶🇦' },
  { code: '+40', name: '罗马尼亚', flag: '🇷🇴' },
  { code: '+7', name: '俄罗斯', flag: '🇷🇺' },
  { code: '+250', name: '卢旺达', flag: '🇷🇼' },
  { code: '+966', name: '沙特阿拉伯', flag: '🇸🇦' },
  { code: '+221', name: '塞内加尔', flag: '🇸🇳' },
  { code: '+381', name: '塞尔维亚', flag: '🇷🇸' },
  { code: '+248', name: '塞舌尔', flag: '🇸🇨' },
  { code: '+232', name: '塞拉利昂', flag: '🇸🇱' },
  { code: '+65', name: '新加坡', flag: '🇸🇬' },
  { code: '+421', name: '斯洛伐克', flag: '🇸🇰' },
  { code: '+386', name: '斯洛文尼亚', flag: '🇸🇮' },
  { code: '+677', name: '所罗门群岛', flag: '🇸🇧' },
  { code: '+252', name: '索马里', flag: '🇸🇴' },
  { code: '+27', name: '南非', flag: '🇿🇦' },
  { code: '+82', name: '韩国', flag: '🇰🇷' },
  { code: '+211', name: '南苏丹', flag: '🇸🇸' },
  { code: '+34', name: '西班牙', flag: '🇪🇸' },
  { code: '+94', name: '斯里兰卡', flag: '🇱🇰' },
  { code: '+249', name: '苏丹', flag: '🇸🇩' },
  { code: '+597', name: '苏里南', flag: '🇸🇷' },
  { code: '+46', name: '瑞典', flag: '🇸🇪' },
  { code: '+41', name: '瑞士', flag: '🇨🇭' },
  { code: '+963', name: '叙利亚', flag: '🇸🇾' },
  { code: '+886', name: '台湾', flag: '🇹🇼' },
  { code: '+992', name: '塔吉克斯坦', flag: '🇹🇯' },
  { code: '+255', name: '坦桑尼亚', flag: '🇹🇿' },
  { code: '+66', name: '泰国', flag: '🇹🇭' },
  { code: '+228', name: '多哥', flag: '🇹🇬' },
  { code: '+216', name: '突尼斯', flag: '🇹🇳' },
  { code: '+90', name: '土耳其', flag: '🇹🇷' },
  { code: '+993', name: '土库曼斯坦', flag: '🇹🇲' },
  { code: '+256', name: '乌干达', flag: '🇺🇬' },
  { code: '+380', name: '乌克兰', flag: '🇺🇦' },
  { code: '+971', name: '阿联酋', flag: '🇦🇪' },
  { code: '+44', name: '英国', flag: '🇬🇧' },
  { code: '+1', name: '美国', flag: '🇺🇸' },
  { code: '+598', name: '乌拉圭', flag: '🇺🇾' },
  { code: '+998', name: '乌兹别克斯坦', flag: '🇺🇿' },
  { code: '+678', name: '瓦努阿图', flag: '🇻🇺' },
  { code: '+58', name: '委内瑞拉', flag: '🇻🇪' },
  { code: '+84', name: '越南', flag: '🇻🇳' },
  { code: '+967', name: '也门', flag: '🇾🇪' },
  { code: '+260', name: '赞比亚', flag: '🇿🇲' },
  { code: '+263', name: '津巴布韦', flag: '🇿🇼' },
];

function BookingMobile({
  step,
  formData,
  loading,
  error,
  handleSubmit,
  handleChange,
  handlePayment,
  navigate
}: BookingMobileProps) {
  const { t } = useLanguage();
  const [countryCode, setCountryCode] = useState('+86');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    const syntheticEvent = {
      target: {
        name: 'phone',
        value: `${countryCode}${value}`
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    setCountryCode(newCode);
    const syntheticEvent = {
      target: {
        name: 'phone',
        value: `${newCode}${phoneNumber}`
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
  };

  return (
    <div className="min-h-screen relative" style={{backgroundColor: '#F5F3F0'}}>
      <div className="fixed bottom-6 right-6 z-10">
        <span className="text-6xl font-light tracking-wider opacity-20" style={{color: '#1F1F1F'}}>
          YANORA
        </span>
      </div>

      <nav className="sticky top-0 z-50 py-4" style={{backgroundColor: '#F5F3F0'}}>
        <div className="px-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg font-light tracking-widest" style={{color: '#1F1F1F'}}>AESTHETIC</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="p-2"
          >
            <X className="w-5 h-5" style={{color: '#1F1F1F'}} />
          </button>
        </div>
      </nav>

      <section className="py-6 px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          {step === 'form' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h1 className="text-2xl font-light text-center mb-3 tracking-wide" style={{color: '#1F1F1F'}}>
                {t('booking.title')}
              </h1>
              <p className="text-center mb-6 text-xs tracking-wide" style={{color: '#6B7280'}}>
                {t('booking.subtitle')}
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-normal mb-2 tracking-wide" style={{color: '#1F1F1F'}}>
                      {t('booking.lastName')} <span style={{color: '#EF4444'}}>{t('booking.required')}</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border rounded-lg text-sm tracking-wide transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      style={{borderColor: '#E5E7EB', color: '#1F1F1F'}}
                      placeholder={t('booking.lastNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal mb-2 tracking-wide" style={{color: '#1F1F1F'}}>
                      {t('booking.firstName')} <span style={{color: '#EF4444'}}>{t('booking.required')}</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border rounded-lg text-sm tracking-wide transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      style={{borderColor: '#E5E7EB', color: '#1F1F1F'}}
                      placeholder={t('booking.firstNamePlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-normal mb-2 tracking-wide" style={{color: '#1F1F1F'}}>
                    {t('booking.email')} <span style={{color: '#EF4444'}}>{t('booking.required')}</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border rounded-lg text-sm tracking-wide transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    style={{borderColor: '#E5E7EB', color: '#1F1F1F'}}
                    placeholder={t('booking.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal mb-2 tracking-wide" style={{color: '#1F1F1F'}}>
                    {t('booking.phone')} <span style={{color: '#EF4444'}}>{t('booking.required')}</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                      className="px-3 py-3 bg-white border rounded-lg text-sm tracking-wide transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      style={{borderColor: '#E5E7EB', color: '#1F1F1F', minWidth: '100px'}}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      required
                      className="flex-1 px-4 py-3 bg-white border rounded-lg text-sm tracking-wide transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      style={{borderColor: '#E5E7EB', color: '#1F1F1F'}}
                      placeholder={t('booking.phonePlaceholder')}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 text-white text-sm font-light transition tracking-wider disabled:opacity-50 rounded-lg"
                    style={{backgroundColor: '#1C2B3A'}}
                  >
                    {loading ? t('booking.submitting') : t('booking.submit')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'payment' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="mb-6">
                <div className="border p-5 mb-6 rounded-lg" style={{borderColor: '#E5E7EB', backgroundColor: '#F9FAFB'}}>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-light tracking-wide" style={{color: '#1F1F1F'}}>
                      {t('booking.vipTitle')}
                    </h2>
                    <span className="text-2xl font-light" style={{color: '#1F1F1F'}}>{t('booking.vipPrice')}</span>
                  </div>
                  <p className="text-xs tracking-wide" style={{color: '#6B7280'}}>
                    {t('booking.vipDescription')}
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded">
                  {error}
                </div>
              )}

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handlePayment('PayPal')}
                  disabled={loading}
                  className="w-full py-3.5 border text-sm transition hover:bg-gray-50 disabled:opacity-50 rounded-lg font-normal tracking-wide"
                  style={{borderColor: '#E5E7EB', color: '#1F1F1F'}}
                >
                  {loading ? t('booking.processing') : t('booking.paypalPayment')}
                </button>

                <button
                  onClick={() => handlePayment('银行卡')}
                  disabled={loading}
                  className="w-full py-3.5 border text-sm transition hover:bg-gray-50 disabled:opacity-50 rounded-lg font-normal tracking-wide"
                  style={{borderColor: '#E5E7EB', color: '#1F1F1F'}}
                >
                  {loading ? t('booking.processing') : t('booking.cardPayment')}
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-normal mb-4 tracking-wide" style={{color: '#1F1F1F'}}>
                  {t('booking.selectServices')}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 border p-3 rounded-lg" style={{borderColor: '#E5E7EB'}}>
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-normal tracking-wide" style={{color: '#1F1F1F'}}>{t('booking.injection')}</span>
                        <span className="text-sm font-light" style={{color: '#1F1F1F'}}>{t('booking.injectionPrice')}</span>
                      </div>
                      <p className="text-xs" style={{color: '#6B7280'}}>{t('booking.injectionDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border p-3 rounded-lg" style={{borderColor: '#E5E7EB'}}>
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-normal tracking-wide" style={{color: '#1F1F1F'}}>{t('booking.surgery')}</span>
                        <span className="text-sm font-light" style={{color: '#1F1F1F'}}>{t('booking.surgeryPrice')}</span>
                      </div>
                      <p className="text-xs" style={{color: '#6B7280'}}>{t('booking.surgeryDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border p-3 rounded-lg" style={{borderColor: '#E5E7EB'}}>
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-normal tracking-wide" style={{color: '#1F1F1F'}}>{t('booking.hairConsult')}</span>
                        <span className="text-sm font-light" style={{color: '#1F1F1F'}}>{t('booking.hairConsultPrice')}</span>
                      </div>
                      <p className="text-xs" style={{color: '#6B7280'}}>{t('booking.hairConsultDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => navigate('/')}
                  className="text-xs transition tracking-wide"
                  style={{color: '#6B7280'}}
                >
                  {t('booking.backToHome')}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-green-100">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-light mb-2 tracking-wide" style={{color: '#1F1F1F'}}>
                {t('booking.successTitle')}
              </h1>
              <p className="mb-6 text-xs tracking-wide" style={{color: '#6B7280'}}>
                {t('booking.successMessage')}
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 text-white text-sm transition rounded-lg"
                style={{backgroundColor: '#1C2B3A'}}
              >
                {t('booking.backToHome')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BookingMobile;
