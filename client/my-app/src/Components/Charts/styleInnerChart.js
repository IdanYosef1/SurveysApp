import styled from "styled-components";
import { keyframes } from "styled-components";

const fill = (y) => keyframes`
                 0% {  width: 0px; }
                 100% { width: ${y}%; }           
                `;

const Styles = styled.div`
  animation: ${(props) => fill(props.answer.value)} 2s ease-in;
  width: ${(props) => props.answer.value}%;
  --main-width: ${(props) => (100 / props.answer.value) * 100}%;
`;

export default Styles;
