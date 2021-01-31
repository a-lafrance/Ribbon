import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px 40px 20px',
    borderWidth: 5,
    borderColor: '#cccccc',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    fontSize: 'calc(5px + 2vmin)'
};

const activeStyle = {
    borderColor: '#2196f3'
};

function StyledDropzone(props) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        accept: '.json',
        onDrop: files => props.onFileInput(files),
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
                <p>Drop your message_1.json here, or click to select from your file system</p>
            </div>
        </div>
    );
}

export default StyledDropzone;