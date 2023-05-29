export const KEY_MAP = {
	ArrowDown : 'ArrowDown',
	ArrowUp : 'ArrowUp',
	ArrowRight : 'ArrowRight',
	ArrowLeft : 'ArrowLeft',
	w:'ArrowUp',
	a:'ArrowLeft',
	s:'ArrowDown',
	d:'ArrowRight'
};

export const KEY_MAP_SIMPLE = (PIXEL_SIZE) => {
	return {
    ArrowDown : {
      DIR_POSITION : 0,
      MOVING_POSITION : PIXEL_SIZE * -3,
      MOVING_OFFSET : {
        dir : 'top',
        offset : 1
      }
    },
     ArrowLeft : {
      DIR_POSITION : PIXEL_SIZE * -3,
      MOVING_POSITION : PIXEL_SIZE * -4,
      MOVING_OFFSET : {
        dir : 'left',
        offset : -1
      },
    },
    ArrowUp : {
      DIR_POSITION : PIXEL_SIZE * -1,
      MOVING_POSITION : PIXEL_SIZE * -2,
      MOVING_OFFSET : {
        dir : 'top',
        offset : -1
      }
    },
    ArrowRight : {
      DIR_POSITION : PIXEL_SIZE * -2,
      MOVING_POSITION : PIXEL_SIZE * -1,
      MOVING_OFFSET : {
        dir : 'left',
        offset : 1
      },
    }
  }
};