import React, { useMemo } from "react";
import { Card, CardContent } from "./ui/Card";

const chartData = [
  {
    year: 2024,
    revenues: 1950000,
    programs: 1720000,
    fundraising: 80000,
    administration: 90000,
    recognizedDonations: 45000,
    other: 15000,
  },
  {
    year: 2023,
    revenues: 2100000,
    programs: 1850000,
    fundraising: 75000,
    administration: 110000,
    recognizedDonations: 50000,
    other: 15000,
  },
  {
    year: 2022,
    revenues: 1700000,
    programs: 1450000,
    fundraising: 60000,
    administration: 95000,
    recognizedDonations: 40000,
    other: 12000,
  },
  {
    year: 2021,
    revenues: 1320000,
    programs: 1120000,
    fundraising: 55000,
    administration: 85000,
    recognizedDonations: 35000,
    other: 10000,
  },
  {
    year: 2020,
    revenues: 1250000,
    programs: 1050000,
    fundraising: 50000,
    administration: 80000,
    recognizedDonations: 30000,
    other: 8000,
  },
];

const categories = [
  { key: "programs", label: "Programmes", color: "#005A9C" },
  { key: "fundraising", label: "Collecte de fonds", color: "#F4C542" },
  { key: "administration", label: "Gestion et administration", color: "#8CBF3F" },
  { key: "recognizedDonations", label: "Dons à des donataires reconnus", color: "#B0B5BC" },
  { key: "other", label: "Autre", color: "#F39C1F" },
];

const summaryStats = [
  { value: "0", label: "Employés à temps plein" },
  { value: "12", label: "Employés à temps partiel" },
  { value: "1,391,820$", label: "Compensation totale pour tous les employés" },
  { value: "37,743$", label: "Honoraires de professionnels ou de consultants" },
];

export default function FinancialImpactGraph() {
  const maxValue = useMemo(
    () => Math.max(...chartData.map((entry) => entry.revenues)),
    []
  );

  const viewWidth = 820;
  const viewHeight = 360;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const chartWidth = viewWidth - padding.left - padding.right;
  const chartHeight = viewHeight - padding.top - padding.bottom;
  const slotWidth = chartWidth / chartData.length;
  const barWidth = slotWidth * 0.45;

  const linePoints = chartData
    .map((entry, index) => {
      const x =
        padding.left + index * slotWidth + slotWidth / 2;
      const y =
        viewHeight -
        padding.bottom -
        (entry.revenues / maxValue) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const yTicks = [0.25, 0.5, 0.75, 1].map((ratio) => ({
    value: Math.round(maxValue * ratio),
    y: viewHeight - padding.bottom - ratio * chartHeight,
  }));

  return (
    <div className="space-y-6">
      <Card className="border-gray-200 shadow-md">
        <CardContent className="!p-6 space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-wide text-primary font-semibold">
              Notre impact financier
            </p>
            <h4 className="text-2xl font-bold text-foreground">
              Revenus et dépenses par année (CAD)
            </h4>
            <p className="text-foreground/70 text-sm">
              Données issues des déclarations ARC, période se terminant le 31 mars
              2024. Les colonnes empilées montrent la répartition des dépenses
              principales tandis que la ligne souligne l’évolution des revenus
              totaux.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: "#7A1247" }}
              />
              Revenus
            </div>
            {categories.map((category) => (
              <div
                key={category.key}
                className="flex items-center gap-2 text-sm text-foreground/80"
              >
                <span
                  className="inline-block h-2 w-4 rounded-sm"
                  style={{ backgroundColor: category.color }}
                />
                {category.label}
              </div>
            ))}
          </div>

          <div className="w-full border border-gray-100 rounded-2xl bg-white/60">
            <svg
              viewBox={`0 0 ${viewWidth} ${viewHeight}`}
              role="img"
              aria-label="Graphique des revenus et dépenses annuels"
              className="w-full h-[22rem]"
            >
              <g>
                {yTicks.map((tick, idx) => (
                  <g key={idx}>
                    <line
                      x1={padding.left}
                      x2={viewWidth - padding.right}
                      y1={tick.y}
                      y2={tick.y}
                      stroke="#E5E7EB"
                      strokeDasharray="6 6"
                    />
                    <text
                      x={padding.left - 15}
                      y={tick.y + 4}
                      textAnchor="end"
                      className="fill-current text-xs"
                      fill="#6B7280"
                    >
                      {tick.value.toLocaleString("fr-CA")}
                    </text>
                  </g>
                ))}

                {chartData.map((entry, index) => {
                  const baseX =
                    padding.left + index * slotWidth + (slotWidth - barWidth) / 2;
                  let currentY = viewHeight - padding.bottom;

                  return (
                    <g key={entry.year}>
                      {categories.map((category) => {
                        const value = entry[category.key];
                        const height = (value / maxValue) * chartHeight;
                        currentY -= height;
                        return (
                          <rect
                            key={category.key}
                            x={baseX}
                            y={currentY}
                            width={barWidth}
                            height={height}
                            fill={category.color}
                            rx={4}
                          />
                        );
                      })}
                      <text
                        x={baseX + barWidth / 2}
                        y={viewHeight - padding.bottom + 24}
                        textAnchor="middle"
                        className="fill-current text-sm font-medium"
                        fill="#374151"
                      >
                        {entry.year}
                      </text>
                    </g>
                  );
                })}

                <polyline
                  points={linePoints}
                  fill="none"
                  stroke="#7A1247"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-md"
                />

                {chartData.map((entry, index) => {
                  const cx =
                    padding.left + index * slotWidth + slotWidth / 2;
                  const cy =
                    viewHeight -
                    padding.bottom -
                    (entry.revenues / maxValue) * chartHeight;
                  return (
                    <g key={`${entry.year}-point`}>
                      <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#7A1247" strokeWidth="3" />
                      <text
                        x={cx}
                        y={cy - 14}
                        textAnchor="middle"
                        className="fill-current text-xs font-semibold"
                        fill="#7A1247"
                      >
                        {(entry.revenues / 1000000).toFixed(2)}M
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summaryStats.map((stat) => (
              <Card key={stat.label} className="bg-gray-50 border border-gray-100">
                <CardContent className="!p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <p className="text-xs uppercase tracking-wide text-foreground/70">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-[11px] text-center text-foreground/60 italic">
            *Source : Agence du revenu du Canada (ARC) via CanaDon. Les chiffres sont
            arrondis pour faciliter la lecture.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


