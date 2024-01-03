/* eslint-disable no-unused-vars */
function NextCircle({ nextCircle }) {
  return (
    <img
      style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden" }}
      src={nextCircle.thumb}
    />
  );
}

export default NextCircle;
