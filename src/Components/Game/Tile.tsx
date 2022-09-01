import React, { useEffect, useState } from 'react';
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

function LetterTile(props: { tile: Tile; index: number; getWordFragmentCallback: (fragment: Tile) => void }): JSX.Element {
	const [tile, setTile] = useState<Tile>(props.tile);
	const classes = useStyles();


	const handleClick = () => {
		let newTile = { ...tile };
		newTile.isSelected = !newTile.isSelected;
		setTile(newTile);
	};

	useEffect(() => {
		props.getWordFragmentCallback(tile);
	}, [tile]);

	return (
		<div key={tile.letter ? `${tile.letter}${props.index}` : `tile${props.index}`} className={tile.isSelected ? `${classes.myTile} ${classes.selected}` : `${classes.myTile}`} onClick={() => handleClick()}>
			{tile.letter ? (tile.letter as string) : (tile as unknown as string)}
		</div>
	);
}

export default LetterTile;
