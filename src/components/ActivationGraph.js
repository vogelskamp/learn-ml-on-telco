import { Label, Line, LineChart, XAxis, YAxis } from "recharts";

const RELU_DATA = [
  {
    xValue: -1,
    yValue: 0,
  },
  {
    xValue: 0,
    yValue: 0,
  },
  {
    xValue: 1,
    yValue: 1,
  },
];

const SIGMOID_DATA = [
  {
    xValue: -6,
    yValue: 0,
  },
  {
    xValue: -5,
    yValue: 0.006692850924284855559362,
  },
  {
    xValue: -4,
    yValue: 0.01798620996209155802679,
  },
  {
    xValue: -3,
    yValue: 0.04742587317756678087885,
  },
  {
    xValue: -2,
    yValue: 0.1192029220221175559403,
  },
  {
    xValue: -1,
    yValue: 0.2689414213699951207488,
  },
  {
    xValue: 0,
    yValue: 0.5,
  },
  {
    xValue: 1,
    yValue: 0.7310585786300048792512,
  },
  {
    xValue: 2,
    yValue: 0.8807970779778824440597,
  },
  {
    xValue: 3,
    yValue: 0.9525741268224332191212,
  },
  {
    xValue: 4,
    yValue: 0.9820137900379084419732,
  },
  {
    xValue: 5,
    yValue: 0.9933071490757151444406,
  },
  {
    xValue: 6,
    yValue: 1,
  },
];

function ActivationGraph({ type, width, height }) {
  return (
    <LineChart
      width={width}
      height={height}
      data={type === "ReLU" ? RELU_DATA : SIGMOID_DATA}
      margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <Line
        type={type === "ReLU" ? "linear" : "monotone"}
        dataKey="yValue"
        dot={false}
        stroke="#9c27b0"
        strokeWidth={3}
        isAnimationActive={false}
      />
      <XAxis dataKey="xValue" type="number">
        <Label value="x" position="bottom" />
      </XAxis>
      <YAxis dataKey="yValue" type="number">
        <Label
          angle={-90}
          value="f(x)"
          position="left"
          style={{ textAnchor: "middle" }}
        />
      </YAxis>
    </LineChart>
  );
}

export default ActivationGraph;
