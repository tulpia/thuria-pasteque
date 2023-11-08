import Matter from "matter-js";
import { useEffect, useState, useRef } from "react";
import "./App.css";

// Components
import NextCircle from "./components/NextCircle";

// Utils
import circles from "./utils/circles";

function App() {
  const config = {
    width: 500,
    height: 600,
  };
  const [engine, setEngine] = useState();
  const [nextCircle, setNextCircle] = useState(circles[0]);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const handleAddCircle = (e) => {
    const mousePos = getMousePos(canvasRef.current, e);
    const ball = Matter.Bodies.circle(mousePos.x, 0, nextCircle.radius, {
      restitution: nextCircle.restitution,

      render: {
        fillStyle: nextCircle.fill,
      },
    });

    Matter.World.add(engine.world, [ball]);

    // Changement du prochain cercle
    const randomInteger =
      Math.floor(Math.random() * (circles.length - 1 - 0 + 1)) + 0;
    setNextCircle(circles[randomInteger]);
  };

  const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  useEffect(() => {
    let engine = Matter.Engine.create({});
    let render = Matter.Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: config.width,
        height: config.height,
        background: "rgba(0, 0, 0, 0.3)",
        wireframes: false,
      },
    });

    setEngine(engine);

    const floor = Matter.Bodies.rectangle(
      config.width / 2,
      config.height,
      config.width,
      20,
      {
        isStatic: true,
        render: {
          fillStyle: "blue",
        },
      }
    );
    const wallLeft = Matter.Bodies.rectangle(
      0,
      config.height / 2,
      20,
      config.height,
      {
        isStatic: true,
        render: {
          fillStyle: "blue",
        },
      }
    );
    const wallRight = Matter.Bodies.rectangle(
      config.width,
      config.height / 2,
      20,
      config.height,
      {
        isStatic: true,
        render: {
          fillStyle: "blue",
        },
      }
    );

    Matter.World.add(engine.world, [floor, wallLeft, wallRight]);

    Matter.Runner.run(engine);
    Matter.Render.run(render);
  }, []);

  return (
    <>
      <NextCircle nextCircle={nextCircle} />

      <div
        ref={boxRef}
        style={{
          width: config.width,
          height: config.height,
        }}
        onClick={handleAddCircle}
      >
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default App;
