import * as React from 'react';
import styled, { css } from 'styled-components';
interface OuterProp {
  type: 'error' | 'success';
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--color-black-50);
  z-index: 1;
`;
const ModalBlock = styled.div<OuterProp>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-color: var(--color-aero);
  width: 350px;
  height: 380px;
  margin: 4px;
  border-radius: 5px;
  & * {
    color: var(--color-black);
  }
  & button {
    width: 200px;
    height: 50px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: var(--color-blue);
    font-size: 16px;
  }
  & p {
    height: 80px;
  }
  ${(props) =>
    props.type === 'error' &&
    css`
      background-color: var(--color-melon);
    `}
`;
const Modal: React.FC<ModalProps> = ({
  type,
  header,
  body,
  btnText,
  btnCallback,
}) => {
  return (
    <Background>
      <ModalBlock type={type}>
        <h1>{header}</h1>
        <p>{body}</p>
        <button onClick={btnCallback}>{btnText}</button>
      </ModalBlock>
    </Background>
  );
};

export default Modal;
