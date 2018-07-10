// This files returns test data based on the TMdb API responses.
// The test data is used for testing purposes.

const genreListTestData = {
  "genres": [
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
  ]
};

const movieListTestData = {
  "results": [
    {
      "vote_count": 7,
      "id": 112233,
      "video": false,
      "vote_average": 6.3,
      "title": "Test 1",
      "popularity": 11.12,
      "poster_path": "/poster1.jpg",
      "original_language": "en",
      "original_title": "Test 1",
      "genre_ids": [
        1,
        2
      ],
      "backdrop_path": "/backdrop1.jpg",
      "adult": false,
      "overview": "Test 1 overview",
      "release_date": "2018-07-01"
    },
    {
      "vote_count": 528,
      "id": 445566,
      "video": false,
      "vote_average": 5.6,
      "title": "Test 2",
      "popularity": 33.44,
      "poster_path": "/poster2.jpg",
      "original_language": "en",
      "original_title": "Test 2",
      "genre_ids": [
        2,
        3
      ],
      "backdrop_path": "/backdrop2.jpg",
      "adult": false,
      "overview": "Test 2 overview",
      "release_date": "2018-03-02"
    },
    {
      "vote_count": 10,
      "id": 778899,
      "video": false,
      "vote_average": 6.7,
      "title": "Test 3",
      "popularity": 55.666,
      "poster_path": "/poster3.jpg",
      "original_language": "en",
      "original_title": "Test 3",
      "genre_ids": [
        1,
        3
      ],
      "backdrop_path": "/backdrop3.jpg",
      "adult": false,
      "overview": "Test 3 overview",
      "release_date": "2018-07-03"
    }
  ],
  "page": 1,
  "total_results": 100,
  "dates": {
    "maximum": "2018-07-12",
    "minimum": "2018-05-25"
  },
  "total_pages": 5
};

export default {
  genreListTestData,
  movieListTestData
};
