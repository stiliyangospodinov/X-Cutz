import React, { useContext, useReducer, useEffect } from 'react';
import * as commentService from '../services/commentService';
import AuthContext from '../contexts/authContext';
import reducer from './commentReducer'; 
import useForm from '../hooks/useForm';

const CommentsComponent = ({ barberId }) => {
    const { username, isAuthenticated } = useContext(AuthContext);
    const [comments, dispatch] = useReducer(reducer, []);
    const { values, onChange, onSubmit, setValues } = useForm(addCommentHandler, { comment: '' });
    const [error, setError] = React.useState('');

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
            console.log('Created comment:', createdComment); // Лог на създадения коментар

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Comments</h3>
            {error && <p className="text-danger">{error}</p>}
            <div style={{ width: '100%', maxWidth: '600px' }}>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id} className="comment" style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <h5>{comment.owner ? comment.owner.username : 'Unknown'}</h5>
                            <p>{comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
            {isAuthenticated  ?(
            <div className="row" style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}>
                <div className="col-12" style={{ display: 'flex', justifyContent: 'center' }}>
                    <form onSubmit={onSubmit} style={{ width: '100%' }}>
                        <div className="control-group">
                            <textarea
                                className="form-control"
                                name="comment"
                                placeholder="Add a comment"
                                value={values.comment}
                                onChange={onChange}
                                required
                                style={{ width: '100%', minHeight: '100px' }}
                            />
                        </div>
                        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                            <button className="btn" type="submit">
                                Submit
                            </button>
                            <button className="btn btn-danger" onClick={deleteLastComment} style={{ marginLeft: '10px' }}>
                        Delete Last Comment
                    </button>
                        </div>
                    </form>

                </div>
            </div>
            ) : (
                <p>You need to be logged in to add a comment.</p>
            )}
        </div>
    );
};

export default CommentsComponent;
