export interface ApiResp {
	name: string;
	url: string;
}

export interface Location {
	y: number;
	x: number;
	direction: string;
	overlap: number;
}

interface TileCoor {
	x: number;
	y: number;
}

export interface Tile {
	letter: string;
	coordinates: TileCoor;
	wordLength: number;
	letterIndex: number;
}

export interface Direction {
	[index: string]: Function;
	// | ((x: number, y: number, i: number) => { x: number; y: number })
	// | ((x: number, y: number, wordLength: number, GAME_BOARD_SIZE: number) => boolean)
	// | ((x: number, y: number, wordLength: number) => { x: number; y: number });
}
