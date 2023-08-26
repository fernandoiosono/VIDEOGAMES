// import { useSelector } from "react-redux";
// import { Nav, Favorites, Cards, About, Login, CardDetail, PageNotFound } from "../components";

import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import { Home, 
	Landing, 
	PageNotFound } from "../components";

const App = () => {
	return (
		<SectionApp>
			{/* <header>{userIsAuth ? <Nav /> : null}</header> */}
			<main>
				<Routes>
					<Route path="*" element={<PageNotFound />} />
					<Route path="/" element={<Landing />} />
					<Route path="/home" element={<Home />} />
					{/* <Route path="/favorites" element={<Favorites />} /> */}
					{/* <Route path="/about" element={<About />} /> */}
					{/* <Route path="/carddetail/:fatherComp/:id" element={<CardDetail />} /> */}
				</Routes>
			</main>
		</SectionApp>
	);
};

const SectionApp = styled.section`
	text-align: center;
	padding: 25px;
`;

export default App;