export const aRandomString = (length = 10): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array(length)
    .fill("")
    .reduce(
      (prev) =>
        prev + characters.charAt(Math.floor(Math.random() * characters.length)),
      ""
    );
};
