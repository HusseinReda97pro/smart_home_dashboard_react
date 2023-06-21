import React from 'react';

const ImageUploader = ({ setSelectedImage }) => {


    const handleImageChange = (e) => {
        let files = e.target.files;
        if (files[0]) {
            setSelectedImage(files[0]);
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    document.getElementById("image_place_holder").src = fr.result;
                }
                fr.readAsDataURL(files[0]);
            }
        }
    };


    const onClick = (event) => {
        event.preventDefault();
        document.getElementById("file_chooser").click();
    }


    return (
        <>
            <div

                style={{
                    width: '300px',
                    height: '300px',
                    backgroundColor: '#eee',
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    cursor: 'pointer',
                    marginTop: "15px"
                }}
                onClick={onClick}
            >
                <img id={'image_place_holder'} src="/placeholder-image.png" alt="product_image" width={"300px"} height={"300px"} />
            </div>
            <input style={{ display: "none" }} id='file_chooser' type="file" onChange={handleImageChange} />
        </>
    );
};

export default ImageUploader;