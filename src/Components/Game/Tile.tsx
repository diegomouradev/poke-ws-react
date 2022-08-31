import React, { useState } from 'react';
import { Tile } from './Utils/Interfaces';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	myTile: {
		width: '30px',
		height: '30px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textTransform: 'uppercase',
	},
	selected: {
		backgroundColor: '#9c9c9c36',
	},
});

function LetterTile(props: { tile: Tile; index: number; buildWordCallback: (letter: string) => void }): JSX.Element {
	const [tile, setTile] = useState(props.tile);
	const [isSelected, setIsSelected] = useState(false);
	const classes = useStyles();
	// let tile = props.tile;

	const handleClick = () => {
		if (!isSelected) props.buildWordCallback(tile.letter ? (tile.letter as string) : (tile as unknown as string));
		setIsSelected(!isSelected);
	};

	return (
		<div key={tile.letter ? `${tile.letter}${props.index}` : `tile${props.index}`} className={isSelected ? `${classes.myTile} ${classes.selected}` : `${classes.myTile}`} onClick={() => handleClick()}>
			{tile.letter ? (tile.letter as string) : (tile as unknown as string)}
		</div>
	);
}

export default LetterTile;
