/**
 * PoMI 对数衰减挖矿算法
 *
 * 公式: M(i) = a - b * ln(i)
 * 其中:
 *   b = a * (1 - 1/r) / ln(12)
 *   a = T / (12 - (1 - 1/r) * ln(12!) / ln(12))
 *   T = 总量 (100M), r = 首末月产出比 (7.77), i = 月份 (1~12)
 */

export const POMI_TOTAL = 100_000_000;
export const DECAY_RATIO = 7.77;
const TOTAL_MONTHS = 12;

const LN_12_FACTORIAL = Array.from({ length: TOTAL_MONTHS }, (_, i) => Math.log(i + 1)).reduce(
  (sum, v) => sum + v,
  0
);
const LN_12 = Math.log(TOTAL_MONTHS);

const a = POMI_TOTAL / (TOTAL_MONTHS - ((1 - 1 / DECAY_RATIO) * LN_12_FACTORIAL) / LN_12);
const b = (a * (1 - 1 / DECAY_RATIO)) / LN_12;

/** 计算第 i 月 (1-based) 的产出 */
export function outputAt(month) {
  if (month < 1 || month > TOTAL_MONTHS) return 0;
  return a - b * Math.log(month);
}

/** 获取完整 12 个月的挖矿计划表 */
export function getMiningSchedule() {
  let cumulative = 0;
  return Array.from({ length: TOTAL_MONTHS }, (_, i) => {
    const output = outputAt(i + 1);
    cumulative += output;
    const daily = output / 30;
    return {
      month: i + 1,
      output: Math.round(output),
      daily: Math.round(daily),
      perMinute: +(daily / 1440).toFixed(2),
      percentage: +((output / POMI_TOTAL) * 100).toFixed(2),
      cumulative: Math.round(Math.min(cumulative, POMI_TOTAL)),
    };
  });
}

/** 生成 SVG 路径用的归一化坐标点 (0~1 range) */
export function getDecayCurvePoints() {
  const schedule = getMiningSchedule();
  const maxOutput = schedule[0].output;
  return schedule.map((s) => ({
    x: (s.month - 1) / (TOTAL_MONTHS - 1),
    y: 1 - s.output / maxOutput,
    month: s.month,
    output: s.output,
  }));
}
