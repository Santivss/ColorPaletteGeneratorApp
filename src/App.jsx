import styled from "styled-components";
import bg from "./assets/bg2.png";
import bg2 from "./assets/grid.png";
import Palettes from "./Components/Palettes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Palette from "./Components/Palette";

const App = () => {
  return (
    <BrowserRouter>
      <AppStyled /* bg={bg} grid={bg2} */>
        <div className="grid">
          <Routes>
            <Route path="/" element={<Palettes />} />
            <Route path="/palette/:id" element={<Palette />} />
          </Routes>
        </div>
      </AppStyled>
    </BrowserRouter>
  );
};

const AppStyled = styled.div`
  min-height: 100vh;
  background-color: slateblue;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .grid {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.grid});
    background-repeat: repeat;
    z-index: 0;
  }
`;

export default App;
