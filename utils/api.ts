// src/utils/api.ts
import { tModel } from '../types/tModel';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchVehicleMakes = async () => {
  const response = await fetch(
    `${apiUrl}/vehicles/GetMakesForVehicleType/car?format=json`
  );
  const data = await response.json();
  return data.Results || [];
};

export type FetchVehicleModelsResponse = {
  Results: tModel[];
};

export const fetchVehicleModels = async (
  makeId: string,
  year: string
): Promise<FetchVehicleModelsResponse> => {
  const response = await fetch(
    `${apiUrl}/vehicles/getModelsForMake/${makeId}?modelYear=${year}&format=json`
  );
  const data = await response.json();
  return data as FetchVehicleModelsResponse;
};
