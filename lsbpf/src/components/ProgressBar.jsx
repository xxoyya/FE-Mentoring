
const ProgressBar = (props) => {

  return (
    <div className="progress-bar">
      <span
        className="progress"
        style={{
          backgroundColor: props.theme,
          width: `${props.progress}%`,
        }}
      ></span>
    </div>
  );
}

export default ProgressBar