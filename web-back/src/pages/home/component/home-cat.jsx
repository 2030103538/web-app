import React from "react"
import { Link,withRouter } from "react-router-dom"
import "./cat.css"
import PropTypes from "prop-types"
class Hmoecat extends React.Component {

    static propTypes = {
      urlLink:PropTypes.string,
      iconClass:PropTypes.string,
      carMIN:PropTypes.string,
      carSub:PropTypes.string,
      color:PropTypes.string,
    };

    render() {
        const {urlLink,iconClass,carMIN,carSub,color} = this.props;
        return(
            <div className="top-cat" style={{backgroundColor:color}}>
                <Link to={urlLink} className="cat">
                    <span className={iconClass}></span>
                    <h4>{carMIN}</h4>
                    <h5>{carSub}</h5>
                </Link>
            </div>
        )
    }
}

export default withRouter(Hmoecat)