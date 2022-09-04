import { ALPHABET, GAME_BOARD_SIZE, DIRECTIONS, GET_NEXT_TILE, IS_DIRECTION_VALID, SKIP_TILE } from './Constants';
import { CleanData, Location, Tile, TileCoor, WordsToWatch } from './Interfaces';

export function generateGameBoard(): string[][] {
	let board: string[][] = [];
	for (let i = 0; i < GAME_BOARD_SIZE; i++) {
		board.push([]);
		for (let j = 0; j < GAME_BOARD_SIZE; j++) {
			board[i].push('_');
		}
	}
	return board;
}

export function getRandomWord(wordList: CleanData[], wordsInTheBoard: Map<string, WordsToWatch>): CleanData {
	const randomIndex = Math.floor(Math.random() * wordList.length);
	let randomWord = wordList.splice(randomIndex, 1);
	let word = randomWord[0];

	if (!wordsInTheBoard.has(word.name)) return word;
	return getRandomWord(wordList, wordsInTheBoard);
}

export function generateLocations(word: string, gameBoard: string[][]): Location[] {
	let availableLocations: Location[] = [];
	let maxOverlap = 0;
	let length = word.length;

	for (let direction of DIRECTIONS) {
		let x, y;
		x = 0; // Column
		y = 0; // Row
		while (y < GAME_BOARD_SIZE) {
			if (IS_DIRECTION_VALID[direction](x, y, length, GAME_BOARD_SIZE)) {
				let overlap = checkForOverlap(word, x, y, direction, gameBoard as string[][]);

				if (overlap >= maxOverlap) {
					maxOverlap = overlap;
					availableLocations.push({ x, y, direction, overlap });
				}
				x++;
				if (x >= GAME_BOARD_SIZE) {
					x = 0;
					y++;
				}
			} else {
				const next: any = SKIP_TILE[direction](x, y, length);

				x = next.x;
				y = next.y;
			}
		}
	}
	if (availableLocations.length > 0) return pruneLocations(availableLocations, maxOverlap);
	return [];
}

function checkForOverlap(word: string, x: number, y: number, direction: string, gameBoard: string[][]): number {
	let overlap = 0;
	for (let [index, letter] of Object.entries(word)) {
		const nextTile = GET_NEXT_TILE[direction](x, y, Number(index));
		const tile = gameBoard[nextTile.y][nextTile.x];

		// Increment the overlap counter
		if (tile === letter) {
			overlap++;

			// Return if no overlap is possible.
		} else if (tile !== '_') {
			return -1;
		}
	}
	return overlap;
}

function pruneLocations(availableLocations: Location[], maxOverlap: number) {
	const prunedLocations = [];
	for (let location of availableLocations) {
		if (location.overlap >= maxOverlap) prunedLocations.push(location);
	}
	return prunedLocations;
}

export function placeWordInTheGameBoard(word: string, randomLocation: Location, gameBoard: string[][]) {
	for (let i = 0; i < word.length; i++) {
		let next = GET_NEXT_TILE[randomLocation.direction](randomLocation.x, randomLocation.y, i);
		let tile: any = buildTile(word, next, i);
		gameBoard[next.y][next.x] = tile;
	}
	return gameBoard;
}

function buildTile(word: string, next: TileCoor | null = null, i: number = 0): any {
	let tile: Tile = {
		letter: word[i],
		coordinates: next ? { x: next.x, y: next.y } : null,
		isSelected: false,
		letterIndex: i,
		word: word,
	};
	return tile;
}

export function fillEmptySpots(gameBoard: string[][]) {
	for (let row of gameBoard) {
		let i: number = 0;
		while (i < GAME_BOARD_SIZE) {
			let tile: Tile = row[i] as unknown as Tile;
			if (!tile.letter) {
				let randomLetter = pickRandomLetter();
				let fakeTile = buildTile(randomLetter);
				row[i] = fakeTile;
			}
			i++;
		}
	}
	return gameBoard;
}

function pickRandomLetter(): string {
	const letterIndex = Math.floor(Math.random() * ALPHABET.length);
	const randomLetter = ALPHABET[letterIndex];
	return randomLetter;
}
