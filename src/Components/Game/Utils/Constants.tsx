import { Direction } from './Interfaces';
export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const DIRECTIONS: string[] = ['horizontal', 'horizontalBack', 'vertical', 'verticalUp', 'diagonal', 'diagonalBack', 'diagonalUp', 'diagonalUpBack'];
export const GAME_BOARD_SIZE: number = 15;

export const GET_NEXT_TILE: Direction = {
	horizontal: (x: number, y: number, i: number) => ({
		x: x + i,
		y: y,
	}),
	horizontalBack: (x: number, y: number, i: number) => ({
		x: x - i,
		y,
	}),
	vertical: (x: number, y: number, i: number) => ({
		x,
		y: y + i,
	}),
	verticalUp: (x: number, y: number, i: number) => ({
		x,
		y: y - i,
	}),
	diagonal: (x: number, y: number, i: number) => ({
		x: x + i,
		y: y + i,
	}),
	diagonalBack: (x: number, y: number, i: number) => ({
		x: x - i,
		y: y + i,
	}),
	diagonalUp: (x: number, y: number, i: number) => ({
		x: x + i,
		y: y - i,
	}),
	diagonalUpBack: (x: number, y: number, i: number) => ({
		x: x - i,
		y: y - i,
	}),
};
export const IS_DIRECTION_VALID: Direction = {
	horizontal: (x: number, y: number, wordLength: number, GAME_BOARD_SIZE: number) => GAME_BOARD_SIZE >= x + wordLength,
	horizontalBack: (x: number, y: number, wordLength: number, GAME_BOARD_SIZE: number) => x + 1 >= wordLength,
	vertical: (x: number, y: number, wordLength: number, GAME_BOARD_SIZE: number) => GAME_BOARD_SIZE >= y + wordLength,
	verticalUp: (x: number, y: number, wordLength: number, GAME_BOARD_SIZE: number) => y + 1 >= wordLength,
	diagonal: (x: number, y: number, wordLength: number, GAME_BOARD_SIZE: number) => GAME_BOARD_SIZE >= x + wordLength && GAME_BOARD_SIZE >= y + wordLength,
	diagonalBack: (x: number, y: number, wordLength: number, GAME_BOARD_SIZE: number) => x + 1 >= wordLength && GAME_BOARD_SIZE >= y + wordLength,
	diagonalUp: (x: number, y: number, wordLength: number, GAME_BOARD_SIZE: number) => GAME_BOARD_SIZE >= x + wordLength && y + 1 >= wordLength,
	diagonalUpBack: (x: number, y: number, wordLength: number, GAME_BOARD_SIZE: number) => x + 1 >= wordLength && y + 1 >= wordLength,
};
export const SKIP_TILE: Direction = {
	horizontal: (x: number, y: number, wordLength: number) => ({
		x: 0,
		y: y + 1,
	}),
	horizontalBack: (x: number, y: number, wordLength: number) => ({
		x: wordLength - 1,
		y: y,
	}),
	vertical: (x: number, y: number, wordLength: number) => ({
		x: 0,
		y: y + 100,
	}),
	verticalUp: (x: number, y: number, wordLength: number) => ({
		x: 0,
		y: wordLength - 1,
	}),
	diagonal: (x: number, y: number, wordLength: number) => ({
		x: 0,
		y: y + 1,
	}),
	diagonalBack: (x: number, y: number, wordLength: number) => ({
		x: wordLength - 1,
		y: x >= wordLength - 1 ? y + 1 : y,
	}),
	diagonalUp: (x: number, y: number, wordLength: number) => ({
		x: 0,
		y: y < wordLength - 1 ? wordLength - 1 : y + 1,
	}),
	diagonalUpBack: (x: number, y: number, wordLength: number) => ({
		x: wordLength - 1,
		y: x >= wordLength - 1 ? y + 1 : y,
	}),
};
