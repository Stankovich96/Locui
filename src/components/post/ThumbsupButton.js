import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// ICONS
import ThumbUpOffAltIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// REDUX
import { connect } from 'react-redux';
import { thumbsUpPost, removeThumbsUpPost } from '../../redux/actions/dataActions';

export class ThumbsupButton extends Component {
  thumbsUpdPost = () => {
    if (
      this.props.user.thumbsUps &&
      this.props.user.thumbsUps.find(
        (thumbsUp) => thumbsUp.postId === this.props.postId
      )
    )
      return true;
    else return false;
  };
  thumbsUpPost = () => {
    this.props.thumbsUpPost(this.props.postId);
  };
  removeThumbsUpPost = () => {
    this.props.removeThumbsUpPost(this.props.postId);
  };
  render() {
    const { authenticated } = this.props.user;
    const thumbsupButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Thumbs up">
          <ThumbUpOffAltIcon color="primary" />
        </MyButton>
      </Link>
    ) : this.thumbsUpdPost() ? (
      <MyButton tip="Remove Thumbs up" onClick={this.removeThumbsUpPost}>
        <ThumbUpIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Thumbs up" onClick={this.thumbsUpPost}>
        <ThumbUpOffAltIcon color="primary" />
      </MyButton>
    );
    return thumbsupButton;
  }
}

ThumbsupButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  thumbsUpPost: PropTypes.func.isRequired,
  removeThumbsUpPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  thumbsUpPost,
  removeThumbsUpPost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ThumbsupButton);
