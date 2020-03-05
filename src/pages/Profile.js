import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden'
  },
  formControl: {
    '& > *': {
      margin: theme.spacing(1),
    },
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
  },
  textField: {
    margin: theme.spacing(1),
  },
  action: {
    display: "flex",
    direction: "row",
    justifyContent: "space-between",
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

export default function Profile(props) {
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const register = () => {
    if (!formIsValid()) return;

    props.onUpdateUser();
    window.location.reload();
  }

  const logoff = () => {
    props.onUserLogoff();
    window.location.reload();
  }

  function formIsValid() {
    const _errors = {};

    if (!props.user.username) _errors.username = "Username is required";
    if (!props.user.email) {
      _errors.email = "Email is required";
    } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(String(props.user.email).toLowerCase()) === false){
      _errors.email = "Email format is invalid";
    }

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="baseline"
        justify="center"
        style={{ minHeight: '90vh' }}
      >
        <Grid item xs={3}>
          <form className={classes.formControl} errors={errors} autoComplete="off">
            <Typography color="primary" variant="h6" align="center">
              Register User
            </Typography>
            <TextField
              id="username"
              label="Username"
              type="text"
              required={true}
              style={{ margin: 8 }}
              defaultValue={props.user.username === "" ? "" : props.user.username}
              fullWidth
              onChange={(event) => { props.user.username = event.target.value; }}
              variant="outlined"
              error={errors.username? true : false}
              helperText={errors.username? errors.username : ""}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              required={true}
              style={{ margin: 8 }}
              defaultValue={props.user.email === "" ? "" : props.user.email}
              fullWidth
              onChange={(event) => { props.user.email = event.target.value; }}
              variant="outlined"
              error={errors.email? true : false}
              helperText={errors.email? errors.email : ""}
            />
            <div className={classes.action}>
              <Button variant="contained" disabled={props.user.username !== "" && props.user.email !== "" && Object.keys(errors).length === 0 ? true : false}
                color="primary" onClick={register}>
                Register
              </Button>
              <Button variant="contained" onClick={logoff}>Log Off</Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
