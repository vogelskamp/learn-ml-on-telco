import { Bodies, Engine, Render, Runner, Svg, World } from "matter-js";
import "pathseg";
import { Component } from "react";
import "./PhysicsSim.scss";

class PhysicsSim extends Component {
  children;
  width;
  height;
  world;
  spawnAutomatically;

  constructor({ children, width, height, spawnAutomatically = false }) {
    super();
    this.children = children;
    this.width = width;
    this.height = height;
    this.spawnAutomatically = spawnAutomatically;
  }

  componentDidUpdate(prevProps) {
    const { spawnObject } = this.props;

    if (spawnObject && spawnObject !== prevProps.spawnObject)
      this.spawnObject();
  }

  spawnObject() {
    const ball = Bodies.circle(200, 100, 20, {
      friction: 0,
      render: {
        fillStyle: "#B4B4FF",
        strokeStyle: "#B4B4AA",
        lineWidth: 2,
      },
    });
    World.add(this.world, ball);
  }

  componentDidMount() {
    if (this.world) return;

    const wrapper = document.getElementsByClassName("recharts-wrapper")[0];

    const canvas = document.createElement("canvas");
    wrapper.appendChild(canvas);

    const engine = Engine.create();

    const render = Render.create({
      engine,
      canvas: canvas,
      options: {
        width: this.width,
        height: this.height,
        wireframes: false,
      },
    });

    const errorCurves = Array.from(
      document.querySelectorAll(".recharts-line path")
    ).map((path) => {
      const vertices = Svg.pathToVertices(path);

      vertices.push({ x: vertices.at(-1).x, y: 351 });
      vertices.push({ x: vertices.at(0).x, y: 351 });

      const body = Bodies.fromVertices(
        411,
        279,
        vertices,
        {
          isStatic: true,
          render: {
            fillStyle: "#F00",
            lineWidth: 5,
            strokeStyle: "#F00",
            visible: false,
          },
          friction: 0,
        },
        true,
        undefined,
        undefined,
        5
      );

      return body;
    });

    this.world = engine.world;

    World.add(this.world, errorCurves);

    Render.run(render);
    Runner.run(engine);

    if (this.spawnAutomatically) this.spawnObject();
  }

  render() {
    return <>{this.children}</>;
  }
}

export default PhysicsSim;
