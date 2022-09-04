import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { GAME_BOARD_SIZE } from './Utils/Constants';
import { TileCoor } from './Utils/Interfaces';

const useStyles = createUseStyles({
	myCanvas: {
		position: 'absolute',
		// border: '1px solid black',
		// backgroundColor: 'rgba(0,0,0,0.3)',
		justifySelf: 'center',
		alignSelf: 'center',
		top: 0,
		zIndex: -10,
	},
});

function GameCanvas(props: { size: number; coordinates?: TileCoor | null }) {
	const classes = useStyles();
	const myCanvas = useRef<HTMLCanvasElement>(null);
	const ctx = useRef<CanvasRenderingContext2D>();
	const [prevCoor, setPrevCoor] = useState<Map<string, TileCoor>>(new Map() as unknown as Map<string, TileCoor>);
	useEffect(() => {
		ctx.current = myCanvas.current?.getContext('2d') as CanvasRenderingContext2D;
	}, [myCanvas]);

	useEffect(() => {
		if (props.coordinates && ctx.current) {
			const gameBoardSizeInPixel = props.size;
			const numberOfRowsAndColumns = GAME_BOARD_SIZE;
			const sizeRowsAndColumns = gameBoardSizeInPixel / numberOfRowsAndColumns;
			let coorsToSave = prevCoor;

			if (props.coordinates.isSelected || !prevCoor.get('prev')) {
				ctx.current.beginPath();
				ctx.current.arc(props.coordinates.x * sizeRowsAndColumns + 15.8, props.coordinates.y * sizeRowsAndColumns + 15.5, 11, 0, 360);
				ctx.current.fillStyle = 'rgba(0,0,0,.5)';
				ctx.current.closePath();
				ctx.current.fill();
			} else {
				ctx.current?.clearRect(props.coordinates.x * sizeRowsAndColumns, props.coordinates.y * sizeRowsAndColumns, 30.8, 30.5);
			}

			coorsToSave.set('prev', props.coordinates);
			setPrevCoor(coorsToSave);
		}
	}, [props.coordinates, props.coordinates?.isSelected]);

	return <canvas ref={myCanvas} width={props.size} height={props.size} className={classes.myCanvas}></canvas>;
}

export default GameCanvas;
