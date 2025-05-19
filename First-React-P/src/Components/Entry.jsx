import { useState, useEffect } from 'react';
import Marker from '../assets/marker.png';
import { entries as initialEntries } from './fakeAPI';

export default function Entry() {
  const [showForm, setShowForm] = useState(false);
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('entries');
    return saved ? JSON.parse(saved) : initialEntries;
  });
  const [newEntry, setNewEntry] = useState({
    image: '',
    location: '',
    mapLink: '',
    date: '',
    title: '',
    description: ''
  });

  useEffect(() => {
    if (entries.length === 0) {
      localStorage.removeItem('entries');
    } else {
      localStorage.setItem('entries', JSON.stringify(entries));
    }
  }, [entries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleConfirm = () => {
    // Validation: check if any required field is empty
    if (
      !newEntry.location.trim() ||
      !newEntry.title.trim() ||
      !newEntry.description.trim()
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    setEntries([
      ...entries,
      {
        ...newEntry,
        id: Date.now() // generate a unique id
      }
    ]);
    setShowForm(false);
    setNewEntry({
      image: '',
      location: '',
      mapLink: '',
      date: '',
      title: '',
      description: ''
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewEntry({
      image: '',
      location: '',
      mapLink: '',
      date: '',
      title: '',
      description: ''
    });
  };

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="entries-container">
      {/* Render entries */}
      <div className="entries">
        {entries.map((entry, index) => (
          <div className="entry" key={entry.id || index}>
            <img src={entry.image} alt={entry.location} />
            <div className="info">
              <div className="location">
                <img src={Marker} alt="Marker" className="marker" />
                <a href={entry.mapLink} target="_blank" rel="noopener noreferrer">
                  {entry.location}
                </a>
              </div>
              <div className="date">{entry.date}</div>
              <div className="title">{entry.title}</div>
              <p className="description">{entry.description}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(entry.id)}

              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button onClick={() => setShowForm(!showForm)} className="add-button">
        {showForm ? 'Cancel' : 'Add A Journey'}
      </button>

      {/* Form to Add New Entry */}
      {showForm && (
        <div className="entry-form">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newEntry.location}
            onChange={handleInputChange}

          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newEntry.image}
            onChange={handleInputChange}

          />
          <input
            type="text"
            name="mapLink"
            placeholder="Google Maps Link"
            value={newEntry.mapLink}
            onChange={handleInputChange}

          />
          <input
            type="date"
            name="date"
            value={newEntry.date}
            onChange={handleInputChange}

          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newEntry.title}
            onChange={handleInputChange}

          />
          <textarea
            name="description"
            placeholder="Description"
            value={newEntry.description}
            onChange={handleInputChange}

          />
          <div className="entry-form-buttons">
            <button onClick={handleConfirm} className="confirm-button">Confirm</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}