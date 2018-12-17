<template>
  <div class="container">
    <div class="accounts">
      <!-- Institution Card -->
      <!-- ----------------------------------------------------------- -->
      <div v-for="item in items">
        <div class="card">
          <div class="card-header">
            {{ item.name }}
            <button
              v-on:click="updateTransactions(item.id);"
              type="button"
              class="btn
          btn-primary btn-sm"
            >
              Update Transactions
            </button>
          </div>
          <div class="card-body">
            <!-- Account Card (By Institution) -->
            <!-- ----------------------------------------------------------- -->
            <div>
              <div class="container">
                <div class="row">
                  <div class="col-sm-4" v-for="account in accounts" v-if="account.item_id == item.id">
                    <section class="hover-card">
                      <div class="card text-center m-2" style="width: 15rem;">
                        <div class="card-body">
                          <h5 class="card-title">{{ account.name }}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">
                            {{ account.subtype }} ({{ account.currency_type }})
                          </h6>
                          <button
                            v-on:click="setAccountUpdate(account);"
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                            data-toggle="modal"
                            data-target="#updateAccountModel"
                          >
                            Edit Name
                          </button>
                          <p class="card-text">Available: {{ account.available }}</p>
                          <p class="card-text">Current: {{ account.current }}</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <!-- ----------------------------------------------------------- -->
          </div>
          <div class="card-footer text-muted">Last updated ...</div>
        </div>
      </div>
      <!-- ----------------------------------------------------------- -->

      <!-- Update Account Model -->
      <!-- ----------------------------------------------------------- -->
      <div
        class="modal fade"
        id="updateAccountModel"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Update Account Name</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="formCategoryName">Account Name</label>
                  <input v-model="updateAccountName" type="text" class="form-control" id="formCategoryName" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button v-on:click="updateAccount();" type="button" class="btn btn-primary btn-sm" data-dismiss="modal">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ----------------------------------------------------------- -->
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
      items: [],
      accounts: [],
      currentAccount: {},
      updateAccountName: ""
      // updateTransCategory: "",
      // categories: [],
      // category_id: this.$route.params.id
    };
  },
  created: function() {
    //Runs when the page is loaded.

    axios.get("http://localhost:3000/api/accounts").then(
      function(response) {
        console.log(response.data);
        this.accounts = response.data;
      }.bind(this)
    );

    axios.get("http://localhost:3000/api/items").then(
      function(response) {
        console.log(response.data);
        this.items = response.data;
      }.bind(this)
    );
  },
  methods: {
    setAccountUpdate: function(account) {
      this.currentAccount = account;
    },

    updateAccount: function() {
      var params = {
        account_name: this.updateAccountName
      };

      console.log("The Account ID used to update is: " + this.currentAccount.id);

      axios.patch(`http://localhost:3000/api/accounts/${this.currentAccount.id}`, params).then(
        function(response) {
          console.log(response.data);

          //Updates account name on the front-end
          var index = this.accounts.indexOf(this.currentAccount);
          console.log("the index is", index);
          // if (index == )
          this.accounts[index].name = this.updateAccountName;
        }.bind(this)
      );
    },

    updateTransactions: function(id) {
      var params = {
        id: id
      };

      axios.post("http://localhost:3000/api/transactions", params).then(
        function(response) {
          console.log("Requested");
        }.bind(this)
      );
    }
  },
  computed: {}
};
</script>
