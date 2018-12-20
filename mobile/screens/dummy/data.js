import { energyActions, primaryId as primaryEnergyId } from './energy.json';
import { travelActions, primaryId as primaryTravelId } from './travel.json';
import { waterActions, primaryId as primaryWaterId } from './water.json';
import { wasteActions, primaryId as primaryWasteId } from './waste.json';
import {
  shoppingActions,
  primaryId as primaryShoppingId,
} from './shopping.json';
import { foodActions, primaryId as primaryFoodId } from './food.json';
import { petitions } from './community_data.json';

export const energy_data = () => {
  return energyActions;
};

export const primary_energy_id = primaryEnergyId;

export const travel_data = () => {
  return travelActions;
};

export const primary_travel_id = primaryTravelId;

export const food_data = () => {
  return foodActions;
};

export const primary_food_id = primaryFoodId;

export const shopping_data = () => {
  return shoppingActions;
};

export const primary_shopping_id = primaryShoppingId;

export const water_data = () => {
  return waterActions;
};

export const primary_water_id = primaryWaterId;

export const waste_data = () => {
  return wasteActions;
};

export const primary_waste_id = primaryWasteId;

//TODO bring the community into here
export const community_data = () => {
  return petitions;
};

let key = 1;
export const actions_data = () => {
  // destruucture only partial results, and adding a key because flaslist requires a different key
  return [
    ...energyActions.slice(0, 3).map(object => {
      object.key = key;
      key++;
      return object;
    }),
    ...travelActions.slice(0, 3).map(object => {
      object.key = key;
      key++;
      return object;
    }),
    ...foodActions.slice(0, 3).map(object => {
      object.key = key;
      key++;
      return object;
    }),
    ...shoppingActions.slice(0, 3).map(object => {
      object.key = key;
      key++;
      return object;
    }),
    ...waterActions.slice(0, 3).map(object => {
      object.key = key;
      key++;
      return object;
    }),
    ...wasteActions.slice(0, 3).map(object => {
      object.key = key;
      key++;
      return object;
    }),
  ];
};
