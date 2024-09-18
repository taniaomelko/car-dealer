export const getYearsRange = (startYear = 2014) => {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );
};
