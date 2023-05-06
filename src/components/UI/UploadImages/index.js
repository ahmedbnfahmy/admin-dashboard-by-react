import React from "react";
import { useField } from "formik";
import Label from "../TextInput/Label";

const UploadImages = ({ name, label,setFiles, ...rest }) => {
  const [field, meta] = useField(name);
  const error = meta.touched && meta.error;
  
  
  return (
    <div className="mb-3">
      <Label label={label} />
      <input
        className="form-control"
        type="file"
        id="formFileMultiple"
        {...rest}
        {...field}
        accept="image/*"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />
      {!!error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default UploadImages;
