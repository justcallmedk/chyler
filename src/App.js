import './App.css';
import Board from './components/board/board.js'
import Char from './components/char/char.js'

function App() {
  return (
    <div className="App">
        <Board
          scale={2} 
          size={{x:5,y:5}}>
          <Char 
            model="15"
            id="myChar"
            tilemap="/assets/char_tilemap.png">myChar</Char>
        </Board>
    </div>
  );
}

export default App;
