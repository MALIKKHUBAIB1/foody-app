"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
  const imageInputRef = useRef();
  const [pickImage, setPickImage] = useState();
  function handlePickClick(e) {
    imageInputRef.current.click();
  }
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setPickImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickImage && <p>No Image Select Yet </p>}
          {pickImage && (
            <Image src={pickImage} alt="plase Select the image" fill />
          )}
        </div>
        <input
          type="file"
          className={classes.input}
          name={name}
          accept="image/jpeg, image/png"
          id={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          type="button"
          className={classes.button}
          onClick={handlePickClick}
        >
          Pick An image
        </button>
      </div>
    </div>
  );
}
