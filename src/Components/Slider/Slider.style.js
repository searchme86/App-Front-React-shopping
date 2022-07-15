import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 690px;
  height: 500px;
  overflow: hidden;
`;

export const ButtonArrow = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transition: transform ease-in 0.1s;

  ${({ direction }) =>
    direction === 'right' &&
    css`
      right: 25px;
    `}

  ${({ direction }) =>
    direction === 'left' &&
    css`
      left: 25px;
    `}


  &:hover {
    transform: scale(1.1);
  }
  img {
    transform: translateX(
      ${({ direction }) => (direction === 'left' ? '-2' : '2')}px
    );
    &:focus {
      outline: 0;
    }
  }
`;

export const DotWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dot = styled.span`
  padding: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${({ active }) => (active ? 'black' : 'white')};
`;

export const SContent = styled.div`
  transform: translateX(-${(props) => props.translate}px);
  transition: transform ease-out ${(props) => props.transition}s;
  height: 100%;
  width: ${({ width }) => width}px;
  display: flex;
`;

export const Sslide = styled.div`
  height: 100;
  width: 100%;
  background-image: url('${(props) => props.content}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Play = styled.div`
  position: absolute;
  bottom: 10px;
  width: 20px;
  height: 20px;
  left: 50%;
  border-radius: 50%;
`;

export const Stop = styled.div`
  position: absolute;
  bottom: 10px;
  ${
    '' /* width: 20px;
  height: 20px; */
  }
  left: 30%;
  ${'' /* border-radius: 50%; */}
`;

// const Stop = styled.div`
//   position: absolute;
//   bottom: 10px;
//   width: 100px;
//   height: 100px;
//   left: 30%;
//   border-radius: 50%;
// `;
