<template>
  <div class="container">
    <div class="category_transactions">
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
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTablePending" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction Name</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Pending</th>
                    </tr>
                  </thead>
                  <tbody
                    v-for="transaction in transactions"
                    v-if="transaction.pending && transaction.category_id == category_id"
                  >
                    <tr>
                      <td>{{ transaction.transaction_date }}</td>
                      <td>{{ transaction.name }}</td>
                      <td>{{ transaction.amount_formatted }}</td>
                      <!-- Update Category Dropdown -->
                      <!-- ----------------------------------------------- -->
                      <td>
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
                      <td>{{ transaction.pending }}</td>
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
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTablePosted" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction Name</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Pending</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Date</th>
                      <th>Transaction Name</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Pending</th>
                    </tr>
                  </tfoot>
                  <tbody
                    v-for="transaction in transactions"
                    v-if="!transaction.pending && transaction.category_id == category_id"
                  >
                    <tr>
                      <td>{{ transaction.transaction_date }}</td>
                      <td>{{ transaction.name }}</td>
                      <td>{{ transaction.amount_formatted }}</td>
                      <!-- Update Category Dropdown -->
                      <!-- ----------------------------------------------- -->
                      <td>
                        <div class="btn-group">
                          <button
                            type="button"
                            v-on:click="setCurrentTransaction(transaction);"
                            class="btn btn-light dropdown-toggle btn-sm"
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
                      <td>{{ transaction.pending }}</td>
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
      updateTransCategory: "",
      categories: [],
      category_id: this.$route.params.id
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
    },

    updateTransactionCategory: function(category) {
      this.updateTransCategory = category.id;

      var params = {
        category_id: this.updateTransCategory
      };

      console.log("The category ID to update the transaction with is: " + this.updateTransCategory);

      axios.patch(`https://stark-brushlands-11677.herokuapp.com/api/transactions/${this.currentTransaction.id}`, params).then(
        function(response) {
          console.log(response.data);
          //Updates category name on the front-end
          this.currentTransaction.category_info = response.data.category_info;
        }.bind(this)
      );
    }
  },
  computed: {}
};
</script>
