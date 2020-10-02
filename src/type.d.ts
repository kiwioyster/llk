interface IScore {
  name: string;
  seconds: number;
}

type ScoreState = {
  scores: IScore[];
};

type ScoreAction = {
  type: string;
  score: IScore;
};

type DispatchType = (args: ScoreAction) => ScoreAction;
