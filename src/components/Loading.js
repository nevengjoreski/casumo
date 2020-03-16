import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const Loading = () => (
  <div
    style={{
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div style={{ fontSize: "100px", textAlign: "center", paddingTop: "50px" }}>
      <p>Preparing Your Library</p>
      <Spinner />
    </div>
  </div>
);

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <SyncLoader
          size={90}
          margin={30}
          color={"#000"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Loading;
