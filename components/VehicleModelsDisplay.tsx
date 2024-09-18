import { tModel } from '../types/tModel';

type VehicleModelsDisplayProps = {
  models: tModel[];
};

const VehicleModelsDisplay: React.FC<VehicleModelsDisplayProps> = ({
  models,
}) => {
  return (
    <>
      {models.length ? (
        <ul className="list-decimal pl-5">
          {models.map(({ Model_ID, Model_Name }) => (
            <li key={Model_ID} className="mb-1 text-base font-semibold">
              {Model_Name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No models found for the selected make and year.</p>
      )}
    </>
  );
};

export default VehicleModelsDisplay;
