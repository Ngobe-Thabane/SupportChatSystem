import React, { useState } from "react";

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
};

const MovieReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, name: "Alice", rating: 5, comment: "Amazing movie!" },
    { id: 2, name: "Bob", rating: 4, comment: "Really enjoyed it." },
  ]);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;

    const newReview: Review = {
      id: reviews.length + 1,
      name: form.name,
      rating: form.rating,
      comment: form.comment,
    };

    setReviews((prev) => [...prev, newReview]);
    setForm({ name: "", rating: 5, comment: "" });
  };

  return (
    <div className="max-w-2xl mx-2">
      <h2 className="text-2xl font-bold mb-4">Movie Reviews</h2>

      <div className="space-y-4 mb-6 flex flex-auto w-full">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border p-4 rounded-xl shadow-sm bg-base-200 "
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold text-lg">{review.name}</h3>
              <span className="text-yellow-500 font-bold">{review.rating}/5</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-xl shadow-inner space-y-4"
      >
        <h3 className="text-lg font-semibold">Add a Review</h3>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="comment"
          placeholder="Your Comment"
          value={form.comment}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default MovieReviews;
