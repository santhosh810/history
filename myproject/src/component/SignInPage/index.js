import { Component } from "react";
import {withRouter} from "react-router-dom"
import {
  MainContainer,
  CardContainer,
  InputFiled,
  Label,
  InputFiledContainer,
  FormContainer,
  ButtonContainer,
  LoginPageButton,
  ErrorMsg,
} from "../styledComponent";


class SignInPage extends Component {
  state = { username: "", password: "", errorMsg: false, errorMsgData: "" };

  // onClickBtn = (event) => {
  //   event.preventDefault();
  //   this.setState((prevState) => ({ loginBtn: !prevState.loginBtn }));
  // };

  onChangeUserName = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassaword = (event) => {
    this.setState({ password: event.target.value });
  };

  failSubmit = (msg) => {
    this.setState({ errorMsg: true, errorMsgData: msg });
     console.log(this.props);
  };
  onSubmitSuccess=()=>{
    const {history} = this.props
    // console.log(this.props)
    history.replace("/login");
  }

  onClickSubmit = async (event) => {
    event.preventDefault();
    try {
      const { username, password } = this.state;
      const userDetails = { username, password };
      const url = "http://localhost:4000/sign";
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      }; 
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(response);

      if (response.ok === true) {
        this.onSubmitSuccess();
       
      } else {
        this.failSubmit(data.message);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  renderSignpage = () => {
    const { username, password, errorMsg, errorMsgData } = this.state;
    return (
      <CardContainer>
        <h1>Admin Sign in</h1>
        <FormContainer>
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
            <InputFiled
              type="password"
              id="password"
              value={password}
              onChange={this.onChangePassaword}
            />
          </InputFiledContainer>
          <ButtonContainer>
            <LoginPageButton onClick={this.onClickSubmit}>
              submit
            </LoginPageButton>
            <LoginPageButton onClick={this.onClickBtn}>Login</LoginPageButton>
          </ButtonContainer>
          {errorMsg && <ErrorMsg>*{errorMsgData}</ErrorMsg>}
        </FormContainer>
      </CardContainer>
    );
  };

  render() {
    return <MainContainer>{this.renderSignpage()}</MainContainer>;
  }
}

export default withRouter( SignInPage);



