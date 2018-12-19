import { energyActions, primaryId as primaryEnergyId } from './energy.json';
import { travelActions, primaryId as primaryTravelId } from './travel.json';
import { waterActions, primaryId as primaryWaterId } from './water.json';
import { wasteActions, primaryId as primaryWasteId } from './waste.json';
import {
  shoppingActions,
  primaryId as primaryShoppingId,
} from './shopping.json';
import { foodActions, primaryId as primaryFoodId } from './food.json';

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
