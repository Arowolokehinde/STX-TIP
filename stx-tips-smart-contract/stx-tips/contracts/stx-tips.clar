;; ;; ;; Title: Tip-stacks Enhanced
;; ;; ;; Description: Decentralized tipping platform with advanced features

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;; Constants ;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(define-constant CONTRACT_OWNER 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6)
(define-constant PLATFORM_FEE_PERCENTAGE u5)
(define-constant MAX_TIP_AMOUNT u1000000000)  ;; 1000 STX
(define-constant REWARD_THRESHOLD u1000000)   ;; 1 STX
(define-constant REWARD_RATE u10)


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;  Error codes  ;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


(define-constant ERR_INSUFFICIENT_FUNDS (err u1))
(define-constant ERR_INVALID_AMOUNT (err u2))
(define-constant ERR_TRANSFER_FAILED (err u3))
(define-constant ERR_REWARD_UPDATE_FAILED (err u4))



;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;; Maps ;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define-map user-tip-stats principal 
  { 
    total-tips-sent: uint, 
    total-tips-received: uint, 
    reward-points: uint 
  }
)

(define-map tip-history 
  { sender: principal, recipient: principal, timestamp: uint } 
  { amount: uint, fee: uint, token-type: (string-ascii 32) }
)

(define-map user-identity principal {
    username: (string-ascii 50),
    verified: bool
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;; Helper Functions ;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define-private (calculate-platform-fee (amount uint))
  (/ (* amount PLATFORM_FEE_PERCENTAGE) u100)
)

(define-private (calculate-tip-amount (amount uint) (platform-fee uint))
  (- amount platform-fee)
)

(define-private (get-current-block-height)
  (get-stacks-block-info? time (- stacks-block-height u1))
)

;; ;; Get default stats for new users
(define-private (get-default-stats)
    {
        total-tips-sent: u0,
        total-tips-received: u0,
        reward-points: u0
    }
)

;; Process tip transfer
(define-private (process-tip-transfer (recipient principal) (tip-amount uint) (platform-fee uint))
    (begin
        ;; Transfer tip amount to recipient
        (match (stx-transfer? tip-amount tx-sender recipient)
            success (match (stx-transfer? platform-fee tx-sender CONTRACT_OWNER)
                fee-success (ok true)
                fee-error (err ERR_TRANSFER_FAILED)
            )
            error (err ERR_TRANSFER_FAILED)
        )
    )
)


(define-private (check-tip-amount (amount uint))
    (and 
      (>= (stx-get-balance tx-sender) amount)
      (< amount MAX_TIP_AMOUNT)
    )
)

(define-private (transfer-tip (recipient principal) (amount uint))
  (match (stx-transfer? amount tx-sender recipient)
    success (ok true)
    error (err ERR_TRANSFER_FAILED)
  )
)

(define-private (transfer-platform-fee (fee uint))
  (match (stx-transfer? fee tx-sender CONTRACT_OWNER)
    success (ok true)
    error (err ERR_TRANSFER_FAILED)
  )
)




(define-private (update-sender-stats (sender principal) (amount uint))
  (map-set user-tip-stats sender 
    (merge 
      (default-to 
        { total-tips-sent: u0, total-tips-received: u0, reward-points: u0 }
        (map-get? user-tip-stats sender)
      )
      { 
        total-tips-sent: (+ 
          (get total-tips-sent 
            (default-to 
              { total-tips-sent: u0, total-tips-received: u0, reward-points: u0 }
              (map-get? user-tip-stats sender)
            )
          ) 
          amount
        ) 
      }
    )
  )
)



(define-private (update-recipient-stats (recipient principal) (amount uint))
  (let (
    (platform-fee (calculate-platform-fee amount))
    (actual-tip-amount (- amount platform-fee))
  )
    (map-set user-tip-stats recipient 
      (merge 
        (default-to 
          { total-tips-sent: u0, total-tips-received: u0, reward-points: u0 }
          (map-get? user-tip-stats recipient)
        )
        { 
          total-tips-received: (+ 
            (get total-tips-received 
              (default-to 
                { total-tips-sent: u0, total-tips-received: u0, reward-points: u0 }
                (map-get? user-tip-stats recipient)
              )
            ) 
            actual-tip-amount 
          ) 
        }
      )
    )
  )
)



(define-private (log-transaction (sender principal) (recipient principal) (amount uint) (fee uint) (token-type (string-ascii 32)))
  (map-set tip-history 
    { 
      sender: sender, 
      recipient: recipient, 
      timestamp: stacks-block-height 
    }
    { 
      amount: amount, 
      fee: fee,
      token-type: token-type
    }
  )
)

(define-private (update-reward-points (sender principal) (amount uint))
  (if (>= amount REWARD_THRESHOLD)
    (map-set user-tip-stats sender 
      (merge 
        (unwrap-panic (map-get? user-tip-stats sender))
        { reward-points: (+ (get reward-points (unwrap-panic (map-get? user-tip-stats sender))) REWARD_RATE) }
      )
    )
    true
  )
)


;; Validate tip amount
(define-private (validate-tip-amount (amount uint))
    (and 
        (>= (stx-get-balance tx-sender) amount)
        (< amount MAX_TIP_AMOUNT)
    )
)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;; Public ;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Main Tip Function
(define-public (tip 
    (recipient principal) 
    (amount uint)
    (token-type (string-ascii 32))
)
  (let 
    (
      (platform-fee (calculate-platform-fee amount))
      (tip-amount (calculate-tip-amount amount platform-fee))
    )
    ;; Safety Checks
    (asserts! (check-tip-amount amount) (err ERR_INVALID_AMOUNT))
    
    ;; Token Transfer Logic
    (try! (transfer-tip recipient tip-amount))
    (try! (transfer-platform-fee platform-fee))

    ;; Update Stats
    (update-sender-stats tx-sender amount)
    (update-recipient-stats recipient amount)
    
    ;; Log Transaction
    (log-transaction tx-sender recipient tip-amount platform-fee token-type)
    
    ;; Reward System
    (update-reward-points tx-sender amount)
    
    (ok true)
  )
)

;; Additional Function
(define-public (update-user-reward-points (user principal) (reward-rate uint))
  (match (map-get? user-tip-stats user)
    current-stats 
    (begin
      (map-set user-tip-stats user 
        (merge current-stats {
          reward-points: (+ (get reward-points current-stats) reward-rate)
        })
      )
      (ok true)
    )
    (err ERR_REWARD_UPDATE_FAILED)
  )
)


(define-public (set-user-identity (user principal) (username (string-ascii 50)))
    (begin
        (map-set user-identity user {
            username: username,
            verified: true
        })
        (ok true)
    )
)



;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;; Read-only functions ;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define-read-only (get-user-tip-stats (user principal))
    (default-to 
        { total-tips-sent: u0, total-tips-received: u0, reward-points: u0 }
        (map-get? user-tip-stats user)
    )
)

