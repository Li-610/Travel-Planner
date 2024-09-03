<>
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "flex-start",
      height: "100%",
      padding: "40px",
    }}
  >
    <div style={{ width: "600px" }}>
      <GoogleMap
        dayIdx={dayIdx}
        addPlaceToDay={addPlaceToDay}
        style={{ height: "100%", width: "100%" }}
      ></GoogleMap>
    </div>
    <div
      style={{
        flex: "1",
        height: "100%",
        padding: "10px 50px",
        backgroundColor: "#fff",
      }}
    >
      <Tabs defaultActiveKey="0" items={tabPanes} onChange={onChange} />
    </div>
  </div>

  <div style={{ width: "300px", height: "100%", backgroundColor: "#fff" }}>
    Day List Cart
  </div>
</>;
