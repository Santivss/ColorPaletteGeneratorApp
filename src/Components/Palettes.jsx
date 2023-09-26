import { useState } from "react";
import { palette } from "../myPalettes";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Palettes = () => {
  const [myPalettes, setMyPalettes] = useState(palette);

  return (
    <PalettesStyled>
      <div className="palettes">
        {myPalettes.map((pal, index) => {
          return (
            <Link to={`/palette/${pal.name}`} key={pal.name}>
              <div key={index} className="palette">
                {pal.colors.map((col, i) => (
                  <div
                    key={i}
                    className="color"
                    style={{ backgroundColor: col }}
                  ></div>
                ))}
              </div>
              <p>{pal.name}</p>
            </Link>
          );
        })}
      </div>
    </PalettesStyled>
  );
};

const PalettesStyled = styled.div`
  position: relative;
  z-index: 5;
  .palettes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 25px;
    padding: 2rem 18rem;
    transition: all 0.3s ease;

    a {
      text-decoration: none;
      display: inline-block;
      padding: 1rem;
      background-color: white;
      border-radius: 7px;
      box-shadow: 1px 3px 20px rgba(0, 0, 0, 0.2);
    }

    p {
      font-size: 1.5rem;
      padding-top: 0.5rem;
      display: inline-block;
      background: linear-gradient(
        90deg,
        rgb(114, 99, 243),
        20%,
        rgb(245, 102, 146) 50%,
        rgb(111, 207, 151) 60%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .palette {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      width: 100%;
      height: 250px;

      .color {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default Palettes;
