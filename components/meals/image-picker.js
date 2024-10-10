"use client"

import {useRef, useState} from "react";
import Image from "next/image";

import classes from './image-picker.module.css';

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    const handlePickClick = () => {
        imageInput.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label className={classes.picker} htmlFor='image'>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No Image picked yet</p>}
                    {pickedImage && <Image src={pickedImage} alt='The image selected by user' fill/>}
                </div>
                <input
                    onChange={handleImageChange}
                    ref={imageInput}
                    className={classes.input}
                    type="file"
                    id={name}
                    name={name}
                    accept='image/png, image/jpeg'
                    required/>
                <button className={classes.button} onClick={handlePickClick} type='button'>
                    Pick an Image
                </button>
            </div>
        </div>
    )
}
