import React, { Component } from 'react';
import './board.css';

export default class Char extends Component {
  constructor(props) {
    super(props);
    //global
    this.PIXEL_SIZE = 32;
    this.BLOCKED = 'blocked';

    //config
    this.showGrid_ = false;
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);

    //generate range for blocked coords
    for(const key in this.tiles) {
      if(this.tiles[key].status === this.BLOCKED) {
        const coord = this.getCoordFromBoardKey(key);
        const blockedCoord = {
          left: coord.left * this.PIXEL_SIZE,
          top: coord.top * this.PIXEL_SIZE
        }
        this.tiles[key].range = {
          x: [blockedCoord.left-this.PIXEL_SIZE, blockedCoord.left+this.PIXEL_SIZE],
          y: [blockedCoord.top-this.PIXEL_SIZE, blockedCoord.top+this.PIXEL_SIZE]
        };
      }
    }
  }

  handleKeyDown = (event) => {
    if(event.key === 'z') { // debug
      this.showGrid();
    }
  };

  getBoardKeyFromCoord = (x,y) => {
    return 'board_' + x + '_' + y;
  };

  getCoordFromBoardKey = (key) => {
    return JSON.parse(key.replace('board_','{"left":').replace('_',',"top":') + '}');
  };

  getCoord = (value) => {
    return {
      left: value.x * this.PIXEL_SIZE,
      top: value.y * this.PIXEL_SIZE
    };
  };

  // returns true if blocked
  checkCoord = (x,y) => {
    //check upper low boundaries
    if( x < 0 ||
        x > ((this.props.size.x-1) * this.PIXEL_SIZE) ||
        y > ((this.props.size.y-1) * this.PIXEL_SIZE) ||
        y < 0 ) {
      return true;
    }
    //check collision
    const boardX = Math.floor(x/this.PIXEL_SIZE);
    const boardY = Math.floor(y/this.PIXEL_SIZE);
    const boardPerms = [ // for efficiency, only check adjcent blocks
      [-1,-1],[0,-1],[1,-1],
      [-1,0 ],[0,0] ,[1,0 ],
      [-1,1 ],[0,1 ],[1,1 ]
    ];
    for(const perm of boardPerms) {
      const possibleX = boardX + perm[0];
      const possibleY = boardY + perm[1];
      if(possibleX >=0 && possibleY >= 0) {
        const blockedBoard= this.tiles[this.getBoardKeyFromCoord(possibleX,possibleY)];
        if(blockedBoard &&
           x > blockedBoard.range.x[0] && x+5 < blockedBoard.range.x[1] &&
           y > blockedBoard.range.y[0] && y+5 < blockedBoard.range.y[1]) {
          return true;
        }
      }
    }
    return false;
  };

  createBoard = () => {
    let tiles = [];
    //some blocked positions
    this.tiles = {};
    for(const prop in this.props.tiles) {
      for(const range of this.props.tiles[prop]) {
        for(let x = range.x[0]; x <= range.x[1]; x++) {
          for(let y = range.y[0]; y <= range.y[1]; y++) {
            const boardKey = this.getBoardKeyFromCoord(x,y);
            this.tiles[boardKey] = {
              status : prop
            };
          }
        }
      }
    }

    for(let i = 0; i < this.props.size.y; i++){
      for (let j = 0; j < this.props.size.x; j++) {
        const key = this.getBoardKeyFromCoord(j,i);
        tiles.push(
          <div key={key}
               ref={ ref => { this[`${key}_ref`] = ref } }
               style={{
                 zoom : this.props.scale
               }}
               className={'board'}>{
          }<span>{j},{i}</span></div>
        );
      }
    }
    return tiles;
  };

  createChars = () => {
    let chars = [];
    for(const child of this.props.children) {
      chars.push(
        React.cloneElement(
          child, {
            key : chars.length,
            index : chars.length,
            scale : this.props.scale,
            size : this.props.size,
            pixelSize : this.PIXEL_SIZE,
            getCoord: this.getCoord,
            checkCoord: this.checkCoord
          }
        )
      );
      if(child.props.active) { // don't block yourself
        continue;
      }
      this.tiles[this.getBoardKeyFromCoord(child.props.start.x,child.props.start.y)] = {
        status : this.BLOCKED,
      };
    }
    return chars;
  };

  showGrid = () => {
    this.showGrid_ = !this.showGrid_;
    for(let i = 0; i < this.props.size.y; i++){
      for (let j = 0; j < this.props.size.x; j++) {
        const boardKey = this.getBoardKeyFromCoord(j,i);
        let className = 'board ';
        if(this.showGrid_) {
          className += 'board-show-grid ';
          if(this.tiles[boardKey] && this.tiles[boardKey].status === this.BLOCKED) {
            className += ' blocked'
          }
        }
        this[boardKey + '_ref'].className = className;
      }
    }
  };

  render() {
    return (
      <div className={'board-parent'} 
           id="boardParent"
           style={{
            width: this.PIXEL_SIZE * this.props.size.x * this.props.scale,
            backgroundImage : 'url(' + this.props.tilemap + ')'
           }}>
        { this.createBoard() }
        { this.createChars() }
      </div>
    );
  }
}