import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { GAME_SEARCH } from "../../views/viewCaptions.js";
import { setGamesByName, setCurrentView } from "../../redux/actions.js";

const SearchBar = () => {
    const dispatch = useDispatch();

	const [ name, setName ] = useState('');

	const handleChangeName = (e) => {
		setName(e.target.value);
	};

	const handleSearch = () => {
		dispatch(setGamesByName(name))
			.then(() => {
				dispatch(setCurrentView(GAME_SEARCH, name));

				setName('');				
			})
			.catch((error) => {
				
			});
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleSearch();
	};

	return (
		<ArticleComponent>
			<InputName autoFocus
				id="inputName" 
				type="search" 
				value={name}
				onChange={handleChangeName} 
				onKeyDown={handleKeyDown} />
			<ButtonSearch onClick={handleSearch}>Look It For!</ButtonSearch>
		</ArticleComponent>
    );
};

const ArticleComponent = styled.section`
	display: flex;
	flex-direction: row;
`;

const InputName = styled.input`
	height: 35px;
	width: 170px;
	border: none;
	border-color: black;
	border-radius: 5px 0 0 5px;
	text-align: center;
	background-color: white;
	box-shadow: 0 0 5px black;

	&:hover { box-shadow: 0 0 5px white; }

	&:focus { 
		outline: none; 
		background: white;
	}
`;

const ButtonSearch = styled.button`
	height: 35px;
	width: 100px;
	border: none;
	border-radius: 0 5px 5px 0;
	border-left: none;
	background-color: #886bde;
	color: black;
	font-weight: bold;
	font-size: 11px;
	box-shadow: 0 0 5px black;

	&:hover { 
		cursor: pointer;
		box-shadow: 0 0 5px white;
	}
`;

export default SearchBar;