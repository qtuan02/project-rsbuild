import { lazy, Suspense } from 'react';

const LazyReactQueryDevtools = lazy(async () => {
  const { ReactQueryDevtools } = await import('@tanstack/react-query-devtools');
  return { default: ReactQueryDevtools };
});

export const QueryDevtools = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <LazyReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
};
