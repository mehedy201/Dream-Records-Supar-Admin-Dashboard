import notFoundImg from "../assets/Empty.png";

const NotFoundComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <img
        style={{ width: "70px", height: "auto", marginTop: "100px", marginBottom: "100px" }}
        src={notFoundImg}
        alt=""
      />
    </div>
  );
};

export default NotFoundComponent;