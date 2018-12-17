<template>
  <div class="container">
    <div class="home">
      <div class="row">
        <div class="col d-flex align-items-center"><canvas id="myChart"></canvas></div>

        <!-- Category Card -->
        <!-- ----------------------------------------------------------- -->

        <div class="col">
          <h1 class="d-flex justify-content-center">Categories</h1>
          <div class="row d-flex justify-content-center">
            <div v-for="category in categories">
              <!-- <section class="card"> -->
              <div class="card text-center" style="width: 15rem;">
                <!--
                  <button
                    v-on:click="setCategoryUpdate(category);"
                    data-toggle="modal"
                    data-target="#updateCategoryModal"
                    type="button"
                    class="float-right btn btn-link btn-sm"
                  >
                    Edit
                  </button>
                -->

                <div v-on:click="setSelectedCategory(category.id);" class="card-body">
                  <h5 class="card-title">{{ category.category_name }}</h5>
                  <div class="progress">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      v-bind:style="`width: ${category.progress}%`"
                      v-bind:aria-valuenow="category.progress"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <p class="card-subtitle mt-2 text-muted small">
                    {{ category.amount_spent_formatted }} out of {{ category.budget_limit_formatted }}
                  </p>
                  <!-- <a v-bind:href="'/#/category/' + category.id">Transactions</a> -->
                  <!--
                    <button
                      v-on:click="setCategoryUpdate(category);"
                      type="button"
                      class="btn btn-outline-secondary btn-sm"
                      data-toggle="modal"
                      data-target="#updateCategoryModal"
                    >
                      Edit
                    </button>
                  -->
                </div>
              </div>
              <!-- </section> -->
            </div>
            <!-- ----------------------------------------------------------- -->

            <!-- Add Category Card -->
            <!-- ----------------------------------------------------------- -->

            <div class="card text-center" style="width: 15rem;">
              <div data-toggle="modal" data-target="#addCategoryModal" v-on:click="" class="card-body">
                <img src="../assets/add.png" alt="Add Category" height="70" width="70" padding-top="1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ----------------------------------------------------------- -->

      <!-- Update Category Modal -->
      <!-- ----------------------------------------------------------- -->
      <div
        class="modal fade"
        id="updateCategoryModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Update {{ categoryUpdate.category_name }} Category</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="formCategoryName">Category Name</label>
                  <input v-model="updateCategoryName" type="text" class="form-control" id="formCategoryName" />
                </div>
                <div class="form-group">
                  <label for="formBudgetLimit">Budget Limit</label>
                  <input v-model="updateBudgetLimit" type="text" class="form-control" id="formBudgetLimit" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                v-on:click="updateCategory(categoryUpdate.id);"
                type="button"
                class="btn btn-primary btn-sm"
                data-dismiss="modal"
              >
                Save Changes
              </button>
              <button
                v-on:click="deleteCategory(categoryUpdate.id);"
                type="button"
                class="btn btn-outline-danger btn-sm"
                data-dismiss="modal"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- ----------------------------------------------------------- -->

      <!-- Add Category Modal -->
      <!-- ----------------------------------------------------------- -->
      <div
        class="modal fade"
        id="addCategoryModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="updateCategoryCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="updateCategoryCenterTitle">Create Category</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="formAddCategoryName">Category Name</label>
                  <input v-model="newCategoryName" type="text" class="form-control" id="formAddCategoryName" />
                </div>
                <div class="form-group">
                  <label for="formAddBudgetLimit">Budget Limit</label>
                  <input v-model="newBudgetLimit" type="text" class="form-control" id="formAddBudgetLimit" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button v-on:click="addCategory();" type="button" class="btn btn-primary" data-dismiss="modal">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- ----------------------------------------------------------- -->

      <!-- Transactions by selected category -->
      <!-- ----------------------------------------------------------- -->
      <div id="transactionsTable">
        <!-- Pending Transactions Table -->
        <!-- ----------------------------------------------------- -->
        <!--
          <div id="pending-accordion">
          <div class="card mb-3">
            <div class="card-header" id="pendingTransactions">
              <i class="fas fa-table"></i>
              <a data-toggle="collapse" data-target="#pendingTrans" aria-expanded="true" aria-controls="pendingTrans">
                Pending Transactions</a
              >
            </div>
            <div
              id="pendingTrans"
              class="collapse show"
              aria-labelledby="pendingTransactions"
              data-parent="#pending-accordion"
            >
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
                      v-if="transaction.pending && transaction.category_id == selectedCategory"
                    >
                      <tr>
                        <td>{{ transaction.transaction_date }}</td>
                        <td>{{ transaction.name }}</td>
                        <td>{{ transaction.amount_formatted }}</td>
                        <!-- Update Category Dropdown
        -->
        <!-- ----------------------------------------------- -->
        <!--
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
          <!-- -----------------------------------------------
        -->
        <!--
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
        -->
        <!-- ----------------------------------------------------- -->

        <!-- Posted Transactions Table -->
        <!-- ----------------------------------------------------- -->
        <div id="posted-accordion">
          <div class="card mt-3">
            <div class="card-header" id="postedTransactions">
              <i class="fas fa-table"></i>
              <a data-toggle="collapse" data-target="#postedTrans" aria-expanded="true" aria-controls="postedTrans">
                Posted Transactions</a
              >
            </div>
            <div
              id="postedTrans"
              class="collapse show"
              aria-labelledby="postedTransactions"
              data-parent="#posted-accordion"
            >
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
                      v-if="!transaction.pending && transaction.category_id == selectedCategory"
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
      <!-- ----------------------------------------------------------- -->
    </div>
  </div>
