import React from 'react';
import {
    Card, CardImg, CardImgOverlay, Breadcrumb, BreadcrumbItem, CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({ dish, onClick }) {
    //TODO: 
    return (
        <Card key={dish.id}>
            {/* <Link to={`/menu/${dish.id}`}> */}
            {/* <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} /> */}
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            {/* </Link> */}
        </Card>

    );
}

const Menu = (props) => {
    console.log(props);
    // const menu = props.foods.fodds.map((dish) => {
    //     return (
    //         <div className="col-12 col-md-5 m-1">
    //             <RenderMenuItem dish={dish} />
    //         </div>
    //     );
    // });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {props}
                </div>
            </div>
        );
    
}

export default Menu;