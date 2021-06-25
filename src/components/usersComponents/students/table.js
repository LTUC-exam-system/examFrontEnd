import React, { useEffect, useState, useContext } from 'react';
import LaptopsRow from './rows';
import { connect, useDispatch } from 'react-redux';
import { getStudents,addStudent } from '../../../rtk/students.store';
import {
  TableContainer,
  Fab,
  Paper,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Show from "../../show/show";
import { AuthContext } from "../../../context/signinContext";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  addBtn: {
    zIndex: '10',
    color: '#fff',
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: '#0F3057',
    "&:hover": {
      backgroundColor: '#0F3057',
    }
  },
  root: {
    width: '100%',
    overflowX: 'auto',
  },
}));

function StudentsTable(props) {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirth] = useState(new Date('2014-08-18T21:11:54'));
  const [nationality, setNationality] = useState('');
  const [nationlNumber, setNationlNumber] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen('');
  };
  // const radioGroupRef = useRef(null);
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  }

  const handleNationality = (e) => {
    setNationality(e.target.value.toUpperCase());
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleBirthDate = (date) => {
    setBirth(date);
  };
  const handleNationalNum = (e)=>{
    setNationlNumber(e.target.value);
  }
  // const handleProgramName = (e) => {
  //   setProgram_name(e.target.value);
  // };
  // const handleProgramVersion = (e) => {
  //   setProgram_version(e.target.value);
  // };
  const handleAdd = (e) => {
    let object = {
      firstName: firstName,
      lastName:lastName,
      email:email,
      birthDate:birthDate,
      nationality: nationality,
      nationlNumber:nationlNumber,  
    };

    dispatch(addStudent(object));
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getStudents());
    };
    fetchData();
  }, [dispatch]);

  return (
    <TableContainer>
      <Paper className={classes.root}>
        <LaptopsRow students={props.myStudents} />
        <Show condition={context.isValidAction('create')}>
          <Fab
            onClick={handleClickOpen}
            color="primary"
            aria-label="add"
            className={classes.addBtn}
          >
            <AddIcon />
          </Fab>
        </Show>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Program</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Student First Name"
              type="name"
              fullWidth
              onChange={handleFirstName}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Student Last Name"
              type="name"
              fullWidth
              onChange={handleLastName}
            />
            <TextField
            autoFocus
            margin="dense"
            label="Student national Number"
            type="text"
            onChange={handleNationalNum}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Student Nationality"
              type="text"
              fullWidth
              onChange={handleNationality}
            />
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleBirthDate}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              onChange={handleEmail}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              onChange={handleEmail}
            />

            {/* <RadioGroup
              ref={radioGroupRef}
              aria-label="ringtone"
              name="ringtone"
              label="Is_Active"
              onChange={handleProgramName}
            >
              Programs
              {props.myprograms.map((item) => {
                return (
                  <FormControlLabel
                    value={item}
                    key={item}
                    control={<Radio />}
                    label={item}
                  />
                );
              })}
            </RadioGroup>

            <RadioGroup
              ref={radioGroupRef}
              aria-label="ringtone"
              name="ringtone"
              label="Is_Active"
              onChange={handleProgramVersion}
            >
              Programs
              {props.myVersions.map((item) => {
                return (
                  <FormControlLabel
                    value={item}
                    key={item}
                    control={<Radio />}
                    label={item}
                  />
                );
              })}
            </RadioGroup>

            <RadioGroup
              ref={radioGroupRef}
              aria-label="ringtone"
              name="ringtone"
              label="Is_Active"
              onChange={handleStatus}
            >
              Is Active Status
              <FormControlLabel
                value="true"
                key="true"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="false"
                key="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </TableContainer>
  );
}

const mapStateToProps = (state) => ({
  myStudents: state.students.students
});

export default connect(mapStateToProps)(StudentsTable);