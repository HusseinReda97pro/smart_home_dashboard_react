import React from 'react';

const AdImageUploader = ({ setSelectedFile }) => {


    const handleImageChange = (e) => {
        let files = e.target.files;
        if (files[0]) {
            setSelectedFile(files[0]);
            if (FileReader && files && files.length) {
                var fr = new FileReader();

                fr.onload = function () {
                    console.log(fr.result);

                    let file_name = files[0]?.name;
                    if (!file_name) return;
                    let isVideo = file_name.split(".")[file_name.split(".").length - 1] == "mp4";
                    if (isVideo) {
                        document.getElementById("video_place_holder").hidden = false;
                        document.getElementById("image_place_holder").hidden = true;

                        document.getElementById("video_place_holder").src = fr.result;
                    } else {
                        document.getElementById("image_place_holder").hidden = false;
                        document.getElementById("video_place_holder").hidden = true;
                        document.getElementById("image_place_holder").src = fr.result;
                    }

                    // document.getElementById("video_place_holder").src = fr.result;
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
                    aspectRatio: "16/9",
                    width: '100%',
                    height: 'auto',
                    backgroundColor: '#eee',
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    cursor: 'pointer',
                    marginTop: "15px"
                }}
                onClick={onClick}
            >
                <img id={'image_place_holder'} src="/placeholder-1920x1080.png" alt="ad image" width={"100%"} height={"auto"} aspectRatio={"16/9"} />
                <video id={'video_place_holder'} alt="ad video" width={"100%"} height={"auto"} aspectRatio={"16/9"} hidden={true} autoplay={true} />

            </div>
            <input style={{ display: "none" }} id='file_chooser' type="file" onChange={handleImageChange} />
        </>
    );
};

export default AdImageUploader;