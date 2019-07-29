import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>Hello World from React as</div>
        );
    }
}
App.propTypes = {
    config: PropTypes.object
};
export default App;