import React from "react";
import "./style.css"
function Card({ clickHandler, id, image, name }) {
    return (
        <div className="card">
            <div className="img-container">
                <img
                    src={image}
                    alt={name}
                    onClick={() => clickHandler(id)}
                />
            </div>
        </div>
    );
}
export default Card;