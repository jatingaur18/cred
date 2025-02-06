db.runCommand({
    collMod: "profiles",
    validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["basicDetails", "reportSummary", "creditAccounts", "metadata"],
          properties: {
            _id: {
              bsonType: "objectId"
            },
            basicDetails: {
              bsonType: "object",
              required: ["name", "mobilePhone", "pan", "creditScore"],
              properties: {
                name: {
                  bsonType: "object",
                  required: ["firstName", "lastName"],
                  properties: {
                    firstName: { bsonType: "string" },
                    lastName: { bsonType: "string" }
                  }
                },
                mobilePhone: { bsonType: "string" },
                pan: { bsonType: "string" },
                creditScore: { bsonType: "string" }
              }
            },
            reportSummary: {
              bsonType: "object",
              required: [
                "totalAccounts",
                "activeAccounts",
                "closedAccounts",
                "currentBalanceTotal",
                "securedAmount",
                "unsecuredAmount",
                "last7DaysEnquiries"
              ],
              properties: {
                totalAccounts: { bsonType: "int" },
                activeAccounts: { bsonType: "int" },
                closedAccounts: { bsonType: "int" },
                currentBalanceTotal: { bsonType: "int" },
                securedAmount: { bsonType: "int" },
                unsecuredAmount: { bsonType: "int" },
                last7DaysEnquiries: { bsonType: "int" }
              }
            },
            creditAccounts: {
              bsonType: "object",
              required: ["all", "creditCards", "addresses"],
              properties: {
                all: {
                  bsonType: "array",
                  items: {
                    bsonType: "object",
                    required: ["accountType", "bank", "accountNumber", "amountOverdue", "currentBalance", "address"],
                    properties: {
                      accountType: { bsonType: "string" },
                      bank: { bsonType: "string" },
                      accountNumber: { bsonType: "string" },
                      amountOverdue: { bsonType: "int" },
                      currentBalance: { bsonType: "int" },
                      address: {
                        bsonType: "object",
                        required: ["line1", "line2", "city", "state", "pincode"],
                        properties: {
                          line1: { bsonType: "string" },
                          line2: { bsonType: "string" },
                          line3: { bsonType: "string" },
                          city: { bsonType: "string" },
                          state: { bsonType: "string" },
                          pincode: { bsonType: "string" }
                        }
                      }
                    }
                  }
                },
                creditCards: {
                  bsonType: "array",
                  items: {
                    bsonType: "object",
                    required: ["accountType", "bank", "accountNumber", "amountOverdue", "currentBalance", "address"],
                    properties: {
                      accountType: { bsonType: "string" },
                      bank: { bsonType: "string" },
                      accountNumber: { bsonType: "string" },
                      amountOverdue: { bsonType: "int" },
                      currentBalance: { bsonType: "int" },
                      address: {
                        bsonType: "object",
                        required: ["line1", "line2", "city", "state", "pincode"],
                        properties: {
                          line1: { bsonType: "string" },
                          line2: { bsonType: "string" },
                          line3: { bsonType: "string" },
                          city: { bsonType: "string" },
                          state: { bsonType: "string" },
                          pincode: { bsonType: "string" }
                        }
                      }
                    }
                  }
                },
                addresses: {
                  bsonType: "array",
                  items: {
                    bsonType: "object",
                    required: ["line1", "line2", "city", "state", "pincode"],
                    properties: {
                      line1: { bsonType: "string" },
                      line2: { bsonType: "string" },
                      line3: { bsonType: "string" },
                      city: { bsonType: "string" },
                      state: { bsonType: "string" },
                      pincode: { bsonType: "string" }
                    }
                  }
                }
              }
            },
            metadata: {
              bsonType: "object",
              required: ["reportDate", "reportNumber", "reportTime"],
              properties: {
                reportDate: { bsonType: "string" },
                reportNumber: { bsonType: "string" },
                reportTime: { bsonType: "string" }
              }
            }
          }
        }
      },
    validationLevel: "strict"
  });