import React from "react"
import { Switch, Route} from "react-router-dom"

import Account from "./pages/account"
import Member from "./pages/member"
import Nott from "./../404/Nott"


class Setting extends React.Component {
    render() {
        return(
            <div>
                <div>设置</div>

                <div>
                    <Switch>
                        <Route path={"/setting/account"} component={Account}/>
                        <Route path={"/setting/member"} component={Member}/>
                        <Route compnent={Nott}/>
                    </Switch>
                </div>

            </div>
        )
    }
}

export default Setting