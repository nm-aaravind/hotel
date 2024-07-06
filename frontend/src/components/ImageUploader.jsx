import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import ImageSlider from "./ImageSlider";

function ImageUploader(props) {
  const { name } = props;
  const { register, unregister, setValue, watch } = useFormContext();
  const files = watch(name);
  const onDrop = useCallback(
    (droppedFiles) => {
      console.log(droppedFiles);
      if (droppedFiles?.length) {
        setValue(name, droppedFiles, { shouldValidate: true });
      }
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: props.accept,
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  console.log(files)

  return (
    <div className="flex flex-col gap-5 h-full text-gray-900 font-mukta text-center sm:text-3xl lg:text-4xl my-6">
      Property Images
      <div className="py-4">
        {!files ? (
          <div
            {...getRootProps({
              className:
                "p-3 text-white font-mukta transition-colors sm:text-lg lg:text-2xl bg-moonstone hover:bg-moontone-hover w-fit rounded-md float-right cursor-pointer my-6",
            })}
          >
            Add property images
            <input {...getInputProps()} className="" id={name} {...props} />
          </div>
        ) : (
          <button onClick={() => {
            setValue('imageURLS', undefined)
          }} className="bg-red-500 mb-8 text-white sm:text-lg lg:text-2xl float-right p-3 font-mukta rounded-md hover:bg-red-600 transition-colors">
            Remove images
          </button>
        )}
        <div className={`${files?.length > 0}`}>
          {files?.length > 0 && <ImageSlider images={files} />}
        </div>
        {/* { !!files?.length && (
        <span className="text-federal font-mukta text-xl text-center">
          Tap to discard current images and select new images
        </span>
      )} */}
      </div>
    </div>
  );
}

export default ImageUploader;