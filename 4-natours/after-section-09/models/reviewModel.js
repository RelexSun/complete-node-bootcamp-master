const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!!!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    tour: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour']
      }
    ],
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
      }
    ]
  },
  {
    // include virtual properties when converting a mongoose doc to JSON or a plain js object
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//TODO: the reviewSchema includes references to other Mongoose models (Tour and User) using the ref option. Additionally, there's a middleware function that uses populate to retrieve and include additional information from the referenced Tour model in the query results. Instead of just seeing the ID.
reviewSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

module.exports = mongoose.model('Review', reviewSchema);
