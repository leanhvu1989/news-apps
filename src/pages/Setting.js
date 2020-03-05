import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {KEYWORDS} from '../configurations/ConstantKeywords';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    padding: 20,
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Setting(props) {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const changeSettings = event => {
    const filterValue = event.target.value;
    props.settings.optional.q = (filterValue === "none") ? "" : filterValue;
    props.settings.isTop = (filterValue === "none") ? true : false;
    props.onUpdateSettings();
    props.updateData();
  };

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Keyword
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          defaultValue={props.settings.optional.q === "" ? "none" : props.settings.optional.q}
          onChange={changeSettings}
          labelWidth={labelWidth}
        >
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>
          {KEYWORDS ? (
            KEYWORDS.sort().map((keyword) => (
              <MenuItem value={keyword}>{keyword}</MenuItem>
            ))
            ) : ( <></>)
          }
        </Select>
      </FormControl>
    </div>
  );
}
