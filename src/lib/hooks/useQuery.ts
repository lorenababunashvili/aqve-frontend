import { useState, useEffect, useCallback, useRef } from "react";
import { ApiError } from "../api";

interface UseQueryOptions<T> {
    enabled?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
}

interface UseQueryResult<T> {
    data: T | null;
    isLoading: boolean;
    error: ApiError | null;
    refetch: () => void;
}

export function useQuery<T>(
    queryFn: () => Promise<T>,
    deps: unknown[] = [],
    options: UseQueryOptions<T> = {}
): UseQueryResult<T> {
    const { enabled = true, onSuccess, onError } = options;
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(enabled);
    const [error, setError] = useState<ApiError | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const fetch = useCallback(async () => {
        if (!enabled) return;
        setIsLoading(true);
        setError(null);
        try {
            const result = await queryFn();
            if (mountedRef.current) {
                setData(result);
                onSuccess?.(result);
            }
        } catch (err) {
            if (mountedRef.current) {
                const apiErr =
                    err instanceof ApiError ? err : new ApiError(500, String(err));
                setError(apiErr);
                onError?.(apiErr);
            }
        } finally {
            if (mountedRef.current) {
                setIsLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, ...deps]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { data, isLoading, error, refetch: fetch };
}

interface UseMutationResult<TData, TVariables> {
    mutate: (variables: TVariables) => Promise<TData>;
    isLoading: boolean;
    error: ApiError | null;
    data: TData | null;
    reset: () => void;
}

export function useMutation<TData, TVariables>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options: {
        onSuccess?: (data: TData, variables: TVariables) => void;
        onError?: (error: ApiError, variables: TVariables) => void;
    } = {}
): UseMutationResult<TData, TVariables> {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [data, setData] = useState<TData | null>(null);

    const mutate = useCallback(
        async (variables: TVariables) => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await mutationFn(variables);
                setData(result);
                options.onSuccess?.(result, variables);
                return result;
            } catch (err) {
                const apiErr =
                    err instanceof ApiError ? err : new ApiError(500, String(err));
                setError(apiErr);
                options.onError?.(apiErr, variables);
                throw apiErr;
            } finally {
                setIsLoading(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [mutationFn]
    );

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setIsLoading(false);
    }, []);

    return { mutate, isLoading, error, data, reset };
}