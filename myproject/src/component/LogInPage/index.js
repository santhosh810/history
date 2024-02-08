import { Component } from "react"
import {
  MainContainer,
  CardContainer,
  InputFiled,
  Label,
  InputFiledContainer,
  FormContainer,
  ButtonContainer,
  LoginPageButton,
} from "../styledComponent";
// import SignInPage from "../SignInPage";

class LogInPage extends Component {
  state = { username: "", password: "" };

  onChangeUserName = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassaword = (event) => {
    this.setState({ password: event.target.value });
  };

  onClickSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const { username, password } = this.state;
      
      const userDetails = { username, password };
      const url = "http://localhost:4000/login";
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json"
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(response);
      console.log(data);
      console.log(username, password);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  renderLogInpage = () => {
    const { username, password } = this.state;
    return (
      <CardContainer>
        <h1>Admin login</h1>
        <FormContainer onSubmit={this.onClickSubmit}>
          <InputFiledContainer>
            <Label htmlFor="username">username:</Label>
            <InputFiled
              type="text"
              id="username"
              value={username}
              onChange={this.onChangeUserName}
            />
          </InputFiledContainer>
          <InputFiledContainer>
            <Label htmlFor="password">password:</Label>
            <InputFiled type="password" id="password" value={password} onChange={this.onChangePassaword}/>
          </InputFiledContainer>
          <ButtonContainer>
            <LoginPageButton type="submit">Submit</LoginPageButton>
            <LoginPageButton> Sign In</LoginPageButton>
            {/* <button type="submit">click</button> */}
          </ButtonContainer>
        </FormContainer>
      </CardContainer>
    );};

  render() {
    return <MainContainer>{this.renderLogInpage()}</MainContainer>;
  }
}


export default LogInPage



