import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// ログレベル
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// ログカラー
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// ログフォーマットの定義
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const consoleLogFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}`;
  })
);

// ロガーの作成
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    // コンソールログ
    new winston.transports.Console(),
  ],
});

// 開発環境の場合はコンソールにも出力
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
