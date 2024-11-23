import React, { useState } from "react";
import axios from "axios";
import NoteInput from "./components/NoteInput";
import LanguageSelector from "./components/LanguageSelector";
import AIOptions from "./components/AIOptions";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState(""); // Store user's notes
  const [language, setLanguage] = useState("en"); // Store selected language
  const [generatedContent, setGeneratedContent] = useState(""); // Store generated content
  const [isSpeaking, setIsSpeaking] = useState(false); // Track speaking state
  const [isPaused, setIsPaused] = useState(false); // Track if speech is paused

  // Localization for both English and Spanish
  const textContent = {
    en: {
      title: "SummarEase - Accessible and Easy to use AI tool!",
      notePlaceholder: "Your generated content will appear here...",
      generatedContent: "Generated Content:",
      startDictating: "Start Dictating",
      stopDictating: "Stop Dictating",
      readContent: "Read Content",
      speaking: "Speaking...",
      pause: "Pause",
      resume: "Resume",
      stop: "Stop",
      error: "Error processing request. Please try again.",
      languageLabel: "Select Language for Generation",
      languageNote: "(Note: You can paste content from both languages!)",
    },
    es: {
      title: "SummarEase - ¡Herramienta de IA accesible y fácil de usar!",
      notePlaceholder: "¡Tu contenido generado aparecerá aquí...",
      generatedContent: "Contenido Generado:",
      startDictating: "Comenzar a Dictar",
      stopDictating: "Dejar de Dictar",
      readContent: "Leer Contenido",
      speaking: "Hablando...",
      pause: "Pausa",
      resume: "Reanudar",
      stop: "Detener",
      error: "Error procesando la solicitud. Por favor, inténtelo de nuevo.",
      languageLabel: "Selecciona el idioma para la generación",
      languageNote: "(¡Nota: Puedes pegar contenido de ambos idiomas!)",
    },
  };

  // Handle AI actions (e.g., summarization, generation)
  const handleAIAction = async (action) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/${action}`, {
        notes,
        language,
      });
      setGeneratedContent(response.data.result); // Update generated content
    } catch (error) {
      alert(textContent[language].error); // Display error in the selected language
    }
  };

  const formatGeneratedContent = (content) => {
    // Convert **bold** text to <strong>
    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    
    // Convert bullet points (•) to <li> items in <ul> list
    content = content.replace(/•/g, "<li>").replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>");
    
    // Convert newlines to <br> tags
    content = content.replace(/\n/g, "<br />");

    return content;
  };

  // Speech synthesis (read generated content aloud)
  const speakGeneratedContent = () => {
    if (generatedContent && !isSpeaking) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(generatedContent);
      utterance.lang = language === "es" ? "es-ES" : "en-US"; // Set language for reading
      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      synth.speak(utterance);
    }
  };

  // Pause speech
  const pauseSpeech = () => {
    if (window.speechSynthesis && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  // Resume speech
  const resumeSpeech = () => {
    if (window.speechSynthesis && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  // Stop speech
  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech immediately
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="app">
      <h1>{textContent[language].title}</h1>
      <LanguageSelector language={language} setLanguage={setLanguage} />

      <NoteInput notes={notes} setNotes={setNotes} />

      <AIOptions handleAIAction={handleAIAction} />

      {/* Display output below the note input */}
      <div className="output-container">
        <h3>{textContent[language].generatedContent}</h3>
        <div className="output-box">
          {generatedContent ? (
            <>
              <p dangerouslySetInnerHTML={{ __html: formatGeneratedContent(generatedContent) }} />
              <div className="speech-controls">
                <button
                  onClick={speakGeneratedContent}
                  className={`speak-btn ${isSpeaking ? "speaking" : ""}`}
                  disabled={isSpeaking}
                >
                  {isSpeaking ? textContent[language].speaking : textContent[language].readContent}
                </button>

                {isSpeaking && (
                  <>
                    <button
                      onClick={pauseSpeech}
                      className="pause-btn"
                      disabled={isPaused}
                    >
                      {textContent[language].pause}
                    </button>
                    <button
                      onClick={resumeSpeech}
                      className="resume-btn"
                      disabled={!isPaused}
                    >
                      {textContent[language].resume}
                    </button>
                    <button
                      onClick={stopSpeech}
                      className="stop-btn"
                    >
                      {textContent[language].stop}
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <p className="placeholder">{textContent[language].notePlaceholder}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
