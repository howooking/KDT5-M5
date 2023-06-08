import Carousel from 'nuka-carousel';

const SLIDES = [0, 1, 2, 3, 4, 5];

export default function Slider() {
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
          color: '#e41717',
        },
      }}
    >
      {SLIDES.map((slide) => (
        <img
          src={`slider/mainSlide${slide}.jpg`}
          alt={`/mainSlide${slide}`}
          className="mx-auto select-none hover:opacity-80"
        />
      ))}
    </Carousel>
  );
}
