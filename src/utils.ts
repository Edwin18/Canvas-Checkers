type Cords = {
  x: number;
  y: number;
}
/**
 * Преобразовывает кординаты миши относительно canvas.
 * @function
 * @param {HTMLCanvasElement} canvas - Элемент канваса.
 * @param {number} x - Кординаты миши относительно window.
 * @param {number} y - Кординаты миши относительно window.
 * @return {Cords}
 */
export const windowToCanvas = (canvas: HTMLCanvasElement, x: number, y: number): Cords => {
  const bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height),
  };
};
