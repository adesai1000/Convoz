import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchView() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Example: Fetch search results using query
        // Replace this with your actual API call to fetch search results
        const fetchSearchResults = async () => {
            try {
                // Make API call to fetch search results
                // Example: const response = await axios.get(`/api/search?q=${query}`);
                // Set searchResults state with the response data
                // Example: setSearchResults(response.data);
                
                // For demonstration purposes, setting some dummy search results
                setSearchResults([
                    { id: 1, title: 'Search Result 1' },
                    { id: 2, title: 'Search Result 2' },
                    { id: 3, title: 'Search Result 3' },
                ]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setLoading(false);
            }
        };

        // Fetch search results when the component mounts
        fetchSearchResults();
    }, [query]);

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {searchResults.map(result => (
                        <li key={result.id}>{result.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchView;
