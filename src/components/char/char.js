import React, { Component } from 'react';
import './char.css';

export default class Char extends Component {
  constructor(props) {
    super(props);

    console.info(this.props);
    //global
    this.PIXEL_SIZE = 32;
    this.MOVING_SPEED = 2.5;

    //multiple key support for directions
    this.KEY_MAP = {
      ArrowDown : 'ArrowDown',
      ArrowUp : 'ArrowUp',
      ArrowRight : 'ArrowRight',
      ArrowLeft : 'ArrowLeft',
      w:'ArrowUp',
      a:'ArrowLeft',
      s:'ArrowDown',
      d:'ArrowRight'
    }

    this.KEY_MAP_SIMPLE = {
      ArrowDown : {
        DIR_POSITION : 0,
        MOVING_POSITION : this.PIXEL_SIZE * -3,
        MOVING_OFFSET : {
          dir : 'top',
          offset : 1
        }
      },
      ArrowUp : {
        DIR_POSITION : this.PIXEL_SIZE * -1,
        MOVING_POSITION : this.PIXEL_SIZE * -2,
        MOVING_OFFSET : {
          dir : 'top',
          offset : -1
        }
      },
      ArrowRight : {
        DIR_POSITION : this.PIXEL_SIZE * -2,
        MOVING_POSITION : this.PIXEL_SIZE * -1,
        MOVING_OFFSET : {
          dir : 'left',
          offset : 1
        },
      },
      ArrowLeft : {
        DIR_POSITION : this.PIXEL_SIZE * -3,
        MOVING_POSITION : this.PIXEL_SIZE * -4,
        MOVING_OFFSET : {
          dir : 'left',
          offset : -1
        },
      }
    };

    this.MOVING_TIMEOUT = undefined;
    //this is how the vertical pos is picked for the sprite sheet on which char model is desired.
    this.MODEL_Y_POSITION = this.PIXEL_SIZE * this.props.model * -5;

    //state
    this.state = {
      tilemap : this.props.tilemap,
      position : {
        x : 0,
        y : this.MODEL_Y_POSITION,
        left : undefined,
        top : undefined
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
    console.info('component did mount (char)');

    //sets starting position
    const coord = this.props.getCoord('board_0_0'); 

    let position = this.state.position;

    if(!this.state.position.left){
      position.left = coord.left;
      position.top = coord.top;
      this.setState({
        position:position
      });
    }
  }

  handleKeyDown = (event) => {

    //if there's an ongoing moving animation OR key unknown, ignore
    const key = this.KEY_MAP[event.key]
    if(this.MOVING_TIMEOUT || !this.KEY_MAP_SIMPLE[key]){
      return;
    }

    if(this.KEY_MAP_SIMPLE[key].MOVING_POSITION !== undefined) {
      //initiate moving animation
      const that = this;
      let counter = 0;

      function move() {
        const newPos = JSON.parse(JSON.stringify(that.state.position));
        newPos.y = that.MODEL_Y_POSITION + that.KEY_MAP_SIMPLE[key].MOVING_POSITION;
        //assuming the sprite sheet has 8 animations for directional moving ...
        if(counter >= 8){
          counter = 0;
        }
        newPos.x = that.PIXEL_SIZE * counter * -1;
        newPos[that.KEY_MAP_SIMPLE[key].MOVING_OFFSET.dir] += (that.KEY_MAP_SIMPLE[key].MOVING_OFFSET.offset * that.MOVING_SPEED);
        if(that.props.checkCoord(newPos.left,newPos.top)) {
          clearTimeout(that.MOVING_TIMEOUT);
          that.MOVING_TIMEOUT = undefined;
          return;
        }

        that.setState({
          position: newPos
        });

        counter++;
      }

      move();
      this.MOVING_TIMEOUT = setInterval(function() {
        move();
      },125);

    }
  }

  handleKeyUp = (event) => {
    clearTimeout(this.MOVING_TIMEOUT);
    //clearing timeout doesn't set this to undefined, so we are going to force it.
    this.MOVING_TIMEOUT = undefined;

    const key = this.KEY_MAP[event.key]
    //if key unknown, quit
    if(!this.KEY_MAP_SIMPLE[key]){
      return;
    }

    if(this.KEY_MAP_SIMPLE[key].DIR_POSITION !== undefined) {
      //change direction
      let position = this.state.position;
      position.x = this.KEY_MAP_SIMPLE[key].DIR_POSITION;
      position.y = this.MODEL_Y_POSITION;
      this.setState({
        position : position
      });
    }
  }

  render() {
    return (
      <div className="char"
           alt="nada"
           ref={ ref => { this[`${this.props.id}_ref`] = ref } }
           style={{
             width:this.PIXEL_SIZE + 'px',
             height:this.PIXEL_SIZE + 'px',
             backgroundImage : 'url(' + this.state.tilemap + ')',
             zoom : this.props.scale,
             backgroundPositionX : this.state.position.x + 'px',
             backgroundPositionY : this.state.position.y + 'px',
             position : 'absolute',
             left : this.state.position.left + 'px',
             top : this.state.position.top + 'px'
           }}
      />
    );
  }
}