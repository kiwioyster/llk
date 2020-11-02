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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
const ModalBlock = styled.div<OuterProp>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-color: green;
  width: 350px;
  height: 380px;
  margin: 4px;
  border-radius: 5px;
  & button {
    width: 200px;
    height: 50px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  & p {
    height: 80px;
  }
  &:active {
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5) inset;
  }
  ${(props) =>
    props.type === 'error' &&
    css`
      background-color: red;
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