</template>

<style>
/*.hover-card:hover {
  border-style: solid;
}*/
</style>

<script>
/* global Chart */

var axios = require("axios");

export default {
  data: function() {
    return {
      // Category data
      categories: [],
      categoryUpdate: {},
      newCategoryName: "",
      newBudgetLimit: "",
      updateCategoryName: "",
      updateBudgetLimit: "",
      currentlyEditingCategory: null,
      test: "poop",

      //Chart.js
      myPieChart: null,

      // Transaction data
      transactions: [],
      currentTransaction: {},
      updateTransCategory: "",
      category_id: this.$route.params.id,
      selectedCategory: ""
    };
  },
  created: function() {
    //Runs when the page is loaded.

    //Retrieve all transactions
    axios.get("http://localhost:3000/api/transactions").then(
      function(response) {
        console.log(response.data);
        this.transactions = response.data;
      }.bind(this)
    );
  },
  mounted: function() {
    // Chart is created after HTML is loaded and web request for categories is launched.
    axios.get("http://localhost:3000/api/categories").then(
      function(response) {
        console.log(response.data);
        this.categories = response.data;

        // Set selectedCategory to id of first index in the categories array
        this.selectedCategory = this.categories[0].id;

        var chartData = this.categories.map(category => category.amount_spent);
        var chartLabels = this.categories.map(category => category.category_name);

        var ctx = document.getElementById("myChart");
        this.myPieChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: chartLabels,
            datasets: [
              {
                data: chartData,
                backgroundColor: [
                  "#003f5c",
                  "#2f4b7c",
                  "#665191",
                  "#a05195",
                  "#d45087",
                  "#f95d6a",
                  "#ff7c43",
                  "#ffa600"
                ]
              }
            ]
          }
        });
      }.bind(this)
    );
  },
  methods: {
    setSelectedCategory: function(id) {
      this.selectedCategory = id;
      console.log("The selected category is: " + this.selectedCategory);

      // When a new category is selected, transactions array will be updated to reflect any possibe category changes the user made.
      axios.get("http://localhost:3000/api/transactions").then(
        function(response) {
          console.log(response.data);
          this.transactions = response.data;
        }.bind(this)
      );
    },

    addCategory: function() {
      var params = {
        category_name: this.newCategoryName,
        budget_limit: this.newBudgetLimit
      };

      axios.post("http://localhost:3000/api/categories", params).then(
        function(response) {
          console.log(response.data);
          this.newCategoryName = "";
          this.newBudgetLimit = "";

          // Update the frontend
          var index = response.data;
          this.categories.push(index);
        }.bind(this)
      );
    },

    setCategoryUpdate: function(category) {
      this.categoryUpdate = category;
      this.updateCategoryName = category.category_name;
      this.updateBudgetLimit = category.budget_limit;
    },

    updateCategory: function(id) {
      console.log("Updated category ID: " + id);

      var params = {
        category_name: this.updateCategoryName,
        budget_limit: this.updateBudgetLimit
      };

      //console.log(this.$route.params.id);

      axios.patch(`http://localhost:3000/api/categories/${id}`, params).then(
        function(response) {
          console.log(response.data);
          console.log("Category Updated!");
          this.updateCategoryName = "";
          this.updateBudgetLimit = "";

          // Update the frontend
          var index = this.categories.indexOf(this.categoryUpdate);
          console.log("the index is", index);
          console.log(response.data);
          if (index !== -1) {
            this.categories[index] = response.data;
          }

          // update chart
          console.log("UPDATE CHART...");

          // var chartData = this.categories.map(category => category.amount_spent);
          var chartLabels = this.categories.map(category => category.category_name);
          //this.myPieChart.data.datasets[0].data = chartData;
          this.myPieChart.data.labels = chartLabels;
          this.myPieChart.update();
        }.bind(this)
      );
    },

    deleteCategory: function(id) {
      // Also needs to remove category_id from Transactions model
      console.log("Deleted category ID: " + id);

      var params = {
        category_name: this.updateCategoryName,
        budget_limit: this.updateBudgetLimit
      };

      axios.delete(`http://localhost:3000/api/categories/${id}`, params).then(
        function(response) {
          console.log(response.data);
          console.log("Category Deleted!");
          this.updateCategoryName = "";
          this.updateBudgetLimit = "";

          // Update the frontend
          var index = this.categories.indexOf(this.categoryUpdate);
          console.log("the index is", index);
          this.categories.splice(index, 1);
        }.bind(this)
      );
    },

    setCurrentTransaction: function(transaction) {
      this.currentTransaction = transaction;
    },

    updateTransactionCategory: function(category) {
      this.updateTransCategory = category.id;

      var params = {
        category_id: this.updateTransCategory
      };

      console.log("The category ID to update the transaction with is: " + this.updateTransCategory);

      // Updates back-end with new category
      axios.patch(`http://localhost:3000/api/transactions/${this.currentTransaction.id}`, params).then(
        function(response) {
          console.log(response.data);
          //Updates category name on the front-end
          this.currentTransaction.category_info = response.data.category_info;

          // Refreshes to the categories array to call in new "amount_spent"
          axios.get("http://localhost:3000/api/categories").then(
            function(response) {
              console.log(response.data);
              this.categories = response.data;

              // Updates chart data for "amount_spent"
              console.log("Update chart...");

              var chartData = this.categories.map(category => category.amount_spent);
              console.log(chartData);
              var chartLabels = this.categories.map(category => category.category_name);
              console.log(chartLabels);

              this.myPieChart.data.datasets[0].data = chartData;
              this.myPieChart.data.labels = chartLabels;
              this.myPieChart.update();
            }.bind(this)
          );
        }.bind(this)
      );

      // // Refreshes to the categories array to call in new "amount_spent"
      // axios.get("http://localhost:3000/api/categories").then(
      //   function(response) {
      //     console.log(response.data);
      //     this.categories = response.data;

      //     // Updates chart data for "amount_spent"
      //     console.log("Update chart...");

      //     var chartData = this.categories.map(category => category.amount_spent);
      //     console.log(chartData);
      //     var chartLabels = this.categories.map(category => category.category_name);
      //     console.log(chartLabels);

      //     this.myPieChart.data.datasets[0].data = [69, "12254.49", "4506.33", "3578.5"]; //chartData
      //     this.myPieChart.data.labels = chartLabels;
      //     this.myPieChart.update();
      //   }.bind(this)
      // );
    }
  },
  computed: {}
};
</script>
