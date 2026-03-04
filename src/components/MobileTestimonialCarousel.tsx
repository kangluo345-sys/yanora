import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  message: string;
  name: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    message: "非常满意这次的整形效果！医生非常专业，从咨询到手术再到术后恢复，每一步都让我感到安心。现在的我更加自信了，真的很感谢 YANOR A 团队！",
    name: "张女士"
  },
  {
    id: 2,
    message: "整个过程比我想象的要顺利得多。医生耐心地听取了我的需求，并给出了最适合我的方案。术后效果自然，周围的朋友都说我变美了！",
    name: "李先生"
  },
  {
    id: 3,
    message: "选择 YANOR A 是我做过最正确的决定。从面诊到手术，整个团队都非常专业。现在看到镜子里的自己，真的很开心！",
    name: "王女士"
  },
  {
    id: 4,
    message: "医生的技术真的很棒！效果超出了我的预期。术后恢复也很快，没有什么不适。强烈推荐给想要变美的朋友们！",
    name: "陈女士"
  },
  {
    id: 5,
    message: "从咨询到术后跟踪，YANOR A 的服务让我非常满意。医生很细心，解答了我所有的疑问。整形后的效果非常自然，我很满意！",
    name: "刘女士"
  },
  {
    id: 6,
    message: "朋友推荐我来的，果然没有让我失望。医生的审美很好，设计的方案很适合我。现在每天照镜子都很开心！",
    name: "赵先生"
  },
  {
    id: 7,
    message: "医院环境很好，医生和护士都很专业。手术过程很顺利，恢复得也很快。选择 YANOR A 是正确的决定！",
    name: "孙女士"
  },
  {
    id: 8,
    message: "非常感谢 YANOR A 的团队！从面诊到手术，再到术后恢复，每一步都很专业。现在的我更有自信了！",
    name: "周女士"
  }
];

function MobileTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }

    if (touchStart - touchEnd < -75) {
      handlePrevious();
    }
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full">
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="py-8 px-4 md:px-12">
          <div className="flex gap-4 md:gap-8 justify-center items-start mb-6 md:mb-10">
            <div className="bg-white shadow-xl md:hidden" style={{ width: '110px', aspectRatio: '3/4' }}>
              <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#E8F4EA'}}>
                <span className="text-xs" style={{color: '#6B7280'}}>WA {currentTestimonial.id}</span>
              </div>
            </div>

            <div className="bg-white shadow-xl md:hidden" style={{ width: '110px', aspectRatio: '3/4' }}>
              <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#B9CBDC'}}>
                <span className="text-xs text-gray-500">照片 {currentTestimonial.id}-1</span>
              </div>
            </div>

            <div className="bg-white shadow-xl md:hidden" style={{ width: '110px', aspectRatio: '3/4' }}>
              <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#A0A7B5'}}>
                <span className="text-xs text-white">照片 {currentTestimonial.id}-2</span>
              </div>
            </div>

            <div className="hidden md:block bg-white shadow-xl" style={{ width: '180px', aspectRatio: '3/4' }}>
              <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#E8F4EA'}}>
                <span className="text-base" style={{color: '#6B7280'}}>WA {currentTestimonial.id}</span>
              </div>
            </div>

            <div className="hidden md:block bg-white shadow-xl" style={{ width: '180px', aspectRatio: '3/4' }}>
              <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#B9CBDC'}}>
                <span className="text-base text-gray-500">照片 {currentTestimonial.id}-1</span>
              </div>
            </div>

            <div className="hidden md:block bg-white shadow-xl" style={{ width: '180px', aspectRatio: '3/4' }}>
              <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#A0A7B5'}}>
                <span className="text-base text-white">照片 {currentTestimonial.id}-2</span>
              </div>
            </div>
          </div>

          <div className="text-center max-w-lg md:max-w-2xl mx-auto">
            <p className="text-sm md:text-base font-light leading-relaxed mb-4 md:mb-6" style={{color: '#4B5563'}}>
              "{currentTestimonial.message}"
            </p>
            <p className="text-xs md:text-sm font-normal" style={{color: '#1F1F1F'}}>
              — {currentTestimonial.name}
            </p>
          </div>
        </div>

        <button
          onClick={handlePrevious}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white shadow-lg transition-opacity opacity-70 hover:opacity-100"
          style={{color: '#1C2B3A'}}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white shadow-lg transition-opacity opacity-70 hover:opacity-100"
          style={{color: '#1C2B3A'}}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all"
            style={{
              backgroundColor: currentIndex === index ? '#1C2B3A' : '#D1D5DB'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MobileTestimonialCarousel;
