import React from "react"
import ResourceAdd from './pages/resource-add'
import ResourceList from './pages/resource-list'
import Nott from './../404/Nott'
import { Switch, Route } from 'react-router-dom'
class Resource extends React.Component {
    render() {
        return(
            <Switch>
                <Route path={'/resource/resource-add'} component={ResourceAdd}/>
                <Route path={'/resource'} component={ResourceList}/>
                <Route component={Nott}/>
            </Switch>
        )
    }
}

export default Resource