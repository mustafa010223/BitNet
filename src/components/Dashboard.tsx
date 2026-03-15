import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppStore } from '../store/appStore';

export default function Dashboard() {
  const { buildings } = useAppStore();
  const [stats, setStats] = useState({
    totalBuildings: 0,
    avgHeight: 0,
    avgPopulation: 0,
    totalEnergy: 0
  });

  useEffect(() => {
    if (buildings.length > 0) {
      const total = buildings.length;
      const avgH = buildings.reduce((acc, b) => acc + b.size[1], 0) / total;
      const avgP = buildings.reduce((acc, b) => acc + (b.residents || 0), 0) / total;
      const totalE = buildings.reduce((acc, b) => acc + (b.energyConsumption || 0), 0);

      setStats({
        totalBuildings: total,
        avgHeight: Math.round(avgH),
        avgPopulation: Math.round(avgP),
        totalEnergy: Math.round(totalE)
      });
    }
  }, [buildings]);

  const chartData = buildings.slice(0, 10).map((b, i) => ({
    name: `B${i + 1}`,
    height: b.size[1],
    population: b.residents || 0,
    energy: b.energyConsumption || 0
  }));

  return (
    <div style={{
      flex: 1,
      padding: '2rem',
      overflow: 'auto',
      color: '#fff'
    }}>
      <h2 style={{ marginBottom: '2rem', color: '#00ff88' }}>City Dashboard</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <StatCard title="Total Buildings" value={stats.totalBuildings} />
        <StatCard title="Avg Height" value={`${stats.avgHeight}m`} />
        <StatCard title="Avg Population" value={stats.avgPopulation} />
        <StatCard title="Total Energy" value={`${stats.totalEnergy} kW`} />
      </div>

      <div style={{
        background: '#1a1f2e',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #2a3f5f'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Building Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3f5f" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                background: '#1a1f2e',
                border: '1px solid #2a3f5f',
                borderRadius: '4px'
              }}
            />
            <Legend />
            <Bar dataKey="height" fill="#00ff88" />
            <Bar dataKey="population" fill="#0088ff" />
            <Bar dataKey="energy" fill="#ff8800" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div style={{
      background: '#1a1f2e',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #2a3f5f'
    }}>
      <div style={{ color: '#888', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
        {title}
      </div>
      <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#00ff88' }}>
        {value}
      </div>
    </div>
  );
}
