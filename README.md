# Project Chyler

in dedication to Janey Briggs, the great iconic character of 90's

## Description
Simple lightweight [sprite](https://en.wikipedia.org/wiki/Sprite_(computer_graphics)) engine for web

## Demo
[https://chyler.sooda.io](https://chyler.sooda.io)

## Dependencies
Node.js<br />
React

## Set Up & Run
```bash
npm install
npm start
```

## Configuration
```js
<Board 
	scale={2} // tile & character scale 
 	size={{x:5,y:5}} // size of the board
	tiles={{ // range of blocked tiles
		blocked : [
			{ x:[5,21],   y:[16,17] },
			{ x:[26,33],  y:[16,17] }
		]
	}}
 	tilemap={'/assets/board_tilemap.gif'} // src of the board map
 	id="myBoard">

	<Char
		active={true} // playable vs npc
		speed={5} // speed of the movement
		model={15} // character position in sprite tile map
		start={{x:0,y:0}} // starting position
		tilemap={'/assets/char_tilemap.png'} // src of the sprite map
		id="myChar">
		sample character
	</Char>
	<Char // you can create multiple characters
	// ...
	</Char>
</Board>
```

## Control
Move : Arrow keys / w a s d<br />
Change Model : c<br />
Debug : z<br />

## In Development
### More refined custom action
```js
action = {
	event : 'idle' || 'interact',
	do : 'spin' || 'dialog("hello")' || customFunc
};
```
### Interaction
- NPC faces the direction of player when adjacent
- Space bar triggers action