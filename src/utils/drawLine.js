export const drawLine = ({ prevPoint, currentPoint, ctx, color, lineWidth }) => {
  const { x: currX, y: currY } = currentPoint;
  const lineColor = color;

  let startPoint = prevPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = lineWidth; // Use the dynamic line width
  ctx.lineJoin = 'round'; // Set line join to round for smooth corners
  ctx.lineCap = 'round'; // Set line cap to round for smooth ends

  ctx.strokeStyle = lineColor;
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
  ctx.fill();
};