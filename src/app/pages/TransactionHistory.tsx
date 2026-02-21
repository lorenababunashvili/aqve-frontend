import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Download,
  Filter,
  Search,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface Transaction {
  id: string;
  type: "payment" | "refund" | "topup";
  description: string;
  location?: string;
  amount: number;
  date: string;
  time: string;
  status: "completed" | "pending" | "failed";
  paymentMethod: string;
}

export function TransactionHistory() {
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const transactions: Transaction[] = [
    {
      id: "TX-2026-001",
      type: "payment",
      description: "Parking Payment",
      location: "Freedom Square Parking",
      amount: -24.0,
      date: "2026-02-19",
      time: "14:30",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
    },
    {
      id: "TX-2026-002",
      type: "payment",
      description: "Parking Payment",
      location: "Vake Park Underground",
      amount: -15.0,
      date: "2026-02-18",
      time: "09:15",
      status: "completed",
      paymentMethod: "Mastercard •••• 8888",
    },
    {
      id: "TX-2026-003",
      type: "topup",
      description: "Wallet Top-up",
      amount: 100.0,
      date: "2026-02-17",
      time: "16:45",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
    },
    {
      id: "TX-2026-004",
      type: "refund",
      description: "Booking Cancellation",
      location: "Rustaveli Metro Station",
      amount: 14.0,
      date: "2026-02-16",
      time: "11:20",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
    },
    {
      id: "TX-2026-005",
      type: "payment",
      description: "Parking Payment",
      location: "Saburtalo Metro",
      amount: -12.0,
      date: "2026-02-15",
      time: "08:30",
      status: "completed",
      paymentMethod: "Mastercard •••• 8888",
    },
    {
      id: "TX-2026-006",
      type: "payment",
      description: "Extended Parking",
      location: "Freedom Square Parking",
      amount: -8.0,
      date: "2026-02-14",
      time: "17:00",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
    },
    {
      id: "TX-2026-007",
      type: "payment",
      description: "Parking Payment",
      location: "Didube Market",
      amount: -9.0,
      date: "2026-02-12",
      time: "13:45",
      status: "failed",
      paymentMethod: "Visa •••• 4242",
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
      case "refund":
        return <ArrowDownRight className="w-5 h-5 text-green-500" />;
      case "topup":
        return <ArrowDownRight className="w-5 h-5 text-blue-500" />;
      default:
        return <CreditCard className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  const totalSpent = transactions
    .filter((t) => t.type === "payment" && t.status === "completed")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalRefunded = transactions
    .filter((t) => t.type === "refund" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#17E9BB] to-[#074047] px-4 pt-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Transactions</h1>
          </div>

          <Button
            size="sm"
            className="bg-white text-[#074047] hover:bg-white/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-white/80 mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-white">₾{totalSpent}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-white/80 mb-1">Total Refunds</p>
            <p className="text-2xl font-bold text-white">₾{totalRefunded}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 -mt-10 mb-6 space-y-3">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Transactions Tabs */}
      <div className="px-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
            <TabsTrigger value="refund">Refunds</TabsTrigger>
            <TabsTrigger value="topup">Top-ups</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 pb-24">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    {getTransactionIcon(transaction.type)}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {transaction.description}
                        </h3>
                        {transaction.location && (
                          <p className="text-sm text-gray-600 truncate">
                            {transaction.location}
                          </p>
                        )}
                      </div>
                      <span
                        className={`font-bold flex-shrink-0 ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}₾
                        {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-2">
                      <div className="text-xs text-gray-500">
                        {transaction.date} • {transaction.time}
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-600">
                        {transaction.paymentMethod}
                      </span>
                      <button className="text-xs text-[#17E9BB] hover:text-[#074047] font-medium flex items-center gap-1">
                        <Receipt className="w-3 h-3" />
                        Receipt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="payment" className="space-y-3 pb-24">
            {transactions
              .filter((t) => t.type === "payment")
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {transaction.description}
                          </h3>
                          {transaction.location && (
                            <p className="text-sm text-gray-600 truncate">
                              {transaction.location}
                            </p>
                          )}
                        </div>
                        <span className="font-bold text-red-600 flex-shrink-0">
                          -₾{Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {transaction.date} • {transaction.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="refund" className="space-y-3 pb-24">
            {transactions
              .filter((t) => t.type === "refund")
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {transaction.description}
                          </h3>
                          {transaction.location && (
                            <p className="text-sm text-gray-600 truncate">
                              {transaction.location}
                            </p>
                          )}
                        </div>
                        <span className="font-bold text-green-600 flex-shrink-0">
                          +₾{transaction.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {transaction.date} • {transaction.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="topup" className="space-y-3 pb-24">
            {transactions
              .filter((t) => t.type === "topup")
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {transaction.description}
                          </h3>
                        </div>
                        <span className="font-bold text-blue-600 flex-shrink-0">
                          +₾{transaction.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {transaction.date} • {transaction.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
