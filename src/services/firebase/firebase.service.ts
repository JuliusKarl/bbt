import { getAnalytics } from "@react-native-firebase/analytics";
import { getCrashlytics } from "@react-native-firebase/crashlytics";

const analytics = getAnalytics();
const crashlytics = getCrashlytics();

const FirebaseService = {}

export default FirebaseService;