// import React, { useCallback, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import { useFormContext } from "react-hook-form";
// import ImageSlider from "./ImageSlider";

// function ImageUploader(props) {
//   const { name } = props;
//   const { register, unregister, setValue, watch } = useFormContext();
//   const files = watch(name);
//   const onDrop = useCallback(
//     (droppedFiles) => {
//       console.log(droppedFiles);
//       if (droppedFiles?.length) {
//         setValue(name, droppedFiles, { shouldValidate: true });
//       }
//     },
//     [setValue, name]
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: props.accept,
//   });

//   useEffect(() => {
//     register(name);
//     return () => {
//       unregister(name);
//     };
//   }, [register, unregister, name]);

//   console.log(files)

//   return (
//     <div className="flex flex-col gap-5 h-full text-gray-900 font-mukta text-center sm:text-3xl lg:text-4xl my-6">
//       Property Images
//       <div className="py-4">
//         {!files ? (
//           <div
//             {...getRootProps({
//               className:
//                 "p-3 text-white font-mukta transition-colors sm:text-lg lg:text-2xl bg-moonstone hover:bg-moontone-hover w-fit rounded-md float-right cursor-pointer my-6",
//             })}
//           >
//             Add property images
//             <input {...getInputProps()} className="" id={name} {...props} />
//           </div>
//         ) : (
//           <button onClick={() => {
//             setValue('imageURLS', undefined)
//           }} className="bg-red-500 mb-8 text-white sm:text-lg lg:text-2xl float-right p-3 font-mukta rounded-md hover:bg-red-600 transition-colors">
//             Remove images
//           </button>
//         )}
//         <div className={`${files?.length > 0}`}>
//           {files?.length > 0 && <ImageSlider images={files} />}
//         </div>
//         {/* { !!files?.length && (
//         <span className="text-federal font-mukta text-xl text-center">
//           Tap to discard current images and select new images
//         </span>
//       )} */}
//       </div>
//     </div>
//   );
// }

// export default ImageUploader;
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
const FileInput = (props) => {
  let { name } = props;
  const { register, unregister, setValue, watch } = useFormContext();
  const files = watch(name);
  const onDrop = useCallback(
    (droppedFiles) => {
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
  });
  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);
  return (
    <div className="w-full text-center flex flex-col gap-7 mt-3">
      <label
        className="text-gray-900 font-mukta text-center sm:text-xl md:text-3xl lg:text-4xl"
        htmlFor={name}
      >
        Property Images
      </label>
      {
        !!files?.length && <button
        className="self-end sm:p-1 md:p-2 rounded hover:bg-red-700 transition-colors w-fit bg-red-600 pb-3 text-white sm:text-sm md:text-xl"
        onClick={() => setValue(name, undefined)}
      >
        Remove images
      </button>
      }
      <div {...getRootProps()}>
        <input
          {...props}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={name}
          {...getInputProps()}
        />
        <div
          className={
            "w-full sm:p-2 md:p-4 border border-dashed border-gray-900 font-mukta sm:text-sm lg:text-xl cursor-pointer " +
            (isDragActive ? "bg-gray-400" : "bg-gray-200")
          }
        >
          {!!files?.length ? (
            <>
              <div className="lg:flex sm:grid sm:grid-cols-3 image-slider lg:overflow-x-scroll sm:grid-rows-auto gap-7 w-full lg:h-72 sm:my-2 md:my-4">
                {files?.map((file) => (
                  <img
                    key={file.name}
                    className="rounded-md object-cover aspect-square h-full"
                    src={URL.createObjectURL(file)}
                  ></img>
                ))}
              </div>
              <p className="font-mukta sm:text-sm md:text-md">
                Click to change images
              </p>
            </>
          ) : (
            <p className="text-center my-2">Drop the files here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileInput;
