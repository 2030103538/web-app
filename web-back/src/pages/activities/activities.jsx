import React from "react"
import ActivAdd from "./pages/ActivAdd";
import AcitvList from "./pages/AcitvList";
import EditLive from "./pages/EditLive";
import { Switch, Route } from 'react-router-dom'
import Nott from "../404/Nott";
class Activities extends React.Component {
    render() {
        return(
            <Switch>
                <Route path={'/activities/activities-add'} component={ActivAdd} />
                <Route path={'/activities/activities-edit'} component={EditLive} />
                <Route path={'/activities'} component={AcitvList}/>
                <Route component={Nott}/>
            </Switch>
        )
    }
}

export default Activities