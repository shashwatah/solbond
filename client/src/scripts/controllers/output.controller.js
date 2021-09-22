export const messageController = (type, text) => {
  if (type === "warning" || type === "success")
    snackbarController(type, text, 3000);
};

export const errorController = () => {};

const snackbarController = (type, text, duration) => {
  Snackbar.show({
    text,
    backgroundColor: "rgb(13, 7, 51)",
    customClass: "snackbar",
    showAction: type === "address" ? true : false,
    duration,
    innerWidth: "75px",
  });
};
