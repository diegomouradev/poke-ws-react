import React, { createRef, useCallback, useEffect, useState } from 'react';
import { fillEmptySpots, generateGameBoard, generateLocations, getRandomWord, placeWordInTheGameBoard } from './Game/Utils/BordGenerationLogic';
import { CleanData, Location, Tile, TileCoor, WordsToWatch } from './Game/Utils/Interfaces';
import { createUseStyles } from 'react-jss';
import GameBoard from './Game/GameBoard';
import WordList from './Game/WordList';
import GameCanvas from './Game/GameCanvas';

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

function GameCore(props: { wordList: CleanData[] }): JSX.Element {
	const [gameBoard, setGameBoard] = useState<Tile[][]>();
	const gameBoardRef: React.RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
	const [canvasSize, setCanvasSize] = useState();
	const [wordListTiles, setWordListTiles] = useState<Map<string, WordsToWatch>>();
	// const [wordsToWatch, setWordsToWatch] = useState<Set<string>>();
	const [tile, setTile] = useState<Tile>();
	const [coordinatesForCanvas, setCoordinatesForCanvas] = useState<TileCoor>();
	const [wordFragment, setWordFragment] = useState<string[]>([]);
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
			let location: Location;

			if (possibleLocations.length > 0) {
				location = possibleLocations[Math.floor(Math.random() * possibleLocations.length)];
				partialGameBoard = placeWordInTheGameBoard(word, location, partialGameBoard);
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
		// getWordsToWatch(tilesInTheBoard);s
	}, []);

	// Once gameBoard is generated it will trigger the callback to pass that reference
	// onto the GameCore.
	const getGameBoardRef = useCallback((gameBoardRef: any) => {
		let size = gameBoardRef.current.clientWidth;
		// Setting the canvasSize will allow for the rendering of the Canvas.
		setCanvasSize(size);
	}, []);

	const onTileClicked = useCallback((tileClicked: Tile): void => {
		tileClicked.isSelected = !tileClicked.isSelected;
		setTile(tileClicked);
	}, []);

	const handleWordFragment = (tile: Tile): string[] => {
		let wordFragmentArr: string[] = [...(wordFragment as string[])];
		if (tile?.isSelected) {
			wordFragmentArr.splice(tile.letterIndex, 1, tile.letter);
		}
		wordFragmentArr.splice(tile?.letterIndex as number, 1, tile?.letter as string);
		return wordFragmentArr;
	};

	useEffect(() => {
		let wordFramentLength = wordFragment?.length;
		let wordFragmentArr: string[] = [];
		if (tile && !wordFramentLength) {
			wordFragmentArr.fill('', 0, tile.word.length);
		} else {
			wordFragmentArr = [...(wordFragment as string[])];
		}
		wordFragmentArr = handleWordFragment(tile as Tile);

		setWordFragment(wordFragmentArr);
	}, [tile]);

	useEffect(() => {
		if (tile?.coordinates) {
			setCoordinatesForCanvas({ ...(tile?.coordinates as TileCoor), isSelected: tile?.isSelected });
		}
	}, [tile?.coordinates]);

	useEffect(() => {
		setTile(undefined);
	}, [coordinatesForCanvas]);

	useEffect(() => {
		if (wordFragment.indexOf('') === -1) {
			let word = wordFragment?.join('') as string;

			if (wordListTiles?.has(word)) {
				let wordFound = wordListTiles?.get(word) as WordsToWatch;
				wordFound.isFound = true;

				let updatedWordList = wordListTiles;
				updatedWordList.set(word, wordFound);
				setWordListTiles(updatedWordList);
			}
		}
	}, [wordFragment]);

	return (
		<div className={classes.grid}>
			<div className={classes.canvasBoardWrapper}>
				{gameBoard ? <GameBoard finalGameBoard={gameBoard} onTileClicked={onTileClicked} onGameBoard={getGameBoardRef} /> : <div>Loading...</div>}
				{canvasSize ? <GameCanvas size={canvasSize as unknown as number} coordinates={coordinatesForCanvas as TileCoor | null} /> : <div>Loading...</div>}
			</div>
			{wordListTiles ? <WordList wordList={wordListTiles} /> : <div>Loading...</div>}
		</div>
	);
}

export default GameCore;
