# Project Chyler

in dedication to Janey Briggs, the great iconic character of 90's

## Set up & Run
```bash
npm install
npm start
```

## Configuration
```js
<Board scale={2} // tile / character scale 
       sizeY={5} 
       sizeX={10}>
	<Char model="15" //character position in sprite tile map
		  tilemap="/assets/char_tilemap.png" // src of the sprite map
          id="mychar">
        sample character
   	</Char>
</Board>
```