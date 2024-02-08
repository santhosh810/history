import React from "react"

const DataContext = React.createContext({
  loginBtn: true,
  onClickBtn:()=>{}
});

export default DataContext;