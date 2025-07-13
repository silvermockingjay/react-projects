import React from 'react';
import './Card.module.css';

interface CardProps {
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Record<string, string>;
  location: Record<string, string>;
}

export class Card extends React.Component<CardProps> {
  render() {
    const { image, name, status, species, gender, origin, location } =
      this.props;
    return (
      <div className="item-card">
        <div className="image-container">
          <img className="item-image" src={image} alt={name} />
        </div>
        <div>
          <h3 className="item-title">{name}</h3>
          <div className="item-content">
            <ul>
              <li>
                <b>Status: </b> {status}
              </li>
              <li>
                <b>Species: </b> {species}
              </li>
              <li>
                <b>Gender: </b> {gender}
              </li>
              <li>
                <b>Origin: </b> {origin.name}
              </li>
              <li>
                <b>Location: </b> {location.name}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
