export interface ApiResp {
	name: string;
	url: string;
}

export interface CleanData extends ApiResp {
	svg: string;
}

export interface WordsToWatch extends CleanData {
	isFound: boolean;
}

export interface Location {
	y: number;
	x: number;
	direction: string;
	overlap: number;
}

export interface TileCoor {
	x: number;
	y: number;
}

export interface Tile {
	letter: string;
	coordinates?: TileCoor | null;
	isSelected: boolean;
	letterIndex: number;
	word: string;
}

export interface Direction {
	[index: string]: Function;
	// | ((x: number, y: number, i: number) => { x: number; y: number })
	// | ((x: number, y: number, wordLength: number, GAME_BOARD_SIZE: number) => boolean)
	// | ((x: number, y: number, wordLength: number) => { x: number; y: number });
}
