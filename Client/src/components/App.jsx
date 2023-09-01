import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import { 
	NewGame,
	Detail,
	Home, 
	Landing } from "../views";

const App = () => {
	return (
		<SectionApp>
			<main>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/home" element={<Home />} />
					<Route path="/newgame" element={<NewGame />} />
					<Route path="/gamedetail/:id" element={<Detail />} />
				</Routes>
			</main>
		</SectionApp>
	);
};

const SectionApp = styled.section`
	text-align: center;
	padding: 15px;
`;

export default App;