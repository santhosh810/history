import styled from "styled-components"

export const MainContainer = styled.div `
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

`

export const CardContainer = styled.div ``

export const FormContainer = styled.form ``

export const InputFiled = styled.input ``

export const Label = styled.label ``

export const InputFiledContainer = styled.div `

    display:flex;
    flex-direction:column;
    gap:4px;
    margin-bottom:8px;
    
    
`
export const ButtonContainer = styled.div`
 
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LoginPageButton = styled.button`
  cursor: pointer;
`;

export const ErrorMsg = styled.h5 `
color:red;
`