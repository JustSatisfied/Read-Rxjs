const width = 768;
const height = 256
const sliceWidth = width / 3
export type rgbObject = {
    r: number | string,
    g: number | string,
    b: number | string
}
function getPositionXY(event: MouseEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top)
    return [x, y]
}

export function addEventGetColorToBlock(canvas: HTMLCanvasElement, selectedColorDiv: HTMLDivElement, ctx: CanvasRenderingContext2D, setList: any, rgbValueDiv?: HTMLDivElement | null,) {
    canvas.addEventListener('mousemove', (event) => {
        const [x, y] = getPositionXY(event, canvas)
        if (x >= 0 && x < width && y >= 0 && y < height) {
            const pixelData = ctx.getImageData(x, y, 1, 1).data;
            const r = pixelData[0];
            const g = pixelData[1];
            const b = pixelData[2];
            const rgbColor = `rgb(${r}, ${g}, ${b})`;
            selectedColorDiv.style.backgroundColor = rgbColor;
            rgbValueDiv && (rgbValueDiv.textContent = `RGB: ${r}, ${g}, ${b}`);
        }
    });

    canvas.addEventListener("mousedown", event => {
        const [x, y] = getPositionXY(event, canvas);
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const r = pixelData[0];
        const g = pixelData[1];
        const b = pixelData[2];
        const rgbColor: rgbObject = {
            r,
            g,
            b
        };
        setList(list => {
            list && list.push(rgbColor)
            return list
        })
    })
}




export function createColorBlock(ctx: CanvasRenderingContext2D) {
    for (let x = 0; x < width; x++) {
        const r = Math.floor(x % sliceWidth);
        for (let y = 0; y < height; y++) {
            const g = y;
            let b = 0;

            if (x < sliceWidth) {
                b = Math.floor(x / sliceWidth * 128);
            } else if (x < 2 * sliceWidth) {
                b = Math.floor((x - sliceWidth) / sliceWidth * 127 + 128);
            } else {
                b = 255;
            }
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}