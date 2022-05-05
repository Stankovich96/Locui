import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//MUI Styles
import withStyles from '@material-ui/core/styles/withStyles';

//Reusable Component
import ThumbsupButton from './ThumbsupButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import MyButton from '../../utility/MyButton';

// MUI Component
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

// MUI Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';

//Other Npm Packages
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        // username,
        postId,
        thumbsUpCount,
        commentCount
      },
      user: {
        authenticated,
        username 
        // credentials: { username }
      }
    } = this.props;

    // const deleteButton =
    //   authenticated && username === username ? (
    //     <DeletePost postId={postId} />
    //   ) : null;
    const deleteButton =
      authenticated && username === this.props.post.username? (
        <DeletePost postId={postId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${this.props.post.username}`}
            color="primary"
          >
            {this.props.post.username}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <ThumbsupButton postId={postId} />
          <span>{thumbsUpCount} ThumbsUp</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <PostDialog
            postId={postId}
            username={this.props.post.username}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
