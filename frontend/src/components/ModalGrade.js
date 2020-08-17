import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as api from "../api/apiService.js";

Modal.setAppElement("#root");

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type } = selectedGrade;
  const [gradeValue, setGradeValue] = useState(selectedGrade.value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    };

    getValidation();
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;

    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue}`
      );

      return;
    }

    setErrorMessage("");
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {};
  const handleGradeChange = (event) => {
    setGradeValue(+event.target.value);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <form onSubmit={handleFormSubmit}></form>

        <div className="input-field">
          <input id="inputName" type="text" value={student} readOnly />
          <label className="active" htmlFor="inputName">
            Nome do aluno:
          </label>
        </div>

        <div className="input-field">
          <input id="inputSubject" type="text" value={subject} readOnly />
          <label className="active" htmlFor="inputSubject">
            Disciplina:
          </label>
        </div>

        <div className="input-field">
          <input id="inputType" type="text" value={type} readOnly />
          <label className="active" htmlFor="inputType">
            Tipo de avaliação:
          </label>
        </div>

        <div className="input-field">
          <input
            id="inputGrade"
            type="number"
            min={gradeValidation.minValue}
            max={gradeValidation.maxValue}
            step="1"
            autoFocus
            value={gradeValue}
            onChange={handleGradeChange}
          />
          <label className="active" htmlFor="inputGrade">
            Nota:
          </label>
        </div>
      </Modal>
    </div>
  );
}
