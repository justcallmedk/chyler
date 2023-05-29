import './App.css';
import Board from './components/board/board.js'
import Char from './components/char/char.js'

function App() {
  return (
    <div className="App">
      <Board
        scale={1}
        size={{x:34,y:18}}
        tiles={{
          blocked : [
            { x:[5,21],   y:[16,17] },
            { x:[26,33],  y:[16,17] },
            { x:[5,21],   y:[11,11] },
            { x:[5,5],    y:[12,15] },
            { x:[21,21],  y:[0,10]  },
            { x:[26,33],  y:[11,11] },
            { x:[26,26],  y:[0,10] }
          ]
        }}
        tilemap={'/assets/board_tilemap.gif'}>
        <Char 
          active={true}
          model={Math.floor(Math.random() * 50)}
          speed={5}
          start={{x:23,y:16}}
          tilemap={'/assets/char_tilemap.png'}>myChar</Char>
        <Char 
          active={false}
          model={Math.floor(Math.random() * 50)}
          speed={5}
          start={{x:6,y:14}}
          tilemap={'/assets/char_tilemap.png'}>NPC</Char>
        <Char 
          active={false}
          model={16}
          speed={5}
          start={{x:24,y:14}}
          tilemap={'/assets/char_tilemap.png'}>doggo</Char>
        <Char 
          active={false}
          model={Math.floor(Math.random() * 50)}
          speed={5}
          start={{x:23,y:2}}
          tilemap={'/assets/char_tilemap.png'}>NPC</Char>
        <Char 
          active={false}
          model={Math.floor(Math.random() * 50)}
          speed={5}
          start={{x:32,y:13}}
          tilemap={'/assets/char_tilemap.png'}>NPC</Char>
      </Board>
      <div className={'help'}>
        Move : Arrow keys / w a s d <br /><br />
        Change Model : c<br /><br />
        Debug : z<br /><br />
        <a href="https://github.com/justcallmedk/chyler" target="_blank">Github</a>
      </div>
    </div>
  );
}

export default App;