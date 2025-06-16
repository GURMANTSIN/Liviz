// load-data.js
export async function loadLifeData() {
  const data = await d3.csv("data/life_activities.csv", d => ({
    activity: d.activity,
    hours: +d.average_hours_per_day,
    years: +d.total_years_spent,
    color: d.color
  }));
  return data;
}
