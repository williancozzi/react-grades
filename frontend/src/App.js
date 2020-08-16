import React from "react";

import * as api from "./api/apiService.js";

export default function App() {
  const testApi = async () => {
    const result = await api.getAllGrades();
    console.log(result);
  };

  testApi();

  return <p>Olá Hooks!</p>;
}
