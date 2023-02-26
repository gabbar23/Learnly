<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Address</th>
        <th class="text-left">Email</th>
        <th class="text-left">Phone</th>
        <th class="text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>
          <button class="btn btn-primary">Approve</button>
          <button class="ml-2 btn btn-danger">Decline</button>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div>
    <v-pagination v-model="page" :length="options.pageCount"></v-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        pageCount: 1,
      },
      page: 1,
      desserts: [
        {
          name: "Sonia Sobush",
          calories: 159,
          email: "soniasob@gmail.com",
          phone: "+1 782-882-4928",
        },
        {
          name: "Timothy Nguyen",
          calories: 237,
          email: "timNguyen@gmail.com",
          phone: "+1 873-882-7843",
        },
        {
          name: "Lisa Mitch",
          calories: 262,
          email: "LisaMit@yahoo.com",
          phone: "+1 787-342-1245",
        },
        {
          name: "Bobbi Zara",
          calories: 305,
          email: "BobbiAST@gmail.com",
          phone: "+1 430-234-3252",
        },
        {
          name: "Mahesh Singh",
          calories: 356,
          email: "maheshS@gmail.com",
          phone: "+1 743-324-5839",
        },
        {
          name: "Harmeet Singh",
          calories: 375,
          email: "harmeetSi@gmail.com",
          phone: "+1 983-323-4323",
        },
        {
          name: "Jack Reacher",
          calories: 392,
          email: "JackReacher1@gmail.com",
          phone: "+1 734-325-2346",
        },
        {
          name: "Jimmy",
          calories: 408,
          email: "jimmmyben@gmail.com",
          phone: "+1 984-324-5342",
        },
        {
          name: "Diana",
          calories: 452,
          email: "dianaD@gmail.com",
          phone: "+1 874-324-4234",
        },
        {
          name: "Oriyomi",
          calories: 518,
          email: "oriyomiO@gmail.com",
          phone: "+1 859-324-3423",
        },
      ],
    };
  },
};
</script>
<style>
.parent_sect {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
