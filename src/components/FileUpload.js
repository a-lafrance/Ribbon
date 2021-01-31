import React, {useState} from 'react';
import Dropzone from 'react-dropzone';

import '../styles/FileUpload.css';

let FileUpload = props => {

    return(
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
}

export default FileUpload;