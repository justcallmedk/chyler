import './App.css';
import Board from './components/board/board.js'
import Char from './components/char/char.js'

function App() {
  return (
    <div className="App">
      Hello, world
        <Board scale={2} 
               sizeY={5} 
               sizeX={10}>
          <Char model="15"
                id="mychar"
                tilemap="/assets/char_tilemap.png">foo</Char>
        </Board>
    </div>
  );
}

export default App;
