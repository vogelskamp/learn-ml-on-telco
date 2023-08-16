import { Label, Line, LineChart, XAxis, YAxis } from "recharts";

function ErrorCurve({ width, height, values, isAnimationActive = true }) {
  return (
    <LineChart
      width={width}
      height={height}
      data={values}
      margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <Line
        type="monotone"
        dot={false}
        dataKey="yValue"
        stroke="#9c27b0"
        isAnimationActive={isAnimationActive}
      />
      <XAxis
        padding="gap"
        dataKey="xValue"
        ticks={[0, 0.25, 0.5, 0.75, 1]}
        type={"number"}
      >
        <Label value="α" position="bottom" />
      </XAxis>
      <YAxis dataKey="yValue" markerStart={0} markerEnd={16} type={"number"}>
        <Label
          angle={-90}
          value="Fehlerrate"
          position="left"
          style={{ textAnchor: "middle" }}
        />
      </YAxis>
    </LineChart>
  );
}

export default ErrorCurve;
