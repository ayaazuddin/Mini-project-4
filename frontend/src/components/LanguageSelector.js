import React from "react";

function LanguageSelector({ language, setLanguage }) {
  return (
    <div>
      <label>{language === "en" ? "Select Language for Generation" : "Selecciona el idioma para la generación"}</label>
      <br />
      <label>{language === "en" ? "(Note: You can paste content from both languages!)" : "(¡Nota: Puedes pegar contenido de ambos idiomas!)"}</label>
      <br />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
