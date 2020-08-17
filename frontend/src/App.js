import React, { useState, useEffect } from "react";

import * as api from "./api/apiService.js";
import Spinner from "./components/Spinner.js";
import GradesControl from "./components/GradesControl.js";
import ModalGrade from "./components/ModalGrade.js";

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 1500);
    };

    getGrades();
  }, []);

  const handleDelete = async (gradetoDelete) => {
    const isDeleted = await api.deleteGrade(gradetoDelete);

    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex(
        (grade) => grade.id === gradetoDelete.id
      );

      const newGrades = Object.assign([], allGrades);
      newGrades[deletedGradeIndex].isDeleted = true;
      newGrades[deletedGradeIndex].value = 0;

      setAllGrades(newGrades);
    }
  };

  const handlePersist = (grade) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  const handlePersistData = () => {};

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="center">Controle de notas</h1>

      {allGrades.length === 0 && <Spinner />}

      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}

      {isModalOpen && (
        <ModalGrade
          onSave={handlePersistData}
          onClose={handleClose}
          selectedGrade={selectedGrade}
        />
      )}
    </div>
  );
}
