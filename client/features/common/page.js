import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 5rem;
  background: blanchedalmond;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  margin: 0;
`;

export function CommonPage() {
  return (
    <Wrap name="test">
      <Title>CommonPage Work</Title>
    </Wrap>
  );
}
