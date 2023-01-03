import React from "react";
export default function CategoryForm({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
  }) {
    return (
      <div className="p-3">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Write category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="d-flex justify-content-between">
            <button className="custom-btn btn-2">{buttonText}</button>
            {handleDelete && (
              <button onClick={handleDelete} className="custom-btn btn-2">
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }