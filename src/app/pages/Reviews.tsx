import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Star,
  ThumbsUp,
  Filter,
  Edit3,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Review {
  id: number;
  userName: string;
  userInitials: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  verified: boolean;
}

export function Reviews() {
  const { id } = useParams();
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");

  const parkingName = "Freedom Square Parking";
  const overallRating = 4.8;
  const totalReviews = 247;

  const ratingDistribution = [
    { stars: 5, count: 180, percentage: 73 },
    { stars: 4, count: 45, percentage: 18 },
    { stars: 3, count: 15, percentage: 6 },
    { stars: 2, count: 5, percentage: 2 },
    { stars: 1, count: 2, percentage: 1 },
  ];

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      userName: "Nino K.",
      userInitials: "NK",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent location right in the city center! The parking is well-lit, secure, and the staff is very helpful. The EV charging stations are a great bonus.",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      userName: "Levan M.",
      userInitials: "LM",
      rating: 4,
      date: "1 week ago",
      comment:
        "Good parking facility with 24/7 security. Only downside is that it can get quite busy during peak hours. Overall, great value for money.",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      userName: "Anna B.",
      userInitials: "AB",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Safe and convenient. I park here regularly when visiting the area. Never had any issues. Highly recommend!",
      helpful: 15,
      verified: true,
    },
    {
      id: 4,
      userName: "Giorgi T.",
      userInitials: "GT",
      rating: 5,
      date: "3 weeks ago",
      comment:
        "Perfect spot for tourists visiting Freedom Square. Clean, secure, and reasonably priced. The CCTV coverage gives peace of mind.",
      helpful: 6,
      verified: false,
    },
  ]);

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && setNewRating(star)}
            disabled={!interactive}
            className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmitReview = () => {
    if (newRating > 0 && newReview.trim()) {
      const review: Review = {
        id: reviews.length + 1,
        userName: "Giorgi A.",
        userInitials: "GA",
        rating: newRating,
        date: "Just now",
        comment: newReview,
        helpful: 0,
        verified: true,
      };
      setReviews([review, ...reviews]);
      setNewRating(0);
      setNewReview("");
      setIsWriteReviewOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#17E9BB] to-[#074047] px-4 pt-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to={`/parking/${id}`}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Reviews</h1>
          </div>

          <Dialog open={isWriteReviewOpen} onOpenChange={setIsWriteReviewOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-white text-[#074047] hover:bg-white/90">
                <Edit3 className="w-4 h-4 mr-2" />
                Write
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Your Rating</p>
                  {renderStars(newRating, true)}
                </div>

                <div>
                  <Textarea
                    placeholder="Share your experience..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsWriteReviewOpen(false);
                    setNewRating(0);
                    setNewReview("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={newRating === 0 || !newReview.trim()}
                  className="bg-[#17E9BB] hover:bg-[#074047]"
                >
                  Submit Review
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overall Rating */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="text-center mb-4">
            <h2 className="text-5xl font-bold text-white mb-2">
              {overallRating}
            </h2>
            {renderStars(Math.round(overallRating))}
            <p className="text-white/80 text-sm mt-2">
              Based on {totalReviews} reviews
            </p>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="px-4 -mt-10 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium">{dist.stars}</span>
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#17E9BB] h-full rounded-full transition-all"
                    style={{ width: `${dist.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {dist.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 mb-6">
        <div className="flex gap-2">
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="px-4 pb-24 space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-10 h-10 border-2 border-[#B3F5E7]">
                <AvatarFallback className="bg-gradient-to-br from-[#17E9BB] to-[#074047] text-white text-sm">
                  {review.userInitials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {review.userName}
                  </h3>
                  {review.verified && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-green-100 text-green-700"
                    >
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-3">
              {review.comment}
            </p>

            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#17E9BB] transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
