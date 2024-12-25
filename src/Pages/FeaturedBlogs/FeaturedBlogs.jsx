import React from 'react';
import { useLoaderData } from 'react-router-dom';

const FeaturedBlogs = () => {
    const blogs = useLoaderData();
    console.log(blogs)
    return (
        <div>
            {
                blogs.length
            }
        </div>
    );
};

export default FeaturedBlogs;