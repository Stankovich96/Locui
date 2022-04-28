import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  ...theme,
  button: {
    float: 'right'
  }
});

class EditDetails extends Component {
  state = {
    aboutYou: '',
    portfolio: '',
    location: '',
    open: false
  };
  mapUserDetailsToState = (aboutYou,
    portfolio,
    location, ) => {
    this.setState({
      aboutYou: aboutYou ? aboutYou : '',
      portfolio: portfolio ? portfolio : '',
      location:location ? location : ''
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props);
    // this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { aboutYou,
    portfolio,
    location, } = this.props;
    // console.log("Abeg");
    // console.log(this.props);
    this.mapUserDetailsToState(aboutYou,
      portfolio,
      location, );
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      aboutYou: this.state.aboutYou,
      portfolio: this.state.portfolio,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="aboutYou"
                tpye="text"
                label="aboutYou"
                multiline
                rows="3"
                placeholder="A note about yourself"
                className={classes.textField}
                value={this.state.aboutYou}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="portfolio"
                tpye="text"
                label="portfolio"
                placeholder="Your personal or professinal portfolio"
                className={classes.textField}
                value={this.state.portfolio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                tpye="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  aboutYou: state.user.aboutYou,
  portfolio: state.user.portfolio,
  location: state.user.location,
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
