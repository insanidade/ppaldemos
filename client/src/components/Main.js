import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import PayPalPlus from './PayPalPlus';
import ReferenceInstallments from './ReferenceInstallments';
import ReferenceNVP from './ReferenceNVP';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/ppp' component={PayPalPlus}/>
      <Route path='/refInst' component={ReferenceInstallments}/>
      <Route path='/refnvp' component={ReferenceNVP}/>      
    </Switch>
  </main>
)

export default Main
