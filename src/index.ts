import app from "./app";

const PORT = process.env.PORT || 8080;

(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server error: ", error);
  }
})();
