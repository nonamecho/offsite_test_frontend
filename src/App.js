import React, { Fragment } from "react";
import {
  AppBar,
  Toolbar,
  CircularProgress,
  Container,
  Input
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { TopFree, TopGrossing } from "./components";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      topFreeData: null,
      topGrossingData: null,
      filterTopFreeData: null,
      filterTopGrossingData: null
    };
  }
  async componentDidMount() {
    await this.setState({ isFetching: true });
    const topFreeRes = await fetch(
      `http://nonamecho.eu-4.evennode.com/topFree.json`
    );
    const topGrossingRes = await fetch(
      `http://nonamecho.eu-4.evennode.com/topGrossing.json`
    );
    await topFreeRes.json().then(data => {
      this.setState({
        topFreeData: data.feed.results,
        filterTopFreeData: data.feed.results
      });
    });
    await topGrossingRes.json().then(data => {
      this.setState({
        topGrossingData: data.feed.results,
        filterTopGrossingData: data.feed.results
      });
    });
    this.setState({ isFetching: false });
  }
  render() {
    const { isFetching, filterTopFreeData, filterTopGrossingData } = this.state;
    return (
      <Fragment>
        <AppBar position={"sticky"}>
          <Toolbar>
            <Container style={styles.toolBarCtn} maxWidth="md">
              <Input
                style={styles.searchInput}
                placeholder={"搜尋"}
                disableUnderline
                endAdornment={<SearchIcon />}
                onChange={e => {
                  const keyword = e.target.value;
                  const { topFreeData, topGrossingData } = this.state;
                  this.setState({
                    filterTopFreeData: topFreeData.filter(
                      data =>
                        data.name.includes(keyword) ||
                        data.artistName.includes(keyword)
                    ),
                    filterTopGrossingData: topGrossingData.filter(
                      data =>
                        data.name.includes(keyword) ||
                        data.artistName.includes(keyword)
                    )
                  });
                }}
              />
            </Container>
          </Toolbar>
        </AppBar>
        {!isFetching && (
          <Container style={styles.contentCtn} maxWidth="md">
            {filterTopGrossingData && filterTopGrossingData.length > 0 && (
              <TopGrossing data={filterTopGrossingData} />
            )}
            {filterTopFreeData && filterTopFreeData.length > 0 && (
              <TopFree data={filterTopFreeData} />
            )}
          </Container>
        )}
        {isFetching && <CircularProgress style={styles.circularProgress} />}
      </Fragment>
    );
  }
}

export default App;

const styles = {
  toolBarCtn: { display: "flex", justifyContent: "center" },
  contentCtn: { marginTop: 20 },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: 300
  },
  circularProgress: { position: "absolute", top: "50%", left: "50%" }
};
