import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import PropTypes from "prop-types";

function Chart({ chartData }) {
  return (
    <div className="release-chart" style={{ width: "102%", height: 330 }}>
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{ top: 36, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e63946" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#e63946" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" style={{ fontSize: "12px" }} />
          <YAxis style={{ fontSize: "12px" }} domain={[5, 50]} />
          <Tooltip />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#e63946"
            fill="url(#colorValue)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
Chart.propTypes = {
  chartData: PropTypes.array.isRequired,
};
export default Chart;
