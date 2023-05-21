# Project Chyler

in dedication to Janey Briggs, the great iconic character of 90's

## Set up & Run
```bash
npm install
npm start
```

## Configuration
```js
<Board 
	scale={2} // tile & character scale 
 	scale={2} 
 	size={{x:5,y:5}}> // size of the board
	<Char
		model="15" //character position in sprite tile map
		tilemap="/assets/char_tilemap.png" // src of the sprite map
   	id="myChar">
    	sample character
	</Char>
</Board>
```