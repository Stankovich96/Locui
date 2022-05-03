import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Reusable Components
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PostSkeleton from '../util/PostSkeleton';

//MUI components
import Grid from '@material-ui/core/Grid';

//REDUX
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data
});

home.propTypes = {
  data: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getPosts }
)(home);
