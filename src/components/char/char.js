import React, { Component } from 'react';
import { KEY_MAP, KEY_MAP_SIMPLE } from './keymap'
import './char.css';

export default class Char extends Component {
  constructor(props) {
    super(props);

    //global
    this.PIXEL_SIZE = this.props.pixelSize;
    this.MOVING_SPEED = props.speed;
    this.ACTION = { // action map to func
      spin : this.spin
    };

    //multiple key support for directions (defined in ./keymap)
    this.KEY_MAP = KEY_MAP;
    this.KEY_MAP_SIMPLE = KEY_MAP_SIMPLE(this.PIXEL_SIZE);

    this.MOVING_TIMEOUT = undefined;
    //this is how the vertical pos is picked for the sprite sheet on which char model is desired.
    this.MODEL_Y_POSITION = this.PIXEL_SIZE * this.props.model * -5;
    this.model = this.props.model;

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
    if(this.props.active) {
      document.addEventListener("keydown", this.handleKeyDown, false);
      document.addEventListener("keyup", this.handleKeyUp, false);
    }
    let position = this.state.position;
    if(!this.state.position.left){
      //sets starting position
      let startPos = {x:0,y:0};
      if(this.props.start) {
        if(this.props.start.x >= this.props.size.x ||
           this.props.start.y >= this.props.size.y) {
          console.error('Start position out of bound');
        }
        else {
          startPos = {
            x: this.props.start.x,
            y: this.props.start.y-this.props.index
          }
        }
      }
      const coord = this.props.getCoord(startPos); 
      position.left = coord.left;
      position.top = coord.top;
      this.setState({
        position:position
      });

      //test custom action
      if(!this.props.active && this.props.action && this.ACTION[this.props.action]) {
        this.ACTION[this.props.action]();
      }
    }
  }

  handleKeyDown = (event) => {
    if(event.key === 'c') { // change character
      let newPos = this.state.position;
      this.model = this.model+1;
      this.MODEL_Y_POSITION = this.PIXEL_SIZE * this.model * -5;
      newPos.y = this.MODEL_Y_POSITION 
              this.setState({
          position: newPos
        });
      return;
    }

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
        const newPos = JSON.parse(JSON.stringify(that.state.position)); // ?
        newPos.y = that.MODEL_Y_POSITION + that.KEY_MAP_SIMPLE[key].MOVING_POSITION;
        //assuming the sprite sheet has 8 animations for directional moving ...
        if(counter >= 8){
          counter = 0;
        }
        const oldPos = newPos[that.KEY_MAP_SIMPLE[key].MOVING_OFFSET.dir]; //save old position in case blocked
        newPos.x = that.PIXEL_SIZE * counter * -1;
        newPos[that.KEY_MAP_SIMPLE[key].MOVING_OFFSET.dir] += (that.KEY_MAP_SIMPLE[key].MOVING_OFFSET.offset * that.MOVING_SPEED);
        
        //check if coord is blocked
        if(that.props.checkCoord(newPos.left,newPos.top, that.KEY_MAP_SIMPLE[key].MOVING_OFFSET.dir)) {
          newPos[that.KEY_MAP_SIMPLE[key].MOVING_OFFSET.dir] = oldPos;
          clearTimeout(that.MOVING_TIMEOUT);
          that.MOVING_TIMEOUT = undefined;
        }

        that.setState({
          position: newPos
        });
        counter++;
      }

      move();
      this.MOVING_TIMEOUT = setInterval(function() {
        move();
      // TODO : What's the optimal interval rate?
      },this.MOVING_SPEED * 10); //interval is equivalent of refresh rate

    }
  };

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
  };

  spin = () => {
    const that = this;
    let i = 0;
    this.MOVING_TIMEOUT = setInterval(function() {
      const newPos = that.state.position;
      newPos.y = that.MODEL_Y_POSITION + Object.values(that.KEY_MAP_SIMPLE)[i].MOVING_POSITION;
      that.setState({
        position: newPos
      });
      i = i >= 3 ? 0 : ++i;
    },1000);
  };

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
             left : this.state.position.left + 'px',
             top : this.state.position.top + 'px'
           }}
      />
    );
  }
}