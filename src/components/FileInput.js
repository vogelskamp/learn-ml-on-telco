import "./Button.scss";

function FileInput({ text, icon, onChange }) {
  return (
    <>
      <label for="file-upload" class="file-upload">
        {icon && <div>{icon}</div>}
        <div>{text}</div>
      </label>
      <input id="file-upload" type="file" onChange={onChange} />
    </>
  );
}

export default FileInput;
