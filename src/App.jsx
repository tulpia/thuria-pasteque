/* eslint-disable no-unused-vars */
import Matter from "matter-js";
import { MatterCollisionEvents } from "matter-collision-events";
import { useEffect, useState, useRef } from "react";
import "./App.css";

// Components
import NextCircle from "./components/NextCircle";

// Utils
import circles from "./utils/circles";

// Ressources
import yellow from './assets/yellow.png';
import green from './assets/green.png';
import blue from './assets/blue.png';
import red from './assets/red.png';
import black from './assets/black.png';
import orange from './assets/orange.png';

Matter.use(MatterCollisionEvents);

function App() {
  const config = {
    width: 500,
    height: 600,
  };
  const [engine, setEngine] = useState();
  const floor = useRef(null);
  const wallLeft = useRef(null);
  const wallRight = useRef(null);
  const [nextCircle, setNextCircle] = useState(circles[0]);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const handleAddCircle = (e) => {
    const mousePos = getMousePos(canvasRef.current, e);
    
    createCircle(mousePos.x, 0, nextCircle, true);
  };

  const createCircle = (x, y, selectedCircle, isCreation = false) => {
    const ball = Matter.Bodies.circle(x, y, selectedCircle.radius, {
      restitution: selectedCircle.restitution,

      render: {
        sprite: {
          texture: eval(selectedCircle.fill)
        }
      },
    });

    Matter.World.add(engine.world, [ball]);

    // On figure out quel est l'élément àjouter après que cet élément soit fusionné
    let circleIndex = null;

    circles.forEach((circle, index) => {
      if (circleIndex === null && circle.radius === ball.circleRadius) {
        circleIndex = index + 1;

        if (circleIndex > circles.length - 1) {
          circleIndex = null
        }
      }
    });

    // Ajout de l'event sur l'objet
    if (circleIndex !== null) {
      ball.onCollide(pair => {
        if (pair.bodyA.id !== floor.current.id) {
          let ballCollided = null;
  
          if (pair.bodyA.id !== ball.id) {
            ballCollided = pair.bodyA;
          }
  
          if (pair.bodyB.id !== ball.id) {
            ballCollided = pair.bodyB;
          }
  
          if (ballCollided) {
            if (ballCollided.circleRadius === ball.circleRadius && ballCollided.position.y > ball.position.y) {
              Matter.World.remove(engine.world, ball);
              Matter.World.remove(engine.world, ballCollided);
  
              createCircle(ball.position.x, ball.position.y, circles[circleIndex], false);
            }
          }
        }
      });
    }

    // Changement du prochain cercle
    if (isCreation) {
      const randomInteger =
        Math.floor(Math.random() * (circles.length - 2 - 0 + 1)) + 0;
      setNextCircle(circles[randomInteger]);
    }
  }

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

    floor.current = Matter.Bodies.rectangle(
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
    
    wallLeft.current = Matter.Bodies.rectangle(
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
    wallRight.current = Matter.Bodies.rectangle(
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

    Matter.World.add(engine.world, [floor.current, wallLeft.current, wallRight.current]);

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
