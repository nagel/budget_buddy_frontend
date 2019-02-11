<template>
  <div class="container">
    <div class="accounts">
      <h1 style="text-align: center; padding-top: 15px">Accounts</h1>

      <!-- Account Subtype Card -->
      <div v-for="subtype in subtypes">
        <div class="row d-flex justify-content-center pt-3">
          <div class="card w-75 ">
            <div class="card-header font-weight-bold">{{ subtype }}</div>
            <div class="card-body">
              <div class="container">
                <div v-for="account in accounts" v-if="account.subtype_formatted === subtype">
                  <div class="row pb-3">
                    <div class="col">
                      <div class="row justify-content-center">{{ account.name }}</div>
                      <div class="row justify-content-center text-muted font-italic small">
                        Last updated {{ account.updated_at_formatted }}
                      </div>
                    </div>
                    <div class="col p-0">
                      <div class="row justify-content-center"><span class="font-italic">Available Amount</span></div>
                      <div class="row justify-content-center">{{ account.available_formatted }}</div>
                    </div>
                    <div class="col p-0">
                      <div class="row justify-content-center"><span class="font-italic">Current Amount</span></div>
                      <div class="row justify-content-center">{{ account.current_formatted }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      subtypes: new Set(),
      items: [],
      accounts: [],
      currentAccount: {},
      updateAccountName: ""
      // updateTransCategory: "",
      // categories: [],
      // category_id: this.$route.params.id
    };
  },

  // Runs when the page is loaded
  created: function() {
    // Retrieves account information

    axios.get("https://stark-brushlands-11677.herokuapp.com/api/accounts", { params: { page: "accounts." } }).then(
      function(response) {
        console.log(response.data);
        this.accounts = response.data;

        // Populates account subtype set. Used to determine which subtype modules to display.
        this.accounts.forEach(
          function(account) {
            this.subtypes.add(account.subtype_formatted);
          }.bind(this)
        );

        this.subtypes = Array.from(this.subtypes); // Converts Set to Array
        console.log(this.subtypes);
      }.bind(this)
    );

    // Retrieves institution information associated with each account
    axios.get("https://stark-brushlands-11677.herokuapp.com/api/items").then(
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

      axios.patch(`https://stark-brushlands-11677.herokuapp.com/api/accounts/${this.currentAccount.id}`, params).then(
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

      axios.post("https://stark-brushlands-11677.herokuapp.com/api/transactions", params).then(
        function(response) {
          console.log("Requested");
        }.bind(this)
      );
    }
  },
  computed: {}
};
</script>
