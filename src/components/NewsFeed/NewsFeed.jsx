import React, { useContext, useEffect, useReducer, useState } from 'react';
import './NewsFeed.css';
import AuthContext from '../../contexts/authContext';
import { getAllNews, deleteNews } from '../../services/newsService';
import { newsReducer } from './newsReducer'; 
import { Link } from 'react-router-dom';

const NewsFeed = () => {
    const { user, isAdmin } = useContext(AuthContext);
    const [newsItems, dispatch] = useReducer(newsReducer, []);
    const [error, setError] = useState('');

    const fetchNews = async () => {
        try {
            const newsData = await getAllNews();
            dispatch({ type: 'SET_NEWS', payload: newsData || [] });
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Failed to load news.');
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDeleteLast = async () => {
        if (newsItems.length === 0) {
            setError('No news items to delete.');
            return;
        }

        const lastNews = newsItems[newsItems.length - 1];
        try {
            await deleteNews(lastNews._id);
            dispatch({ type: 'REMOVE_OLDEST_NEWS' });
            setError('');
        } catch (error) {
            console.error('Error deleting news:', error);
            setError('Failed to delete news.');
        }
    };

    const handleAddNewsAtTop = async (newNewsItem) => {
        try {
            dispatch({ type: 'ADD_NEWS_AT_TOP', payload: newNewsItem });
            setError('');
        } catch (error) {
            console.error('Error adding news:', error);
            setError('Failed to add news.');
        }
    };

    return (
        <div className="news-feed">
            <h2>Latest News</h2>
            {isAdmin && (
                <>
                    <Link to="/create-news" className="btn-add-news">
                        Add News
                    </Link>
                    <button className="btn-delete-last" onClick={handleDeleteLast}>
                        Delete oldest
                    </button>
                </>
            )}
            <div className="news-feed-container">
                <ul>
                    {newsItems.length > 0 ? (
                        newsItems.map(item => (
                            <li key={item._id} className="news-item animated fadeInUp">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <span>{item.date}</span>
                            </li>
                        ))
                    ) : (
                        <li className="news-item">No news available.</li>
                    )}
                </ul>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default NewsFeed;
