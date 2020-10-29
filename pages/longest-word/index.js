import Layout from '../../components/Layout';
import GameMenu from '../../components/GameMenu';
import Game from './Game';
import { useState } from 'react';

function LongestWord() {
  const [mode, setMode] = useState('single');
  const [gameReady, setGameReady] = useState(false);
  return (
    <Layout>
      <GameMenu setGameReady={setGameReady} setMode={setMode} title="The Longest Word" />
      {gameReady && <Game mode={mode} />}
    </Layout>
  );
}

export default LongestWord;
