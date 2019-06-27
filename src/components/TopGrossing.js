import React from "react";
import { Typography, Box } from "@material-ui/core";

const AppIcon = ({ alt, src, type }) => (
  <img
    alt={alt}
    src={src}
    style={type === "c" ? styles.circleImg : styles.roundImg}
  />
);

const TopGrossingCard = ({ app }) => (
  <Box onClick={() => window.open(app.url)} style={styles.cardCtn}>
    <AppIcon alt={app.id} src={app.artworkUrl100} type={"r"} />
    <Typography variant={"caption"}>{app.name}</Typography>
    <br />
    <Typography style={styles.captionText} variant={"caption"}>
      {app.artistName}
    </Typography>
  </Box>
);
const TopGrossing = ({ data }) => {
  return (
    <Box>
      <Typography variant={"h6"}>{"最佳銷量"}</Typography>
      <Box style={styles.hScrollCtn}>
        {data &&
          data.map((app, idx) => <TopGrossingCard key={idx} app={app} />)}
      </Box>
    </Box>
  );
};

export default TopGrossing;

const styles = {
  circleImg: { width: 150, height: 150, borderRadius: 50 },
  roundImg: { width: 150, height: 150, borderRadius: 10 },
  cardCtn: { padding: 20, cursor: "pointer" },
  captionText: { color: "grey" },
  hScrollCtn: {
    display: "flex",
    flexDirection: "row",
    overflow: "auto",
    width: "100%"
  }
};
