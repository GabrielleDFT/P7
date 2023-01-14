//----------------------------------------AFFICHAGE PAGE ACTUALITES/DERNIERS POSTS--------------------------------------------------

import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from '../components/LeftNav';
import { isEmpty } from "../components/Utils";
import Card from "../components/Post/Card";
import Trends from "../components/Trends";
import Friends from "../components/Profil/Friends";

const Trending = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.trendingReducer);

  return <div className="trending-page">
      <LeftNav />
      <div className="main">

        {/* L'image ne s'affiche qu'à la deconnexion */}
          {!uid && <img src="./img/log5.png" alt="img-log" />}

        <ul>
          {!isEmpty(trendList[0]) && trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">

          {/* Se connecter pour voir les dernières Actus */}
            { uid && <Trends />}

          {/* Se connecter pour voir les Collègues à suivre */}
            {uid && <Friends />}
        </div>
      </div>
  </div>;
};

export default Trending;
