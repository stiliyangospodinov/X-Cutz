import React, { useContext, useReducer, useEffect, useState } from 'react';
import * as commentService from '../../services/commentService';
import AuthContext from '../../contexts/authContext';
import reducer from './commentReducer'; 
import useForm from '../../hooks/useForm';
import LogRegSection from '../Shared/LogRegSection/LogRegSection'; // Импорт на новия компонент
import './comments.css'; // Импортиране на стиловете

const CommentsComponent = ({ barberId }) => {
    const { username, isAuthenticated } = useContext(AuthContext);
    const [comments, dispatch] = useReducer(reducer, []);
    const { values, onChange, onSubmit, setValues } = useForm(addCommentHandler, { comment: '' });
    const [error, setError] = useState('');

    const fetchComments = async () => {
        try {
            const comments = await commentService.getAll(barberId);
            console.log('Fetched comments:', comments); 
            dispatch({ type: 'GET_ALL_COMMENTS', payload: comments });
        } catch (error) {
            console.error('Error fetching comments:', error);
            setError('Failed to load comments.');
        }
    };

    useEffect(() => {
        fetchComments();
    }, [barberId]);

    async function addCommentHandler(values) {
        const newComment = {
            username: username, 
            text: values.comment,
        };

        try {
            const createdComment = await commentService.create(barberId, newComment.text, newComment.username);
            console.log('Created comment:', createdComment);

            await fetchComments();
            setError('');
            setValues({ comment: '' });
        } catch (error) {
            console.error('Error posting comment:', error);
            setError('Failed to post comment.');
        }
    }

    async function deleteLastComment() {
        if (comments.length === 0) {
            setError('No comments to delete.');
            return;
        }

        const lastComment = comments[comments.length - 1];

        try {
            await commentService.remove(lastComment._id);
            await fetchComments();
            setError('');
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('Failed to delete comment.');
        }
    }

    return (
        <div className="comment-section">
            <h3>Comments</h3>

            {error && <p className="text-danger">{error}</p>}
            <div className="comment-list">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id} className="comment">
                            <h5>{comment.owner ? comment.owner.username : 'Unknown'}</h5>
                            <p>{comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-comments">No comments yet.</p>
                )}
            </div>
            {isAuthenticated ? (
                <div className="comment-form">
                    <form onSubmit={onSubmit}>
                        <div className="control-group">
                            <textarea
                                className="form-control"
                                name="comment"
                                placeholder="Add a comment"
                                value={values.comment}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="buttons">
                            <button className="btn" type="submit">
                                Submit
                            </button>
                            <button className="btn btn-danger" onClick={deleteLastComment} type="button">
                                Delete Last Comment
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <LogRegSection text="You need to be logged in to add a comment." /> 
            )}
        </div>
    );
};

export default CommentsComponent;
