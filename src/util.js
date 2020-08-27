export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const sortRecoveries = (data) => {
  const sortedRecoveries = [...data];

  return sortedRecoveries.sort((a, b) => (a.recovered > b.recovered ? -1 : 1));
};
