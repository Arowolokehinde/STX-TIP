**Tip Stacks** 
TiP Stacks a decentralized tipping platform built on the Stacks blockchain built with AI. It enables users to send and receive tips seamlessly, with advanced features like user statistics, rewards, identity verification, and platform fee handling. Designed for efficiency and transparency, this smart contract promotes decentralized financial interaction.

---

## Features

### Key Features
1. **Decentralized Tipping**: Enables users to tip others directly on the Stacks blockchain.
2. **Platform Fees**: A percentage fee is deducted from each tip for platform sustainability.
3. **Reward System**: Users earn reward points for tipping amounts exceeding a threshold.
4. **User Statistics**:
   - Total tips sent and received.
   - Accumulated reward points.
5. **Identity Management**: Links user addresses to usernames and verification status.
6. **Transaction History**: Maintains a detailed log of tipping activities.
7. **Error Handling**: Comprehensive error codes to handle edge cases and ensure contract integrity.

---

<img width="1440" alt="Screenshot 2024-12-14 at 9 46 29 PM" src="https://github.com/user-attachments/assets/477ccfba-7090-420d-8aa3-4a03a8351300" />

<img width="1439" alt="Screenshot 2024-12-14 at 9 46 47 PM" src="https://github.com/user-attachments/assets/62c0f69c-9348-48bc-8b93-f42f585f3865" />

## Smart Contract Components

### Constants
- `CONTRACT_OWNER`: The owner's principal address.
- `PLATFORM_FEE_PERCENTAGE`: Fee percentage (default: 5%).
- `MAX_TIP_AMOUNT`: Maximum allowable tip amount (default: 1,000 STX).
- `REWARD_THRESHOLD`: Minimum tip amount to qualify for rewards (default: 1 STX).
- `REWARD_RATE`: Points earned per qualifying tip (default: 10 points).

### Data Structures
- **`user-tip-stats`**: Tracks individual user statistics.
  ```clojure
  { total-tips-sent: uint, total-tips-received: uint, reward-points: uint }
  ```
- **`tip-history`**: Logs transactions.
  ```clojure
  { sender: principal, recipient: principal, timestamp: uint, amount: uint, fee: uint, token-type: string }
  ```
- **`user-identity`**: Stores user profiles.
  ```clojure
  { username: string, verified: bool }
  ```

### Key Functions
#### Public Functions
1. **`tip`**:
   - Transfers a tip to a recipient, deducting a platform fee.
   - Updates user stats and logs the transaction.
   - Example:
     ```clojure
     (tip 'SP123456789' u1000 "STX")
     ```

2. **`set-user-identity`**:
   - Registers or updates a user's username.
   - Example:
     ```clojure
     (set-user-identity "Alice")
     ```

3. **`update-user-reward-points`**:
   - Updates reward points for a user manually.
   - Example:
     ```clojure
     (update-user-reward-points 'SP123456789' u20)
     ```

4. **Read-Only Functions**:
   - `get-user-tip-stats`: Retrieve a user's tipping statistics.
   - `get-user-identity`: Fetch a user's identity information.
   - `get-transaction-logs`: Access logs of a specific transaction.
  
   
<img width="1440" alt="Screenshot 2024-12-14 at 9 50 48 PM" src="https://github.com/user-attachments/assets/149ed8bd-ff1e-4e7f-b203-ae9d4a8b0f6f" />

#### Private Functions
- **`process-tip-transfer`**:
  Handles the actual fund transfer and fee deduction.
- **`calculate-platform-fee`**:
  Computes the platform fee from the tip amount.
- **`update-sender-stats` & `update-recipient-stats`**:
  Updates user statistics after a successful tip.
- **`update-reward-points`**:
  Grants reward points to eligible users.

---

## Installation & Deployment

1. **Environment Setup**:
   Ensure you have:
   - Clarity development tools installed.
   - A connected Stacks wallet.

2. **Deploy**:
   Deploy the contract using the Stacks CLI or your preferred IDE:
   ```bash
   stacks deploy ./tip-stacks-enhanced.clar
   ```

3. **Configuration**:
   - Update the constants to match your platform's settings.
   - Ensure the `CONTRACT_OWNER` address is correct.

---

## Usage Guidelines

- **For Users**:
  - Use the `tip` function to send tips.
  - Query `get-user-tip-stats` for your statistics.
  - Link your identity using `set-user-identity`.

- **For Platform Owners**:
  - Monitor platform fees and reward points.
  - Handle user verification through `user-identity`.

---

## Error Handling

### Common Errors
- **`ERR_INSUFFICIENT_FUNDS` (u1)**: Tip amount exceeds sender's balance.
- **`ERR_INVALID_AMOUNT` (u2)**: Tip amount is invalid (e.g., zero or exceeds maximum).
- **`ERR_TRANSFER_FAILED` (u3)**: Fund transfer failed due to network or balance issues.
- **`ERR_REWARD_UPDATE_FAILED` (u4)**: Reward points update failed.

---


<img width="1439" alt="Screenshot 2024-12-14 at 9 46 47 PM" src="https://github.com/user-attachments/assets/85a98fdc-fd57-4edb-9bd6-9143b7a92be2" />

## Future Enhancements

1. **Multi-token Support**: Extend tipping functionality to include other tokens.
2. **Advanced Identity Verification**: Integrate with decentralized identity solutions.
3. **Dynamic Reward Rates**: Implement tiered reward mechanisms based on user activity.
