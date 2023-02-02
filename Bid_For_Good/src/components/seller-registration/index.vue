<template>
  <section class="container parent_sect">
    <div class="form-group">
      <div class="form-group">
        <label for="formGroupExampleInput">First Name</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Example input"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="form-group">
        <label for="formGroupExampleInput">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Example input"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="form-group">
        <label for="formGroupExampleInput">Address Line 1</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Example input"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="form-group">
        <label for="formGroupExampleInput">Address Line 2</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Example input"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="form-group">
        <label for="formGroupExampleInput">City</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Example input"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="form-group">
        <label for="formGroupExampleInput">State</label>
        <select class="custom-select form-control">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <div class="form-group">
        <label for="formGroupExampleInput">Postal Zip Code</label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Example input"
        />
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
    </div>
    <div class="form-group ml-2">
      <div class="form-group">
        <label for="formGroupExampleInput">Phone Number</label>
        <input
          type="number"
          class="form-control"
          id="formGroupExampleInput"
          placeholder="Example input"
        />
      </div>
    </div>
    <!-- <div class="form-group">
        <div class="form-group">
            <label for="formGroupExampleInput">Name of Offering</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
        </div>
    </div>
    <div class="form-group">
        <div class="form-group">
            <label for="formGroupExampleInput">Estimated value</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
        </div>
    </div> -->

    <!-- <div class="custom-file">
  <input type="file" class="custom-file-input" id="customFile">
  <label class="custom-file-label" for="customFile">Choose file</label>
</div> -->
    <div class="form-check mt-4">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1"
        >I agree to all Terms and Conditions</label
      >
    </div>
    <!-- <div class="form-group">
        <div class="form-group">
            <label for="formGroupExampleInput">Description</label>
            <textarea class = "form-control"></textarea>
        </div>
    </div> -->
  </section>
  <div class = "text-center">
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  props: {
    headerText: {
      type: String,
      default: "header",
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    options: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  setup(props) {
    console.log("Selleer Component");
  },
});
</script>
<style>
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
