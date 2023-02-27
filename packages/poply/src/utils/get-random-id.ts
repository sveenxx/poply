export const getRandomId = () => {
  return (Math.random() + 1).toString(36).substring(2);
};
