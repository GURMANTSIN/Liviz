// social-slider.js

const width = 500;
const height = 100;
const margin = { top: 20, right: 30, bottom: 20, left: 30 };

const svg = d3.select("#slider")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Scale with 0.5 step intervals
const steps = d3.range(0, 10.5, 0.5);
const x = d3.scaleLinear()
  .domain([0, 10])
  .range([margin.left, width - margin.right])
  .clamp(true);

// Slider track
svg.append("line")
  .attr("x1", x.range()[0])
  .attr("x2", x.range()[1])
  .attr("y1", height / 2)
  .attr("y2", height / 2)
  .attr("stroke", "#ccc")
  .attr("stroke-width", 6);

// Tick marks for each 0.5 hr
svg.selectAll("line.tick")
  .data(steps)
  .enter()
  .append("line")
  .attr("x1", d => x(d))
  .attr("x2", d => x(d))
  .attr("y1", height / 2 - 8)
  .attr("y2", height / 2 + 8)
  .attr("stroke", "#999");

// Initial state
let currentHr = 2;
let currentX = x(currentHr);

// Handle
const handle = svg.append("circle")
  .attr("cx", currentX)
  .attr("cy", height / 2)
  .attr("r", 10)
  .attr("fill", "#3498db");

// Label
const label = svg.append("text")
  .attr("x", currentX)
  .attr("y", height / 2 - 20)
  .attr("text-anchor", "middle")
  .attr("font-size", 14)
  .text(`${currentHr} hr/day`);

// Init result
updateResult(currentHr);

// Drag behavior with snap to nearest 0.5
svg.call(
  d3.drag()
    .on("drag", function (event) {
      let rawHr = x.invert(event.x);
      let hr = Math.round(rawHr * 2) / 2; // round to nearest 0.5
      hr = Math.max(0, Math.min(10, hr));
      const cx = x(hr);

      handle.attr("cx", cx);
      label.attr("x", cx).text(`${hr} hr/day`);
      updateResult(hr);
    })
);

// Update card with yearly time lost
function updateResult(hr) {
  const daysLost = Math.round((hr * 365) / 24);
  d3.select("#card-result").html(`
    Spending <strong>${hr}</strong> hours/day on social media or YouTube 
    costs you <strong>${daysLost}</strong> full days <u>per year</u>.
  `);
}
