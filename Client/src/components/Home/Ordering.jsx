import { useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const Ordering = () => {
    const { order } = useSelector((state) => state.homeResultsOptions);

    return (
        <ArticleOrdering>
            <TitleGroup>Orders</TitleGroup>
            <LblIptFilter>⇓ Type</LblIptFilter>
            <InputFilter list="dtlType"/>
            <datalist id="dtlType">
                <option>Alphabetical</option>
                <option>Rating</option>
            </datalist>
            <LblIptFilter>⇓ Direction</LblIptFilter>
            <InputFilter list="dtlDirection"/>
            <datalist id="dtlDirection">
                <option>Ascending</option>
                <option>Descending</option>
            </datalist>
            <ButtonResetFilters>🚀 Apply Order</ButtonResetFilters>
        </ArticleOrdering>
    );
};

const ArticleOrdering = styled.article`
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);

    display: grid;
    grid-template-rows: auto auto auto auto auto 1fr;
    grid-gap: 10px;
`;

const TitleGroup = styled.p`
    margin: 0;
    color: white;
    font-size: 20px;
    text-shadow: 0 0 5px black;
    font-weight: bold;
`;

const LblIptFilter = styled.label`
    color: white;
    font-size: 12px;
    text-shadow: 0 0 15px white;
`;

const InputFilter = styled.input`
    height: 30px;
    text-align: center;
    border-radius: 5px;
    border: none;

    &:focus { outline: none; }
`;

const Button = styled.button`
    height: 30px;
    border: none;
	border-radius: 5px;
    box-shadow: 0 0 5px black;

    font-size: 18px;
	font-weight: bold;
    text-shadow: 0 0 10px black;

    &:hover { 
		cursor: pointer;
		box-shadow: 0 0 5px white;
	}

    &:disabled {
        pointer-events: none;
        background-color: gray;
        color: #3d3a3a;
    }
`;

const ButtonResetFilters = styled(Button)`
    width: 100%;
    height: 100%;
    color: white;
	background-color: #886bde;
`;

export default Ordering;