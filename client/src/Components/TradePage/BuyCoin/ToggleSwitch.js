import React, { Component }  from 'react'
import Switch from "react-switch";

class ToggleSwitch extends Component {
    constructor() {
        super();
        this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
        console.log(checked);
    }

    render() {
        return (
            
            <Switch 
                onChange={this.handleChange} 
                checked={this.state.checked} 
                handleDiameter={40}
                offColor="#08f"
                onColor="#0ff"
                offHandleColor="#0ff"
                onHandleColor="#08f"
                height={50}
                width={100}
                borderRadius={8}
                activeBoxShadow="0px 0px 1px 2px #fffc35"
                uncheckedIcon={
                <div
                    style={{
                    display: "flex",
                    fontWeight: "bold",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 15,
                    color: "yellow",
                    paddingRight: 2
                    }}
                >
                    Buy
                </div>
                }
                checkedIcon={
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "blue",
                        paddingRight: 2
                        }}
                    >
                        Sell
                    </div>
                }
                uncheckedHandleIcon={
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 20
                    }}
                >
                    🛒
                </div>
                }
                checkedHandleIcon={
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    color: "red",
                    fontSize: 18
                    }}
                >
                    💰
                </div>
                }
                className="react-switch"
                id="small-radius-switch"
                />
        )
    }
}

export default ToggleSwitch;