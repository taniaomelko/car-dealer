import { useState, useEffect, Suspense, lazy } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { fetchVehicleMakes } from '../utils/api';
import { getYearsRange } from '../utils/helpers';

const FormComponent = lazy(() => import('../components/FormComponent'));

export default function Home() {
  const {
    data: makes = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['vehicleMakes'],
    queryFn: fetchVehicleMakes,
  });

  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    setYears(getYearsRange());
  }, []);

  const isFormValid = !!selectedMake && !!selectedYear;
  const router = useRouter();

  const handleNextClick = () => {
    if (isFormValid) {
      router.push(
        `/result/${encodeURIComponent(selectedMake)}/${encodeURIComponent(selectedYear)}`
      );
    }
  };

  if (isLoading)
    return (
      <section className="py-5">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="py-5">
        <div className="container">
          <p>Error fetching makes: {error.message}</p>
        </div>
      </section>
    );

  return (
    <section className="py-5">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold text-center">
            Filter Vehicles
          </h1>

          <Suspense fallback={<p>Loading form...</p>}>
            <FormComponent
              makes={makes}
              years={years}
              selectedMake={selectedMake}
              selectedYear={selectedYear}
              setSelectedMake={setSelectedMake}
              setSelectedYear={setSelectedYear}
              isFormValid={isFormValid}
              handleNextClick={handleNextClick}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
