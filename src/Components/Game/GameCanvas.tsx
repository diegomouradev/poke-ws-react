import React from 'react';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
	myCanvas: {
		position: 'absolute',
		// border: '1px solid black',
		backgroundColor: 'rgba(0,0,0,0.3)',
		justifySelf: 'center',
		alignSelf: 'center',
		top: 0,
		zIndex: -10,
	},
});

function GameCanvas(props: { size: number }) {
	const classes = useStyles();

	return <canvas width={props.size} height={props.size} className={classes.myCanvas}></canvas>;
}

export default GameCanvas;
