import { appConfig } from '@/config/app';

const CURRENCY_FORMATTER = new Intl.NumberFormat(appConfig.locale, {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number): string =>
  CURRENCY_FORMATTER.format(value);
