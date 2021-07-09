import React from "react";

const NotFoundStyle = {
  color: "#ebdbb2",
  fontSize: "5vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  height: "90vh",
  width: "100vw",
}

const NotFound = () => (
  <div style={NotFoundStyle}>
    <h2>Erreur 404 : Pas de page à cette adresse</h2>
  </div>
)

export default NotFound;
