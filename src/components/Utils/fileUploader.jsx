import React, { Component } from "react";
import { firebase } from "../../firebase";
import FileUploader from "react-firebase-file-uploader";
import { CircularProgress } from "@mui/material";

class Fileuploader extends Component {
  state = {
    name: "",
    isUploading: false,
    fileURL: "",
  };
  handleUploadStart = () => {
    this.setState({
      isUploading: true,
    });
  };
  handleUploadError = (e) => {
    console.log(e);
    this.setState({
      isUploading: false,
    });
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
    });
    firebase.storage().ref(this.props.dir).child(filename).getDownloadURL().then((url) => {
      this.setState({ fileURL: url})
    }).catch(error => {

    })
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {!this.state.fileURL ? (
          <div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : null}
        {this.state.isUploading ? (
          <div
            className="progress"
            style={{ textAlign: "center", margin: "30px 0" }}
          >
            <CircularProgress style={{ color: "#98c6e9" }} thickness={7} />
          </div>
        ) : null}
        { this.state.fileURL ? 
      <div className="iage">
        <img style={{width='100%}} src={this.state.fileURL} alt={this.state.name> </img>
      </div>  
      }
      </div>
    );
  }
}

export default Fileuploader;
