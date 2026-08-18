import React from 'react';

interface RadarChartProps {
  dimensions: {
    requirementCompleteness: number;
    uxCompleteness: number;
    architectureReadiness: number;
    securityReadiness: number;
    dataReadiness: number;
    integrationReadiness: number;
    edgeCaseCoverage: number;
    testingReadiness: number;
    dependencyResolution: number;
  };
  overallScore: number;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ dimensions, overallScore, size = 320 }) => {
  const labels = [
    { key: 'requirementCompleteness', label: 'Requirements', value: dimensions.requirementCompleteness },
    { key: 'uxCompleteness', label: 'UI / UX', value: dimensions.uxCompleteness },
    { key: 'architectureReadiness', label: 'Architecture', value: dimensions.architectureReadiness },
    { key: 'securityReadiness', label: 'Security', value: dimensions.securityReadiness },
    { key: 'dataReadiness', label: 'Data Model', value: dimensions.dataReadiness },
    { key: 'integrationReadiness', label: 'Integrations', value: dimensions.integrationReadiness },
    { key: 'edgeCaseCoverage', label: 'Edge Cases', value: dimensions.edgeCaseCoverage },
    { key: 'testingReadiness', label: 'Testing', value: dimensions.testingReadiness },
    { key: 'dependencyResolution', label: 'Dependencies', value: dimensions.dependencyResolution }
  ];

  const totalAxes = labels.length;
  const center = size / 2;
  const radius = center - 45;

  // Compute polygon points
  const points = labels.map((item, index) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (item.value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Grid concentric rings
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid Rings */}
        {gridLevels.map((lvl, idx) => {
          const ringPoints = labels.map((_, i) => {
            const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
            const r = lvl * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={`ring_${idx}`}
              points={ringPoints}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray={idx === 3 ? 'none' : '3,3'}
            />
          );
        })}

        {/* Axis Lines */}
        {labels.map((item, index) => {
          const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={`axis_${index}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Radar Value Polygon */}
        <polygon
          points={points}
          fill="rgba(6, 182, 212, 0.25)"
          stroke="#06b6d4"
          strokeWidth="2"
          className="transition-all duration-500 ease-out"
        />

        {/* Data Vertices */}
        {labels.map((item, index) => {
          const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
          const r = (item.value / 100) * radius;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <circle
              key={`vertex_${index}`}
              cx={x}
              cy={y}
              r="3.5"
              fill="#22d3ee"
              stroke="#083344"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Axis Labels */}
        {labels.map((item, index) => {
          const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
          const labelRadius = radius + 22;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          const isRight = Math.cos(angle) > 0.1;
          const isLeft = Math.cos(angle) < -0.1;
          const textAnchor = isRight ? 'start' : isLeft ? 'end' : 'middle';

          return (
            <g key={`lbl_${index}`}>
              <text
                x={x}
                y={y}
                textAnchor={textAnchor}
                className="text-[10px] font-mono fill-slate-300 font-medium"
                dominantBaseline="central"
              >
                {item.label} ({item.value}%)
              </text>
            </g>
          );
        })}

        {/* Center Score Badge */}
        <circle cx={center} cy={center} r="22" fill="#090d16" stroke="#06b6d4" strokeWidth="1.5" />
        <text
          x={center}
          y={center + 1}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-xs font-bold font-mono fill-cyan-400"
        >
          {overallScore}%
        </text>
      </svg>
    </div>
  );
};
