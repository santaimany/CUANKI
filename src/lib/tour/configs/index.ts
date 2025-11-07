import type { TourConfigMap } from '../types';
import { dashboardHomeTour } from './dashboardHome';
import { assetsTour } from './assets';
import { goalsTour } from './goals';
import { badgesTour } from './badges';
import { transactionsTour } from './transactions';
import { profileTour } from './profile';

export const tourConfigs: TourConfigMap = {
  [dashboardHomeTour.id]: dashboardHomeTour,
  [assetsTour.id]: assetsTour,
  [goalsTour.id]: goalsTour,
  [badgesTour.id]: badgesTour,
  [transactionsTour.id]: transactionsTour,
  [profileTour.id]: profileTour,
};

export const findTourByRoute = (route: string) => {
  const normalizedRoute = route.endsWith('/') && route !== '/' ? route.slice(0, -1) : route;
  return Object.values(tourConfigs).find((config) =>
    config.routes.includes(normalizedRoute)
  );
};
