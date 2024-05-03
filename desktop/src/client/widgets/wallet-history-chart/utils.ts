import { DesktopWhistoryResponse } from '../../types/whistory';
import { generateNumberArray } from '../../utils';

const offsetX = 75;
const offsetY = 75;

const getWhistoryMinMaxTimestamps = (
  whistoryList: DesktopWhistoryResponse[],
) => {
  const firstItemTs = new Date(whistoryList[1].date).getTime();

  const { minDateTs, maxDateTs } = whistoryList.reduce(
    (acc, item) => {
      const ts = new Date(item.date).getTime();
      if (ts < acc.minDateTs) {
        return { ...acc, minDateTs: ts };
      }

      if (ts > acc.maxDateTs) {
        return { ...acc, maxDateTs: ts };
      }

      return acc;
    },
    {
      minDateTs: firstItemTs,
      maxDateTs: firstItemTs,
    },
  );

  return {
    minDateTs,
    maxDateTs,
  };
};

const getWhistoryMaxAmount = (whistoryList: DesktopWhistoryResponse[]) =>
  Math.max(...whistoryList.map((item) => item.amount));

interface CanvasParams {
  height: number;
  width: number;
}

export const createWhistoryPoints = (
  whistoryList: DesktopWhistoryResponse[],
  canvasParams: CanvasParams,
) => {
  const { minDateTs, maxDateTs } = getWhistoryMinMaxTimestamps(whistoryList);
  const maxAmount = getWhistoryMaxAmount(whistoryList);

  const scaleX = (canvasParams.width - offsetX * 2) / (maxDateTs - minDateTs);
  const scaleY = (canvasParams.height - offsetY * 2) / maxAmount;

  return whistoryList
    .map((whistory) => ({
      x: offsetX + (new Date(whistory.date).getTime() - minDateTs) * scaleX,
      y: canvasParams.height - offsetY - whistory.amount * scaleY,
    }))
    .sort((p1, p2) => p2.x - p1.x);
};

interface DrawLineParams {
  lineWidth?: number;
}

export const drawLine = (
  context: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  params?: DrawLineParams,
) => {
  context.beginPath();

  context.moveTo(x1, y1);
  context.lineTo(x2, y2);

  if (params?.lineWidth) {
    context.lineWidth = params.lineWidth;
  }

  context.stroke();
};

interface Point {
  x: number;
  y: number;
}

export const drawLinesFromPoints = (
  context: CanvasRenderingContext2D,
  points: Point[],
) => {
  points.forEach((point, index) => {
    // draw a line
    if (index < points.length - 1) {
      drawLine(
        context,
        point.x,
        point.y,
        points[index + 1].x,
        points[index + 1].y,
      );
    }
  });
};

export const createHorizontalAxisPoints = (
  whistoryList: DesktopWhistoryResponse[],
  canvasParams: CanvasParams,
) => {
  const { minDateTs, maxDateTs } = getWhistoryMinMaxTimestamps(whistoryList);
  const scaleX = (canvasParams.width - offsetX * 2) / (maxDateTs - minDateTs);

  const axisTimestamps = generateNumberArray(
    minDateTs,
    maxDateTs,
    (maxDateTs - minDateTs) / 8,
  );

  return axisTimestamps
    .map((ts) => ({
      x: offsetX + (ts - minDateTs) * scaleX,
      y: canvasParams.height,
      label: new Date(ts).toLocaleString().split(',')[0],
    }))
    .sort((p1, p2) => p2.x - p1.x);
};

export const createVerticalAxisPoints = (
  whistoryList: DesktopWhistoryResponse[],
  canvasParams: CanvasParams,
) => {
  const maxAmount = getWhistoryMaxAmount(whistoryList);
  const scaleY = (canvasParams.height - offsetY * 2) / maxAmount;
  const axisAmounts = generateNumberArray(0, maxAmount, maxAmount / 10);
  return axisAmounts
    .map((amount) => ({
      x: 0,
      y: canvasParams.height - offsetY - amount * scaleY,
      label: amount.toFixed(2),
    }))
    .sort();
};
