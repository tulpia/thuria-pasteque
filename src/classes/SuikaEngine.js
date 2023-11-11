import Matter from "matter-js";
import { MatterCollisionEvents } from "matter-collision-events";
import circles from "../utils/circles";

Matter.use(MatterCollisionEvents);

class SuikaEngine {
  config;
  engine;
  floor;
  wallRight;
  wallLeft;
  ceiling;
  nextCircle;
  lockLose;
  lockLoseTimeout;
  lose = false;

  constructor(box, canvas, config) {
    this.config = config;
    this.init(box, canvas);
    this.createBox();
    this.initLose();

    Matter.World.add(this.engine.world, [
      this.floor,
      this.wallLeft,
      this.wallRight,
      this.ceiling,
    ]);
    Matter.Runner.run(this.engine);
    Matter.Render.run(this.render);
  }

  init(box, canvas) {
    this.engine = Matter.Engine.create({});
    this.render = Matter.Render.create({
      element: box,
      engine: this.engine,
      canvas: canvas,
      options: {
        width: this.config.width,
        height: this.config.height,
        background: "rgba(0, 0, 0, 0.3)",
        wireframes: false,
      },
    });
  }

  createBox() {
    this.floor = Matter.Bodies.rectangle(
      this.config.width / 2,
      this.config.height,
      this.config.width,
      20,
      {
        isStatic: true,
        render: {
          fillStyle: "blue",
        },
      }
    );

    this.wallLeft = Matter.Bodies.rectangle(
      0,
      this.config.height / 2,
      20,
      this.config.height,
      {
        isStatic: true,
        render: {
          fillStyle: "blue",
        },
      }
    );

    this.wallRight = Matter.Bodies.rectangle(
      this.config.width,
      this.config.height / 2,
      20,
      this.config.height,
      {
        isStatic: true,
        render: {
          fillStyle: "blue",
        },
      }
    );

    this.ceiling = Matter.Bodies.rectangle(
      this.config.width / 2,
      0,
      this.config.width,
      2,
      {
        isStatic: true,
        render: {
          fillStyle: "transparent",
        },
      }
    );
  }

  createCircle(x, y, selectedCircle, isCreation = false) {
    if (isCreation) {
      this.lockLose = true;

      this.lockLoseTimeout = setTimeout(() => {
        this.lockLose = false;
      }, 100);
    }

    const ball = Matter.Bodies.circle(x, y, selectedCircle.radius, {
      restitution: selectedCircle.restitution,

      render: {
        sprite: {
          texture: selectedCircle.image,
        },
      },
    });

    this.lastCreatedCircle = ball;

    Matter.World.add(this.engine.world, [ball]);

    // On figure out quel est l'élément àjouter après que cet élément soit fusionné
    let circleIndex = null;

    circles.forEach((circle, index) => {
      if (circleIndex === null && circle.radius === ball.circleRadius) {
        circleIndex = index + 1;

        if (circleIndex > circles.length - 1) {
          circleIndex = null;
        }
      }
    });

    // Ajout de l'event sur l'objet
    if (circleIndex !== null) {
      ball.onCollide((pair) => {
        if (pair.bodyA.id !== this.floor.id) {
          let ballCollided = null;

          if (pair.bodyA.id !== ball.id) {
            ballCollided = pair.bodyA;
          }

          if (pair.bodyB.id !== ball.id) {
            ballCollided = pair.bodyB;
          }

          if (ballCollided) {
            if (
              ballCollided.circleRadius === ball.circleRadius &&
              ballCollided.position.y > ball.position.y
            ) {
              Matter.World.remove(this.engine.world, ball);
              Matter.World.remove(this.engine.world, ballCollided);

              this.createCircle(
                ball.position.x,
                ball.position.y,
                circles[circleIndex],
                false
              );
            }
          }
        }
      });
    }

    // Changement du prochain cercle
    if (isCreation) {
      const randomInteger =
        Math.floor(Math.random() * (circles.length - 2 - 0 + 1)) + 0;

      this.nextCircle = circles[randomInteger];
    }
  }

  initLose() {
    this.ceiling.onCollide(() => {
      if (!this.lockLose && !this.lose) {
        this.lose = true;

        this.onLose();
      }
    });
  }

  // La magie des setters/getters
  get engine() {
    return this.engine;
  }

  get nextCircle() {
    return this.nextCircle;
  }

  get lastCreatedCircle() {
    return this._lastCreatedCircle;
  }

  set lastCreatedCircle(lastCreatedCircle) {
    this._lastCreatedCircle = lastCreatedCircle;

    this.onLastCreatedCircle(this.lastCreatedCircle);
  }

  onLastCreatedCircle(lastCreatedCircle) {
    console.warn("you need to override this function");
  }

  onLose() {
    console.warn("you need to override this function");
  }
}

export default SuikaEngine;
