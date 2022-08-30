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

function LetterTile(props: any): JSX.Element {
	const [isSelected, setIsSelected] = useState(false);
	const classes = useStyles();
	let tile = props.tile;

	const onClick = () => {
		setIsSelected(!isSelected);
	};

	return (
		<div key={tile.letter ? `${tile.letter}${props.index}` : `tile${props.index}`} className={isSelected ? `${classes.myTile} ${classes.selected}` : `${classes.myTile}`} onClick={() => onClick()}>
			{tile.letter ? tile.letter : tile}
		</div>
	);
}

export default LetterTile;
