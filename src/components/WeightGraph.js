import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function WeightGraph({ weights }) {
  const graphRef = useRef();

  useEffect(() => {
    const fetchWeights = async () => {
      if (weights.length > 0) {
        drawGraph(weights);
      }
    };

    const drawGraph = (weights) => {
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      const line = d3
        .line()
        .x((d) => x(d.date))
        .y((d) => y(d.weight));

      const svg = d3
        .select(graphRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      weights.forEach((d) => {
        d.date = new Date(d.date);
      });

      x.domain(d3.extent(weights, (d) => d.date));
      y.domain(d3.extent(weights, (d) => d.weight));

      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      svg.append('g').call(d3.axisLeft(y));

      svg.append('path')
        .datum(weights)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);
    };

    fetchWeights();
  }, [weights]);

  return <div className="graph-container" ref={graphRef}></div>;
}

export default WeightGraph;
