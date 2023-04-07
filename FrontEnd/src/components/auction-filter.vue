<template>
  <div>
    <select v-model="selectedFilter">
      <option value="">-- Select Filter --</option>
      <option v-for="filter in filters" :key="filter.id" :value="filter.id">
        {{ filter.name }}
      </option>
    </select>
    <ul>
      <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      items: [
        { id: 1, name: "Apple", type: "fruit" },
        { id: 2, name: "Carrot", type: "vegetable" },
        { id: 3, name: "Pear", type: "fruit" },
        { id: 4, name: "Broccoli", type: "vegetable" },
      ],
      filters: [
        { id: "fruit", name: "Fruit" },
        { id: "vegetable", name: "Vegetable" },
      ],
      selectedFilter: "",
    };
  },
  computed: {
    filteredItems() {
      if (!this.selectedFilter) {
        return this.items;
      } else {
        return this.items.filter((item) => item.type === this.selectedFilter);
      }
    },
  },
};
</script>