(define-read-only (get-user-identity (user principal))
    (default-to 
        { username: "", verified: false }
        (map-get? user-identity user)
    )
)


(define-read-only (get-transaction-logs (sender principal) (recipient principal) (amount uint) (fee uint) (token-type (string-ascii 32)))
    (map-get? tip-history 
        { 
        sender: sender, 
        recipient: recipient, 
        timestamp: stacks-block-height 
        }
    )
)

(define-read-only (get-tip-amount (amount uint)) 
    (check-tip-amount amount)
)


(define-read-only (get-updated-platform-stats (sender principal) (amount uint))
  (let
    (
      ;; Fetch current stats or use default stats if not present
      (current-stats (default-to 
                        { total-tips-sent: u0, total-tips-received: u0, reward-points: u0 }
                        (map-get? user-tip-stats sender)))
    )
    ;; Return the simulated updated stats without modifying the map
    (merge
      current-stats
      {
        total-tips-sent: (- (get total-tips-sent current-stats) amount)
      }
    )
  )
)


(define-read-only (get-tips-recieved (recipient principal) (amount uint))
  (let
    (
      ;; Calculate platform fee
      (platform-fee (calculate-platform-fee amount))
      
      ;; Calculate actual tip amount after deducting platform fee
      (actual-tip-amount (- amount platform-fee))
    )
    ;; Return just the actual tip amount
    actual-tip-amount
  )
)

(define-read-only (get-total-tips-received (recipient principal))
  (let 
    (
      ;; Retrieve the current user stats
      (current-stats (default-to 
                        { total-tips-sent: u0, total-tips-received: u0, reward-points: u0 }
                        (map-get? user-tip-stats recipient)))
    )
    ;; Return the total tips received
    (get total-tips-received current-stats)
  )
)


(define-read-only (get-total-tips-sent (sender principal))
  (let 
    (
      ;; Retrieve the current user stats
      (current-stats (default-to 
                        { total-tips-sent: u0, total-tips-received: u0, reward-points: u0 }
                        (map-get? user-tip-stats sender)))
    )
    ;; Return the total tips sent
    (get total-tips-sent current-stats)
  )
)

(define-read-only (get-reward-points (sender principal) (amount uint))
  (let 
    (
      ;; Retrieve the current user stats
      (current-stats (default-to 
                        { total-tips-sent: u0, total-tips-received: u0, reward-points: u0 }
                        (map-get? user-tip-stats sender)))
    )
    ;; Check if the amount meets the reward threshold
    (if (>= amount REWARD_THRESHOLD)
      ;; If threshold is met, calculate new reward points
      (+ (get reward-points current-stats) REWARD_RATE)
      ;; If threshold is not met, return current reward points
      (get reward-points current-stats)
    )
  )
)
