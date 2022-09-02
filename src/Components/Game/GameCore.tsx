import React, { createRef, useEffect, useRef, useState } from 'react';
import { ALPHABET, GAME_BOARD_SIZE, DIRECTIONS, GET_NEXT_TILE, IS_DIRECTION_VALID, SKIP_TILE } from './Utils/Constants';
import { CleanData, Location, Tile, TileCoor, WordsToWatch } from './Utils/Interfaces';
import { createUseStyles } from 'react-jss';
import GameBoard from './GameBoard';
import WordList from './WordList';
import GameCanvas from './GameCanvas';

const useStyles = createUseStyles({
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2,50%)',
		columnGap: '30px',
	},
	canvasBoardWrapper: {
		position: 'relative',
	},
});

function generateGameBoard(): string[][] {
	let board: string[][] = [];
	for (let i = 0; i < GAME_BOARD_SIZE; i++) {
		board.push([]);
		for (let j = 0; j < GAME_BOARD_SIZE; j++) {
			board[i].push('_');
		}
	}
	return board;
}

function getRandomWord(wordList: CleanData[], wordsInTheBoard: Map<string, WordsToWatch>): CleanData {
	const randomIndex = Math.floor(Math.random() * wordList.length);
	let randomWord = wordList.splice(randomIndex, 1);
	let word = randomWord[0];

	if (!wordsInTheBoard.has(word.name)) return word;
	return getRandomWord(wordList, wordsInTheBoard);
}

function generateLocations(word: string, gameBoard: string[][]): Location[] {
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

function placeWordInTheGameBoard(word: string, randomLocation: Location, gameBoard: string[][]) {
	for (let i = 0; i < word.length; i++) {
		let next = GET_NEXT_TILE[randomLocation.direction](randomLocation.x, randomLocation.y, i);
		let tile: any = buildTile(word, next, i);
		gameBoard[next.y][next.x] = tile;
	}
	return gameBoard;
}

function buildTile(word: string, next: any, i: number): any {
	let tile: any = {
		letter: word[i],
		coordinates: { x: next.x, y: next.y },
		isSelected: false,
		letterIndex: i,
		word: word,
	};
	return tile;
}

function fillEmptySpots(gameBoard: string[][]) {
	for (let row of gameBoard) {
		let i: number = 0;
		while (i < GAME_BOARD_SIZE) {
			let tile: Tile = row[i] as unknown as Tile;
			if (!tile.letter) {
				row[i] = pickRandomLetter();
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

function GameCore(props: { wordList: CleanData[] }): JSX.Element {
	const [gameBoard, setGameBoard] = useState<Tile[][]>();
	const [wordListTiles, setWordListTiles] = useState<Map<string, WordsToWatch>>();
	const [wordsToWatch, setWordsToWatch] = useState<Set<string>>();
	const [wordFragment, setWordFragment] = useState<string[] | null>(null);
	const gameBoardRef: React.RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
	const [canvasSize, setCanvasSize] = useState();
	const [coordinatesForCanvas, setCoordinatesForCanvas] = useState<TileCoor>();
	const classes = useStyles();

	// Initialize Game and Generate GameBoard
	useEffect(() => {
		let partialGameBoard = generateGameBoard();
		let counter = props.wordList.length;
		const tilesInTheBoard: Map<string, WordsToWatch> = new Map();

		while (counter > 0) {
			let wordList = props.wordList.slice();
			const pokemon = getRandomWord(wordList, tilesInTheBoard);
			const word = pokemon.name;
			const possibleLocations = generateLocations(word, partialGameBoard);
			let location: unknown;

			if (possibleLocations.length > 0) {
				location = possibleLocations[Math.floor(Math.random() * possibleLocations.length)];
				partialGameBoard = placeWordInTheGameBoard(word, location as Location, partialGameBoard);
				tilesInTheBoard.set(pokemon.name, { ...pokemon, isFound: false } as WordsToWatch);
				counter--;
			} else {
				counter--;
				continue;
			}
		}
		partialGameBoard = fillEmptySpots(partialGameBoard);
		setGameBoard(partialGameBoard as unknown as Tile[][]);
		setWordListTiles(tilesInTheBoard);
		getWordsToWatch(tilesInTheBoard);
	}, []);

	const getWordsToWatch = (tilesInTheBoard: Map<string, WordsToWatch>) => {
		let wordsToWatch: Set<string> = new Set();
		tilesInTheBoard.forEach((pokemon) => wordsToWatch.add(pokemon.name));
		setWordsToWatch(wordsToWatch);
	};

	const handleWordFragment = (fragment: Tile): void => {
		if (!wordFragment) {
			let wordFragmentArr: string[] = Array(fragment.word.length).fill('');
			wordFragmentArr.splice(fragment.letterIndex, 1, fragment.letter);
			setWordFragment(wordFragmentArr);
		} else {
			let wordFragSoFar = wordFragment as string[];
			fragment.isSelected ? wordFragSoFar.splice(fragment.letterIndex, 1, fragment.letter) : wordFragSoFar.splice(fragment.letterIndex, 1, '');
			setWordFragment(wordFragSoFar);
		}
		setCoordinatesForCanvas(fragment.coordinates as TileCoor);
	};

	const updateWordListTiles = (word: string): void => {
		let markWordAsFound: WordsToWatch = wordListTiles?.get(word) as WordsToWatch;
		markWordAsFound.isFound = true;
		wordListTiles?.set(word, markWordAsFound);
	};

	useEffect(() => {
		let wordFragSoFar: string = wordFragment?.join('') as string;

		if (wordsToWatch && wordsToWatch.has(wordFragSoFar)) {
			updateWordListTiles(wordFragSoFar);
			setWordFragment(null);
		}
	}, [wordFragment]);

	const getCanvasSizeFromBoard = (gameBoardRef: any) => {
		setCanvasSize(gameBoardRef);
	};

	return (
		<div className={classes.grid}>
			<div className={classes.canvasBoardWrapper}>
				{gameBoard ? <GameBoard finalGameBoard={gameBoard} getWordFragmentCallback={handleWordFragment} getCanvasSizeFromBoard={getCanvasSizeFromBoard} /> : <div>Loading...</div>}
				{gameBoardRef ? <GameCanvas size={canvasSize as unknown as number} coordinates={coordinatesForCanvas as TileCoor} /> : <div>Loading...</div>}
			</div>
			{wordListTiles ? <WordList wordList={wordListTiles} /> : <div>Loading...</div>}
		</div>
	);
}

export default GameCore;
