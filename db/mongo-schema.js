const mongoose = require('mongoose');
uri = '';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let qaSchema = mongoose.Schema({
  product_id: Number,
  question_id: {
    type: Number,
    unique: true,
  },
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
          url: String,
        },
      ],
    },
  ],
});

let Repo = mongoose.model('qa', repoSchema);
