<template>
  <div class="container">
    <div class="accounts">
      <!-- Account Subtype Card -->
      <div v-for="subtype in subtypes">
        <div class="row d-flex justify-content-center pt-3">
          <div class="card w-75 ">
            <div class="card-header">{{ subtype }}</div>
            <div class="container pt-3">
              <div v-for="account in accounts" v-if="account.subtype_formatted === subtype">
                <div class="row pb-3">
                  <div class="col d-flex align-items-center justify-content-center p-0">
                    <h5>{{ account.name }}</h5>
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
    axios.get("http://localhost:3000/api/accounts").then(
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
