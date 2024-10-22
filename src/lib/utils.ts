import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { DrawOptions } from '@/components/image/utils/types';
import troopStatsData from '../../public/troop_stats.json';

export const absoluteUrl = (path = '') => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${baseUrl}${path}`;
};

export function formatDataDialogueCount(count: number): string {
  if (count === 0) {
    return 'No DataDialogues';
  } else {
    const DataDialogueCount = count.toString().padStart(2, '0');
    const DataDialogueWord = count === 1 ? 'DataDialogue' : 'DataDialogues';
    return `${DataDialogueCount} ${DataDialogueWord}`;
  }
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', });
  return `${time} - ${formattedDate}`;
}

// Clsx and Tailwind
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// Base64 Images
export function isBase64Image(imageData: string) { const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/; return base64Regex.test(imageData); }

export function draw({ ctx, currentPoint, prevPoint, strokeColor, strokeWidth, dashGap, }: DrawOptions) {
  if (!ctx) return;
  const startPoint = prevPoint ?? currentPoint;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.setLineDash(Array.isArray(dashGap) ? dashGap : [dashGap]);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  // Start a new path
  ctx.beginPath();
  // Place the cursor from the point the line should be started
  ctx.moveTo(startPoint.x, startPoint.y);
  // Draw a line from current cursor position to the provided x,y coordinate
  ctx.lineTo(currentPoint.x, currentPoint.y);
  // Add stroke to the given path (render the line)
  ctx.stroke();
}

export function drawWithDataURL(dataURL: string, ctx: CanvasRenderingContext2D, canvasElement: HTMLCanvasElement) {
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(img, 0, 0);
  };
}

export function isMacOS() {
  if (typeof navigator === 'undefined') return false;
  return navigator.userAgent?.includes('Mac');
}

export function getTroopStats(troopType: string, level: string) {
  const stats = troopStatsData[level as keyof typeof troopStatsData]?.[troopType as keyof (typeof troopStatsData)[keyof typeof troopStatsData]];

  if (!stats) {
    throw new Error(`Invalid troop type '${troopType}' or level '${level}'.`);
  }

  return stats;
}

export function parseTroopCount(troopInput: string, totalTroops: number): number {
  if (troopInput.includes('%')) {
    const ratio = parseFloat(troopInput.replace('%', '')) / 100;
    return Math.floor(totalTroops * ratio);
  } else {
    const count = parseInt(troopInput, 10);
    if (isNaN(count)) {
      throw new Error(`Invalid troop count input: ${troopInput}`);
    }
    return count;
  }
}
