import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const BarChart = ({ data, year }) => {
  const { t } = useTranslation();
  const products = ["Smartphone", "Laptop", "Tablet", "Smartwatch"];
  const regions = [
    t('north_america'),
    t('europe'),
    t('asia'),
    t('latin_america'),
  ];

  // Prepare data: one object per region, each with product sales (sum of quarters)
  const regionData = regions.map((regionLabel) => {
    const regionKey = regionLabel;
    const entry = { region: regionKey };
    products.forEach((product) => {
      const d = data.find(
        (item) =>
          t(item.region.toLowerCase().replace(/ /g, '_')) === regionLabel &&
          item.product === product
      );
      entry[product] = d ? d.sales : 0;
    });
    return entry;
  });

  const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545'];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={regionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend />
          {products.map((product, idx) => (
            <Bar
              key={product}
              dataKey={product}
              fill={colors[idx]}
              name={t(product.toLowerCase())}
            />
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart; 