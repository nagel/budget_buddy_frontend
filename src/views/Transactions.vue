<template>
  <div class="container">
    <div class="category_transactions">
      <h1 style="text-align: center; padding-top: 15px">All Transactions</h1>

      <!-- Pending Transactions Table -->
      <!-- ----------------------------------------------------- -->
      <div id="accordion">
        <div class="card mb-3">
          <div class="card-header" id="pendingTransactions">
            <i class="fas fa-table"></i>
            <a data-toggle="collapse" data-target="#pendingTrans" aria-expanded="true" aria-controls="pendingTrans">
              Pending Transactions</a
            >
          </div>
          <div id="pendingTrans" class="collapse show" aria-labelledby="pendingTransactions" data-parent="#accordion">
            <div class="card-body">
              <div class="table-responsive table-hover table-sm">
                <table class="table table-bordered" id="dataTablePending" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th style="text-align:center">Date</th>
                      <th style="text-align:center">Account</th>
                      <th style="text-align:center">Transaction Name</th>
                      <th style="text-align:center">Amount</th>
                      <th style="text-align:center">Category</th>
                      <th style="text-align:center">Pending</th>
                    </tr>
                  </thead>
                  <tbody v-for="transaction in transactions" v-if="transaction.pending">
                    <tr v-bind:class="[transaction.category_id ? '' : uncategorized]">
                      <td style="text-align:center">{{ transaction.transaction_date }}</td>
                      <td style="text-align:center">{{ transaction.account_name }}</td>
                      <td style="text-align:center">{{ transaction.name }}</td>
                      <td style="text-align:center">{{ transaction.amount_formatted }}</td>
                      <!-- Update Category Dropdown -->
                      <!-- ----------------------------------------------- -->
                      <td style="text-align:center">
                        <div class="btn-group">
                          <button
                            type="button"
                            v-on:click="setCurrentTransaction(transaction);"
                            class="btn btn-light dropdown-toggle btn-sm btn-block"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {{ transaction.category_info }}
                          </button>
                          <div class="dropdown-menu">
                            <a
                              v-for="category in categories"
                              v-on:click="updateTransactionCategory(category);"
                              class="dropdown-item"
                            >
                              {{ category.category_name }}
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item">No Category</a>
                          </div>
                        </div>
                      </td>
                      <!-- ----------------------------------------------- -->
                      <td style="text-align:center">{{ transaction.pending_formatted }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>
      </div>
      <!-- ----------------------------------------------------- -->

      <!-- Posted Transactions Table -->
      <!-- ----------------------------------------------------- -->
      <div id="accordion">
        <div class="card mb-3">
          <div class="card-header" id="postedTransactions">
            <i class="fas fa-table"></i>
            <a data-toggle="collapse" data-target="#postedTrans" aria-expanded="true" aria-controls="postedTrans">
              Posted Transactions</a
            >
          </div>
          <div id="postedTrans" class="collapse show" aria-labelledby="postedTransactions" data-parent="#accordion">
            <div class="card-body">
              <div class="table-responsive table-hover table-sm">
                <table class="table table-bordered" id="dataTablePosted" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th style="text-align:center">Date</th>
                      <th style="text-align:center">Account</th>
                      <th style="text-align:center">Transaction Name</th>
                      <th style="text-align:center">Amount</th>
                      <th style="text-align:center">Category</th>
                      <th style="text-align:center">Pending</th>
                    </tr>
                  </thead>
                  <!--
                    <tfoot>
                      <tr>
                        <th>Date</th>
                        <th>Transaction Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Pending</th>
                      </tr>
                    </tfoot>
                  -->
                  <tbody v-for="transaction in transactions" v-if="!transaction.pending">
                    <tr v-bind:class="[transaction.category_id ? '' : uncategorized]">
                      <td style="text-align:center">{{ transaction.transaction_date }}</td>
                      <td style="text-align:center">{{ transaction.account_name }}</td>
                      <td style="text-align:center">{{ transaction.name }}</td>
                      <td style="text-align:center">{{ transaction.amount_formatted }}</td>
                      <!-- Update Category Dropdown -->
                      <!-- ----------------------------------------------- -->
                      <td style="text-align:center">
                        <div class="btn-group">
                          <button
                            type="button"
                            v-on:click="setCurrentTransaction(transaction);"
                            class="btn btn-light dropdown-toggle btn-sm btn-block"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {{ transaction.category_info }}
                          </button>
                          <div class="dropdown-menu">
                            <a
                              v-for="category in categories"
                              v-on:click="updateTransactionCategory(category);"
                              class="dropdown-item"
                            >
                              {{ category.category_name }}
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item">No Category</a>
                          </div>
                        </div>
                      </td>
                      <!-- ----------------------------------------------- -->
                      <td style="text-align:center">{{ transaction.pending_formatted }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>
      </div>
      <!-- ----------------------------------------------------- -->
    </div>
  </div>
</template>

<style>
/*.hover-card:hover {
  border-style: solid;
}*/
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      transactions: [],
      currentTransaction: {},
      currentTransactionIndex: "",
      updateTransCategory: "",
      categories: [],
      category_id: this.$route.params.id,

      // Row styling for uncategorized transactions
      uncategorized: "bg-danger text-white"
    };
  },
  created: function() {
    //Runs when the page is loaded.

    axios.get("https://stark-brushlands-11677.herokuapp.com/api/transactions").then(
      function(response) {
        console.log(response.data);
        this.transactions = response.data;
      }.bind(this)
    );

    axios.get("https://stark-brushlands-11677.herokuapp.com/api/categories").then(
      function(response) {
        console.log(response.data);
        this.categories = response.data;
      }.bind(this)
    );
  },
  methods: {
    setCurrentTransaction: function(transaction) {
      this.currentTransaction = transaction;
      console.log(this.currentTransaction);
      this.currentTransactionIndex = this.transactions.indexOf(this.currentTransaction);
      console.log(this.currentTransactionIndex);
    },

    updateTransactionCategory: function(category) {
      this.updateTransCategory = category.id;

      var params = {
        category_id: this.updateTransCategory
      };

      console.log("Transaction ID " + this.currentTransaction.id + " will be updated...");
      console.log("The category ID to update the transaction with is: " + this.updateTransCategory);

      axios.patch(`https://stark-brushlands-11677.herokuapp.com/api/transactions/${this.currentTransaction.id}`, params).then(
        function(response) {
          console.log(response.data);
          // Update the front-end category name
          this.currentTransaction.category_info = response.data.category_info;

          //Update the front-end table row style
          this.currentTransaction.category_id = response.data.category_id;
          this.transactions[this.currentTransactionIndex].category_id = this.currentTransaction.category_info;
        }.bind(this)
      );
    }
  },
  computed: {}
};
</script>
