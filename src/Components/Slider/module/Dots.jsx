import React from 'react';
import { DotWrapper, Dot, DotLi, DotList } from '../sources/Slider.style.js';
import SliderStop from '../play/SliderStop';
import SliderPlay from '../play/SliderPlay';
import { OffScreenSpan } from '../../../Assets/Styles/Basic.style.js';

function Dots({ slides, activeIndex, handlePlay, handleStop }) {
  return (
    <DotWrapper>
      <SliderStop handleStop={handleStop} />
      <DotList>
        {slides.map((slide, i) => (
          <DotLi key={slide.id}>
            <Dot key={slide.id} active={activeIndex === i}>
              <OffScreenSpan> {slide?.alt}</OffScreenSpan>
            </Dot>
          </DotLi>
        ))}
      </DotList>
      <SliderPlay handlePlay={handlePlay} />
    </DotWrapper>
  );
}

export default Dots;
