
// returns string type in the form of [REDUCER][TYPE]
export const typeCreator = (reducerName: string, label: string): string =>
  `[${reducerName}][${label}]`;