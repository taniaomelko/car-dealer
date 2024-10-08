import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { Suspense, lazy } from 'react';
import { getYearsRange } from '../../../utils/helpers';
import {
  fetchVehicleMakes,
  fetchVehicleModels,
  FetchVehicleModelsResponse,
} from '../../../utils/api';
import { tModel } from '../../../types/tModel';
import { tMake } from '../../../types/tMake';

const VehicleModelsDisplay = lazy(
  () => import('../../../components/VehicleModelsDisplay')
);

export default function ResultPage() {
  const router = useRouter();
  const { makeId, year } = router.query;

  const {
    data: response = { Results: [] },
    error,
    isLoading,
  } = useQuery<FetchVehicleModelsResponse>({
    queryKey: ['vehicleModels', makeId, year],
    queryFn: () => fetchVehicleModels(makeId as string, year as string),
    enabled: !!makeId && !!year,
  });

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
          <p>Error fetching models: {error.message}</p>
        </div>
      </section>
    );

  const models: tModel[] = response.Results;

  return (
    <section className="py-5">
      <div className="container">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          &#8592; Back
        </Link>

        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold text-center">
            {makeId} Vehicle Models
          </h1>

          <div>
            <Suspense fallback={<p>Loading models...</p>}>
              <VehicleModelsDisplay models={models} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const makes = await fetchVehicleMakes();
  const yearsRange = getYearsRange();

  const params = makes.flatMap((make: tMake) =>
    yearsRange.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString(),
    }))
  );

  return params;
}
