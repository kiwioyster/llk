import * as React from 'react';
import styled, { css } from 'styled-components';
interface OuterProp {
  highlight: boolean;
  errorHighlight?: boolean;
}
interface Prop {
  coord: ICoord;
  id: number;
  tileClick: (coord: ICoord, id: number) => void;
  highlight?: boolean;
  errorHighlight?: boolean;
}
const TileBlock = styled.div<OuterProp>`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: var(--color-slate);
  width: 54px;
  height: 54px;
  margin: 4px;
  border-radius: 5px;
  cursor: pointer;
  &:active {
    box-shadow: 0px 1px 5px var(--color-black-50) inset;
    & img {
      transform: translateY(1px);
    }
  }
  ${(props) => {
    if (props.highlight) {
      return css`
        background-color: var(--color-aero);
      `;
    } else if (props.errorHighlight) {
      return css`
        background-color: var(--color-melon);
      `;
    }
  }}
  & img {
    height: 50px;
    width: 50px;
    margin: auto;
  }
`;
const Tile: React.FC<Prop> = ({
  id,
  coord,
  tileClick,
  highlight,
  errorHighlight,
}) => {
  const click = () => {
    tileClick(coord, id);
  };
  return (
    <TileBlock
      highlight={!!highlight}
      errorHighlight={!!errorHighlight}
      onClick={click}
    >
      <img alt={'tile pic'} src={require(`../assets/${id}.png`)} />
    </TileBlock>
  );
};

export default Tile;
