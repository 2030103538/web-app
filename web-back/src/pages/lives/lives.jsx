import React from "react"
import LiveAdd from './pages/LiveAdd'
import LiveList from './pages/LiveList'
import EditLive from './pages/EditLive'
import { Switch, Route } from 'react-router-dom'
import Nott from './../404/Nott'
class Liftjob extends React.Component {
    render() {
        return(
            <Switch>
                <Route path={'/live/live-add'} component={LiveAdd}/>
                <Route path={'/live/live-edit'} component={EditLive}/>
                <Route path={'/live'} component={LiveList} />
                <Route component={Nott}/>
            </Switch>
        )
    }
}

export default Liftjob