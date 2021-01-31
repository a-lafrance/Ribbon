import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

function processFileInput(files) {
    console.log(files);
    const file = files[0]; 
    const fr = new FileReader();
    fr.onload = function (e) {
        const content = JSON.parse(e.target.result);
        //processContent(content)
        // Import Arthur's js processing and call it here
        console.log(content);
    }
    fr.readAsText(file);
}

function StyledDropzone(props) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        accept: '.json',
        onDrop: files => processFileInput(files),
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
    }), [
        isDragActive,
    ]);

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop your message_1.json here, or click to select from your file system</p>
            </div>
        </div>
    );
}

export default StyledDropzone;