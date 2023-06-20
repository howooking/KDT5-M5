import { SLIDES } from '@/constants/constants';
import Carousel from 'nuka-carousel';
import { useNavigate } from 'react-router-dom';

export default function ImageSlider() {
  const navigate = useNavigate();
  return (
    <Carousel
      autoplay
      autoplayInterval={3000}
      // adaptiveHeight
      cellAlign="center"
      dragThreshold={0.1}
      cellSpacing={600}
      disableEdgeSwiping={false} //처음 마지막 슬라이드에서 앞 or 뒤로 스와이핑 안된다.
      enableKeyboardControls
      pauseOnHover
      slidesToShow={1}
      speed={500}
      wrapAround
      defaultControlsConfig={{
        nextButtonStyle: { display: 'none' },
        prevButtonStyle: { display: 'none' },
        pagingDotsStyle: {
          margin: '4px 6px',
          border: '2px solid #e41717',
          borderRadius: '50%',
        },
      }}
    >
      {SLIDES.map((slide) => (
        <img
          key={slide.id}
          src={`slider/mainSlide${slide.id}.jpg`}
          alt={`/mainSlide${slide.label}`}
          className="mx-auto cursor-pointer select-none hover:opacity-80"
          onClick={() => navigate(`${slide.href}`)}
        />
      ))}
    </Carousel>
  );
}
