# API Documentation

## Authentication

- **Register :** 

    - Using email: _POST_ /register
    > Request Body: {firstName, lastName, email, password, referralCode (Optional)}

    > Response Body: {status: true, message}, if successfull {status: false, error}, if failed 

- **Login :**

    - Using email: _POST_ /login
    > Request Body: {email, password}

    > Response Body: {status: true, message}, if successfull {status: false, error}, if failed



    - Using gmail: _GET_ /login/google

- **Logout :** _POST_ /logout

    > Request Body: {}

    > Reponse Body: {status: ture, message}, if successfull {status: false, error}, if failed

- **Verify user email** _POST_ /verifyUser

    > Request Body: {email, verificationCode}

    > Response Body: {status: true, message}, if successfull {status: false, error}, if failed

- **Add Pancard:** _POST_ /addPancard
    > Request Body: {pancard}

    > Response Body: {status: true, message}, if successfull {status: false, error}, if failed

## Edit Routes

- **Edit Details:** _POST_ /edit
    > Request Body: {firstName (optional), lastName (optional), email (optional), password (optional)}

    > Response Body: {status: true, message}, if successfull {status: false, error}, if failed

## User Routes

- **User Details:** _GET_ /getUser
    > Response Body: {status: true, user}, if successfull {status: false, error}, if failed

- **Wallet Details:** _GET_ /getWallet
    > Response Body: {status: true, wallet}, if successfull {status: false, error}, if failed

- **Banking Details:** _GET_ /getBankingOptions
    > Response Body: {status: true, account}, if successfull {status: false, error}, if failed

## Trade Routes

- **Buy coins:** _POST_ /buy
    > Request Body: {price (price per coin), quantity, coinType}

    > Response Body: {status: true, message}, if successfull {status: false, error}, if failed

- **Sell coins:** _POST_ /sell
    > Request Body: {price (price per coin), quantity, coinType}

    > Response Body: {status: true, message}, if successfull {status: false, error}, if failed

- **Get orders:** _GET_ /getOrders
    > Response Body: {status: true, orders}, if successfull {status: false, error}, if failed

- **Get active orders:** _GET_ /getActiveOrders
    > Response Body: {status: true, orders}, if successfull {status: false, error}, if failed

- **Get daily portfolio:** _GET_ /getDailyPortfolio
    > Response Body: {status: true, portfolio}, if successfull {status: false, error}, if failed

- **Get overall portfolio:** _GET_ /getOverallPortfolio
    > Response Body: {status: true, portfolio}, if successfull {status: false, error}, if failed

