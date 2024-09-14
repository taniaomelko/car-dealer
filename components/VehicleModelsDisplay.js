export default function VehicleModelsDisplay({ models }) {
  return (
    <div className="">
      {models.length ? (
        <ul className="list-decimal pl-5">
          {models.map((model) => (
            <li key={model.Model_ID} className="mb-1 text-base font-semibold">
              {model.Model_Name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No models found for the selected make and year.</p>
      )}
    </div>
  );
}
