
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';


class Home extends Component {

  static fetchData({ store }) {

    console.log('>>>>>>> client > home.js > fetchData')
    return new Promise(resolve => resolve());
    
  }

  render() {

    console.log('>>>>>>> client > home.js > render')

    return (

      <div>

        //<Helmet>
          //<meta charSet="utf-8" />
          //<title>Home !!</title>
        //</Helmet>

        <strong>Home1. Welcome !!!!!!</strong>

      </div>

    );
  }
}

export default Home;