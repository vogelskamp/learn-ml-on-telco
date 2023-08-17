import "./Button.scss";

function FileInput({ text, icon, onChange }) {
  return (
    <>
      <label for="file-upload" class="file-upload">
        {icon ? (
          <div className="icon">
            {icon}
            <div className="text-wrapper">
              <div>{text}</div>
            </div>
          </div>
        ) : (
          <div className="text-wrapper">{text}</div>
        )}
      </label>
      <input id="file-upload" type="file" onChange={onChange} />
    </>
  );
}

export default FileInput;
