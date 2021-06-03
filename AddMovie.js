import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';


function AddMovie({ addingFilm, movies,setUpdatedMovies }) {
    const [show, setShow] = useState(false);
    const [film, setFilm] = useState({
        img: null,
        title: "",
        description: "",
        rating: 1,
    });
    const handleClose = () => {
        setShow(false);
        setFilm({
            img: null,
            title: "",
            description: "",
            rating: 1,
            url: "",
        })
    }
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
        setFilm({ ...film, [e.target.name]: e.target.value });
    };
    const onStarClick = (nextValue) => {
        setFilm({ ...film, rating: nextValue });
    };
    function addedFilm(){
    const updatedMovies=[...movies, film];
        addingFilm(updatedMovies);
        setUpdatedMovies(updatedMovies);
        handleClose();

    }
        
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                You can add a new movie
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD A NEW MOVIE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Movie's Title:</h4>
                    <div>
                        <input
                            type="text"
                            placeholder="title"
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <h4>Movie's Description:</h4>
                    <div>
                        <input
                            type="text"
                            placeholder=" description "
                            name="description"
                            onChange={handleChange}
                        />
                    </div>
                    <h4>URL IMG :</h4>
                    <div>
                        <input
                            type="text"
                            placeholder="URL of image "
                            name="img"
                            onChange={handleChange}
                        />
                    </div>
                    <h4>URL TRAILER :</h4>
                    <div>
                        <input
                            type="text"
                            placeholder="URL of Trailer "
                            name="url"
                            onChange={handleChange}
                        />
                    </div>
                    <h4>Movie's Rates:</h4>
                    <div>
                        <StarRatingComponent
                            onChange={handleChange}
                            name="rate1"
                            starCount={5}
                            value={film.rating}
                            onStarClick={onStarClick}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addedFilm}>
                        Add movie
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddMovie
