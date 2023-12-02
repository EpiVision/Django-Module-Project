export const baseURL = 'http://127.0.0.1:8000';

const colorPalette = [
  [44, 62, 80], // Dark Slate Blue
  [231, 76, 60], // Indian Red
  [39, 174, 96], // Emerald Green
  [156, 0, 93], // Sunflower Yellow
  [155, 89, 182], // Amethyst Purple
  [52, 152, 219], // Dodger Blue
  [30, 217, 161], // Turquoise
  [230, 126, 34], // Carrot Orange
  [97, 48, 9], // Midnight Blue
  [211, 84, 0], // Pumpkin
  [192, 57, 43], // Dark Red
  [46, 204, 113], // Medium Green
  [41, 128, 185], // Steel Blue
  [241, 196, 15], // Vibrant Yellow
  [142, 68, 173] // Dark Orchid
];

export function getSolidColors() {
  let colors = colorPalette;
  // let colors = colorPalette.slice(0, endIndex);
  return colors.map((color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
}

export function getBgColors() {
  let colors = colorPalette;
  // let colors = colorPalette.slice(0, endIndex);
  return colors.map((color) => `rgb(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`);
}
