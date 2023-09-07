export const errorEmbed = (message: string) => {
  return {
    title: "Error",
    description: message,
    color: 0xed4245,
  };
};

export const successEmbed = (message: string) => {
  return {
    title: "Success",
    description: message,
    color: 0x3aa55c,
  };
};
