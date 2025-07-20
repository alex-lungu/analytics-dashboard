import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const LineChart = ({ data, product, region }) => {
  const { t } = useTranslation();
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={d => `${d.year} ${d.quarter}`} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#007bff" strokeWidth={3} dot={{ r: 3 }} name={t(product.toLowerCase())} />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart; 