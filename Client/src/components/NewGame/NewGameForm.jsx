import styled from "styled-components";

const NewGameForm = () => {
    return (<>
        <FormNewGame>
            <SectionLeft />
            <SectionRight>
                <Article />
                {/* <br /> */}
                <ArticleBottom />
            </SectionRight>
            <SectionRight>
                <Article />
                {/* <br /> */}
                <ArticleBottom />
            </SectionRight>
        </FormNewGame>
    </>);
};

const FormNewGame = styled.form`
    height: 83vh;
    width: 100%;
    display: flex;
    /* background-color: rgba(225, 20, 20, 0.5); */
`;

const Section = styled.section`
    height: 100%;
    width: 33%;
`;

const SectionLeft = styled(Section)`
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);    
`;

const SectionRight = styled(Section)`
    margin-left: 10px;
`;

const Article = styled.article`
    height: 49%;
    width: 100%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);
`;

const ArticleBottom = styled(Article)`
    margin-top: 10px;
`;

export default NewGameForm;