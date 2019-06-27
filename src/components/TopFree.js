import React from "react";
import { Paper, Typography, Box, Grid } from "@material-ui/core";

const AppIcon = ({ alt, src, type }) => (
  <img
    alt={alt}
    src={src}
    style={type === "c" ? styles.circleImg : styles.roundImg}
  />
);

const TopFreeAppCard = ({ rank, app }) => (
  <Paper onClick={() => window.open(app.url)} style={styles.cardCtn}>
    <Typography color={"primary"} variant={"h5"}>
      {rank}
    </Typography>
    <AppIcon
      alt={app.id}
      src={app.artworkUrl100}
      type={rank % 2 === 0 ? "c" : "r"}
    />
    <Box style={{ width: "50%" }}>
      <Typography variant={"subtitle1"}>{app.name}</Typography>
      <Typography style={styles.captionText} variant={"caption"}>
        {app.genres.map((genres, idx) => (
          <span key={idx}>{genres.name} </span>
        ))}
      </Typography>
      <br />
      <Typography style={styles.captionText} variant={"caption"}>
        {app.artistName}
      </Typography>
    </Box>
  </Paper>
);

const TopFree = ({ data }) => {
  return (
    <Box>
      <Typography style={{ marginBottom: 20 }} variant={"h6"}>
        {"熱門免費"}
      </Typography>
      <Grid container spacing={3}>
        {data &&
          data.map((app, idx) => (
            <Grid key={idx} item xs={12} sm={6}>
              <TopFreeAppCard rank={idx + 1} app={app} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default TopFree;

const styles = {
  roundImg: { width: 100, height: 100, borderRadius: 10 },
  circleImg: { width: 100, height: 100, borderRadius: 50 },
  cardCtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    cursor: "pointer"
  },
  captionText: { color: "grey" }
};
