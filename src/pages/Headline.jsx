import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: "0.2rem",
    margin: "0.5rem",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  content: {
    flex: "1 1 auto"
  },
  cover: {
    width: 480
  }
});

function Headline(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(0);

  useEffect(() => {
    props.updateData();
    const localdata = props.loadData();
    setData(localdata);
  }, []);

  return (
    <div>
      {data.articles ? (
        data.articles.map((article, index) => (
          <Card className={classes.root} key={article.title}>
            <CardMedia
              className={classes.cover}
              image={article.urlToImage}
              title={article.title}
            />
            <div className={classes.details}>
              <CardHeader
                title={article.title}
                subheader={`${article.author ? "Author: " + article.author + " - " : ""}
                   Published: ${article.publishedAt ? (new Date(article.publishedAt)).toLocaleString() : (new Date()).toLocaleString()}`}
              />
              <CardContent className={classes.content}>
                <Typography variant="body1" color="textSecondary" component="p">
                  {article.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link className="btn" to={{ pathname: `/detail/${article.title.replace(/ /g, "-")}`, param: article }}>Read More</Link>
              </CardActions>
            </div>
          </Card>
        ))
      ) : (
          <></>
        )}
    </div>
  );
}

export default Headline;
