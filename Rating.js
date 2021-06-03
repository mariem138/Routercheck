import StarRatingComponent from 'react-star-rating-component';
import React from 'react'


function Rating({getStar, star}) {
  const onStarClick = (nextValue) => {
    getStar(nextValue );
  }
  
  return (
    <div>
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={star}
        emptyStarColor={"white"}
        onStarClick={onStarClick}
        
      />
    </div>
  );
}


export default Rating
