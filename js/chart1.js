// chart1.js
import { loadLifeData } from './load-data.js';

const width = 600;
const height = 500;
const boxSize = 50;
const columns = 10;
const rows = 8;
const totalBoxes = columns * rows;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

loadLifeData().then(data => {
  // Calculate how many blocks per category (rounded down)
  let blocks = [];
  let id = 0;
  data.forEach(d => {
    const count = Math.round(d.years); // round to nearest whole year
    for (let i = 0; i < count; i++) {
      blocks.push({
        id: id++,
        activity: d.activity,
        color: d.color
      });
    }
  });

  // Pad remaining blocks if < 80
  while (blocks.length < totalBoxes) {
    blocks.push({
      id: id++,
      activity: "Unaccounted",
      color: "#ecf0f1"
    });
  }

  // Create waffle layout
  svg.selectAll("rect")
    .data(blocks)
    .enter()
    .append("rect")
    .attr("width", boxSize - 5)
    .attr("height", boxSize - 5)
    .attr("x", (d, i) => (i % columns) * boxSize + 50)
    .attr("y", (d, i) => Math.floor(i / columns) * boxSize + 50)
    .attr("fill", d => d.color)
    .attr("stroke", "#fff");

  // Add Legend
  const legend = d3.select("#chart")
    .append("div")
    .attr("class", "legend")
    .style("margin-top", "20px");

  data.forEach(d => {
    const item = legend.append("div").style("margin", "5px");
    item.append("span")
      .style("display", "inline-block")
      .style("width", "20px")
      .style("height", "20px")
      .style("background-color", d.color)
      .style("margin-right", "10px");
    item.append("span").text(`${d.activity} (${Math.round(d.years)} years)`);
  });
});
