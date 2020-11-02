interface IScore {
  name: string;
  seconds: number;
}

type GameState = {
  scores: IScore[];
  grid: ICell[][];
};

type GameAction = {
  type: string;
  score?: IScore;
  coords?: ICoord[];
};

type DispatchType = (args: GameAction) => GameAction;

interface ICoord {
  x: number;
  y: number;
}

interface ICell {
  coord: {
    x: number;
    y: number;
  };
  content?: 'path' | 'tile';
  id?: number;
}

interface ModalProps {
  type: 'error' | 'success';
  header: string;
  body?: string;
  btnText: string;
  btnCallback: () => void;
}
