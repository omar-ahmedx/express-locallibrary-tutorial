const { DateTime } = require("luxon");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  return "/catalog/bookinstance/" + this._id;
});

// Virtual for the date
BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED); //we use fromJSDate() to import a JavaScript date string and toLocaleString() to output the date in  DATE_MED format in English: Oct 6th, 2020.
});
//Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
