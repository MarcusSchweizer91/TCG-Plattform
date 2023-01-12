import React from 'react';
import './App.css';
import PokemonApp from "./CardGallery/components/PokemonCards/PokemonApp";
import NavBar from "./CardGallery/components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ExchangeApp from "./CardGallery/components/CardExchange/ExchangeApp";
import PokemonDetails from "./CardGallery/components/PokemonCards/PokemonDetails";
import ExchangeDetails from "./CardGallery/components/CardExchange/ExchangeDetails";
import LoginPage from "./CardGallery/components/user/LoginPage";
import useUser from "./CardGallery/components/hooks/useUser";
import ProtectedRoutes from "./CardGallery/components/ProtectedRoutes";
import RegisterForm from "./CardGallery/components/user/RegisterForm";
import UserDetails from "./CardGallery/components/user/UserDetails";


function App() {

    const {username,userInfo, login, logout, register} = useUser();



  return (
    <div className="App">
        <BrowserRouter>
            <NavBar logout={logout}/>
            <h2>{username}</h2>
            <Routes>
                <Route path={"/"} element={<PokemonApp/>}></Route>
                <Route path={"/login"} element={<LoginPage login={login}/>}></Route>
                <Route path={"/register"} element={<RegisterForm register={register}/>}></Route>

                <Route element={
                    <ProtectedRoutes userInfo={userInfo} />
                }>
                    <Route path={"/exchange"} element={<ExchangeApp/>}></Route>
                    <Route path={"/details/:id"} element={<PokemonDetails/>}></Route>
                    <Route path={"/exchange/:id"} element={<ExchangeDetails/>}></Route>
                    <Route path={"/user"} element={<UserDetails userInfo={userInfo}/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
