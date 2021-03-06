import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


//MUI Style
import withStyles from '@material-ui/core/styles/withStyles';

// MUI components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

// MUI Icons
import CalendarToday from '@material-ui/icons/CalendarToday';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';

//other Npm Packages
import dayjs from 'dayjs';

const styles = (theme) => ({
  ...theme
});

const StaticProfile = (props) => {
  const {
    classes,
    profile: { username, createdAt, imageUrl, aboutYou, portfolio, location }
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${username}`}
            color="primary"
            variant="h5"
          >
            @{username}
          </MuiLink>
          <hr />
          {aboutYou && <Typography variant="body2">{aboutYou}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {portfolio && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={portfolio} target="_blank" rel="noopener noreferrer">
                {' '}
                {portfolio}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
