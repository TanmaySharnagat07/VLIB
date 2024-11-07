import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [1, "Title must be at least 1 character long"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
    minlength: [1, "Author name must be at least 1 character long"],
    maxlength: [50, "Author name cannot exceed 50 characters"],
  },
  isbn: {
    type: String,
    required: [true, "ISBN is required"],
    unique: true,
    validate: {
      validator: function(v) {
        return /^(?:\d{9}[\dXx]|\d{13})$/.test(v);
      },
      message: props => `${props.value} is not a valid ISBN number!`
    }
  },
  publishedDate: {
    type: Date,
    required: [true, "Published date is required"],
  },
  genre: {
    type: [String],
    required: [true, "Genre is required"],
  },
  copiesAvailable: {
    type: Number,
    required: [true, "Number of copies available is required"],
    min: [0, "Number of copies cannot be negative"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  coverImage: {
    type: String,
    default:"https://thumbs.dreamstime.com/z/closed-book-cartoon-vector-symbol-icon-design-beautiful-illustr-illustration-isolated-white-background-97502521.jpg?ct=jpeg",
  },
  borrowedBy: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      borrowedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const Book = mongoose.model("Book", bookSchema);
