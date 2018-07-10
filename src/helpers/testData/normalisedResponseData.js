// This files returns normalised test data based on the TMdb API responses.
// This is the data that our redux state will have.

// Get the
import config from '../../../config';

const normalisedGenreListTestData = [
  {
    "id": 1,
    "name": "Tha Bomb"
  },
  {
    "id": 2,
    "name": "Funny haha"
  },
  {
    "id": 3,
    "name": "Scary"
  }
];

const normalisedMovieListTestData = [
  {
    "id": 112233,
    "average_vote": 6.3,
    "title": "Test 1",
    "popularity": 11.12,
    "image": `${config.imageApiUrl}/poster1.jpg`,
    "genre_ids": [
      1,
      2
    ],
    "summary": "Test 1 overview",
  },
  {
    "id": 445566,
    "average_vote": 5.6,
    "title": "Test 2",
    "popularity": 33.44,
    "image": `${config.imageApiUrl}/poster2.jpg`,
    "genre_ids": [
      2,
      3
    ],
    "summary": "Test 2 overview",
  },
  {
    "id": 778899,
    "average_vote": 6.7,
    "title": "Test 3",
    "popularity": 55.666,
    "image": `${config.imageApiUrl}/poster3.jpg`,
    "genre_ids": [
      1,
      3
    ],
    "summary": "Test 3 overview",
  }
];

const consolidatedMovieListTestData = [
  {
    "id": 112233,
    "average_vote": 6.3,
    "title": "Test 1",
    "popularity": 11.12,
    "image": `${config.imageApiUrl}/poster1.jpg`,
    "genre_ids": [
      {
        "id": 1,
        "name": "Tha Bomb"
      },
      {
        "id": 2,
        "name": "Funny haha"
      }
    ],
    "summary": "Test 1 overview",
  },
  {
    "id": 445566,
    "average_vote": 5.6,
    "title": "Test 2",
    "popularity": 33.44,
    "image": `${config.imageApiUrl}/poster2.jpg`,
    "genre_ids": [
      {
        "id": 2,
        "name": "Funny haha"
      },
      {
        "id": 3,
        "name": "Scary"
      }
    ],
    "summary": "Test 2 overview",
  },
  {
    "id": 778899,
    "average_vote": 6.7,
    "title": "Test 3",
    "popularity": 55.666,
    "image": `${config.imageApiUrl}/poster3.jpg`,
    "genre_ids": [
      {
        "id": 1,
        "name": "Tha Bomb"
      },
      {
        "id": 3,
        "name": "Scary"
      }
    ],
    "summary": "Test 3 overview",
  }
];

export default {
  normalisedGenreListTestData,
  normalisedMovieListTestData,
  consolidatedMovieListTestData
};
