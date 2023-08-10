import React from 'react'
function Search({events, setEvents}) {
    function handleSearch(e){
        const search = e.target.value.toLowerCase();
        if (search === '') {
            fetch("/events")
              .then(resp => resp.json())
              .then(events => setEvents(events));
        } else {
            // Filter the list of events based on whether the venue name includes the search term
            const filteredNames = events.filter(location => location.title.toLowerCase().includes(search));
            // Update the 'events' state with the filtered list
            setEvents(filteredNames);
        }
    }
    return (
      <div className="search-container">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search..."
          className="search-input"
        />
      </div>
    );
  }
  export default Search;