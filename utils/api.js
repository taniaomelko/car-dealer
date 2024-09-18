const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchVehicleMakes = async () => {
  const response = await fetch(
    `${apiUrl}/vehicles/GetMakesForVehicleType/car?format=json`
  );
  const data = await response.json();
  return data.Results || [];
};

export const fetchVehicleModels = async (makeId, year) => {
  const response = await fetch(
    `${apiUrl}/vehicles/getModelsForMake/${makeId}?modelYear=${year}&format=json`
  );
  const data = await response.json();
  return data.Results || [];
};
