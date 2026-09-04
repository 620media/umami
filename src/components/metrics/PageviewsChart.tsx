import { useTheme } from '@umami/react-zen';
import { useCallback, useMemo } from 'react';
import { BarChart, type BarChartProps } from '@/components/charts/BarChart';
import { useLocale, useMessages } from '@/components/hooks';
import { renderDateLabels } from '@/lib/charts';
import { getThemeColors } from '@/lib/colors';
import { generateTimeSeries } from '@/lib/date';

export interface PageviewsChartProps extends BarChartProps {
  data: {
    pageviews: any[];
    sessions: any[];
    compare?: {
      pageviews: any[];
      sessions: any[];
    };
  };
  unit: string;
}

export function PageviewsChart({ data, unit, minDate, maxDate, ...props }: PageviewsChartProps) {
  const { t, labels } = useMessages();
  const { theme } = useTheme();
  const { locale, dateLocale } = useLocale();
  const { colors } = useMemo(() => getThemeColors(theme), [theme]);

  const chartData: any = useMemo(() => {
    if (!data) return;

    return {
      __id: Date.now(),
      datasets: [
        {
          type: 'line',
          label: t(labels.visitors),
          data: generateTimeSeries(data.sessions, minDate, maxDate, unit, dateLocale),
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 0,
          pointHitRadius: 12,
          fill: true,
          ...colors.chart.visitors,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.10)',
          order: 3,
        },
        {
          type: 'line',
          label: t(labels.views),
          data: generateTimeSeries(data.pageviews, minDate, maxDate, unit, dateLocale),
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 0,
          pointHitRadius: 12,
          fill: true,
          ...colors.chart.views,
          borderColor: '#93c5fd',
          backgroundColor: 'rgba(147, 197, 253, 0.12)',
          order: 4,
        },
        ...(data.compare
          ? [
              {
                type: 'line',
                label: `${t(labels.views)} (${t(labels.previous)})`,
                data: generateTimeSeries(
                  data.compare.pageviews,
                  minDate,
                  maxDate,
                  unit,
                  dateLocale,
                ),
                borderWidth: 2,
                backgroundColor: '#8601B0',
                borderColor: '#8601B0',
                order: 1,
              },
              {
                type: 'line',
                label: `${t(labels.visitors)} (${t(labels.previous)})`,
                data: generateTimeSeries(data.compare.sessions, minDate, maxDate, unit, dateLocale),
                borderWidth: 2,
                backgroundColor: '#f15bb5',
                borderColor: '#f15bb5',
                order: 2,
              },
            ]
          : []),
      ],
    };
  }, [data, locale]);

  const renderXLabel = useCallback(renderDateLabels(unit, locale), [unit, locale]);

  return (
    <BarChart
      {...props}
      chartData={chartData}
      unit={unit}
      minDate={minDate}
      maxDate={maxDate}
      renderXLabel={renderXLabel}
      height="400px"
    />
  );
}
