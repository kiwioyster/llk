import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
const PLANETS = gql`
  {
    planets {
      id
      name
      cuisine
    }
  }
`;
const Score: React.FC = () => {
  const { loading, error, data } = useQuery(PLANETS, {
    onCompleted: (d) => console.log(d),
  });
  return <div>hi</div>;
};

export default Score;
