import React from 'react';
import { LastLocationProvider } from 'react-router-last-location';
import { Switch, Route, BrowserRouter, Link} from 'react-router-dom';
import { Row, Col, Layout, Icon  } from "antd";
import Home from '../pages/Home/Home';
import Photo from '../pages/Photo';
import User from '../pages/User';
import UserPhotoListing from '../pages/UserPhotoListing';
import ButtonBack from '../components/ButtonBack';

const {
  Header,
} = Layout;

const Main = () => (
    <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
        <LastLocationProvider>
            <Row style={{margin: '0px 0 30px'}}>
            <Col>
                <Layout className="user-layout">
                    
                    <Header className="user-layout__header"> 
                        <div className="page">
                            <Link to={`/`}> <Icon component={() => <img className="user__icon-home" alt="pixabay.com" src="https://www.vectorlogo.zone/logos/pixabay/pixabay-card.png"/>} /> </Link> 
                            <Route path="/:id" component={() => <ButtonBack />} /> 
                        </div>
                    </Header>
                
                </Layout>
            </Col>
        </Row>
        <div className="page">
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/users/:id/photos" component={UserPhotoListing}/>
                <Route path="/photo/:id" component={Photo}/>
                <Route path="/users/:id" component={User}/>
            </Switch>
        </div>
      </LastLocationProvider>
    </BrowserRouter>)

  export default Main;