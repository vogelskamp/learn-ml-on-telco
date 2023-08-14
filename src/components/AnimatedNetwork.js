import React, { useEffect, useRef, useState } from "react";

function AnimatedNetwork({ layers, animate = true }) {
  const ref = useRef(null);
  const [context, setContext] = useState(null);
  const [isDone, setDone] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      const ctx = canvas.getContext("2d");
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    const framesPerNode = 15;
    const pauseFrames = 10;
    const maxNodeRadius = 20;

    const framesPerLine = 30;

    const drawNode = (x, y, radius) => {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = "#D9D9D9";
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.fill();
      context.stroke();
      context.closePath();
    };

    const drawLine = (startX, startY, endX, endY) => {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();
      context.closePath();
    };

    const drawText = (text, x, y, opacity) => {
      context.font = "24px Arial"; // Set the font size and family
      context.textAlign = "center"; // Align the text horizontally to the center

      context.fillStyle = `rgba(170,170,170,${opacity})`;
      context.fillText(text, x, y);
    };

    const draw = (frame) => {
      const { width, height } = context.canvas;

      const xStep = width / layers.length;
      const yPadding = 20;
      const textMargin = 50;

      context.clearRect(0, 0, width, height);

      const nodeCount = layers.reduce((prev, cur) => (prev += cur.nodes), 0);

      const totalFramesPerNode = framesPerNode + pauseFrames;
      const totalFramesPerLine = framesPerLine + pauseFrames;

      const totalFramesForNodes = nodeCount * totalFramesPerNode;
      const currentFrame = frame % totalFramesPerNode;

      if (!animate) {
        frame = totalFramesForNodes - 1;

        for (let i = 0; i < layers.length - 1; i++) {
          frame += layers[i].nodes * layers[i + 1].nodes * totalFramesPerLine;
        }
      }

      let xOffset = 100;

      const calcYOffset = (nodes) =>
        (height - nodes * 2 * maxNodeRadius - (nodes - 1) * yPadding) / 2;
      const calcY = (i, yOffset) =>
        yOffset + i * 2 * maxNodeRadius + i * yPadding + maxNodeRadius;

      const calcBorderPoints = (
        circleCenterX,
        circleCenterY,
        circleRadius,
        targetX,
        targetY
      ) => {
        let vectorX = targetX - circleCenterX;
        let vectorY = targetY - circleCenterY;

        let length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
        let normalizedX = vectorX / length;
        let normalizedY = vectorY / length;

        let startX = circleCenterX + normalizedX * circleRadius;
        let startY = circleCenterY + normalizedY * circleRadius;
        let endX = targetX - normalizedX * circleRadius;
        let endY = targetY - normalizedY * circleRadius;

        return { startX, startY, endX, endY };
      };

      let processedFrames = 0;
      for (const [idx, { nodes }] of layers.entries()) {
        if (processedFrames <= frame) {
          if (idx === 0)
            drawText(
              "Input",
              xOffset,
              textMargin,
              Math.min(frame / totalFramesPerNode, 1)
            );
          else if (layers.length > 2 && idx === 1)
            drawText(
              "Hidden",
              width / 2,
              textMargin,
              Math.min(
                (frame - layers[0].nodes * totalFramesPerNode) /
                  totalFramesPerNode,
                1
              )
            );
          else if (idx === layers.length - 1)
            drawText(
              "Output",
              xOffset,
              textMargin,
              Math.min(
                (frame -
                  layers
                    .slice(0, -1)
                    .reduce((prev, cur) => (prev += cur.nodes), 0) *
                    totalFramesPerNode) /
                  totalFramesPerNode,
                1
              )
            );
        }

        let yOffset = calcYOffset(nodes); // Calculate Y-offset to center nodes

        for (let i = 0; i < nodes && processedFrames <= frame; i++) {
          let nodeX = xOffset;
          let nodeY = calcY(i, yOffset);

          // fully draw node
          if (frame >= processedFrames + totalFramesPerNode) {
            drawNode(nodeX, nodeY, maxNodeRadius);
            processedFrames += totalFramesPerNode;
          } else {
            drawNode(nodeX, nodeY, Math.min(currentFrame, maxNodeRadius));
            processedFrames += currentFrame;
            return;
          }
        }

        xOffset += xStep;
      }

      // Draw lines between nodes
      if (frame >= totalFramesForNodes) {
        let processedLineFrames = 0;
        const lineFrame = frame - totalFramesForNodes;

        xOffset = 100;

        for (
          let layerIdx = 0;
          layerIdx < layers.length - 1 && processedLineFrames <= frame;
          layerIdx++
        ) {
          const layer = layers[layerIdx];
          const nextLayer = layers[layerIdx + 1];

          let yOffset = calcYOffset(layer.nodes);

          for (
            let currentLayerNodeIdx = 0;
            currentLayerNodeIdx < layer.nodes;
            currentLayerNodeIdx++
          ) {
            let nodeX = xOffset;
            let nodeY = calcY(currentLayerNodeIdx, yOffset);

            let nextLayerXOffset = xOffset + xStep;
            let nextLayerYOffset = calcYOffset(nextLayer.nodes);

            const currentLineFrame = lineFrame % totalFramesPerLine;
            for (
              let nextLayerNodeIdx = 0;
              nextLayerNodeIdx < nextLayer.nodes;
              nextLayerNodeIdx++
            ) {
              let nextNodeX = nextLayerXOffset;
              let nextNodeY = calcY(nextLayerNodeIdx, nextLayerYOffset);

              const { startX, startY, endX, endY } = calcBorderPoints(
                nodeX,
                nodeY,
                maxNodeRadius,
                nextNodeX,
                nextNodeY
              );

              // fully draw line
              if (lineFrame >= processedLineFrames + totalFramesPerLine) {
                drawLine(startX, startY, endX, endY);
              } else {
                const diffX = endX - startX;
                const diffY = endY - startY;

                const newX =
                  startX +
                  Math.min(currentLineFrame / framesPerLine, 1) * diffX;
                const newY =
                  startY +
                  Math.min(currentLineFrame / framesPerLine, 1) * diffY;

                drawLine(startX, startY, newX, newY);
              }
            }

            if (lineFrame >= processedLineFrames + totalFramesPerLine) {
              processedLineFrames += totalFramesPerLine;
            } else {
              processedLineFrames += currentLineFrame;
              return;
            }
          }

          xOffset += xStep;
        }
      }

      setDone(true);
    };

    let frameCount = 0;
    let animationFrameId;

    if (context && !isDone) {
      const render = () => {
        frameCount++;
        draw(frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };

      render();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isDone, context, layers, animate]);

  return <canvas width={800} height={400} ref={ref}></canvas>;
}

export default AnimatedNetwork;
