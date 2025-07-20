// Synthetic sales data for 2018-2023, all products, regions, and quarters, with diverse, realistic variation
export const salesData = [];

const products = [
  { name: "Smartphone", base: 120000, step: 2000, volatility: 0.12 },
  { name: "Laptop", base: 90000, step: 1000, volatility: 0.15 },
  { name: "Tablet", base: 60000, step: 500, volatility: 0.18 },
  { name: "Smartwatch", base: 30000, step: 400, volatility: 0.22 },
];

const regions = [
  { name: "North America", offset: 0 },
  { name: "Europe", offset: 3000 },
  { name: "Asia", offset: 6000 },
  { name: "Latin America", offset: -3000 },
];

const years = [2018, 2019, 2020, 2021, 2022, 2023];
const quarters = ["Q1", "Q2", "Q3", "Q4"];

// Simple seeded random for reproducibility
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
const rand = mulberry32(3125);

for (const product of products) {
  for (const region of regions) {
    let last = product.base + region.offset;
    for (const yearIdx in years) {
      const year = years[yearIdx];
      for (const qIdx in quarters) {
        const quarter = quarters[qIdx];
        // Add random spikes/dips
        let spike = 1;
        if (rand() > 0.92) spike += (rand() - 0.5) * 2.5; // rare big spike
        if (rand() > 0.85) spike += (rand() - 0.5) * 1.2; // occasional small spike
        // Add volatility
        const volatility = 1 + (rand() - 0.5) * product.volatility;
        // Trend
        const trend = product.step * (parseInt(yearIdx) * 4 + parseInt(qIdx));
        // Final sales
        let sales = Math.round((product.base + trend + region.offset) * volatility * spike);
        // Add some random noise
        sales += Math.round((rand() - 0.5) * 2000);
        // Clamp to minimum
        sales = Math.max(5000, sales);
        salesData.push({
          product: product.name,
          region: region.name,
          year,
          quarter,
          sales,
        });
      }
    }
  }
} 