import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Movie.module.css';

function Movie(props) {
  const [watchCount, setWatchCount] = useState(0);
  const [personalNote, setPersonalNote] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);


  // Average evaluation
  const stars = [];
  for (let i = 0; i < 10; i++) {
    let style = {};
    if (i < props.voteAverage ) {
      style = { 'color': '#f1c40f' };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }

  // Watch movie
  const handleWatchMovie = () => {
    setWatchCount(watchCount + 1);
  };
  let videoIconStyle = { 'cursor': 'pointer' };
  if (watchCount > 0) {
    videoIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
  }

  // Like movie
  const handleLikeMovie = () => {
    props.updateLikedMovies(props.title);
  };
  let heartIconStyle = { 'cursor': 'pointer' };
  if (props.isLiked) {
    heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
  }

  // Personal note
  const personalStars = [];
  for (let i = 0; i < 10; i++) {
    let style = { 'cursor': 'pointer' };
    if (i < personalNote) {
      style = { 'color': '#2196f3', 'cursor': 'pointer' };
    }
    personalStars.push(<FontAwesomeIcon key={i} icon={faStar} onClick={() => setPersonalNote(i + 1)} style={style} className="note" />);
  }

  let overviewLength = props.overview;
  if (!showFullDescription && overviewLength.length > 70) {
    overviewLength = overviewLength.substring(0, 90) + '[...]';
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  return (
    <div className={styles.card}>
      <img className={styles.image} src={props.poster} alt={props.title} />
      <div >
        <div className={styles.textContainer}>
          <span className={styles.name}>{props.title}</span>
          <span className={styles.date}> Release date {props.date}</span>
          <p className={styles.description} onClick={toggleDescription} >{overviewLength}</p>
        </div>
        <div className={styles.iconContainer}>
          <span className={styles.vote}>{stars} ({props.voteCount})</span>
          <span>{personalStars} ({personalNote})</span>
          {/* <span><FontAwesomeIcon icon={faVideo} onClick={() => handleWatchMovie()} style={videoIconStyle} className="watch" /> ({watchCount})</span> */}
          <span><FontAwesomeIcon icon={faHeart} onClick={() => handleLikeMovie()} style={heartIconStyle} className="like" /></span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
