const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
  },
  product_id: Number,
  question_body: String,
  question_date: Date,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: [
    {
      id: {
        type: Number,
        unique: true,
      },
      body: String,
      date: Date,
      answerer_name: String,
      helpfulness: Number,
      photos: [
        {
          id: Number,
          answer_id: Number,
          url: String,
        },
      ],
    },
  ],
});
