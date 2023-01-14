//----------------------------------------AFFICHAGE PAGE HOME--------------------------------------------------

import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";
import Trends from "../components/Trends";
import Friends from "../components/Profil/Friends";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
        <LeftNav />

      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}

          {/* L'image ne s'affiche qu'à la déconnexion */}
          {!uid &&<img src="./img/log2.svg" alt="img-log" />}
        </div>

          {/* Se connecter pour voir les Posts */}
            {uid && <Thread />}
      </div>

      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            {/* Se connecter pour voir les dernières Actus */}
            {uid && <Trends />}

            {/* Se connecter pour voir les Collègues à suivre */}
            {uid && <Friends />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
