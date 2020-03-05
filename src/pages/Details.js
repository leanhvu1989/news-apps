import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 0,
    // padding: '56.25%', // 16:9
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  img: {
    height: "50%",
    width: "50%"
  }
}));

export default function Details(props) {
  const classes = useStyles();
  const article = props.location.param // this is Par1

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardHeader
          title={article.title}
          subheader={`${article.author ? "Author: " + article.author + " - " : ""}
          Published: ${article.publishedAt ? (new Date(article.publishedAt)).toLocaleString() : (new Date()).toLocaleString()}`}
        />
        <CardMedia
          className={classes.media}
          title={article.title}
        />
        <Grid>
          <img className={`${classes.media} ${classes.img}`} alt="complex" src={article.urlToImage} />
        </Grid>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {article.content}
          </Typography>
        </CardContent>
        <CardActions>
          <a target="_blank" rel="noopener noreferrer" href={article.url}>Original source</a>
        </CardActions>
      </div>
    </Card>
  );
}
