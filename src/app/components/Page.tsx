import { colours } from 'constants/colours';
import React from 'react';
import styled from 'styled-components/macro';

interface Props {
  heading?: string;
  children?: React.ReactNode;
  noPadding?: boolean;
}

const Container = styled.section<Props>`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  padding: ${props => (props.noPadding ? '0' : '20px')};
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  height: 100%;
  overflow: hidden;
`;

const PageHeading = styled.h1`
  margin: 0;
  color: ${colours.navy};
`;

const Page = ({ heading, children, noPadding }: Props) => {
  return (
    <Container noPadding={noPadding}>
      {heading && <PageHeading>{heading}</PageHeading>}
      <Content>{children}</Content>
    </Container>
  );
};

export default Page;
