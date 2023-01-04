import React, { useContext, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
  
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(post.likers.includes(uid));
  const [likes, setLikes] = useState(post.likers.length);

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true);
    setLikes(likes + 1)
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false);
    setLikes(likes - 1)
  };

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}
      { liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      { liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{likes}</span>
    </div>
  );
};

export default LikeButton;
