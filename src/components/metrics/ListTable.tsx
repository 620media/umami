import { Column, Grid, Row, Text } from '@umami/react-zen';
import { useSpring, useTransform } from 'motion/react';
import { type ReactNode, useEffect } from 'react';
import { List, type RowComponentProps } from 'react-window';
import { AnimatedDiv } from '@/components/common/AnimatedDiv';
import { Empty } from '@/components/common/Empty';
import { useMessages, useMobile } from '@/components/hooks';
import { formatLongNumber } from '@/lib/format';

const ITEM_SIZE = 28;

interface ListData {
  label: string;
  count: number;
  percent: number;
}

export interface ListTableProps {
  data?: ListData[];
  title?: string;
  metric?: string;
  className?: string;
  renderLabel?: (data: ListData, index: number) => ReactNode;
  renderChange?: (data: ListData, index: number) => ReactNode;
  animate?: boolean;
  virtualize?: boolean;
  showPercentage?: boolean;
  itemCount?: number;
  formatCount?: (n: number) => string;
}

export function ListTable({
  data = [],
  title,
  metric,
  renderLabel,
  renderChange,
  animate = true,
  virtualize = false,
  showPercentage = true,
  itemCount = 10,
  formatCount,
}: ListTableProps) {
  const { t, labels } = useMessages();
  const { isPhone } = useMobile();

  const getRow = (row: ListData, index: number) => {
    const { label, count, percent } = row;

    return (
      <AnimatedRow
        key={`${label}${index}`}
        label={renderLabel ? renderLabel(row, index) : (label ?? t(labels.unknown))}
        value={count}
        percent={percent}
        animate={animate && !virtualize}
        showPercentage={showPercentage}
        change={renderChange ? renderChange(row, index) : null}
        formatCount={formatCount}
        isPhone={isPhone}
      />
    );
  };

  const ListTableRow = ({ index, style }: RowComponentProps) => {
    return <div style={style}>{getRow(data[index], index)}</div>;
  };

  return (
    <Column gap>
      <Grid alignItems="center" justifyContent="space-between" columns={'1fr 60px'}>
        <Text weight="bold" color="muted" style={{ fontSize: 12, paddingLeft: 8 }}>
          {title}
        </Text>
        <Text weight="bold" color="muted" align="right" style={{ fontSize: 12, paddingRight: 4 }}>
          {metric}
        </Text>
      </Grid>
      <Column gap="1">
        {data?.length === 0 && <Empty />}
        {virtualize && data.length > 0 ? (
          <List
            style={{ width: '100%', height: itemCount * ITEM_SIZE }}
            defaultHeight={itemCount * ITEM_SIZE}
            rowCount={data.length}
            rowHeight={ITEM_SIZE}
            rowComponent={ListTableRow}
            rowProps={{}}
          />
        ) : (
          data.map(getRow)
        )}
      </Column>
    </Column>
  );
}

const AnimatedRow = ({
  label,
  value = 0,
  percent,
  change,
  animate,
  showPercentage = true,
  formatCount,
  isPhone,
}) => {
  const y = !Number.isNaN(value) ? value : 0;
  const ySpring = useSpring(0, { stiffness: 170, damping: 26 });
  const yText = useTransform(ySpring, n => (formatCount ? formatCount(n) : formatLongNumber(n)));

  useEffect(() => {
    if (animate) {
      ySpring.set(y);
    } else {
      ySpring.jump(y);
    }
  }, [y, animate, ySpring]);

  // 620: Rybbit-style rows — proportional fill bar behind the label, count on the right
  void showPercentage;
  return (
    <Grid
      columns={'1fr 60px'}
      alignItems="center"
      borderRadius
      gap
      hover={{ backgroundColor: 'surface-sunken' }}
    >
      <Row alignItems="center" position="relative" style={{ minHeight: 26, overflow: 'hidden', borderRadius: 4 }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: `${Math.max(0, Math.min(100, percent || 0))}%`,
            background: 'var(--row-fill, rgba(96, 165, 250, 0.18))',
            borderRadius: 4,
            transition: 'width 0.4s ease',
          }}
        />
        <Text
          truncate={true}
          style={{ maxWidth: isPhone ? '200px' : '400px', position: 'relative', paddingLeft: 8 }}
        >
          {label}
        </Text>
      </Row>
      <Row alignItems="center" height="26px" justifyContent="flex-end" style={{ paddingRight: 4 }}>
        {change}
        <Text weight="bold" title={`${percent?.toFixed?.(0) ?? 0}%`}>
          <AnimatedDiv title={String(value)}>{yText}</AnimatedDiv>
        </Text>
      </Row>
    </Grid>
  );
};
