import React from "react"
import LiftList from './pages/LiftList'
import LiftAdd from './pages/LiftAdd'
import EditLive from "./pages/EditLive";
import { Switch, Route } from 'react-router-dom'
import Nott from './../404/Nott'
class Liftjob extends React.Component {
    render() {
        return(
            <Switch>
                <Route path={'/lifejob/life-add'} component={LiftAdd}/>
                <Route path={'/lifejob/life-edi'} component={EditLive}/>
                <Route path={'/lifejob'} component={LiftList} />
                <Route component={Nott}/>
            </Switch>
        )
    }
}

export default Liftjob