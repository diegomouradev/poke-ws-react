import React from 'react';
import { Tile } from './Utils/Interfaces';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	myTile: {
width: '30px',
height: '30px',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
textTransform: 'uppercase'
	}
});

function LetterTile(props: any): JSX.Element {
	const classes = useStyles();
	let tile = props.tile;
	return (
		<div key={tile.letter ? `${tile.letter}${props.index}` : `tile${props.index}`} className={classes.myTile}>
			{tile.letter ? tile.letter : tile}
	</div>
	);
}

export default LetterTile;
