import * as Sentry from '@sentry/react-native';

const sentryDSN = 'https://65a10936fdca1657470e34da17e57810@o4508805175902209.ingest.de.sentry.io/4508805178130512';

const SentryService = {
    init: () => {
        Sentry.init({
            dsn: sentryDSN,

            // uncomment the line below to enable Spotlight (https://spotlightjs.com)
            // spotlight: __DEV__,
        });
    }
}

export default SentryService;