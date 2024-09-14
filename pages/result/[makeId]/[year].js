import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { Suspense, lazy } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchVehicleModels = async (makeId, year) => {
  const response = await fetch(
    `${apiUrl}/vehicles/getModelsForMake/${makeId}?modelYear=${year}&format=json`
  );
  const data = await response.json();
  return data.Results || [];
};

const VehicleModelsDisplay = lazy(
  () => import('../../../components/VehicleModelsDisplay')
);

export default function ResultPage() {
  const router = useRouter();
  const { makeId, year } = router.query;

  const {
    data: models = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['vehicleModels', makeId, year],
    queryFn: () => fetchVehicleModels(makeId, year),
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

export async function getStaticPaths() {
  const response = await fetch(
    `${apiUrl}/vehicles/GetMakesForVehicleType/car?format=json`
  );
  const makesData = await response.json();
  const makes = makesData.Results || [];

  const currentYear = new Date().getFullYear();
  const yearsRange = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  );

  const paths = makes.flatMap((make) =>
    yearsRange.map((year) => ({
      params: { makeId: make.MakeId.toString(), year: year.toString() },
    }))
  );

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { makeId, year } = params;

  return {
    props: {
      makeId,
      year,
    },
  };
}
