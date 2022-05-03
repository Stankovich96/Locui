import React, { Component } from 'react';
import PropTypes from 'prop-types';


//Reusable component
import PostSkeleton from '../util/PostSkeleton';
import StaticProfile from '../components/profile/StaticProfile';
import Post from '../components/post/Post';
import ProfileSkeleton from '../util/ProfileSkeleton';

//MUI component
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

//Other Npm Packages
import axios from 'axios';
class user extends Component {
  state = {
    postIdParam: null,
    profile: null
  };
  componentDidMount() {
    const postId = this.props.match.params.postId;
    const username = this.props.match.params.username;

    if (postId) this.setState({ postIdParam: postId });

    this.props.getUserData(username);
    axios
      .get(`/user/${username}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;

    const postsMarkup = loading ? (
      <PostSkeleton />
    ) : posts === null ? (
      <p>No posts from this user</p>
    ) : !postIdParam ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      posts.map((post) => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />;
        else return <Post key={post.postId} post={post} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {postsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data
});

user.propTypes = {
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired
};


export default connect(
  mapStateToProps,
  { getUserData }
)(user);
