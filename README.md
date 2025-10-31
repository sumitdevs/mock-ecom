# Ecom 
Ecom is a simple and interactive mock e-commerce application designed to demonstrate the core workflow of an online shopping system — from browsing products to completing checkout.

##  Installation & Setup

Follow the steps below to run the project locally.

###  Clone the Repository
```bash
git clone https://github.com/your-username/ecom.git
cd ecom
```
### server Setup
```bash
cd backend
pnpm install
```
### env setup 
PORT=3000
MONGO_URI=your_mongodb_connection_string/ecom

### now run the commande
```bash
pnpm run dev 
```
### Frontend setup
```bash
cd client
pnpm install
pnpm run dev 
```

##  API Endpoints

### Base URL
http://localhost:5000/api

### Products API

| `GET` | `/products` | Fetch all available products |
| `GET` | `/products/:id` | Fetch product details by product ID |


### Cart API

| `GET` | `/cart/:id` | Get all cart items along with total price |
| `POST` | `/cart/` | Add an item to cart 
| `PATCH` | `/cart/` | Update quantity of an item in cart
| `DELETE` | `/cart/:cartId/:productId` | Remove an item from the cart 


### Checkout API


| `POST` | `/checkout` | Create a checkout entry and generate receipt PDF


## 🌐 Frontend Routes

| `/` | Display all products |
| `/cart` | Show cart items and total |
| `/checkout` | Checkout form (Name + Email) |
| `/receipt` | Receipt page shown after successful checkout |


## video link
Visit `https://youtu.be/7w15pNfnqcI?si=6ei3cyK62V_uHDRX` 

## Usage
Visit `http://localhost:3000` in your browser to use the application.

## Contributing
Feel free to submit pull requests or open issues.

## License
MIT License

## Contact
Email: mysumitdevs@gmail.com