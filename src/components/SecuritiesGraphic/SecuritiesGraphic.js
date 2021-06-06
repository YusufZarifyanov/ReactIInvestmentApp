import React, { Component, useEffect, useState } from "react";
import Plot from "react-plotly.js";

const Graph = ({ graphFlag, xRange, chartData }) => {
  console.log(chartData)

  return (
    <div>
      {!graphFlag ? (
        <Plot
          data={[
            {
              type: "scatter",
              mode: "lines",
              // x: transformData(state.data)["x"],
              // y: transformData(state.data)["y"],
              y: chartData.yAxes.close,
              x: chartData.xAxes,
              marker: { color: "black" },
              displayModeBar: false,
            },
          ]}
          config={{
            displayModeBar: false,
            responsive: true,
          }}
          layout={{
            xaxis: {
              // autorange: true,
              // domain: [0, 1],
              range: xRange,
              type: "date",
            },
          }}
          style={{ width: "80%", margin: "0 auto", height: "400px" }}
        />
      ) : (
        <Plot
          config={{
            displayModeBar: false,
            responsive: true,
          }}
          style={{ width: "80%", margin: "0 auto", height: "400px" }}
          data={[
            {
              x: chartData.xAxes,

              close: chartData.yAxes.close,

              decreasing: { line: { color: "#7F7F7F" } },

              high: chartData.yAxes.high,

              increasing: { line: { color: "#17BECF" } },

              line: { color: "rgba(31,119,180,1)" },

              low: chartData.yAxes.low,

              open:chartData.yAxes.open,

              type: "candlestick",
              xaxis: "x",
              yaxis: "y",
            },
          ]}
          layout={{
            // dragmode: "zoom",
            // margin: {
            //   r: 10,
            //   t: 25,
            //   b: 40,
            //   l: 60,
            // },
            showlegend: false,
            xaxis: {
              rangeslider: {
                visible: false
              },
              // autorange: true,
              // domain: [0, 1],
              range: xRange,
              type: "date",
            },
          }}
        />
      )}
    </div>
  );
};

export default Graph;
