import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

class RouteComponent extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />}></Route>
                    <Route path='/City/:id/:name' element={<App />}></Route>
                    <Route path='/ShowMore/:id/:name/:country' element={<App />}></Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
export default RouteComponent;