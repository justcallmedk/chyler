import React, { Component } from 'react';
import './board.css';

export default class Char extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.warn('component did mount (board)');
    this.blockedX = [];
    this.blockedY = [];

    for(const key in this.tilesProp) {
      const blockedCoord = this[key + '_ref'].getBoundingClientRect();
      this.blockedX.push([blockedCoord.left-32, blockedCoord.left+32]);
      this.blockedY.push([blockedCoord.top-32, blockedCoord.top+32]);
    }
  }

  getCoord = (value) => {
    return this[value + '_ref'].getBoundingClientRect();
  }

  //returns true if blocked
  checkCoord = (x,y) => {
    let isBlockedX = false;
    let isBlockedY = false;

    //check upper low boundaries
    if( x < 0 ||
        x > ((this.props.size.x-1) * 32) ||
        y > ((this.props.size.y-1) * 32) ||
        y < 0 ) {
      return true;
    }

    for(const x_ of this.blockedX){
      isBlockedX = x > x_[0] && x < x_[1];
    }
    for(const y_ of this.blockedY){
      isBlockedY = y > y_[0] && y < y_[1];
    }
    return isBlockedX && isBlockedY;
  }

  createBoard = () => {
    let tiles = [];
    //same blocked positions
    this.tilesProp = {
      'board_1_1' : 'blocked'
    };

    for(let i = 0; i < this.props.size.y; i++){
      for (let j = 0; j < this.props.size.x; j++) {
        const key = 'board_' + j + '_' + i;
        const prop = this.tilesProp[key] ? this.tilesProp[key] : '';
        tiles.push(
          <div key={key}
               ref={ ref => { this[`${key}_ref`] = ref } }
               style={{
                 zoom : this.props.scale
               }}
               className={'board ' + prop}>{
          }</div>
        );
      }
    }

    return tiles;
  }

  render() {
    return (
      <div className={'board-parent'} 
           id="boardParent"
           style={{
            width: 32 * this.props.size.x * this.props.scale
           }}>
        {this.createBoard()}
        { React.cloneElement(
            this.props.children, {
              scale : this.props.scale,
              getCoord: this.getCoord,
              checkCoord: this.checkCoord
            }
          )
        }
      </div>
    );
  }
}