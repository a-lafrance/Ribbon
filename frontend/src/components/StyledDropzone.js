import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px 40px 20px',
    backgroundColor: 'rgba(255, 92, 135, 0.2)',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'background .1s',
    fontSize: 'calc(5px + 2vmin)'
};

const activeStyle = {
    backgroundColor: 'rgba(255, 92, 135, 0.4)',
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
