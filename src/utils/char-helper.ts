export const capitalizeFirstLetter = (val: string) => {
  if (typeof val !== 'string') return;
  const valLowerCase = val.toLowerCase();
  return (
    String(valLowerCase).charAt(0).toUpperCase() + String(valLowerCase).slice(1)
  );
};

export const uid = (): string => String(Date.now() + Math.random());
