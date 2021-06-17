import React, { Component, useEffect, useState } from "react";
import Plot from "react-plotly.js";

const Graph = ({ graphFlag, graphData }) => {
  console.log(graphData)

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
              y: graphData.close,
              x: graphData.xRange,
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
              x: graphData.xRange,

              close: graphData.close,

              decreasing: { line: { color: "#7F7F7F" } },

              high: graphData.high,

              increasing: { line: { color: "#17BECF" } },

              line: { color: "rgba(31,119,180,1)" },

              low: graphData.low,

              open:graphData.open,

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
              type: "date",
            },
          }}
        />
      )}
    </div>
  );
};

export default Graph;
