import styled from 'styled-components';

export const CenterLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translage(-50%, -50%);
`;

export const Page = styled.div`
  position: relative;
  ${
    '' /* padding: 20px 20px 20px 20px;
  margin: 0 auto; */
  }
`;
export const PageContainer = styled.main``;

export const SectionDivier = styled.div`
  margin: 20px 0;
`;

export const SectionHeader = styled.div`
  width: 1300px;
  margin: 0 auto;
  ${'' /* margin: 128px 0 26px 0; */}
`;

export const SectionContainer = styled.div`
  margin: 10px 0 0 0;
`;

export const SectionHalf = styled.div`
  padding: ${({ padding }) => padding};
  margin-right: ${({ mr }) => mr}px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

export const ContentDivider = styled.div`
  padding: 10px;
`;

export const AlignComponents = styled.div`
  display: flex;
  justify-content: center;
  ${'' /* align-items: center; */}
  margin-bottom: ${({ mb }) => mb}px;
  background: ${({ bg }) => bg};
`;

export const AlignList = styled.ul`
  display: flex;
`;

export const ListContainer = styled.ul`
  display: ${({ display }) => display};
`;

export const FormWrapper = styled.div`
  width: 100%;
`;
