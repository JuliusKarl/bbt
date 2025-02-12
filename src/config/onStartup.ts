import * as Sentry from "@sentry/react-native";
import StocksService from "@/services/stocks/stocks.service";

/**
 * Common startup functions to load on app start
 */
async function onStartup() {
  Sentry.startSpan({ name: "onStartup" }, async () => {
    await StocksService.init();
  });
}

export default onStartup;
