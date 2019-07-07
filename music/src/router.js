import React from 'react';
import {Route,BrowserRouter} from 'react-router-dom';
import TopTabber from './component/top-tabber';
import {HOST} from './const/host'
import Container from './container/Container';
import MusicPlayer from './container/MusicPlayer/MusicPlayer';
class Router extends React.Component{


    render(){
      const Tabber=()=>{
          switch (window.location.pathname){
              case `${HOST}/`:
                  return <TopTabber></TopTabber>
              case `${HOST}/quku`:
                  return <TopTabber></TopTabber>
              case `${HOST}/me`:
                  return <TopTabber></TopTabber>
              case `${HOST}/discover`:
                  return <TopTabber></TopTabber>

          }
          return null;
      };

        return(
            <BrowserRouter>

                <Tabber> </Tabber>
                    <Container> </Container>
                <MusicPlayer> </MusicPlayer>

            </BrowserRouter>
        )
    }
}
export default Router;

