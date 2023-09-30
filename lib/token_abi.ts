export const abi = [
    {
        "name": "initialize",
        "params": [
            {
                "name": "admin",
                "type": 18
            },
            {
                "name": "decimal",
                "type": 3
            },
            {
                "name": "name",
                "type": 14
            },
            {
                "name": "symbol",
                "type": 14
            }
        ],
        "outputs": []
    },
    {
        "name": "mint",
        "params": [
            {
                "name": "to",
                "type": 18
            },
            {
                "name": "amount",
                "type": 10
            }
        ],
        "outputs": []
    },
    {
        "name": "set_admin",
        "params": [
            {
                "name": "new_admin",
                "type": 18
            }
        ],
        "outputs": []
    },
    {
        "name": "allowance",
        "params": [
            {
                "name": "from",
                "type": 18
            },
            {
                "name": "spender",
                "type": 18
            }
        ],
        "outputs": [
            {
                "type": 10
            }
        ]
    },
    {
        "name": "approve",
        "params": [
            {
                "name": "from",
                "type": 18
            },
            {
                "name": "spender",
                "type": 18
            },
            {
                "name": "amount",
                "type": 10
            },
            {
                "name": "expiration_ledger",
                "type": 3
            }
        ],
        "outputs": []
    },
    {
        "name": "balance",
        "params": [
            {
                "name": "id",
                "type": 18
            }
        ],
        "outputs": [
            {
                "type": 10
            }
        ]
    },
    {
        "name": "spendable_balance",
        "params": [
            {
                "name": "id",
                "type": 18
            }
        ],
        "outputs": [
            {
                "type": 10
            }
        ]
    },
    {
        "name": "transfer",
        "params": [
            {
                "name": "from",
                "type": 18
            },
            {
                "name": "to",
                "type": 18
            },
            {
                "name": "amount",
                "type": 10
            }
        ],
        "outputs": []
    },
    {
        "name": "transfer_from",
        "params": [
            {
                "name": "spender",
                "type": 18
            },
            {
                "name": "from",
                "type": 18
            },
            {
                "name": "to",
                "type": 18
            },
            {
                "name": "amount",
                "type": 10
            }
        ],
        "outputs": []
    },
    {
        "name": "burn",
        "params": [
            {
                "name": "from",
                "type": 18
            },
            {
                "name": "amount",
                "type": 10
            }
        ],
        "outputs": []
    },
    {
        "name": "burn_from",
        "params": [
            {
                "name": "spender",
                "type": 18
            },
            {
                "name": "from",
                "type": 18
            },
            {
                "name": "amount",
                "type": 10
            }
        ],
        "outputs": []
    },
    {
        "name": "decimals",
        "params": [],
        "outputs": [
            {
                "type": 3
            }
        ]
    },
    {
        "name": "name",
        "params": [],
        "outputs": [
            {
                "type": 14
            }
        ]
    },
    {
        "name": "symbol",
        "params": [],
        "outputs": [
            {
                "type": 14
            }
        ]
    }
]