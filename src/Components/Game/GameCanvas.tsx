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

function GameCanvas(props: { size: number; coordinates: TileCoor | undefined }) {
	const classes = useStyles();
	const myCanvas = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

	useEffect(() => {
		if (myCanvas !== null) {
			let ctx: CanvasRenderingContext2D = myCanvas.current?.getContext('2d') as CanvasRenderingContext2D;
			setCtx(ctx);
		}
	}, []);

	useEffect(() => {
		let gameBoardSizeInPixel = props.size;
		let numberOfRowsAndColumns = GAME_BOARD_SIZE;
		let sizeRowsAndColumns = gameBoardSizeInPixel / numberOfRowsAndColumns;

		if (props.coordinates && ctx) {
			ctx.beginPath();
			ctx.arc(props.coordinates.x * sizeRowsAndColumns + 15.8, props.coordinates.y * sizeRowsAndColumns + 15.5, 11, 0, 360);
			ctx.fillStyle = 'green';
			ctx.fill();
		}
	}, [props.coordinates]);

	return <canvas ref={myCanvas} width={props.size} height={props.size} className={classes.myCanvas}></canvas>;
}

export default GameCanvas;
