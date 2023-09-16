import { useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setGamesByName } from "../../redux/actions.js";

const SearchBar = () => {
    let name;
    const dispatch = useDispatch();
    const inputSearch = useRef(null);
    
	const cleanInput = () => {
        inputSearch.current.value = "";
		inputSearch.current.focus();
	};

	const handleChangeName = (e) => {
		name = e.target.value;
	};

	const handleSearch = () => {
		dispatch(setGamesByName(name))
			.then(() => {
				cleanInput();		
			})
			.catch((error) => {
				
			});
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleSearch();
	};

	return (
		<ArticleComponent>
			<InputName id="inputName" ref={inputSearch} type="search" onChange={handleChangeName} onKeyDown={handleKeyDown} autoFocus />
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