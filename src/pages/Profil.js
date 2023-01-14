//----------------------------------------AFFICHAGE PAGE PROFIL--------------------------------------------------

import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";
import LeftNav from "../components/LeftNav";

//--L'uid vérifie l'identité de la personne qui veux accéder au profil--
const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      <LeftNav />
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log6.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
