# Token Swap

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Setup + Running Locally

Start by installing the project dependencies by running:

### `npm install --legacy-peer-deps`


You can run the app locally with the following command: 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You can run tests with the following command: 

### `npm test`



## Live Demo

You can access a live demo of the app hosted on Vercel [here](https://token-swap-edlplykz0-darius-projects-72af0bd9.vercel.app/).

## Design Choices

The objective was to create an interface where a user can input a number representing a value in USD, select two coins, and see their value relative to USD.

To support this functionality, I designed two input components:

1. **USD Input**: This component is a number input field with some styling and four additional buttons that serve as shortcuts for common USD values (100, 500, 1000, 10,000).
2. **Token Selector**: This component consists of a dropdown to select tokens and a disabled number input field that displays the selected token's value relative to the USD input. It also shows the USD value of one whole token. I chose a disabled number input field here as we may want to update the interface in the future to allow setting the coin amount directly, instead of calculating it from the USD value.

**Note**: I chose to render these components (USD Input and 2 Token Selectors) in vertical order as it would look similar on large and small screen devices.

Highlighted features:

1. **Automatic Price Updated**: Since we are dealing with cryptocurrencies, I added a feature that automatically updates the price of the selected tokens every 10 seconds. This frequency can be adjusted based on the API's rate limits and the need for more or less frequent updates. A spinner appears at the bottom of the interface when the latest price is being fetched.
2. **Swapping Source and Target**: I've added functionality to automatically swap the source and target tokens when the user selects the current target as the new source (or vice versa). For example, if BTC is the current source and ETH is the target, and the user selects ETH as the new source, BTC will automatically become the new target. I chose this behavior for two reasons:
   - It avoids selecting the same coin for both source and target.
   - It provides a more intuitive experience, as the user may be intending to swap the coins after selecting them in the wrong order. This is better than defaulting to some other coin in the DB.
3. **Handling Invalid USD amounts**: I've allowed any number as input to to the USD input field instead of restricting the range to values like 0 to 1. I believe that this a better user experience when editing numbers or typing them in.  However, to handle invalid inputs such as negative or null values, I display an error message below the input indicating that the amount must be a positive number. Additionally, when the input is invalid, prices for the selected source and target tokens are not displayed.


Libraries used:
- **Material UI**: I've used the material UI library as I am familiar with it and it provides multiple input and design components that helped me accelerate the development of the app. 
   


