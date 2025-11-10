/**
 * 문자열로 된 만료 시간을 초 단위로 변환해줌.
 * 예: "30m" → 1800, "2h" → 7200, "7d" → 604800
 */
export const getExpireSeconds = (value: string): number => {
  if (!value) throw new Error("Expire time is required");

  const regex = /^(\d+)([smhd])$/i; // s, m, h, d 지원
  const match = value.match(regex);

  if (!match) {
    throw new Error(
      `Invalid expire time format: "${value}". Use s/m/h/d (e.g., 30m, 2h, 7d)`
    );
  }

  const num = Number(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "s":
      return num;
    case "m":
      return num * 60;
    case "h":
      return num * 60 * 60;
    case "d":
      return num * 60 * 60 * 24;
    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }
};
