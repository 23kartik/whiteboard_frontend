export const drawLine = ({ prevPoint, currentPoint, ctx, color, lineWidth }) => {
  const { x: currX, y: currY } = currentPoint;
  let startPoint = prevPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.imageSmoothingEnabled = true;

  ctx.strokeStyle = color;
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
  ctx.fill();
};

