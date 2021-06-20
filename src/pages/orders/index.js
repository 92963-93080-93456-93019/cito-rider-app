import React from 'react';
import Layout from '../../components/Layout';

import OrdersGrid from './OrdersGrid';

export default class Orders extends React.Component {

    render() {
        return ( 
            <Layout title="Rider App" description="This is the Rider App page" >
                <div >
                    <div className="text-center mt-5">
                        <h1>CITO | Rider App</h1>
                    </div>
                    <OrdersGrid/>
                </div>
            </Layout>
        );
    }
}
 
