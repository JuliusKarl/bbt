import { setError, setErrorMessage } from "@/redux/slices/appSlice";
import { store } from "@/redux/store/store";
import { QueryClient } from "@tanstack/react-query";

// Config
const queryClient = new QueryClient();
const dispatch = store.dispatch;

// API
const apiURL = '';
const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;

const StocksService = {
    init: async () => {
        try {
            // Stocks
            await queryClient.prefetchQuery({
                queryFn: () => { return [] },
                queryKey: ['stocks']
            })
            // Crypto
            await queryClient.prefetchQuery({
                queryFn: () => { return [] },
                queryKey: ['crypto']
            })
            // News
            await queryClient.prefetchQuery({
                queryFn: () => { return [] },
                queryKey: ['news']
            })
            // Entities
            await queryClient.prefetchQuery({
                queryFn: () => { return [] },
                queryKey: ['entities']
            })
            // Industries
            await queryClient.prefetchQuery({
                queryFn: () => { return [] },
                queryKey: ['industries']
            })
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(true));
                dispatch(setErrorMessage(`${error.name}: ${error.message}`))
            }
        }
    },
    getAll: async () => {
        try {
            const response = await fetch(`${apiURL}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'api-key': `${apiToken}`
                },
            });

            const stocks = response.json();
            return stocks;
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(true));
                dispatch(setErrorMessage(`${error.name}: ${error.message}`))
            }
        }
    },
    getIntraday: async (id: string) => { },
    getAllCrypto: async () => { },
    getNews: async () => { },
    getNewsByID: async (id: string) => { },
    getEntities: async () => { },
    getIndustries: async () => { }
}

export default StocksService