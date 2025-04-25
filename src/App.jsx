import React, { useEffect } from 'react'
import { createColorBlock, addEventGetColorToBlock } from './createColorBlock.ts';
import "./style.css"
function App() {
  const colorCanvasRef = React.useRef('');
  const seletedColorRef = React.useRef('');
  const rgbValueRef = React.useRef('')
  const [rgbList, setRgbList] = React.useState([])

  useEffect(() => {
    const colorCanvas = colorCanvasRef.current;
    const seletedColor = seletedColorRef.current;
    const rgbValue = rgbValueRef.current;
    console.log(colorCanvas)
    const ctx = colorCanvas.getContext('2d');
    createColorBlock(ctx)
    addEventGetColorToBlock(colorCanvas, seletedColor, ctx, setRgbList, rgbValue)
  }, [])

  console.log(rgbList)

  return (
    <div className="App">
      <canvas ref={colorCanvasRef} width="768" height="256" id="colorCanvas"></canvas>
      <div ref={seletedColorRef} id="selectedColor"></div>
      <div ref={rgbValueRef} id="rgbValue">RGB: 128, 128, 128</div>
      <h1 id="colorH1">叶鹏飞</h1>
    </div>
  );
}

export default App;
