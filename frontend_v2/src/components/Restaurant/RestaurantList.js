import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRestaurants } from '../../actions/restaurantActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';

const cuisinesOptions = ['Itāļu', 'Ķīniešu', 'Indiešu', 'Meksikāņu', 'Japāņu'];
const ratingsOptions = [1, 2, 3, 4, 5];
const priceRanges = [
  { label: '€', value: 'low' },
  { label: '€€', value: 'medium' },
  { label: '€€€', value: 'high' }
];

const CustomSelect = ({ value, onChange, options, renderOption, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div ref={selectRef} className="relative mb-2 md:mb-0 md:mr-2">
      <button
        type="button"
        className="bg-gray-700 text-white p-2 rounded w-full text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? renderOption(value-1) : placeholder}
        <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-gray-700 text-white rounded mt-1 shadow-lg">
          <li
            className="p-2 hover:bg-gray-600 cursor-pointer flex items-center"
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
          >
            {placeholder}
          </li>
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-600 cursor-pointer flex items-center"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {renderOption(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const RestaurantList = () => {
  const dispatch = useDispatch();
  const { restaurants, totalPages, currentPage } = useSelector(state => state.restaurant);
  const [page, setPage] = useState(1);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [popular, setPopular] = useState(false);

  useEffect(() => {
    dispatch(getRestaurants({ page, cuisine: selectedCuisine, rating: selectedRating, price: selectedPrice, popular }));
  }, [dispatch, page, selectedCuisine, selectedRating, selectedPrice, popular]);

  if (!Array.isArray(restaurants)) {
    return <p>Notiek ielāde...</p>;
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h1 className="text-2xl mb-4 font-bold">Restorāni</h1>
      <div className="flex flex-wrap justify-between mb-4 space-y-2">
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded mb-2 md:mb-0 md:mr-2"
        >
          <option value="">Visas kategorijas</option>
          {cuisinesOptions.map(cuisine => (
            <option key={cuisine} value={cuisine}>{cuisine}</option>
          ))}
        </select>
        <CustomSelect
          value={selectedRating}
          onChange={setSelectedRating}
          options={ratingsOptions}
          placeholder="Visi Vērtējumi"
          renderOption={(option) => (
            <>
              {Array(option).fill(0).map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500 mr-1" />
              ))}
            </>
          )}
        />
        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded mb-2 md:mb-0 md:mr-2"
        >
          <option value="">Visas Cenas</option>
          {priceRanges.map(price => (
            <option key={price.value} value={price.value}>{price.label}</option>
          ))}
        </select>
        <label className="flex items-center mb-2 md:mb-0">
          <input
            type="checkbox"
            checked={popular}
            onChange={(e) => setPopular(e.target.checked)}
            className="mr-2"
          />
          Populārākie
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.length > 0 ? (
          restaurants.map(restaurant => (
            <div key={restaurant._id} className="bg-gray-700 text-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img src={restaurant.avatar} alt={restaurant.name} className="w-full h-40 object-cover" />
              <div className="flex flex-col justify-between flex-grow p-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
                  <p className="text-gray-400 mb-4"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2"/>{restaurant.location}</p>
                  <p className="mb-4">{restaurant.description}</p>
                </div>
                <div>
                  <Link to={`/restaurants/${restaurant._id}`} className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-900 transition">
                    Skatīt Ēdienkarti
                  </Link>               
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">Restorāni nav pieejami.</p>
        )}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-900 transition disabled:bg-gray-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Iepriekšējā
        </button>
        <span className="text-lg">Lapa {currentPage} no {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-900 transition disabled:bg-gray-300"
        >
          Nākamā <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
