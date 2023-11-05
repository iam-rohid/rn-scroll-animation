export type Card = {
  id: string;
  balance: number;
  color: string;
  fgColor: string;
};

export const allCards: Card[] = [
  {
    id: "1",
    balance: 21424,
    color: "#4f46e5",
    fgColor: "#ffffff",
  },
  {
    id: "2",
    balance: 46700,
    color: "#2563eb",
    fgColor: "#ffffff",
  },
  {
    id: "3",
    balance: 30000,
    color: "#db2777",
    fgColor: "#ffffff",
  },
  {
    id: "4",
    balance: 430802,
    color: "#e11d48",
    fgColor: "#ffffff",
  },
];

export type Expense = {
  id: number;
  title: string;
  type: string;
  price: string;
};

export const allExpenses: Expense[] = [
  {
    id: 1,
    title: "Amazon Echo Dot",
    type: "Amazon",
    price: "$29.99",
  },
  {
    id: 2,
    title: "Amazon Prime Membership",
    type: "Amazon",
    price: "$119",
  },
  {
    id: 3,
    title: "Netflix Subscription",
    type: "Mobile Subscription",
    price: "$12.99",
  },
  {
    id: 4,
    title: "iPhone 12 Pro",
    type: "Mobile",
    price: "$999",
  },
  {
    id: 5,
    title: "Kindle Paperwhite",
    type: "Amazon",
    price: "$149.99",
  },
  {
    id: 6,
    title: "Google Play Store Apps",
    type: "Mobile Subscription",
    price: "$5.99",
  },
  {
    id: 7,
    title: "Laptop Charger",
    type: "Electronics",
    price: "$39.99",
  },
  {
    id: 8,
    title: "Spotify Premium",
    type: "Mobile Subscription",
    price: "$9.99",
  },
  {
    id: 9,
    title: "Toilet Paper",
    type: "Household",
    price: "$4.99",
  },
  {
    id: 10,
    title: "Nike Running Shoes",
    type: "Sports",
    price: "$79.99",
  },
  {
    id: 11,
    title: "Hulu Subscription",
    type: "Mobile Subscription",
    price: "$7.99",
  },
  {
    id: 12,
    title: "Groceries",
    type: "Food",
    price: "$50",
  },
  {
    id: 13,
    title: "Smart Home Security Camera",
    type: "Electronics",
    price: "$149",
  },
  {
    id: 14,
    title: "Gym Membership",
    type: "Fitness",
    price: "$30",
  },
  {
    id: 15,
    title: "PlayStation 5",
    type: "Gaming",
    price: "$499.99",
  },
  {
    id: 16,
    title: "Ebook - The Great Gatsby",
    type: "Books",
    price: "$4.99",
  },
  {
    id: 17,
    title: "Home Decor Items",
    type: "Home",
    price: "$25",
  },
  {
    id: 18,
    title: "Car Insurance",
    type: "Insurance",
    price: "$100",
  },
  {
    id: 19,
    title: "Electricity Bill",
    type: "Utilities",
    price: "$75",
  },
  {
    id: 20,
    title: "Movie Tickets",
    type: "Entertainment",
    price: "$12.50",
  },
];
