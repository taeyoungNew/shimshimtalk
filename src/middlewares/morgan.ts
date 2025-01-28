import morgan from "morgan";
import logger from "../config/logger";

// Morganのストリームを定義
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// カスタムフォーマットの定義
const format =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

// Morganミドルウェアの作成
const morganMiddleware = morgan(format, { stream });

export default morganMiddleware;
