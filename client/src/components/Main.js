import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import PayPalPlus from './PayPalPlus';
import ExpressCheckout from './ExpressCheckout'
import ReferenceInstallments from './ReferenceInstallments';
import ReferenceNVP from './ReferenceNVP';
import LinkedAccounts from './LinkedAccounts'
import dotenv from 'dotenv'
import { properties } from '../properties.js';
import ExpressCheckoutCheckoutJS from './ExpressCheckoutCheckoutJS';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

const ENV_PRODUCTION = 'prod';

dotenv.config();
console.log("MAIN.JS: "+process.env.REACT_APP_PP_CLIENT_ID);

const the_script = document.createElement('script');
the_script.src = 'https://www.paypal.com/sdk/js?client-id=sb&currency=BRL';

if(properties.env === ENV_PRODUCTION){
  the_script.src = 'https://www.paypal.com/sdk/js?client-id=' +process.env.REACT_APP_PP_CLIENT_ID+ '&currency=BRL';
}

document.head.append(the_script)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/ec' component={ExpressCheckout}/>
      <Route path='/eccheckoutjs' component={ExpressCheckoutCheckoutJS}/>
      <Route path='/ppp' component={PayPalPlus}/>
      <Route path='/refInst' component={ReferenceInstallments}/>
      <Route path='/refnvp' component={ReferenceNVP}/>
      <Route path='/linkedAcc' component={LinkedAccounts}/>

            
    </Switch>
  </main>
)

export default Main
