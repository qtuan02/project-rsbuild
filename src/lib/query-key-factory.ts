import type {
  QueryKey,
  QueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export interface TQueryKey<TKey, TListQuery = any, TDetailQuery = string> {
  all: readonly [TKey];
  lists: () => readonly [...TQueryKey<TKey>['all'], 'list'];
  list: (
    query?: TListQuery,
  ) =>
    | readonly [...ReturnType<TQueryKey<TKey>['lists']>]
    | readonly [...ReturnType<TQueryKey<TKey>['lists']>, { query: TListQuery }];
  details: () => readonly [...TQueryKey<TKey>['all'], 'detail'];
  detail: (
    id: TDetailQuery,
    query?: TListQuery,
  ) =>
    | readonly [...ReturnType<TQueryKey<TKey>['details']>, TDetailQuery]
    | readonly [
        ...ReturnType<TQueryKey<TKey>['details']>,
        TDetailQuery,
        { query: TListQuery },
      ];
}

export type UseQueryOptionsWrapper<
  // Return type of queryFn
  TQueryFn = unknown,
  // Type thrown in case the queryFn rejects
  E = Error,
  TQueryFnResult = TQueryFn,
  // Query key type
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseQueryOptions<TQueryFn, E, TQueryFnResult, TQueryKey>,
  'queryKey' | 'queryFn'
>;

export type UseOptionsWrapper<
  // Return type of queryFn
  TQueryFn = unknown,
  // Type thrown in case the queryFn rejects
  E = Error,
  // Query key type
  TQueryKey extends QueryKey = QueryKey,
> = QueryOptions<TQueryFn, E, TQueryFn, TQueryKey>;

export type UseMutationOptionsWrapper<
  TVariables = void,
  TData = unknown,
  TError = Error,
  TContext = unknown,
> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationFn' | 'mutationKey'
>;

export const queryKeysFactory = <
  T,
  TListQueryType = any,
  TDetailQueryType = string,
>(
  globalKey: T,
) => {
  const queryKeyFactory: TQueryKey<T, TListQueryType, TDetailQueryType> = {
    all: [globalKey],
    lists: () => [...queryKeyFactory.all, 'list'],
    list: (query?: TListQueryType) =>
      query === undefined
        ? queryKeyFactory.lists()
        : [...queryKeyFactory.lists(), { query }],
    details: () => [...queryKeyFactory.all, 'detail'],
    detail: (id: TDetailQueryType, query?: TListQueryType) =>
      query === undefined
        ? [...queryKeyFactory.details(), id]
        : [...queryKeyFactory.details(), id, { query }],
  };
  return queryKeyFactory;
};
