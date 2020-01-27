import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLikeOrUnlike, deletePost } from "../../actions/post";

const PostItem = ({
  addLikeOrUnlike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, unlikes, comments, date },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt={name} />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>

      {showActions && (
        <>
          <button
            onClick={() => addLikeOrUnlike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up"></i>{" "}
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button
            onClick={() => addLikeOrUnlike(_id, "unlike")}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down"></i>{" "}
            {unlikes.length > 0 && <span>{unlikes.length}</span>}
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLikeOrUnlike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToPros = state => ({
  auth: state.auth
});

export default connect(mapStateToPros, { addLikeOrUnlike, deletePost })(
  PostItem
);
