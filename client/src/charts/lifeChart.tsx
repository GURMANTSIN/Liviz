import * as d3 from "d3";
import { useEffect, useRef } from "react";

const lifeChart = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    d3.csv("/life.csv").then(data => {
      const parsed = data.map(d => ({
        activity: d.activity!,
        years: parseFloat(d.total_years_spent!),
        color: d.color!
      }));

      const width = 800;
      const height = 400;
      const margin = { top: 20, right: 30, bottom: 40, left: 150 };

      const svg = d3.select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const x = d3.scaleLinear()
        .domain([0, d3.max(parsed, d => d.years)!])
        .range([margin.left, width - margin.right]);

      const y = d3.scaleBand()
        .domain(parsed.map(d => d.activity))
        .range([margin.top, height - margin.bottom])
        .padding(0.2);

      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(10).tickFormat(d => `${d} yrs`));

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      svg.selectAll("rect")
        .data(parsed)
        .enter()
        .append("rect")
        .attr("x", margin.left)
        .attr("y", d => y(d.activity)!)
        .attr("width", d => x(d.years) - margin.left)
        .attr("height", y.bandwidth())
        .attr("fill", d => d.color);

      svg.selectAll("text.label")
        .data(parsed)
        .enter()
        .append("text")
        .attr("x", d => x(d.years) + 5)
        .attr("y", d => y(d.activity)! + y.bandwidth() / 2 + 5)
        .text(d => `${d.years} yrs`)
        .style("font-size", "12px")
        .style("fill", "#333");
    });
  }, []);

  return <div ref={ref}></div>;
};

export default lifeChart;