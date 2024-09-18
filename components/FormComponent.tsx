import { tMake } from '../types/tMake';

type FormComponentProps = {
  makes: tMake[];
  years: number[];
  selectedMake: string;
  selectedYear: string;
  setSelectedMake: (_: string) => void;
  setSelectedYear: (_: string) => void;
  isFormValid: boolean;
  handleNextClick: () => void;
};

const FormComponent: React.FC<FormComponentProps> = ({
  makes,
  years,
  selectedMake,
  selectedYear,
  setSelectedMake,
  setSelectedYear,
  isFormValid,
  handleNextClick,
}) => {
  const sortedMakes = [...makes].sort((a, b) =>
    a.MakeName.localeCompare(b.MakeName)
  );

  return (
    <form className="flex flex-col md:flex-row gap-6 justify-center md:items-end">
      <div className="flex-1">
        <label
          htmlFor="make"
          className="block text-sm font-semibold text-blue-500"
        >
          Vehicle Make
        </label>
        <select
          id="make"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-1 py-2"
        >
          <option value="">Select a make</option>
          {sortedMakes.map(({ MakeId, MakeName }) => (
            <option key={MakeId} value={MakeName}>
              {MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label
          htmlFor="year"
          className="block text-sm font-semibold text-blue-500"
        >
          Model Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-1 py-2"
        >
          <option value="">Select a year</option>
          {years.map((year: number) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        disabled={!isFormValid}
        className={`w-full md:w-fit py-[7px] px-5 rounded-lg text-base transition-colors ${isFormValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        onClick={handleNextClick}
      >
        Next
      </button>
    </form>
  );
};

export default FormComponent;
